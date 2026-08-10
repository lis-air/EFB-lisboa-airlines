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
      // Usar a API pública da VATSIM diretamente no browser (sem backend/serverless)
      const response = await fetch(`https://metar.vatsim.net/vatsim-metar.php?id=${code}`);
      const text = await response.text();

      if (!response.ok || !text || text.trim() === '' || text.includes('No METAR')) {
        throw new Error('Aeroporto não encontrado ou sem METAR disponível.');
      }

      setRawMetar(text.trim());
    } catch (err) {
      console.error("Erro completo:", err);
      setError(err.message || 'Não foi possível carregar o METAR.');
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