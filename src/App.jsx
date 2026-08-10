import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { Settings as SettingsIcon, FileText, CheckSquare, Home } from 'lucide-react';
import Dashboard from './Dashboard';
import Weather from './Weather';
import IFrameView from './IFrameView';
import Docs from './Docs';
import Checklist from './Checklist';
import Parkings from './Parkings';
import Performance from './Performance';
import Settings from './Settings';

// ------------------------------------------------------------------
// CONFIGURAÇÕES DO DISCORD
// ------------------------------------------------------------------
const CLIENT_ID = "1536408790264582194"; // O teu ID da App
const GUILD_ID_REQUERIDO = "1473634134579478701"; // O teu ID do Servidor

// NOTA: Se o teu terminal abrir na porta 5174, muda aqui abaixo e no Discord Portal
const REDIRECT_URI_STRING = "http://localhost:5173/"; 
const REDIRECT_URI = encodeURIComponent(REDIRECT_URI_STRING); 
const DISCORD_AUTH_URL = `https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=identify%20guilds`;

// ------------------------------------------------------------------
// COMPONENTE DE AUTENTICAÇÃO
// ------------------------------------------------------------------
function DiscordAuthWrapper({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const hash = window.location.hash;
    let token = localStorage.getItem('discord_token');

    // Capturar token do URL após voltar do Discord
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

        // Verificar se a pessoa está no teu servidor
        const isMember = userGuilds.some(guild => guild.id === GUILD_ID_REQUERIDO);

        if (isMember) {
          setUser(userData);
        } else {
          setError('Acesso Negado: Precisas de pertencer ao servidor da Lisboa Airlines no Discord para aceder ao EFB.');
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

  if (loading) {
    return (
      <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', background: '#121212', color: '#fff' }}>
        <h2>A verificar comunicação com o Discord...</h2>
      </div>
    );
  }

  // Ecrã de Login
  if (!user) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'center', alignItems: 'center', background: '#0e0e10', color: '#fff', fontFamily: 'sans-serif' }}>
        <img src="/lsa_logo.png" alt="LSA Logo" style={{ width: 120, marginBottom: 20 }} onError={(e) => { e.target.src = 'https://placehold.co/120x120/0A5A30/FFF?text=LSA' }} />
        <h1 style={{ marginBottom: 10 }}>Lisboa Airlines EFB</h1>
        <p style={{ color: '#aaa', marginBottom: 30 }}>Acesso restrito a membros da tripulação.</p>
        
        {error && <p style={{ color: '#ff4d4d', backgroundColor: 'rgba(255, 77, 77, 0.1)', padding: '12px 20px', borderRadius: 8, border: '1px solid #ff4d4d', marginBottom: 20, textAlign: 'center', maxWidth: 400 }}>{error}</p>}

        <a 
          href={DISCORD_AUTH_URL} 
          style={{ backgroundColor: '#5865F2', color: '#fff', padding: '14px 28px', borderRadius: 8, textDecoration: 'none', fontWeight: 'bold', fontSize: 16, transition: 'background 0.2s' }}
        >
          Autenticar com Discord
        </a>
      </div>
    );
  }

  // Se o login for válido, carrega a App com o botão de Logout no topo
  return (
    <>
      <div style={{ position: 'fixed', top: 15, right: 20, zIndex: 9999, display: 'flex', alignItems: 'center', gap: 15, background: 'rgba(0,0,0,0.7)', padding: '8px 16px', borderRadius: 20, color: '#fff', fontSize: 14, border: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <img src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`} alt="Avatar" style={{ width: 24, height: 24, borderRadius: '50%' }} onError={(e) => e.target.style.display = 'none'} />
          <span><b>{user.global_name || user.username}</b></span>
        </div>
        <button onClick={handleLogout} style={{ background: '#ff4d4d', border: 'none', color: '#fff', borderRadius: 4, padding: '4px 10px', cursor: 'pointer', fontWeight: 'bold' }}>Sair</button>
      </div>
      {children}
    </>
  );
}

// ------------------------------------------------------------------
// APLICAÇÃO PRINCIPAL (APP)
// ------------------------------------------------------------------
function App() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toISOString().substr(11, 8) + ' Z';
  };

  return (
    <DiscordAuthWrapper>
      <Router>
        <div className="app-container">
          {/* Sidebar */}
          <div className="sidebar">
            <img src="/lsa_logo.png" alt="LSA Logo" className="logo" onError={(e) => { e.target.src = 'https://placehold.co/100x100/0A5A30/FFF?text=LSA' }} />

            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <Home /> <span>Dashboard</span>
            </NavLink>
            <NavLink to="/docs" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <FileText /> <span>Documents</span>
            </NavLink>
            <NavLink to="/checklists" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <CheckSquare /> <span>Checklists</span>
            </NavLink>
            <div style={{flex: 1}}></div>
            <NavLink to="/settings" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
              <SettingsIcon size={24} /> <span>Settings</span>
            </NavLink>
          </div>

          {/* Main Content */}
          <div className="main-content">
            <div className="top-header">
              <div className="header-title">Lisboa Airlines EFB v1.0</div>
              <div className="clock">{formatTime(time)}</div>
            </div>

            <div className="view-container">
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
        </div>
      </Router>
    </DiscordAuthWrapper>
  );
}

export default App;