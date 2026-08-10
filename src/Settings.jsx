import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, RotateCcw } from 'lucide-react';

export default function Settings() {
  const [username, setUsername] = useState('');
  const [chartProvider, setChartProvider] = useState('navigraph');
  const [backgroundType, setBackgroundType] = useState('classic');

  useEffect(() => {
    setUsername(localStorage.getItem('simbrief_username') || '');
    setChartProvider(localStorage.getItem('chart_provider') || 'navigraph');
    setBackgroundType(localStorage.getItem('home_background') || 'classic');
  }, []);

  const saveSettings = () => {
    localStorage.setItem('simbrief_username', username);
    localStorage.setItem('chart_provider', chartProvider);
    localStorage.setItem('home_background', backgroundType);
    alert('Definições guardadas com sucesso!');
    window.location.reload();
  };

  const handleReset = () => {
    if (window.confirm('Tens a certeza que pretendes limpar os dados?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, color: '#fff', fontFamily: "'Inter', sans-serif", maxWidth: 900, margin: '0 auto', width: '100%' }}>
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: 16, padding: 24, boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <SettingsIcon size={24} style={{ color: '#38bdf8' }} />
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0, color: '#38bdf8' }}>Settings</h2>
        </div>
        <p style={{ fontSize: 13, color: '#888', marginTop: -10, marginBottom: 24 }}>Manage your EFB preferences and configuration</p>

        {/* SimBrief Username */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#fff', marginBottom: 8 }}>SimBrief Username / ID</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Insere o teu username do SimBrief"
            style={{ width: '100%', background: 'rgba(0,0,0,0.50)', border: '1px solid rgba(255,255,255,0.2)', padding: '12px 14px', borderRadius: 8, color: '#fff', fontWeight: 'bold', outline: 'none', boxSizing: 'border-box' }} 
          />
        </div>

        {/* Charts Provider */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#fff', marginBottom: 8 }}>Charts Provider</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {[
              { id: 'navigraph', name: 'Navigraph Charts (Web)' },
              { id: 'lido', name: 'MSFS24 Lido (Web)' },
              { id: 'chartfox', name: 'ChartFox (Web)' }
            ].map(item => (
              <button 
                key={item.id}
                onClick={() => setChartProvider(item.id)}
                style={{
                  background: chartProvider === item.id ? 'rgba(19, 135, 75, 0.2)' : 'rgba(0,0,0,0.4)',
                  border: chartProvider === item.id ? '1px solid #13874B' : '1px solid rgba(255,255,255,0.1)',
                  padding: '12px',
                  borderRadius: 8,
                  color: '#fff',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: 13,
                  textAlign: 'center'
                }}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        {/* Home screen background */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#fff', marginBottom: 8 }}>Home Screen Background</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15 }}>
            {[
              { id: 'classic', name: 'Lisboa Classic' },
              { id: 'logo', name: 'Lisboa Logo' }
            ].map(item => (
              <div 
                key={item.id}
                onClick={() => setBackgroundType(item.id)}
                style={{
                  background: 'rgba(0,0,0,0.5)',
                  border: backgroundType === item.id ? '2px solid #13874B' : '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 12,
                  padding: 20,
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.2s'
                }}
              >
                <span style={{ fontSize: 14, fontWeight: 'bold', color: backgroundType === item.id ? '#4ade80' : '#fff' }}>{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <button 
          onClick={saveSettings}
          style={{ width: '100%', background: '#13874B', border: 'none', color: '#fff', padding: 14, borderRadius: 10, fontWeight: 'bold', fontSize: 15, cursor: 'pointer', marginBottom: 20 }}
        >
          SAVE CHANGES
        </button>

        {/* Reset EFB */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 20 }}>
          <button 
            onClick={handleReset}
            style={{ background: 'rgba(239, 68, 68, 0.2)', border: '1px solid #ef4444', color: '#f87171', padding: '10px 16px', borderRadius: 8, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
          >
            <RotateCcw size={16} /> Reset EFB (Limpar Dados)
          </button>
        </div>
      </div>
    </div>
  );
}