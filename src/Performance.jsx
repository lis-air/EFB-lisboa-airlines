import React, { useState } from 'react';
import { PlaneTakeoff, PlaneLanding, Wind, Thermometer, Droplets } from 'lucide-react';
import {
  getAircraftProfile,
  parseMetar,
  runwayHeading,
  headwindComponent,
  computeTakeoffPerformance,
  computeLandingPerformance,
} from './performanceCalc';

function Performance({ type }) {
  const isTakeoff = type === 'takeoff';
  const Icon = isTakeoff ? PlaneTakeoff : PlaneLanding;

  const [flightData, setFlightData] = useState({
    airport: '----',
    rwy: '--',
    windLabel: '---/--',
    tempLabel: '--°C',
    qnhLabel: '----',
    weightLabel: '---.-T',
    v1: '---', vr: '---', v2: '---', flex: '--°C', flaps: 'CONF 1+F',
    vapp: '---', vref: '---', dist: '----m',
  });

  const [loadingMsg, setLoadingMsg] = useState('');
  const [useFullRunway, setUseFullRunway] = useState(true);
  const [availableRunway, setAvailableRunway] = useState('');
  const [rawFlightData, setRawFlightData] = useState(null); // guarda os dados brutos para recalcular com pista reduzida

  const fetchAndCompute = React.useCallback(() => {
    const username = localStorage.getItem('simbrief_username');
    if (!username) {
      setLoadingMsg('No SimBrief username set. Go to Settings to add yours.');
      return;
    }
    setLoadingMsg(`Fetching OFP for ${username}...`);

    fetch(`https://www.simbrief.com/api/xml.fetcher.php?username=${username}&json=1`)
      .then(res => res.json())
      .then(data => {
        if (!(data && data.origin && data.destination)) {
          if (data && data.fetch && data.fetch.status) {
            setLoadingMsg(`SimBrief: ${data.fetch.status}`);
          } else {
            setLoadingMsg('Flight plan not found. Did you generate an OFP?');
          }
          return;
        }

        const airportNode = isTakeoff ? data.origin : data.destination;
        const rwy = airportNode.plan_rwy || '--';
        const elevationFt = parseFloat(airportNode.elevation) || 0;
        const weightKg = isTakeoff
          ? parseFloat(data.weights?.est_tow) || 0
          : parseFloat(data.weights?.est_ldw) || 0;

        const icaoType = data.aircraft?.icaocode || data.aircraft?.icao_code || '';
        const profile = getAircraftProfile(icaoType);

        const metarRaw = airportNode.metar || '';
        const wx = parseMetar(metarRaw);
        const rwyHdg = runwayHeading(rwy);
        const headwindKt = headwindComponent(wx.windDir, wx.windSpd, rwyHdg);

        setRawFlightData({ profile, weightKg, elevationFt, oatC: wx.tempC, headwindKt, icaoType });

        const perf = isTakeoff
          ? computeTakeoffPerformance({ profile, weightKg, elevationFt, oatC: wx.tempC, headwindKt })
          : computeLandingPerformance({ profile, weightKg, elevationFt, headwindKt });

        setFlightData({
          airport: airportNode.icao_code || '----',
          rwy,
          windLabel: `${String(wx.windDir).padStart(3, '0')}°/${wx.windSpd}kt`,
          tempLabel: `${wx.tempC}°C`,
          qnhLabel: `${wx.qnh}`,
          weightLabel: `${(weightKg / 1000).toFixed(1)}T`,
          ...perf,
        });
        setLoadingMsg(`Data loaded from SimBrief (${icaoType || 'generic'})!`);
        setTimeout(() => setLoadingMsg(''), 3000);
      })
      .catch(err => {
        console.error(err);
        setLoadingMsg('Error fetching SimBrief data.');
      });
  }, [isTakeoff]);

  React.useEffect(() => {
    fetchAndCompute();
    window.addEventListener('settingsChanged', fetchAndCompute);
    return () => window.removeEventListener('settingsChanged', fetchAndCompute);
  }, [fetchAndCompute]);

  const [calculating, setCalculating] = useState(false);
  const [results, setResults] = useState(null);

  const handleCalculate = () => {
    setCalculating(true);
    setResults(null);
    setTimeout(() => {
      setCalculating(false);

      if (!rawFlightData) {
        setResults(flightData);
        return;
      }

      const availableRunwayM = useFullRunway
        ? Infinity
        : (parseFloat(availableRunway) || Infinity);

      const perf = isTakeoff
        ? computeTakeoffPerformance({ ...rawFlightData, availableRunwayM })
        : computeLandingPerformance({ ...rawFlightData, availableRunwayM });

      setFlightData(prev => ({ ...prev, ...perf }));
      setResults({ ...flightData, ...perf });
    }, 1200);
  };

  return (
    <div className="view-container" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>

      <div className="glass-panel" style={{ width: '100%', maxWidth: '800px', padding: '30px' }}>
        <h2 style={{ fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '15px', color: 'var(--brand-highlight)', marginBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '15px' }}>
          <Icon size={28} /> FlightSmart+ {isTakeoff ? 'Takeoff' : 'Landing'}
        </h2>

        {loadingMsg && (
          <p style={{ color: 'var(--vivid-cyan)', fontSize: '0.9rem', marginBottom: '10px' }}>{loadingMsg}</p>
        )}
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginBottom: '20px' }}>
          Estimated values for simulation use only — not real aircraft performance data.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
          <div>
            <h3 style={{ color: 'var(--vivid-cyan)', marginBottom: '15px' }}>Auto-Fill from SimBrief</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <Field label="Airport" value={flightData.airport} />
              <Field label="Runway" value={flightData.rwy} />
              <Field label="Weight" value={flightData.weightLabel} />
            </div>
          </div>

          <div>
            <h3 style={{ color: 'var(--vivid-cyan)', marginBottom: '15px' }}>Live Weather (METAR)</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '8px' }}>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}><Wind size={20} color="var(--text-secondary)" /> <span>{flightData.windLabel}</span></div>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}><Thermometer size={20} color="var(--text-secondary)" /> <span>{flightData.tempLabel}</span></div>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}><Droplets size={20} color="var(--text-secondary)" /> <span>{flightData.qnhLabel} hPa</span></div>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '25px' }}>
          <h3 style={{ color: 'var(--vivid-cyan)', marginBottom: '15px' }}>Runway Available</h3>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem' }}>
              <input type="radio" checked={useFullRunway} onChange={() => setUseFullRunway(true)} />
              Full length
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem' }}>
              <input type="radio" checked={!useFullRunway} onChange={() => setUseFullRunway(false)} />
              Intersection departure — available length (m):
            </label>
            <input
              type="number"
              min="0"
              disabled={useFullRunway}
              value={availableRunway}
              onChange={(e) => setAvailableRunway(e.target.value)}
              placeholder="e.g. 1500"
              style={{ width: '110px', padding: '8px 10px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.2)', background: useFullRunway ? 'rgba(0,0,0,0.15)' : 'rgba(0,0,0,0.3)', color: '#fff', opacity: useFullRunway ? 0.5 : 1 }}
            />
          </div>
        </div>

        <button onClick={handleCalculate} className="liquid-btn" style={{ width: '100%', padding: '15px', fontSize: '1.2rem', borderRadius: '8px' }}>
          {calculating ? 'CALCULATING...' : 'CALCULATE PERFORMANCE'}
        </button>
      </div>

      {results && (
        <div className="glass-panel" style={{ width: '100%', maxWidth: '800px', padding: '30px', animation: 'fadeIn 0.5s ease' }}>
          <h3 style={{ color: results.insufficient ? '#ff4d4d' : '#00FF88', marginBottom: '10px', fontSize: '1.5rem', textAlign: 'center' }}>
            {results.insufficient ? 'RUNWAY LENGTH INSUFFICIENT' : 'COMPUTATION SUCCESSFUL'}
          </h3>
          {results.insufficient && (
            <p style={{ color: '#ff4d4d', textAlign: 'center', fontSize: '0.85rem', marginBottom: '15px' }}>
              Even at TOGA thrust, the required distance exceeds the runway length available. Consider using a shorter intersection reduction or the full runway.
            </p>
          )}

          {isTakeoff ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', textAlign: 'center' }}>
              <Result label="V1" value={results.v1} />
              <Result label="VR" value={results.vr} />
              <Result label="V2" value={results.v2} />
              <Result label="FLEX" value={results.flex} highlight />
              <Result label="FLAPS" value={results.flaps} span={4} />
              <Result label="TODIST" value={results.dist} span={4} />
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', textAlign: 'center' }}>
              <Result label="VAPP" value={results.vapp} />
              <Result label="VREF" value={results.vref} />
              <Result label="LDG DIST" value={results.dist} highlight />
              <Result label="FLAPS" value={results.flaps} span={3} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
      <span style={{ width: '80px', color: 'var(--text-secondary)' }}>{label}:</span>
      <input type="text" value={value} readOnly style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.3)', color: '#fff' }} />
    </div>
  );
}

function Result({ label, value, highlight, span }) {
  return (
    <div style={{ background: 'rgba(0,0,0,0.4)', padding: '20px', borderRadius: '8px', gridColumn: span ? `span ${span}` : undefined }}>
      <div style={{ color: 'var(--text-secondary)' }}>{label}</div>
      <div style={{ fontSize: '2rem', fontWeight: 'bold', color: highlight ? '#ffaa00' : '#fff' }}>{value}</div>
    </div>
  );
}

export default Performance;
