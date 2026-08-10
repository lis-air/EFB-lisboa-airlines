import React, { useEffect, useState } from 'react';
import { ShieldAlert, LogIn, Loader2, CheckCircle2 } from 'lucide-react';

const CLIENT_ID = '1536408790264582194';
const SERVER_ID = '1473634134579478701';

function Login({ onAuthSuccess }) {
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
      const inServer = guilds.some(guild => guild.id === SERVER_ID);

      if (inServer) {
        setStatus('success');
        setTimeout(() => {
          onAuthSuccess();
        }, 1500);
      } else {
        setStatus('error');
        setErrorMsg('Access Denied: You are not a member of the Lisboa Airlines Discord server.');
        // Clean URL so they can try again
        window.history.replaceState(null, null, ' ');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMsg('An error occurred while verifying your Discord account.');
      window.history.replaceState(null, null, ' ');
    }
  };

  const handleLogin = () => {
    // Ensuring the trailing slash is present to match the Discord portal exactly
    const redirectUri = encodeURIComponent('https://efb-lisboa-airlines.vercel.app/');
    const oauthUrl = `https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${redirectUri}&scope=identify+guilds`;
    window.location.href = oauthUrl;
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', background: 'radial-gradient(ellipse at 50% -20%, rgba(45, 198, 106, 0.15) 0%, #080808 60%)' }}>
      <div className="glass-panel" style={{ padding: '50px', textAlign: 'center', maxWidth: '450px', width: '90%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        <img src="/lsa_logo.png" alt="LSA Logo" style={{ width: '120px', height: '120px', borderRadius: '50%', marginBottom: '20px', boxShadow: '0 0 20px rgba(0, 243, 255, 0.3)' }} onError={(e) => { e.target.src = 'https://placehold.co/120x120/0A5A30/FFF?text=LSA' }} />
        
        <h1 style={{ color: 'var(--brand-highlight)', marginBottom: '10px' }}>Lisboa Airlines EFB</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', lineHeight: '1.5' }}>
          Authentication required. You must be a member of the official Discord server to access the Electronic Flight Bag.
        </p>

        {status === 'idle' && (
          <button 
            onClick={handleLogin}
            className="liquid-btn"
            style={{ width: '100%', padding: '15px 20px', borderRadius: '8px', fontSize: '1.1rem', gap: '10px', flexDirection: 'row' }}
          >
            <LogIn size={20} /> Login with Discord
          </button>
        )}

        {status === 'loading' && (
          <div style={{ color: 'var(--vivid-cyan)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
            <Loader2 size={32} className="spin" />
            <span>Verifying Discord Server Membership...</span>
          </div>
        )}

        {status === 'success' && (
          <div style={{ color: '#00FF88', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', animation: 'fadeIn 0.5s ease' }}>
            <CheckCircle2 size={48} />
            <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Authentication Successful!</span>
            <span style={{ color: 'var(--text-secondary)' }}>Loading EFB...</span>
          </div>
        )}

        {status === 'error' && (
          <div style={{ color: '#ff4444', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', background: 'rgba(255, 68, 68, 0.1)', padding: '20px', borderRadius: '8px', border: '1px solid rgba(255, 68, 68, 0.3)' }}>
            <ShieldAlert size={32} />
            <span style={{ fontWeight: 'bold' }}>{errorMsg}</span>
            <button 
              onClick={() => setStatus('idle')}
              style={{ marginTop: '10px', padding: '8px 16px', background: 'transparent', border: '1px solid #ff4444', color: '#ff4444', borderRadius: '4px', cursor: 'pointer' }}
            >
              Try Again
            </button>
          </div>
        )}

      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .spin { animation: spin 1s linear infinite; }
      `}} />
    </div>
  );
}

export default Login;
