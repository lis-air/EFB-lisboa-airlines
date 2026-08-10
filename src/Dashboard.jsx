import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, Map, Settings, FileText, CheckSquare, Cloud, MapPin, PlaneTakeoff, PlaneLanding } from 'lucide-react';

function Dashboard() {
  const getChartsProvider = () => {
    const provider = localStorage.getItem('chartsProvider') || 'Navigraph Charts (Web)';
    if (provider === 'ChartFox (Web)') return { name: 'ChartFox', path: 'https://chartfox.org' };
    if (provider === 'MSFS24 Lido (Web)') return { name: 'Lido Charts', path: 'https://www.lido.com' };
    return { name: 'Navigraph Charts', path: 'https://charts.navigraph.com' };
  };

  const charts = getChartsProvider();

  const apps = [
    { name: 'eFlight Manager', icon: <Plane size={36} />, path: 'https://www.simbrief.com', external: true },
    { name: charts.name, icon: <Map size={36} />, path: charts.path, external: true },
    { name: 'Parkings', icon: <MapPin size={36} />, path: '/parkings' },
    { name: 'Weather', icon: <Cloud size={36} />, path: '/weather' },
    { name: 'FlightSmart+ Takeoff', icon: <PlaneTakeoff size={36} />, path: '/performance-takeoff' },
    { name: 'FlightSmart+ Landing', icon: <PlaneLanding size={36} />, path: '/performance-landing' },
    { name: 'DocuNet Viewer', icon: <FileText size={36} />, path: '/docs' },
    { name: 'Checklists', icon: <CheckSquare size={36} />, path: '/checklists' },
    { name: 'Settings', icon: <Settings size={36} />, path: '/settings' },
  ];

  return (
    <div className="dashboard-view">
      <img src="/lsa_logo.png" alt="Lisboa Airlines" style={{ height: '120px', marginBottom: '20px', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))' }} onError={(e) => { e.target.style.display = 'none'; }} />
      <h1 style={{ marginBottom: '40px', fontWeight: '300', letterSpacing: '2px', color: 'var(--vivid-cyan)' }}>FLIGHT OPERATIONS CENTER</h1>
      
      <div className="dashboard-grid">
        {apps.map((app, index) => {
          const content = (
            <>
              <div className="icon-wrapper">
                {app.icon}
              </div>
              <span>{app.name}</span>
            </>
          );
          
          return app.external ? (
            <button key={index} onClick={() => window.open(app.path, '_blank', 'width=1280,height=800,noopener,noreferrer')} className="liquid-btn" style={{ border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
              {content}
            </button>
          ) : (
            <Link key={index} to={app.path} className="liquid-btn" style={{ textDecoration: 'none' }}>
              {content}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Dashboard;
