import React, { useState, useEffect } from 'react';

export default function Settings() {
  const [username, setUsername] = useState('');
  const [chartProvider, setChartProvider] = useState('Navigraph Charts (Web)');
  const [backgroundType, setBackgroundType] = useState('Default');
  const [realisticMode, setRealisticMode] = useState(false);

  useEffect(() => {
    setUsername(localStorage.getItem('simbrief_username') || '');
    setChartProvider(localStorage.getItem('chart_provider') || 'Navigraph Charts (Web)');
    setBackgroundType(localStorage.getItem('home_background') || 'Default');
    setRealisticMode(localStorage.getItem('realistic_mode') === 'true');
  }, []);

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
    localStorage.setItem('home_background', bg.toLowerCase());
    window.dispatchEvent(new Event('settingsChanged'));
  };

  const handleRealisticToggle = () => {
    const newVal = !realisticMode;
    setRealisticMode(newVal);
    localStorage.setItem('realistic_mode', newVal);
    window.dispatchEvent(new Event('settingsChanged'));
  };

  return (
    <div style={{ padding: '20px', color: '#fff', maxWidth: '900px', margin: '0 auto', fontFamily: "'Inter', sans-serif" }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '5px', color: '#4ade80' }}>Settings</h2>
      <p style={{ color: '#888', fontSize: '14px', marginBottom: '30px' }}>Manage your EFB preferences.</p>

      {/* SimBrief */}
      <div style={{ background: '#0a1128', border: '1px solid #1e293b', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '16px', marginBottom: '5px', fontWeight: 'bold' }}>SimBrief</h3>
        <p style={{ color: '#888', fontSize: '12px', marginBottom: '15px' }}>Your SimBrief username for flight plan downloads.</p>
        <input 
          type="text" 
          value={username} 
          onChange={handleUsernameChange}
          placeholder="Put your SimBrief username..."
          style={{ width: '100%', background: '#050b14', border: '1px solid #1e293b', color: '#fff', padding: '12px', borderRadius: '8px', outline: 'none' }}
        />
      </div>

      {/* Charts */}
      <div style={{ background: '#0a1128', border: '1px solid #1e293b', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '16px', marginBottom: '5px', fontWeight: 'bold' }}>Charts</h3>
        <p style={{ color: '#888', fontSize: '12px', marginBottom: '15px' }}>Choose your preferred charts provider.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {['Navigraph Charts (Web)', 'Navigraph Charts (App)', 'MSFS24 Lido (Web)', 'ChartFox (Web)', 'ForeFlight (App)'].map(provider => (
            <div 
              key={provider}
              onClick={() => handleChartChange(provider)}
              style={{ 
                padding: '12px 16px', 
                border: chartProvider === provider ? '1px solid #06b6d4' : '1px solid #1e293b', 
                background: chartProvider === provider ? 'rgba(6, 182, 212, 0.1)' : '#050b14',
                borderRadius: '8px', 
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: chartProvider === provider ? 'bold' : 'normal',
                color: chartProvider === provider ? '#22d3ee' : '#fff'
              }}
            >
              {provider}
            </div>
          ))}
        </div>
      </div>

      {/* Home screen background */}
      <div style={{ background: '#0a1128', border: '1px solid #1e293b', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '16px', marginBottom: '5px', fontWeight: 'bold' }}>Home screen background</h3>
        <p style={{ color: '#888', fontSize: '12px', marginBottom: '15px' }}>Choose the wallpaper for your home screen.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
          {['Default', 'Engine', 'Sky'].map(bg => (
            <div 
              key={bg}
              onClick={() => handleBackgroundChange(bg)}
              style={{
                height: '90px',
                border: backgroundType === bg ? '2px solid #06b6d4' : '1px solid #1e293b',
                background: '#050b14',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingBottom: '10px',
                position: 'relative'
              }}
            >
              <span style={{ fontSize: '13px', fontWeight: 'bold', color: backgroundType === bg ? '#22d3ee' : '#fff' }}>{bg}</span>
              {backgroundType === bg && <span style={{ fontSize: '10px', color: '#06b6d4', marginTop: '2px' }}>Active</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Realistic mode */}
      <div style={{ background: '#0a1128', border: '1px solid #1e293b', borderRadius: '12px', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <div>
            <h3 style={{ fontSize: '16px', margin: 0, fontWeight: 'bold' }}>Realistic mode</h3>
            <p style={{ color: '#888', fontSize: '12px', margin: '5px 0 0 0' }}>Wi-Fi or cellular mode must be on in order to access the internet.</p>
          </div>
          <div 
            onClick={handleRealisticToggle}
            style={{
              width: '44px',
              height: '24px',
              background: realisticMode ? '#06b6d4' : '#334155',
              borderRadius: '12px',
              position: 'relative',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
          >
            <div style={{
              width: '20px',
              height: '20px',
              background: '#fff',
              borderRadius: '50%',
              position: 'absolute',
              top: '2px',
              left: realisticMode ? '22px' : '2px',
              transition: 'left 0.2s'
            }} />
          </div>
        </div>
      </div>

    </div>
  );
}