import React, { useState, useEffect } from 'react';

export default function Settings() {
  const [username, setUsername] = useState('');
  const [chartProvider, setChartProvider] = useState('Navigraph Charts (Web)');
  const [backgroundType, setBackgroundType] = useState('classic');

  // Carregar dados quando a página abre
  useEffect(() => {
    setUsername(localStorage.getItem('simbrief_username') || '');
    setChartProvider(localStorage.getItem('chart_provider') || 'Navigraph Charts (Web)');
    setBackgroundType(localStorage.getItem('home_background') || 'classic');
  }, []);

  // Gravar automaticamente ao escrever o Username e avisar a App
  const handleUsernameChange = (e) => {
    const val = e.target.value;
    setUsername(val);
    localStorage.setItem('simbrief_username', val);
    window.dispatchEvent(new Event('settingsChanged'));
  };

  const handleChartChange = (provider) => {
    setChartProvider(provider);
    localStorage.setItem('chart_provider', provider);
    window.dispatchEvent(new Event('settingsChanged'));
  };

  const handleBackgroundChange = (bg) => {
    setBackgroundType(bg);
    localStorage.setItem('home_background', bg);
    window.dispatchEvent(new Event('settingsChanged'));
  };

  const handleReset = () => {
    if (window.confirm('Clear all local data and reload the app?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="settings-container" style={{ padding: '20px', color: '#fff', maxWidth: '1000px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '5px' }}>Settings</h2>
      <p style={{ color: '#888', fontSize: '14px', marginBottom: '30px' }}>Manage your EFB preferences</p>

      {/* SimBrief */}
      <div style={{ background: '#1a1a1a', borderRadius: '8px', padding: '20px', marginBottom: '20px', border: '1px solid #333' }}>
        <h3 style={{ fontSize: '16px', marginBottom: '5px' }}>SimBrief</h3>
        <p style={{ color: '#888', fontSize: '12px', marginBottom: '15px' }}>Your SimBrief username for flight plan downloads.</p>
        <input 
          type="text" 
          value={username} 
          onChange={handleUsernameChange}
          style={{ width: '100%', background: '#0a0a0a', border: '1px solid #333', color: '#fff', padding: '12px', borderRadius: '6px' }}
        />
      </div>

      {/* Charts */}
      <div style={{ background: '#1a1a1a', borderRadius: '8px', padding: '20px', marginBottom: '20px', border: '1px solid #333' }}>
        <h3 style={{ fontSize: '16px', marginBottom: '5px' }}>Charts</h3>
        <p style={{ color: '#888', fontSize: '12px', marginBottom: '15px' }}>Choose your preferred charts provider.</p>
        {['Navigraph Charts (Web)', 'MSFS24 Lido (Web)', 'ChartFox (Web)'].map(provider => (
          <div 
            key={provider}
            onClick={() => handleChartChange(provider)}
            style={{ 
              padding: '12px', 
              border: chartProvider === provider ? '1px solid #13874B' : '1px solid #333', 
              background: chartProvider === provider ? 'rgba(19, 135, 75, 0.1)' : 'transparent',
              marginBottom: '8px', 
              borderRadius: '6px', 
              cursor: 'pointer' 
            }}
          >
            {provider}
          </div>
        ))}
      </div>

      {/* Home screen background */}
      <div style={{ background: '#1a1a1a', borderRadius: '8px', padding: '20px', marginBottom: '20px', border: '1px solid #333' }}>
        <h3 style={{ fontSize: '16px', marginBottom: '5px' }}>Home screen background</h3>
        <p style={{ color: '#888', fontSize: '12px', marginBottom: '15px' }}>Choose the wallpaper for your home screen from the official options below.</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          {[
            { id: 'classic', name: 'Lisboa Classic' },
            { id: 'logo', name: 'Lisboa Logo' }
          ].map(bg => (
            <div 
              key={bg.id}
              onClick={() => handleBackgroundChange(bg.id)}
              style={{
                padding: '20px',
                textAlign: 'center',
                border: backgroundType === bg.id ? '1px solid #13874B' : '1px solid #333',
                background: backgroundType === bg.id ? 'rgba(19, 135, 75, 0.1)' : 'transparent',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold',
                color: backgroundType === bg.id ? '#4ade80' : '#fff'
              }}
            >
              {bg.name}
            </div>
          ))}
        </div>
      </div>

      {/* Reset */}
      <div style={{ background: '#1a1a1a', borderRadius: '8px', padding: '20px', border: '1px solid #333' }}>
        <h3 style={{ fontSize: '16px', color: '#ef4444', marginBottom: '5px' }}>Reset EFB</h3>
        <p style={{ color: '#888', fontSize: '12px', marginBottom: '15px' }}>Clears all local data and reloads the app.</p>
        <button 
          onClick={handleReset}
          style={{ background: 'transparent', border: '1px solid #ef4444', color: '#ef4444', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' }}
        >
          Reset App Data
        </button>
      </div>
    </div>
  );
}