import React, { useState, useEffect } from 'react';
import { Save, Check } from 'lucide-react';

const CHART_PROVIDERS = ['Navigraph Charts (App)', 'MSFS24 Lido (Web)', 'ChartFox (Web)'];

const WALLPAPERS = [
  { label: 'Lisboa Airlines (Logo)', path: '/1152-1152-max_1.png' },
  { label: 'Lisboa Airlines (Cover)', path: '/file_cover_-_1.png' },
];

function loadSettings() {
  return {
    username: localStorage.getItem('simbrief_username') || '',
    chartProvider: localStorage.getItem('chart_provider') || CHART_PROVIDERS[0],
    // Chave corrigida: o App.jsx lê 'efb_wallpaper', não 'home_background'.
    wallpaper: localStorage.getItem('efb_wallpaper') || WALLPAPERS[1].path,
    realisticMode: localStorage.getItem('realistic_mode') === 'true',
  };
}

export default function Settings() {
  const [saved, setSaved] = useState(loadSettings());
  const [pending, setPending] = useState(loadSettings());
  const [justSaved, setJustSaved] = useState(false);

  const isDirty = JSON.stringify(saved) !== JSON.stringify(pending);

  useEffect(() => {
    if (!isDirty) return;
    setJustSaved(false);
  }, [pending]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSave = () => {
    localStorage.setItem('simbrief_username', pending.username);
    localStorage.setItem('chart_provider', pending.chartProvider);
    localStorage.setItem('efb_wallpaper', pending.wallpaper);
    localStorage.setItem('realistic_mode', pending.realisticMode);
    window.dispatchEvent(new Event('settingsChanged'));

    setSaved(pending);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  };

  return (
    <div style={{ padding: '20px', paddingBottom: '90px', color: '#fff', maxWidth: '900px', margin: '0 auto', fontFamily: "'Inter', sans-serif" }}>
      <h2 style={{ fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '15px', color: 'var(--brand-highlight)', marginBottom: '5px' }}>
        Settings
      </h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '30px' }}>Manage your EFB preferences.</p>

      {/* SimBrief */}
      <div className="glass-panel" style={{ padding: '20px', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '16px', marginBottom: '5px', fontWeight: 'bold', color: 'var(--vivid-cyan)' }}>SimBrief</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '12px', marginBottom: '15px' }}>Your SimBrief username for flight plan downloads.</p>
        <input
          type="text"
          value={pending.username}
          onChange={(e) => setPending(p => ({ ...p, username: e.target.value }))}
          placeholder="Put your SimBrief username..."
          style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', padding: '12px', borderRadius: '8px', outline: 'none' }}
        />
      </div>

      {/* Charts */}
      <div className="glass-panel" style={{ padding: '20px', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '16px', marginBottom: '5px', fontWeight: 'bold', color: 'var(--vivid-cyan)' }}>Charts</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '12px', marginBottom: '15px' }}>Choose your preferred charts provider.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {CHART_PROVIDERS.map(provider => (
            <div
              key={provider}
              onClick={() => setPending(p => ({ ...p, chartProvider: provider }))}
              style={{
                padding: '12px 16px',
                border: pending.chartProvider === provider ? '1px solid var(--vivid-cyan)' : '1px solid rgba(255,255,255,0.1)',
                background: pending.chartProvider === provider ? 'rgba(6, 182, 212, 0.1)' : 'rgba(0,0,0,0.3)',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: pending.chartProvider === provider ? 'bold' : 'normal',
                color: pending.chartProvider === provider ? 'var(--vivid-cyan)' : '#fff'
              }}
            >
              {provider}
            </div>
          ))}
        </div>
      </div>

      {/* Home screen background */}
      <div className="glass-panel" style={{ padding: '20px', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '16px', marginBottom: '5px', fontWeight: 'bold', color: 'var(--vivid-cyan)' }}>Home screen background</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '12px', marginBottom: '15px' }}>Choose the wallpaper for your home screen.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
          {WALLPAPERS.map(bg => (
            <div
              key={bg.path}
              onClick={() => setPending(p => ({ ...p, wallpaper: bg.path }))}
              style={{
                height: '110px',
                border: pending.wallpaper === bg.path ? '2px solid var(--vivid-cyan)' : '1px solid rgba(255,255,255,0.1)',
                backgroundImage: `url(${bg.path})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.75))', padding: '20px 10px 8px', textAlign: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: 'bold', color: pending.wallpaper === bg.path ? 'var(--vivid-cyan)' : '#fff' }}>{bg.label}</span>
                {pending.wallpaper === bg.path && <div style={{ fontSize: '10px', color: 'var(--vivid-cyan)' }}>Active</div>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Realistic mode */}
      <div className="glass-panel" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '16px', margin: 0, fontWeight: 'bold' }}>Realistic mode</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '12px', margin: '5px 0 0 0' }}>Wi-Fi or cellular mode must be on in order to access the internet.</p>
          </div>
          <div
            onClick={() => setPending(p => ({ ...p, realisticMode: !p.realisticMode }))}
            style={{
              width: '44px',
              height: '24px',
              background: pending.realisticMode ? 'var(--vivid-cyan)' : '#334155',
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
              left: pending.realisticMode ? '22px' : '2px',
              transition: 'left 0.2s'
            }} />
          </div>
        </div>
      </div>

      {/* Botão Guardar — só aparece quando há alterações por gravar */}
      {(isDirty || justSaved) && (
        <div style={{ position: 'fixed', bottom: '30px', left: '50%', transform: 'translateX(-50%)', zIndex: 1000 }}>
          <button
            onClick={handleSave}
            disabled={!isDirty}
            className="liquid-btn"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 28px',
              fontSize: '1rem',
              borderRadius: '30px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
              opacity: justSaved && !isDirty ? 0.9 : 1
            }}
          >
            {justSaved && !isDirty ? (<><Check size={18} /> Saved</>) : (<><Save size={18} /> Save changes</>)}
          </button>
        </div>
      )}
    </div>
  );
}
