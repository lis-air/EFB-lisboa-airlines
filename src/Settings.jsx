import React, { useState, useEffect } from 'react';
import { Save, Check, Trash2, AlertCircle } from 'lucide-react';

export default function Settings() {
  const [simbriefUser, setSimbriefUser] = useState('');
  const [selectedChart, setSelectedChart] = useState('navigraph');
  const [selectedBg, setSelectedBg] = useState('classic');
  
  const [initialState, setInitialState] = useState({
    simbriefUser: '',
    selectedChart: 'navigraph',
    selectedBg: 'classic'
  });

  const [hasChanges, setHasChanges] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('simbrief_username') || '';
    const savedChart = localStorage.getItem('charts_provider') || 'navigraph';
    const savedBg = localStorage.getItem('home_background') || 'classic';

    setSimbriefUser(savedUser);
    setSelectedChart(savedChart);
    setSelectedBg(savedBg);

    setInitialState({
      simbriefUser: savedUser,
      selectedChart: savedChart,
      selectedBg: savedBg
    });
  }, []);

  // Detetar se houve alterações face ao estado guardado
  useEffect(() => {
    const changed = 
      simbriefUser !== initialState.simbriefUser ||
      selectedChart !== initialState.selectedChart ||
      selectedBg !== initialState.selectedBg;
    
    setHasChanges(changed);
  }, [simbriefUser, selectedChart, selectedBg, initialState]);

  const handleSave = () => {
    localStorage.setItem('simbrief_username', simbriefUser.trim());
    localStorage.setItem('charts_provider', selectedChart);
    localStorage.setItem('home_background', selectedBg);

    setInitialState({
      simbriefUser: simbriefUser.trim(),
      selectedChart,
      selectedBg
    });
    
    setHasChanges(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Tens a certeza que pretendes reiniciar o EFB? Todos os dados locais serão apagados.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, color: '#fff', fontFamily: "'Inter', sans-serif", paddingBottom: 40, position: 'relative' }}>
      
      {/* Cabeçalho */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Settings</h2>
          <p style={{ fontSize: 14, color: '#888', marginTop: 4 }}>Manage your EFB preferences</p>
        </div>

        {/* Alerta / Botão de Save dinâmico no TOPO */}
        {hasChanges && (
          <div style={{ background: 'rgba(19, 135, 75, 0.15)', border: '1px solid #13874B', padding: '10px 18px', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 12, animation: 'fadeIn 0.2s ease-in-out' }}>
            <span style={{ fontSize: 13, color: '#4ade80', fontWeight: 600 }}>You have unsaved changes</span>
            <button 
              onClick={handleSave}
              style={{ background: '#13874B', border: 'none', color: '#fff', padding: '8px 16px', borderRadius: 8, fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}
            >
              <Save size={15} /> Save Changes
            </button>
          </div>
        )}

        {success && !hasChanges && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#4ade80', fontSize: 14, fontWeight: 600 }}>
            <Check size={18} /> Definições guardadas com sucesso!
          </div>
        )}
      </div>

      {/* SimBrief Username */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: 20, borderRadius: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <label style={{ fontSize: 14, fontWeight: 600 }}>SimBrief</label>
        <span style={{ fontSize: 12, color: '#888' }}>Your SimBrief username for flight plan downloads.</span>
        <input 
          type="text" 
          value={simbriefUser} 
          onChange={(e) => setSimbriefUser(e.target.value)}
          placeholder="Insere o teu username do SimBrief"
          style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', padding: '12px 16px', borderRadius: 8, color: '#fff', fontSize: 14, outline: 'none' }}
        />
      </div>

      {/* Charts Provider */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: 20, borderRadius: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <label style={{ fontSize: 14, fontWeight: 600 }}>Charts</label>
        <span style={{ fontSize: 12, color: '#888' }}>Choose your preferred charts provider.</span>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { id: 'navigraph', label: 'Navigraph Charts (Web)' },
            { id: 'msfs24', label: 'MSFS24 Lido (Web)' },
            { id: 'chartfox', label: 'ChartFox (Web)' }
          ].map((item) => (
            <div 
              key={item.id}
              onClick={() => setSelectedChart(item.id)}
              style={{ 
                padding: '12px 16px', 
                background: selectedChart === item.id ? 'rgba(19, 135, 75, 0.15)' : 'rgba(0,0,0,0.4)', 
                border: `1px solid ${selectedChart === item.id ? '#13874B' : 'rgba(255,255,255,0.1)'}`, 
                borderRadius: 8, 
                cursor: 'pointer',
                fontWeight: selectedChart === item.id ? '600' : 'normal',
                color: selectedChart === item.id ? '#4ade80' : '#fff',
                transition: 'all 0.2s'
              }}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>

      {/* Home Screen Background */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: 20, borderRadius: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <label style={{ fontSize: 14, fontWeight: 600 }}>Home screen background</label>
        <span style={{ fontSize: 12, color: '#888' }}>Choose the wallpaper for your home screen from the official options below.</span>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15 }}>
          {[
            { id: 'classic', label: 'Lisboa Classic' },
            { id: 'logo', label: 'Lisboa Logo' }
          ].map((bg) => (
            <div 
              key={bg.id}
              onClick={() => setSelectedBg(bg.id)}
              style={{ 
                border: `2px solid ${selectedBg === bg.id ? '#13874B' : 'rgba(255,255,255,0.1)'}`, 
                borderRadius: 10, 
                padding: 10, 
                cursor: 'pointer',
                background: 'rgba(0,0,0,0.4)',
                textAlign: 'center'
              }}
            >
              <div style={{ height: 90, background: '#111', borderRadius: 6, marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', fontSize: 12 }}>
                {bg.label}
              </div>
              <span style={{ fontSize: 13, fontWeight: selectedBg === bg.id ? 'bold' : 'normal' }}>{bg.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reset EFB */}
      <div style={{ background: 'rgba(255,77,77,0.05)', border: '1px solid rgba(255,77,77,0.2)', padding: 20, borderRadius: 14, display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10 }}>
        <label style={{ fontSize: 14, fontWeight: 600, color: '#ff4d4d' }}>Reset EFB</label>
        <span style={{ fontSize: 12, color: '#888' }}>Clears all local data and reloads the app.</span>
        <button 
          onClick={handleReset}
          style={{ background: 'transparent', border: '1px solid #ff4d4d', color: '#ff4d4d', padding: '10px 18px', borderRadius: 8, fontWeight: 'bold', cursor: 'pointer', width: 'fit-content', display: 'flex', alignItems: 'center', gap: 6 }}
        >
          <Trash2 size={16} /> Reset App Data
        </button>
      </div>

    </div>
  );
}