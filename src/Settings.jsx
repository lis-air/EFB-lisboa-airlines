import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export default function Settings() {
  const [simbriefUser, setSimbriefUser] = useState(localStorage.getItem('simbrief_user') || '');
  const [chartsProvider, setChartsProvider] = useState(localStorage.getItem('charts_provider') || 'Navigraph Charts (Web)');
  const [wallpaper, setWallpaper] = useState(localStorage.getItem('efb_wallpaper') || '/file_cover_-_1.png');

  const wallpapers = [
    { name: 'Lisboa Classic', path: '/file_cover_-_1.png' },
    { name: 'Lisboa Logo', path: '/1152-1152-max_1.png' },
  ];

  const handleWallpaperChange = (path) => {
    setWallpaper(path);
    localStorage.setItem('efb_wallpaper', path);
  };

  const handleReset = () => {
    if (window.confirm('Tens a certeza que pretendes reiniciar o EFB? Todos os dados locais serão limpos.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div style={{ padding: '10px 20px', fontFamily: "'Inter', sans-serif", color: '#fff', maxWidth: 650, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20, paddingBottom: 40 }}>
      
      <div>
        <h2 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 4px 0', color: '#13874B' }}>Settings</h2>
        <p style={{ color: '#888', fontSize: 13, margin: 0 }}>Manage your EFB preferences</p>
      </div>

      {/* SimBrief Card */}
      <div style={{ background: '#141816', border: '1px solid #1a3c2a', borderRadius: 12, padding: 18 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, margin: '0 0 4px 0', color: '#fff' }}>SimBrief</h3>
        <p style={{ color: '#888', fontSize: 12, margin: '0 0 12px 0' }}>Your SimBrief username for flight plan downloads.</p>
        <input 
          type="text" 
          value={simbriefUser} 
          onChange={(e) => {
            setSimbriefUser(e.target.value);
            localStorage.setItem('simbrief_user', e.target.value);
          }}
          placeholder="Put your username"
          style={{ width: '100%', background: '#0a0d0b', border: '1px solid #234e36', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
        />
      </div>

      {/* Charts Card */}
      <div style={{ background: '#141816', border: '1px solid #1a3c2a', borderRadius: 12, padding: 18 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, margin: '0 0 4px 0', color: '#fff' }}>Charts</h3>
        <p style={{ color: '#888', fontSize: 12, margin: '0 0 12px 0' }}>Choose your preferred charts provider.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {['Navigraph Charts (Web)', 'MSFS24 Lido (Web)', 'ChartFox (Web)'].map((provider) => {
            const isSelected = chartsProvider === provider;
            return (
              <div 
                key={provider}
                onClick={() => {
                  setChartsProvider(provider);
                  localStorage.setItem('charts_provider', provider);
                }}
                style={{
                  padding: '12px 14px',
                  borderRadius: 8,
                  background: '#0a0d0b',
                  border: `1px solid ${isSelected ? '#13874B' : '#234e36'}`,
                  cursor: 'pointer',
                  fontSize: 13,
                  color: isSelected ? '#4ade80' : '#e2e8f0',
                  fontWeight: isSelected ? 600 : 400,
                  transition: 'all 0.2s'
                }}
              >
                {provider}
              </div>
            );
          })}
        </div>
      </div>

      {/* Home screen background Card */}
      <div style={{ background: '#141816', border: '1px solid #1a3c2a', borderRadius: 12, padding: 18 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, margin: '0 0 4px 0', color: '#fff' }}>Home screen background</h3>
        <p style={{ color: '#888', fontSize: 12, margin: '0 0 14px 0' }}>Choose the wallpaper for your home screen from the official options below.</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          {wallpapers.map((wp) => {
            const isSelected = wallpaper === wp.path;
            return (
              <div 
                key={wp.path}
                onClick={() => handleWallpaperChange(wp.path)}
                style={{
                  background: '#0a0d0b',
                  borderRadius: 10,
                  border: `2px solid ${isSelected ? '#13874B' : '#234e36'}`,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: 8,
                  gap: 8,
                  boxShadow: isSelected ? '0 0 12px rgba(19, 135, 75, 0.3)' : 'none'
                }}
              >
                <div style={{ height: 90, borderRadius: 6, backgroundImage: `url(${wp.path})`, backgroundSize: 'cover', backgroundPosition: 'center', border: '1px solid #234e36' }} />
                <div style={{ textAlign: 'center', fontSize: 12, fontWeight: isSelected ? 600 : 400, color: isSelected ? '#4ade80' : '#fff', paddingBottom: 2 }}>
                  {wp.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reset EFB Card */}
      <div style={{ background: '#141816', border: '1px solid #1a3c2a', borderRadius: 12, padding: 18 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, margin: '0 0 4px 0', color: '#ff4d4d' }}>Reset EFB</h3>
        <p style={{ color: '#888', fontSize: 12, margin: '0 0 12px 0' }}>Clears all local data and reloads the app.</p>
        <button 
          onClick={handleReset}
          style={{ width: '100%', background: 'transparent', border: '1px solid #ff4d4d', color: '#ff4d4d', padding: '10px', borderRadius: 8, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 13, transition: 'background 0.2s' }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 77, 77, 0.1)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        >
          <RefreshCw size={15} /> Reset EFB
        </button>
      </div>

    </div>
  );
}