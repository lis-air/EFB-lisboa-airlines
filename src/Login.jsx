import React, { useEffect, useState } from 'react';
import { ShieldAlert, LogIn, CheckCircle2 } from 'lucide-react';

const CLIENT_ID = '1536408790264582194';
const SERVER_ID = '1473634134579478701';
// Link oficial da Vercel fixo aqui para evitar erros de localhost
const REDIRECT_URI = 'https://efb-lisboa-airlines.vercel.app/';

export default function Login({ onAuthSuccess }) {
  const [status, setStatus] = useState('idle'); // idle, loading, error, success
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    // Check if returning from Discord OAuth
    const hash = window.location.hash;
    if (hash && hash.includes('access_token')) {
      setStatus('loading');
      const urlParams = new URLSearchParams(hash.substring(1));
      const accessToken = urlParams.get('access_token');

      if (accessToken) {
        verifyGuild(accessToken);
      } else {
        setStatus('error');
        setErrorMsg('Failed to parse access token.');
      }
    }
  }, []);

  const verifyGuild = async (token) => {
    try {
      const response = await fetch('https://discord.com/api/users/@me/guilds', {
        headers: {
          authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch Discord servers.');
      }

      const guilds = await response.json();
      const isMember = guilds.some(g => g.id === SERVER_ID);

      if (isMember) {
        localStorage.setItem('discord_token', token);
        setStatus('success');
        if (onAuthSuccess) onAuthSuccess();
        window.location.reload(); // Refresh to load app
      } else {
        throw new Error('You are not a member of the required server.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message);
    }
  };

  const handleLogin = () => {
    const scope = 'identify guilds';
    const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=token&scope=${encodeURIComponent(scope)}`;
    window.location.href = authUrl;
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      background: '#0d1117',
      color: '#fff',
      fontFamily: "'Inter', sans-serif"
    }}>
      <div style={{
        background: '#161b22',
        padding: '40px',
        borderRadius: '12px',
        border: '1px solid rgba(255,255,255,0.1)',
        textAlign: 'center',
        width: '350px'
      }}>
        <h2 style={{ marginBottom: '20px' }}>Lisboa Airlines EFB</h2>
        
        {status === 'idle' && (
          <button 
            onClick={handleLogin}
            style={{
              background: '#5865F2',
              color: '#fff',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              margin: '0 auto'
            }}
          >
            <LogIn size={18} /> Autenticar com Discord
          </button>
        )}

        {status === 'loading' && <p>A verificar acesso...</p>}
        
        {status === 'error' && (
          <div style={{ color: '#ff4d4d' }}>
            <ShieldAlert style={{ marginBottom: '10px' }} />
            <p>{errorMsg}</p>
            <button onClick={() => window.location.reload()} style={{ marginTop: '10px', background: 'transparent', color: '#fff', border: '1px solid #fff', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>
              Tentar novamente
            </button>
          </div>
        )}
      </div>
    </div>
  );
}