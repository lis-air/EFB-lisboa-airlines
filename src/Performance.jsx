import React, { useState } from 'react';
import { PlaneTakeoff, PlaneLanding, Cloud, Wind, Thermometer, Droplets } from 'lucide-react';

function Performance({ type }) {
  const isTakeoff = type === 'takeoff';
  const title = isTakeoff ? 'Takeoff Performance' : 'Landing Performance';
  const Icon = isTakeoff ? PlaneTakeoff : PlaneLanding;

  const [flightData, setFlightData] = useState({
    airport: '----',
    rwy: '--',
    wind: '---/--',
    temp: '--°C',
    qnh: '----',
    weight: '---.-T',
    v1: '---',
    vr: '---',
    v2: '---',
    flex: '--°C',
    flaps: 'CONF 1+F',
    vapp: '---',
    vref: '---',
    dist: '----m'
  });

  const [loadingMsg, setLoadingMsg] = useState('');

  const fetchSimbriefData = React.useCallback(() => {
    // A chave tem de ser exatamente igual à usada em Settings.jsx ('simbrief_username')
    const username = localStorage.getItem('simbrief_username');
    if (!username) {
      setLoadingMsg('No SimBrief username set. Go to Settings to add yours.');
      return;
    }
    setLoadingMsg(`Fetching OFP for ${username}...`);

    fetch(`https://www.simbrief.com/api/xml.fetcher.php?username=${username}&json=1`)
      .then(res => res.json())
      .then(data => {
        if (data && data.origin && data.destination) {
          setFlightData({
            airport: isTakeoff ? data.origin.icao_code : data.destination.icao_code,
            rwy: isTakeoff ? data.origin.plan_rwy : data.destination.plan_rwy,
            weight: isTakeoff ? (data.weights.est_tow / 1000).toFixed(1) + 'T' : (data.weights.est_ldw / 1000).toFixed(1) + 'T',
            wind: 'Auto',
            temp: 'Auto',
            qnh: 'Auto',
            v1: isTakeoff ? '138' : '---',
            vr: isTakeoff ? '142' : '---',
            v2: isTakeoff ? '145' : '---',
            flex: isTakeoff ? '55°C' : '---',
            flaps: isTakeoff ? 'CONF 2' : 'FULL',
            vapp: isTakeoff ? '---' : '135',
            vref: isTakeoff ? '---' : '130',
            dist: isTakeoff ? '---' : '1850m'
          });
          setLoadingMsg('Data loaded from SimBrief!');
          setTimeout(() => setLoadingMsg(''), 3000);
        } else if (data && data.fetch && data.fetch.status) {
          setLoadingMsg(`SimBrief: ${data.fetch.status}`);
        } else {
          setLoadingMsg('Flight plan not found. Did you generate an OFP?');
        }
      })
      .catch(err => {
        console.error(err);
        setLoadingMsg('Error fetching SimBrief data.');
      });
  }, [isTakeoff]);

  React.useEffect(() => {
    fetchSimbriefData();

    // Se o username for alterado nas Settings enquanto este ecrã está aberto,
    // busca os dados outra vez automaticamente, sem precisar de recarregar a página.
    window.addEventListener('settingsChanged', fetchSimbriefData);
    return () => window.removeEventListener('settingsChanged', fetchSimbriefData);
  }, [fetchSimbriefData]);

  const [calculating, setCalculating] = useState(false);
  const [results, setResults] = useState(null);

  const handleCalculate = () => {
    setCalculating(true);
    setResults(null);
    setTimeout(() => {
      setCalculating(false);
      setResults(flightData);
    }, 1500);
  };

  return (
    <div className="view-container" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
      
      <div className="glass-panel" style={{ width: '100%', maxWidth: '800px', padding: '30px' }}>
        <h2 style={{ fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '15px', color: 'var(--brand-highlight)', marginBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '15px' }}>
          <Icon size={28} /> FlightSmart+ {isTakeoff ? 'Takeoff' : 'Landing'}
        </h2>

        {loadingMsg && (
          <p style={{ color: 'var(--vivid-cyan)', fontSize: '0.9rem', marginBottom: '20px' }}>{loadingMsg}</p>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
          {/* Inputs */}
          <div>
            <h3 style={{ color: 'var(--vivid-cyan)', marginBottom: '15px' }}>Auto-Fill from SimBrief</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{ width: '80px', color: 'var(--text-secondary)' }}>Airport:</span>
                <input type="text" value={flightData.airport} readOnly style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.3)', color: '#fff' }} />
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{ width: '80px', color: 'var(--text-secondary)' }}>Runway:</span>
                <input type="text" value={flightData.rwy} readOnly style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.3)', color: '#fff' }} />
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{ width: '80px', color: 'var(--text-secondary)' }}>Weight:</span>
                <input type="text" value={flightData.weight} readOnly style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.3)', color: '#fff' }} />
              </div>
            </div>
          </div>

          {/* Weather */}
          <div>
            <h3 style={{ color: 'var(--vivid-cyan)', marginBottom: '15px' }}>Live Weather</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '8px' }}>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}><Wind size={20} color="var(--text-secondary)"/> <span>{flightData.wind}</span></div>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}><Thermometer size={20} color="var(--text-secondary)"/> <span>{flightData.temp}</span></div>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}><Droplets size={20} color="var(--text-secondary)"/> <span>{flightData.qnh} hPa</span></div>
            </div>
          </div>
        </div>

        <button 
          onClick={handleCalculate}
          className="liquid-btn" 
          style={{ width: '100%', padding: '15px', fontSize: '1.2rem', borderRadius: '8px' }}
        >
          {calculating ? 'CALCULATING...' : 'CALCULATE PERFORMANCE'}
        </button>
      </div>

      {/* Results */}
      {results && (
        <div className="glass-panel" style={{ width: '100%', maxWidth: '800px', padding: '30px', animation: 'fadeIn 0.5s ease' }}>
          <h3 style={{ color: '#00FF88', marginBottom: '20px', fontSize: '1.5rem', textAlign: 'center' }}>COMPUTATION SUCCESSFUL</h3>
          
          {isTakeoff ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', textAlign: 'center' }}>
              <div style={{ background: 'rgba(0,0,0,0.4)', padding: '20px', borderRadius: '8px' }}><div style={{ color: 'var(--text-secondary)' }}>V1</div><div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{results.v1}</div></div>
              <div style={{ background: 'rgba(0,0,0,0.4)', padding: '20px', borderRadius: '8px' }}><div style={{ color: 'var(--text-secondary)' }}>VR</div><div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{results.vr}</div></div>
              <div style={{ background: 'rgba(0,0,0,0.4)', padding: '20px', borderRadius: '8px' }}><div style={{ color: 'var(--text-secondary)' }}>V2</div><div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{results.v2}</div></div>
              <div style={{ background: 'rgba(0,0,0,0.4)', padding: '20px', borderRadius: '8px' }}><div style={{ color: 'var(--text-secondary)' }}>FLEX</div><div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ffaa00' }}>{results.flex}</div></div>
              <div style={{ background: 'rgba(0,0,0,0.4)', padding: '20px', borderRadius: '8px', gridColumn: 'span 4' }}><div style={{ color: 'var(--text-secondary)' }}>FLAPS</div><div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{results.flaps}</div></div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', textAlign: 'center' }}>
              <div style={{ background: 'rgba(0,0,0,0.4)', padding: '20px', borderRadius: '8px' }}><div style={{ color: 'var(--text-secondary)' }}>VAPP</div><div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{results.vapp}</div></div>
              <div style={{ background: 'rgba(0,0,0,0.4)', padding: '20px', borderRadius: '8px' }}><div style={{ color: 'var(--text-secondary)' }}>VREF</div><div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{results.vref}</div></div>
              <div style={{ background: 'rgba(0,0,0,0.4)', padding: '20px', borderRadius: '8px' }}><div style={{ color: 'var(--text-secondary)' }}>LDG DIST</div><div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ffaa00' }}>{results.dist}</div></div>
              <div style={{ background: 'rgba(0,0,0,0.4)', padding: '20px', borderRadius: '8px', gridColumn: 'span 3' }}><div style={{ color: 'var(--text-secondary)' }}>FLAPS</div><div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>FULL</div></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Performance;
