import React, { useState } from 'react';
import { Cloud, Search, RefreshCw, AlertCircle } from 'lucide-react';

export default function Weather() {
  const [icao, setIcao] = useState('');
  const [rawMetar, setRawMetar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (targetIcao) => {
    const code = (targetIcao || icao).trim().toUpperCase();
    if (!code) {
      setError('Por favor, insere um código ICAO.');
      return;
    }

    setLoading(true);
    setError(null);
    setRawMetar(null);

    try {
      // Pedido direto à API oficial da NOAA (suporta CORS nativamente)
      const response = await fetch(`https://aviationweather.gov/api/data/metar?ids=${code}&format=json`);
      
      if (!response.ok) throw new Error('Erro ao ligar ao serviço meteorológico.');

      const data = await response.json();
      let metarText = null;

      if (Array.isArray(data) && data.length > 0) {
        metarText = data[0].rawOb || data[0].raw_text;
      } else if (data && data.rawOb) {
        metarText = data.rawOb;
      }

      if (metarText) {
        setRawMetar(metarText);
      } else {
        setError('Aeroporto não encontrado ou sem METAR disponível.');
      }
    } catch (err) {
      console.error(err);
      setError('Não foi possível carregar o METAR. Verifica se o código ICAO está correto.');
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
            onKeyDown={(e) => e.key === 'Enter' && fetchWeather()}
            maxLength={4}
            placeholder="ICAO"
            style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.2)', padding: '8px 14px', borderRadius: 8, color: '#fff', fontWeight: 'bold', width: 100, textAlign: 'center', outline: 'none' }}
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
          <RefreshCw size={28} style={{ animation: 'spin 1s linear infinite' }} />
          <p style={{ marginTop: 10 }}>A descarregar dados do METAR...</p>
        </div>
      )}

      {/* Resultados */}
      {rawMetar && !loading && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
          <div style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.15)', padding: 22, borderRadius: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
            <span style={{ fontSize: 12, color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>METAR / Relatório Meteorológico</span>
            <p style={{ fontSize: 18, fontFamily: 'monospace', color: '#4ade80', marginTop: 10, wordBreak: 'break-all', lineHeight: '1.5' }}>
              {rawMetar}
            </p>
          </div>
        </div>
      )}

    </div>
  );
}