import React, { useState } from 'react';
import { Cloud, Search, Wind, Thermometer, Gauge, Eye, Layers, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

function Weather() {
  const [icao, setIcao] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async (e) => {
    e.preventDefault();
    if (!icao || icao.length < 4) return;
    
    setLoading(true);
    setError('');
    setWeatherData(null);

    try {
      // Atualizado para a nova API direta da Aviation Weather (sem necessidade de proxy local)
     const response = await fetch(`https://corsproxy.io/?url=${encodeURIComponent(`https://aviationweather.gov/api/data/metar?ids=${icao.toUpperCase()}&format=json`)}`);
      if (!response.ok) throw new Error('Network error');
      const data = await response.json();
      
      if (!data || data.length === 0) {
        setError(`No METAR found for ${icao.toUpperCase()}. Check the ICAO code.`);
      } else {
        setWeatherData(data[0]);
      }
    } catch (err) {
      setError('Failed to fetch weather data. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const getFlightCategoryStyle = (cat) => {
    if (!cat) return { bg: 'rgba(100,100,100,0.3)', color: '#aaa', icon: <Cloud size={20} />, label: 'UNKNOWN' };
    switch (cat.toUpperCase()) {
      case 'VFR':  return { bg: 'rgba(0,180,80,0.2)',   color: '#00FF88', border: 'rgba(0,180,80,0.5)',   icon: <CheckCircle2 size={20} />, label: 'VFR' };
      case 'MVFR': return { bg: 'rgba(30,100,255,0.2)', color: '#5da8ff', border: 'rgba(30,100,255,0.5)', icon: <CheckCircle2 size={20} />, label: 'MVFR' };
      case 'IFR':  return { bg: 'rgba(220,50,50,0.2)',  color: '#ff6666', border: 'rgba(220,50,50,0.5)',  icon: <AlertTriangle size={20} />, label: 'IFR' };
      case 'LIFR': return { bg: 'rgba(180,0,180,0.2)',  color: '#e066ff', border: 'rgba(180,0,180,0.5)',  icon: <XCircle size={20} />, label: 'LIFR' };
      default:     return { bg: 'rgba(100,100,100,0.3)', color: '#aaa',    border: 'rgba(100,100,100,0.3)', icon: <Cloud size={20} />, label: cat };
    }
  };

  const formatWind = (d) => {
    if (!d.wdir && !d.wspd) return 'CALM';
    const dir = d.wdir === 0 ? 'VRB' : `${String(d.wdir).padStart(3, '0')}°`;
    const spd = `${d.wspd}KT`;
    const gust = d.wgst ? ` G${d.wgst}KT` : '';
    return `${dir} / ${spd}${gust}`;
  };

  const formatVisibility = (v) => {
    if (!v) return '---';
    if (v === '6+' || parseFloat(v) >= 9999) return '10KM+';
    return `${v}KM`;
  };

  const formatClouds = (clouds) => {
    if (!clouds || clouds.length === 0) return 'SKC/CLEAR';
    return clouds.map(c => `${c.cover}${c.base ? ` ${c.base * 100}ft` : ''}`).join(' · ');
  };

  const catStyle = weatherData ? getFlightCategoryStyle(weatherData.fltCat) : null;

  return (
    <div className="view-container" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px', height: '100%', boxSizing: 'border-box' }}>
      
      {/* Search Bar */}
      <div className="glass-panel" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
        <h2 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px', margin: 0, color: 'var(--vivid-cyan)' }}>
          <Cloud size={24} /> Aviation Weather
        </h2>
        
        <form onSubmit={fetchWeather} style={{ display: 'flex', gap: '10px' }}>
          <input 
            type="text" 
            placeholder="ICAO code (e.g. LPPT)" 
            value={icao}
            onChange={(e) => setIcao(e.target.value.toUpperCase())}
            maxLength={4}
            style={{ 
              padding: '10px 15px', 
              borderRadius: '8px', 
              border: '1px solid rgba(255,255,255,0.2)', 
              background: 'rgba(0,0,0,0.4)', 
              color: '#fff',
              outline: 'none',
              width: '180px',
              fontFamily: 'inherit',
              fontSize: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '2px'
            }}
          />
          <button type="submit" className="liquid-btn" style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '8px', flexDirection: 'row', borderRadius: '8px' }}>
            <Search size={18} /> Search
          </button>
        </form>
      </div>

      {/* Content */}
      <div className="glass-panel" style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
        {loading && (
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '80px' }}>
            <Cloud size={48} style={{ opacity: 0.5, marginBottom: '15px' }} />
            <p>Fetching METAR from aviation weather servers...</p>
          </div>
        )}
        {error && (
          <div style={{ textAlign: 'center', marginTop: '80px', background: 'rgba(220,50,50,0.1)', border: '1px solid rgba(220,50,50,0.3)', borderRadius: '8px', padding: '30px', color: '#ff8080' }}>
            <XCircle size={40} style={{ marginBottom: '15px' }} />
            <p style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{error}</p>
          </div>
        )}
        
        {!loading && !error && !weatherData && (
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <Cloud size={64} opacity={0.3} />
            <p style={{ fontSize: '1.1rem' }}>Enter an ICAO airport code above to fetch the current METAR.</p>
            <p style={{ fontSize: '0.85rem', opacity: 0.6 }}>e.g. LPPT (Lisboa), LPPR (Porto), LEMD (Madrid)</p>
          </div>
        )}

        {weatherData && catStyle && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', animation: 'fadeIn 0.5s ease' }}>
            
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '15px' }}>
              <div>
                <h1 style={{ fontSize: '2.5rem', margin: '0 0 5px 0', color: '#fff' }}>
                  {weatherData.icaoId} <span style={{ fontSize: '1.3rem', color: 'var(--text-secondary)', fontWeight: 400 }}>{weatherData.name}</span>
                </h1>
                <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                  OBS: {weatherData.reportTime ? new Date(weatherData.reportTime).toUTCString() : '--'} UTC
                </p>
              </div>
              <div style={{ background: catStyle.bg, border: `1px solid ${catStyle.border}`, borderRadius: '12px', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '10px', color: catStyle.color, fontSize: '1.5rem', fontWeight: 'bold' }}>
                {catStyle.icon} {catStyle.label}
              </div>
            </div>

            {/* RAW METAR */}
            <div style={{ background: 'rgba(0,0,0,0.5)', padding: '15px 20px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '1rem', color: '#a0f0a0', letterSpacing: '1px', lineHeight: 1.8, wordBreak: 'break-all' }}>
              {weatherData.rawOb}
            </div>

            {/* Data Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
              
              <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '10px', padding: '20px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', marginBottom: '10px', fontSize: '0.85rem' }}>
                  <Wind size={16} /> WIND
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>{formatWind(weatherData)}</div>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '10px', padding: '20px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', marginBottom: '10px', fontSize: '0.85rem' }}>
                  <Thermometer size={16} /> TEMP / DEWPOINT
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>
                  {weatherData.temp !== undefined ? `${weatherData.temp}°C` : '--'} / {weatherData.dewp !== undefined ? `${weatherData.dewp}°C` : '--'}
                </div>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '10px', padding: '20px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', marginBottom: '10px', fontSize: '0.85rem' }}>
                  <Gauge size={16} /> QNH
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>
                  {weatherData.altim ? `Q${Math.round(weatherData.altim)}` : '--'} hPa
                </div>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '10px', padding: '20px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', marginBottom: '10px', fontSize: '0.85rem' }}>
                  <Eye size={16} /> VISIBILITY
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>
                  {formatVisibility(weatherData.visib)}
                </div>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '10px', padding: '20px', border: '1px solid rgba(255,255,255,0.08)', gridColumn: 'span 2' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', marginBottom: '10px', fontSize: '0.85rem' }}>
                  <Layers size={16} /> CLOUDS
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                  {formatClouds(weatherData.clouds)}
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textAlign: 'right', opacity: 0.5 }}>
              Source: aviationweather.gov (NOAA)
            </p>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{__html: `@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`}} />
    </div>
  );
}

export default Weather;