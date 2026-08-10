import React, { useState } from 'react';
import { MapPin, Bookmark } from 'lucide-react';

function Parkings() {
  const [activeTab, setActiveTab] = useState('Lisboa (LIS)');

  const parkingData = {
    'Lisboa (LIS)': [
      '225', '224', '223', '222', '221', 
      '801', '802', '803', '804', '805', '806',
      '504', '503', '502', '501',
      '125', '124', '123', '122', '121', '120', '119', '118', '117', '116', '115', '114'
    ],
    'Porto (OPO)': [
      'S36', 'S35', 'S34', 'S33', 'S32', 'S31', 'S30', 'S29', 'S28', 'S27', 'S26', 
      'S25', 'S24', 'S23', 'S22', 'S21', 'S20'
    ]
  };

  return (
    <div className="view-container" style={{ padding: '20px', display: 'flex', gap: '20px', height: '100%', boxSizing: 'border-box' }}>
      
      {/* Sidebar Topics */}
      <div className="glass-panel" style={{ width: '280px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <h2 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px', margin: 0 }}>
            <MapPin size={20} color="var(--vivid-cyan)" /> Parkings
          </h2>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
          {Object.keys(parkingData).map((airport) => (
            <button
              key={airport}
              onClick={() => setActiveTab(airport)}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '12px 15px',
                background: activeTab === airport ? 'rgba(0, 243, 255, 0.15)' : 'transparent',
                border: 'none',
                borderLeft: activeTab === airport ? '3px solid var(--vivid-cyan)' : '3px solid transparent',
                color: activeTab === airport ? 'var(--vivid-cyan)' : 'var(--text-secondary)',
                cursor: 'pointer',
                marginBottom: '5px',
                borderRadius: '0 8px 8px 0',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontWeight: activeTab === airport ? '600' : '400',
                fontFamily: 'inherit'
              }}
            >
              <Bookmark size={16} /> {airport}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="glass-panel" style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ marginBottom: '20px', color: 'var(--brand-highlight)', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '15px' }}>{activeTab} Company Stands</h1>
        
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'rgba(0,0,0,0.4)', color: 'var(--vivid-cyan)' }}>
              <th style={{ padding: '15px', borderBottom: '2px solid var(--vivid-cyan)' }}>Companhia Aérea</th>
              <th style={{ padding: '15px', borderBottom: '2px solid var(--vivid-cyan)' }}>Aeroporto</th>
              <th style={{ padding: '15px', borderBottom: '2px solid var(--vivid-cyan)' }}>Stand</th>
              <th style={{ padding: '15px', borderBottom: '2px solid var(--vivid-cyan)' }}>Observações</th>
            </tr>
          </thead>
          <tbody>
            {parkingData[activeTab].map((stand, index) => (
              <tr key={index} style={{ background: index % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '15px' }}>Lisboa Airlines</td>
                <td style={{ padding: '15px' }}>{activeTab}</td>
                <td style={{ padding: '15px', fontWeight: 'bold', color: '#fff' }}>{stand}</td>
                <td style={{ padding: '15px', color: 'rgba(255,255,255,0.5)' }}>-</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Parkings;
