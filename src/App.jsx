import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings as SettingsIcon, FileText, CheckSquare, Home, Cloud, Compass, Navigation, MapPin, Gauge, Wifi, Battery, ChevronLeft, Lock } from 'lucide-react';
import Dashboard from './Dashboard';
import Weather from './Weather';
import IFrameView from './IFrameView';
import Docs from './Docs';
import Checklist from './Checklist';
import Parkings from './Parkings';
import Performance from './Performance';
import Settings from './Settings';

// ------------------------------------------------------------------
// CONFIGURAÇÕES DO DISCORD (Dinâmico para localhost e Vercel)
// ------------------------------------------------------------------
const CLIENT_ID = "1536408790264582194"; 
const GUILD_ID_REQUERIDO = "1473634134579478701"; 

// Usa automaticamente o URL atual do site (localhost ou vercel.app)
const REDIRECT_URI_STRING = window.location.origin + "/"; 
const REDIRECT_URI = encodeURIComponent(REDIRECT_URI_STRING); 
const DISCORD_AUTH_URL = `https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=identify%20guilds`;

// ------------------------------------------------------------------
// COMPONENTE DE AUTENTICAÇÃO DO DISCORD
// ------------------------------------------------------------------
function DiscordAuthWrapper({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Injetar a fonte 'Inter' do Google Fonts dinamicamente se não existir
    if (!document.getElementById('google-font-inter')) {
      const link = document.createElement('link');
      link.id = 'google-font-inter';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
      document.head.appendChild(link);
    }

    const hash = window.location.hash;
    let token = localStorage.getItem('discord_token');

    if (hash && hash.includes('access_token')) {
      token = new URLSearchParams(hash.replace('#', '?')).get('access_token');
      localStorage.setItem('discord_token', token);
      window.location.hash = ''; 
    }

    if (!token) {
      setLoading(false);
      return;
    }

    async function checkDiscordAuth() {
      try {
        const userRes = await fetch('https://discord.com/api/users/@me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!userRes.ok) throw new Error('Sessão expirada');
        const userData = await userRes.json();

        const guildsRes = await fetch('https://discord.com/api/users/@me/guilds', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!guildsRes.ok) throw new Error('Erro ao verificar servidores');
        const userGuilds = await guildsRes.json();

        const isMember = userGuilds.some(guild => guild.id === GUILD_ID_REQUERIDO);
        if (isMember) {
          setUser(userData);
        } else {
          setError('Acesso Negado: Precisas de pertencer ao servidor da Lisboa Airlines no Discord.');
          localStorage.removeItem('discord_token');
        }
      } catch (err) {
        localStorage.removeItem('discord_token');
        setError('Sessão expirada. Por favor, faz login novamente.');
      } finally {
        setLoading(false);
      }
    }
    checkDiscordAuth();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('discord_token');
    setUser(null);
  };

  if (loading) return <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', background: '#121212', color: '#fff', fontFamily: "'Inter', sans-serif" }}>A verificar...</div>;

  if (!user) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'center', alignItems: 'center', background: '#0e0e10', color: '#fff', fontFamily: "'Inter', sans-serif" }}>
        <img src="/lsa_logo.png" alt="LSA Logo" style={{ width: 120, marginBottom: 20 }} onError={(e) => { e.target.src = 'https://placehold.co/120x120/0A5A30/FFF?text=LSA' }} />
        <h1>Lisboa Airlines EFB</h1>
        <p style={{ color: '#aaa', marginBottom: 30 }}>Acesso restrito a membros da tripulação.</p>
        {error && <p style={{ color: '#ff4d4d', backgroundColor: 'rgba(255, 77, 77, 0.1)', padding: '12px 20px', borderRadius: 8, border: '1px solid #ff4d4d', marginBottom: 20 }}>{error}</p>}
        <a href={DISCORD_AUTH_URL} style={{ backgroundColor: '#5865F2', color: '#fff', padding: '14px 28px', borderRadius: 8, textDecoration: 'none', fontWeight: 'bold' }}>Autenticar com Discord</a>
      </div>
    );
  }

  return (
    <>
      <div style={{ position: 'fixed', top: 12, right: 20, zIndex: 9999, display: 'flex', alignItems: 'center', gap: 15, background: 'rgba(0,0,0,0.7)', padding: '6px 14px', borderRadius: 20, color: '#fff', fontSize: 13, border: '1px solid rgba(255,255,255,0.1)', fontFamily: "'Inter', sans-serif" }}>
        <span><b>{user.global_name || user.username}</b></span>
        <button onClick={handleLogout} style={{ background: '#ff4d4d', border: 'none', color: '#fff', borderRadius: 4, padding: '3px 8px', cursor: 'pointer' }}>Sair</button>
      </div>
      {children}
    </>
  );
}

// ------------------------------------------------------------------
// ECRÃ DE BLOQUEIO POR PIN
// ------------------------------------------------------------------
function PinLock({ onUnlock }) {
  const [input, setInput] = useState('');
  const CORRECT_PIN = "1234";

  const handlePress = (num) => {
    if (input.length < 4) {
      const newInput = input + num;
      setInput(newInput);
      if (newInput === CORRECT_PIN) {
        onUnlock();
      } else if (newInput.length === 4) {
        setTimeout(() => setInput(''), 400); 
      }
    }
  };

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 99999, background: 'rgba(10, 13, 18, 0.95)', backdropFilter: 'blur(20px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: "'Inter', sans-serif" }}>
      <Lock size={42} style={{ marginBottom: 15, color: '#13874B' }} />
      <h2 style={{ marginBottom: 8, fontWeight: 500 }}>Insira o PIN do EFB</h2>
      <p style={{ color: '#888', fontSize: 13, marginBottom: 25 }}>Código padrão: 1234</p>
      
      <div style={{ display: 'flex', gap: 15, marginBottom: 35 }}>
        {[0, 1, 2, 3].map(i => (
          <div key={i} style={{ width: 16, height: 16, borderRadius: '50%', background: input[i] ? '#13874B' : 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' }} />
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 70px)', gap: 18 }}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(n => (
          <button key={n} onClick={() => handlePress(n.toString())} style={{ width: 70, height: 70, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: 22, fontWeight: 500, cursor: 'pointer', transition: 'background 0.2s' }}>{n}</button>
        ))}
      </div>
      <button onClick={() => setInput('')} style={{ background: 'transparent', border: 'none', color: '#888', marginTop: 25, cursor: 'pointer', fontSize: 13 }}>Limpar</button>
    </div>
  );
}

// ------------------------------------------------------------------
// ANIMAÇÃO SUAVE PARA AS PÁGINAS
// ------------------------------------------------------------------
const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.98, y: 10 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.98, y: -10 }}
    transition={{ duration: 0.25, ease: "easeInOut" }}
    style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
  >
    {children}
  </motion.div>
);

// ------------------------------------------------------------------
// ECRÃ INICIAL (SPRINGBOARD)
// ------------------------------------------------------------------
function IpadHome() {
  const navigate = useNavigate();
  const apps = [
    { name: 'Dashboard', path: '/', icon: <Home size={40} />, bg: 'linear-gradient(135deg, #0A5A30, #13874B)' },
    { name: 'Weather', path: '/weather', icon: <Cloud size={40} />, bg: 'linear-gradient(135deg, #1e3c72, #2a5298)' },
    { name: 'SimBrief', path: '/simbrief', icon: <Compass size={40} />, bg: 'linear-gradient(135deg, #ff7e5f, #feb47b)' },
    { name: 'Navigraph', path: '/navigraph', icon: <Navigation size={40} />, bg: 'linear-gradient(135deg, #2b5876, #4e4376)' },
    { name: 'Parkings', path: '/parkings', icon: <MapPin size={40} />, bg: 'linear-gradient(135deg, #654ea3, #eaafc8)' },
    { name: 'Takeoff Perf', path: '/performance-takeoff', icon: <Gauge size={40} />, bg: 'linear-gradient(135deg, #f12711, #f5af19)' },
    { name: 'Landing Perf', path: '/performance-landing', icon: <Gauge size={40} />, bg: 'linear-gradient(135deg, #3a7bd5, #3a6073)' },
    { name: 'Documents', path: '/docs', icon: <FileText size={40} />, bg: 'linear-gradient(135deg, #11998e, #38ef7d)' },
    { name: 'Checklists', path: '/checklists', icon: <CheckSquare size={40} />, bg: 'linear-gradient(135deg, #f2994a, #f2c94c)' },
    { name: 'Settings', path: '/settings', icon: <SettingsIcon size={40} />, bg: 'linear-gradient(135deg, #434343, #000000)' },
  ];

  return (
    <PageTransition>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '40px 70px', justifyContent: 'space-between', fontFamily: "'Inter', sans-serif" }}>
        <h2 style={{ color: '#fff', textAlign: 'center', fontWeight: 600, fontSize: 26, letterSpacing: '-0.5px', textShadow: '0 2px 6px rgba(0,0,0,0.7)' }}>Lisboa Airlines Flight Bag</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '30px 50px', justifyItems: 'center' }}>
          {apps.map((app, i) => (
            <div key={i} onClick={() => navigate(app.path)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', transition: 'transform 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
              <div style={{ width: 85, height: 85, borderRadius: 20, background: app.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 8px 20px rgba(0,0,0,0.5)' }}>{app.icon}</div>
              <span style={{ color: '#fff', fontSize: 13, marginTop: 8, fontWeight: 500, letterSpacing: '-0.2px', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>{app.name}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.12)', backdropFilter: 'blur(20px)', padding: '10px 25px', borderRadius: 24, display: 'flex', gap: 25, border: '1px solid rgba(255,255,255,0.2)' }}>
            {apps.slice(0, 4).map((app, i) => (
              <div key={i} onClick={() => navigate(app.path)} style={{ width: 55, height: 55, borderRadius: 14, background: app.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer' }}>
                {React.cloneElement(app.icon, { size: 26 })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

// ------------------------------------------------------------------
// LAYOUT INTERNO DAS APLICAÇÕES
// ------------------------------------------------------------------
function IpadAppLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <PageTransition>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'rgba(15, 15, 15, 0.88)', backdropFilter: 'blur(12px)', fontFamily: "'Inter', sans-serif" }}>
        <div style={{ height: 48, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', padding: '0 25px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <button onClick={() => navigate('/')} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', padding: '6px 12px', borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600, fontSize: 13, fontFamily: "'Inter', sans-serif" }}>
            <ChevronLeft size={16} /> Home
          </button>
          <span style={{ color: '#fff', marginLeft: 20, fontSize: 13, fontWeight: 600, letterSpacing: '0.5px' }}>{location.pathname.replace('/', '').toUpperCase() || 'DASHBOARD'}</span>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: 25 }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/simbrief" element={<IFrameView url="https://www.simbrief.com" title="SimBrief" />} />
            <Route path="/navigraph" element={<IFrameView url="https://charts.navigraph.com" title="Navigraph Charts" />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/parkings" element={<Parkings />} />
            <Route path="/performance-takeoff" element={<Performance type="takeoff" />} />
            <Route path="/performance-landing" element={<Performance type="landing" />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/checklists" element={<Checklist />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </PageTransition>
  );
}

// ------------------------------------------------------------------
// APLICAÇÃO PRINCIPAL (APP)
// ------------------------------------------------------------------
function App() {
  const [isLocked, setIsLocked] = useState(true);
  const [time, setTime] = useState(new Date());
  const [wallpaper, setWallpaper] = useState(localStorage.getItem('efb_wallpaper') || '/file_cover_-_1.png');

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const checkWallpaper = setInterval(() => {
      const saved = localStorage.getItem('efb_wallpaper');
      if (saved && saved !== wallpaper) setWallpaper(saved);
    }, 500);
    return () => clearInterval(checkWallpaper);
  }, [wallpaper]);

  const formatTimeWithSeconds = (date) => {
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds} Z`;
  };

  return (
    <DiscordAuthWrapper>
      <Router>
        <div style={{ width: '100vw', height: '100vh', background: '#0a0d12', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
          
          <div style={{ width: '95vw', height: '96vh', background: '#161616', borderRadius: 20, padding: 8, boxShadow: '0 20px 50px rgba(0,0,0,0.85)', display: 'flex', flexDirection: 'column', border: '2px solid #2c2c2c', position: 'relative' }}>
            
            {/* Ecrã de Bloqueio por PIN */}
            {isLocked && <PinLock onUnlock={() => setIsLocked(false)} />}

            {/* BARRA DE ESTADO SUPERIOR COM FONTE MODERNA INTER */}
            <div style={{ 
              height: 28, 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              padding: '0 20px', 
              color: '#e2e8f0', 
              fontSize: 12, 
              fontWeight: 500, 
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '-0.1px'
            }}>
              <span style={{ fontWeight: 600, color: '#f8fafc' }}>Lisboa Airlines EFB</span>
              <span style={{ fontVariantNumeric: 'tabular-nums', letterSpacing: '0.5px' }}>{formatTimeWithSeconds(time)}</span>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', color: '#cbd5e1' }}>
                <Wifi size={14} /> 
                <Battery size={16} />
              </div>
            </div>

            {/* Ecrã Interno com Wallpaper e Animações */}
            <div style={{ flex: 1, borderRadius: 14, overflow: 'hidden', position: 'relative', backgroundImage: `url(${wallpaper})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)', display: 'flex', flexDirection: 'column' }}>
                <Routes>
                  <Route path="/*" element={
                    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                      <AnimatePresence mode="wait">
                        <Routes>
                          <Route path="/" element={<IpadHome />} />
                          <Route path="/*" element={<IpadAppLayout />} />
                        </Routes>
                      </AnimatePresence>
                      
                      {/* BOTÃO HOME FÍSICO NO CANTO INFERIOR ESQUERDO */}
                      <HomeButtonOverlay />
                    </div>
                  } />
                </Routes>
              </div>
            </div>

            {/* Barra inferior de gestos */}
            <div style={{ height: 18, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{ width: 130, height: 4, background: 'rgba(255,255,255,0.4)', borderRadius: 2 }}></div>
            </div>

          </div>
        </div>
      </Router>
    </DiscordAuthWrapper>
  );
}

// Componente auxiliar para o botão Home físico flutuante no canto inferior esquerdo
function HomeButtonOverlay() {
  const navigate = useNavigate();
  return (
    <div 
      onClick={() => navigate('/')}
      style={{
        position: 'absolute',
        bottom: '25px',
        left: '25px',
        width: '45px',
        height: '45px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(60,60,60,0.8), rgba(30,30,30,0.9))',
        border: '1.5px solid rgba(255,255,255,0.25)',
        boxShadow: '0 6px 15px rgba(0,0,0,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 9999,
        transition: 'transform 0.15s ease, background 0.15s ease'
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <div style={{
        width: '18px',
        height: '18px',
        borderRadius: '4px',
        border: '1.5px solid rgba(255,255,255,0.6)'
      }} />
    </div>
  );
}

export default App;