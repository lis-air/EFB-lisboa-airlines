import React, { useState } from 'react';
import { Cloud, Search, RefreshCw, AlertCircle, Wind, Compass, Thermometer, Eye, Activity } from 'lucide-react';

export default function Weather() {
  const [icao, setIcao] = useState('LPPT');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (targetIcao) => {
    const code = (targetIcao || icao).trim().toUpperCase();
    if (!code) return;

    setLoading(true);
    setError(null);

    try {
      // Usando o endpoint público da NOAA (Aviation Weather Center)
      const res = await fetch(`https://aviationweather.gov/api/data/metar?ids=${code}&format=json`);
      
      if (!res.ok) throw new Error('Não foi possível obter os dados meteorológicos.');
      
      const data = await res.json();
      
      if (!data || data.length === 0) {
        throw new Error(`Aeroporto '${code}' não encontrado ou sem METAR disponível.`);
      }

      setWeatherData(data[0]);
    } catch (err) {
      console.error(err);
      setError('Erro ao carregar o METAR. Verifique o código ICAO ou a ligação.');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, color: '#fff', fontFamily: "'Inter', sans-serif" }}>
      
      {/* Barra de Pesquisa */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '15px 20px', borderRadius: 14, border: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Cloud size={24} style={{ color: '#13874B' }} />
          <h2 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>Aviation Weather (METAR)</h2>
        </div>
        
        <div style={{ display: 'flex', gap: 10 }}>
          <input 
            type="text" 
            value={icao} 
            onChange={(e) => setIcao(e.target.value.toUpperCase())}
            maxLength={4}
            placeholder="ICAO (ex: LPPT)"
            style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.2)', padding: '8px 14px', borderRadius: 8, color: '#fff', fontWeight: 'bold', width: 110, textAlign: 'center', outline: 'none' }}
          />
          <button 
            onClick={() => fetchWeather()} 
            style={{ background: '#13874B', border: 'none', color: '#fff', padding: '8px 18px', borderRadius: 8, fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
          >
            <Search size={16} /> Pesquisar
          </button>
        </div>
      </div>

      {/* Erro */}
      {error && (
        <div style={{ background: 'rgba(255, 77, 77, 0.12)', border: '1px solid #ff4d4d', padding: '16px 20px', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 12, color: '#ff4d4d' }}>
          <AlertCircle size={22} />
          <span>{error}</span>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#aaa' }}>
          <RefreshCw className="fa-spin" size={28} style={{ animation: 'spin 1s linear infinite' }} />
          <p style={{ marginTop: 10 }}>A descarregar dados do METAR...</p>
        </div>
      )}

      {/* Resultados */}
      {weatherData && !loading && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
          
          {/* Raw METAR Box */}
          <div style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.15)', padding: 20, borderRadius: 12 }}>
            <span style={{ fontSize: 12, color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>METAR Bruto ({weatherData.icao})</span>
            <p style={{ fontSize: 16, fontFamily: 'monospace', color: '#4ade80', marginTop: 8, wordBreak: 'break-all' }}>
              {weatherData.rawOb}
            </p>
          </div>

          {/* Grelha de Dados Detalhados */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 15 }}>
            
            <div style={{ background: 'rgba(255,255,255,0.04)', padding: 18, borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#aaa', marginBottom: 8, fontSize: 13 }}>
                <Thermometer size={16} /> Temperatura / Ponto de Orvalho
              </div>
              <div style={{ fontSize: 20, fontWeight: 600 }}>
                {weatherData.temp !== undefined ? `${weatherData.temp}°C` : 'N/D'} 
                <span style={{ fontSize: 14, color: '#888', fontWeight: 400 }}> / {weatherData.dewp !== undefined ? `${weatherData.dewp}°C` : 'N/D'}</span>
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.04)', padding: 18, borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#aaa', marginBottom: 8, fontSize: 13 }}>
                <Wind size={16} /> Vento
              </div>
              <div style={{ fontSize: 20, fontWeight: 600 }}>
                {weatherData.wdir !== undefined ? `${weatherData.wdir}°` : 'Variável'} a {weatherData.wspd !== undefined ? `${weatherData.wspd} kt` : 'N/D'}
                {weatherData.wgst ? ` (Gusts: ${weatherData.wgst} kt)` : ''}
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.04)', padding: 18, borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#aaa', marginBottom: 8, fontSize: 13 }}>
                <Compass size={16} /> Pressão (Altimeter)
              </div>
              <div style={{ fontSize: 20, fontWeight: 600 }}>
                {weatherData.altim ? `${Math.round(weatherData.altim * 33.8639)} hPa` : 'N/D'} 
                <span style={{ fontSize: 14, color: '#888', fontWeight: 400 }}> ({weatherData.altim} inHg)</span>
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.04)', padding: 18, borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#aaa', marginBottom: 8, fontSize: 13 }}>
                <Eye size={16} /> Visibilidade
              </div>
              <div style={{ fontSize: 20, fontWeight: 600 }}>
                {weatherData.visib !== undefined ? `${weatherData.visib} milhas` : 'N/D'}
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}