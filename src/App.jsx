import React, { useState, useEffect } from 'react';
import Home from './Home';
import Weather from './Weather';
import Settings from './Settings';
import Takeoff from './Takeoff';
import Landing from './Landing';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [backgroundType, setBackgroundType] = useState('default');

  // Carregar e escutar alterações nas definições e fundo
  useEffect(() => {
    const updateBg = () => {
      const bg = localStorage.getItem('home_background') || 'default';
      setBackgroundType(bg.toLowerCase());
    };

    updateBg();
    window.addEventListener('storage', updateBg);
    window.addEventListener('settingsChanged', updateBg);
    
    return () => {
      window.removeEventListener('storage', updateBg);
      window.removeEventListener('settingsChanged', updateBg);
    };
  }, []);

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: '#0d1117',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* Background dinâmico baseado nas Settings */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0.18,
        pointerEvents: 'none',
        zIndex: 0,
        background: backgroundType === 'logo' || backgroundType === 'engine'
          ? 'radial-gradient(circle, rgba(19,135,75,0.3) 0%, rgba(0,0,0,0.8) 100%)' 
          : 'linear-gradient(135deg, #0d1117 0%, #161b22 100%)'
      }} />

      {/* Top Bar / Header */}
      <div style={{
        height: 60,
        background: 'rgba(13, 17, 23, 0.85)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
          {currentScreen !== 'home' && (
            <button 
              onClick={() => setCurrentScreen('home')}
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', padding: '6px 14px', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: 13 }}
            >
              ← Home
            </button>
          )}
          <span style={{ fontWeight: 700, color: '#fff', fontSize: 16, textTransform: 'uppercase', letterSpacing: '1px' }}>
            Lisboa Airlines EFB — {currentScreen}
          </span>
        </div>

        {/* Menu rápido de navegação */}
        <div style={{ display: 'flex', gap: 10 }}>
          {['home', 'weather', 'takeoff', 'landing', 'settings'].map((screen) => (
            <button
              key={screen}
              onClick={() => setCurrentScreen(screen)}
              style={{
                background: currentScreen === screen ? '#13874B' : 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                padding: '6px 12px',
                borderRadius: 6,
                cursor: 'pointer',
                fontSize: 12,
                fontWeight: 600,
                textTransform: 'capitalize'
              }}
            >
              {screen}
            </button>
          ))}
        </div>
      </div>

      {/* Conteúdo Dinâmico do Ecrã */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 30, zIndex: 1, position: 'relative' }}>
        {currentScreen === 'home' && <Home onNavigate={setCurrentScreen} />}
        {currentScreen === 'weather' && <Weather />}
        {currentScreen === 'settings' && <Settings />}
        {currentScreen === 'takeoff' && <Takeoff />}
        {currentScreen === 'landing' && <Landing />}
      </div>
    </div>
  );
}