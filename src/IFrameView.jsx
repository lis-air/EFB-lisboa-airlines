import React from 'react';

function IFrameView({ url, title }) {
  return (
    <div className="view-container" style={{ padding: '20px' }}>
      <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '15px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)' }}>
          <h2 style={{ fontSize: '1.2rem', margin: 0 }}>{title}</h2>
        </div>
        <div style={{ flex: 1, position: 'relative' }}>
          <iframe 
            src={url} 
            title={title}
            className="iframe-wrapper"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none', background: '#fff' }}
          />
          <div style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(0,0,0,0.7)', padding: '5px 10px', borderRadius: '4px', fontSize: '0.8rem' }}>
             <a href={url} target="_blank" rel="noreferrer" style={{ color: 'var(--vivid-cyan)' }}>Open in new tab</a> if blocked.
          </div>
        </div>
      </div>
    </div>
  );
}

export default IFrameView;
