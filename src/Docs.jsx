import React, { useState } from 'react';
import { BookOpen, AlertCircle, Bookmark, FileText } from 'lucide-react';

function Docs() {
  const [activeTab, setActiveTab] = useState('Standard Operating Procedures (SOP)');

  const docs = [
    { name: 'Standard Operating Procedures (SOP)', file: '/FOM.pdf' }
  ];

  return (
    <div className="view-container" style={{ padding: '20px', display: 'flex', gap: '20px' }}>
      
      {/* Sidebar Topics */}
      <div className="glass-panel" style={{ width: '280px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <h2 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <BookOpen size={20} color="var(--vivid-cyan)" /> DocuNet Viewer
          </h2>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
          {docs.map((doc) => (
            <button
              key={doc.name}
              onClick={() => setActiveTab(doc.name)}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '12px 15px',
                background: activeTab === doc.name ? 'rgba(0, 243, 255, 0.15)' : 'transparent',
                border: 'none',
                borderLeft: activeTab === doc.name ? '3px solid var(--vivid-cyan)' : '3px solid transparent',
                color: activeTab === doc.name ? 'var(--vivid-cyan)' : 'var(--text-secondary)',
                cursor: 'pointer',
                marginBottom: '5px',
                borderRadius: '0 8px 8px 0',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontWeight: activeTab === doc.name ? '600' : '400'
              }}
            >
              <FileText size={16} /> {doc.name}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="glass-panel" style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '15px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)' }}>
          <h2 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--brand-highlight)' }}>{activeTab}</h2>
        </div>
        <div style={{ flex: 1, width: '100%', height: '100%', padding: 0, margin: 0 }}>
          {activeTab === 'Standard Operating Procedures (SOP)' ? (
             <iframe src="/FOM.pdf#view=FitH&toolbar=0&navpanes=0" style={{ width: '100%', height: '100%', border: 'none', display: 'block' }} title="SOP PDF" />
          ) : (
             <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', overflowY: 'auto' }}>
                <img src="/a320_checklist.png" alt="Checklist" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
             </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Docs;
