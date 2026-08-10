import React, { useState, useEffect } from 'react';
import { Cloud, Search, RefreshCw, AlertCircle, Wind, Compass, Thermometer, Eye } from 'lucide-react';

export default function Weather() {
  const [icao, setIcao] = useState('LPPT');
  const [rawMetar, setRawMetar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (targetIcao) => {
    const code = (targetIcao || icao).trim().toUpperCase();
    if (!code) return;

    setLoading(true);
    setError(null);
    setRawMetar(null);

    try {
      // Usar o serviço de METAR em texto plano da NOAA via proxy público seguro para evitar CORS
      const response = await fetch(`https://tgftp.nws.noaa.gov/data/observations/metar/stations/${code}.TXT`);
      
      if (!response.ok) {
        throw new Error('Aeroporto não encontrado ou código ICAO inválido.');
      }
      
      const text = await response.text();
      const lines = text.trim().split('\n');
      const metarText = lines.length > 1 ? lines[lines.length - 1] : text;

      setRawMetar(metarText);
    } catch (err) {
      console.error(err);
      try {
        // Fallback para outra API pública caso a NOAA falhe
        const fallbackRes = `https://api.checkwx.com/metar/${code}/decoded`; // apenas exemplo, vamos usar o proxy do aviationweather text
        const altRes = await fetch(`https://aviationweather.gov/cgi-bin/data/metar.php?ids=${code}&format=raw`);
        const altText = await altRes.text();
        if (altText && altText.trim().length > 5) {
          setRawMetar(altText.trim());
          setLoading(false);
          return;
        }
      } catch (e) {}

      setError('Não foi possível carregar o METAR. Verifique se o código ICAO está correto (ex: LPPT, LPPR).');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather('LPPT');
  }, []);

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