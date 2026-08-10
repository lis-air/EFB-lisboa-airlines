  import React, { useState } from 'react';
import { CheckSquare, Bookmark } from 'lucide-react';
import './Checklist.css';

function Checklist() {
  const [activeTab, setActiveTab] = useState('A320 Family');

  const families = ['A320 Family', 'Boeing 737 Family', 'A350 Family', 'A330 Family'];

  return (
    <div className="view-container" style={{ padding: '20px', display: 'flex', gap: '20px' }}>
      
      {/* Sidebar Topics */}
      <div className="glass-panel" style={{ width: '280px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <h2 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CheckSquare size={20} color="var(--vivid-cyan)" /> Checklists
          </h2>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
          {families.map((family) => (
            <button
              key={family}
              onClick={() => setActiveTab(family)}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '12px 15px',
                background: activeTab === family ? 'rgba(0, 243, 255, 0.15)' : 'transparent',
                border: 'none',
                borderLeft: activeTab === family ? '3px solid var(--vivid-cyan)' : '3px solid transparent',
                color: activeTab === family ? 'var(--vivid-cyan)' : 'var(--text-secondary)',
                cursor: 'pointer',
                marginBottom: '5px',
                borderRadius: '0 8px 8px 0',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontWeight: activeTab === family ? '600' : '400'
              }}
            >
              <Bookmark size={16} /> {family}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="glass-panel" style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
        
        {activeTab === 'A320 Family' ? (
          <div className="checklist-paper">
            {/* Header */}
            <div className="cl-header">
              <div className="cl-logo-container">
                <img src="/lsa_logo.png" alt="LSA Logo" className="cl-logo" onError={(e) => e.target.style.display = 'none'} />
              </div>
              <div className="cl-title-box">
                <div className="cl-ac-type">A320<br/>FAM</div>
                <div className="cl-main-title">NORMAL CHECKLIST</div>
                <div className="cl-version">NCL 1/2</div>
              </div>
            </div>

            <div className="cl-body">
              {/* LEFT COLUMN */}
              <div className="cl-column">
                
                {/* COCKPIT PREPARATION */}
                <div className="cl-section">
                  <div className="cl-section-title">COCKPIT PREPARATION</div>
                  <div className="cl-item"><span>GEAR PINS & COVERS</span><span className="cl-dots"></span><span>REMOVED</span></div>
                  <div className="cl-item"><span>FUEL QUANTITY</span><span className="cl-dots"></span><span>__________</span></div>
                  <div className="cl-item"><span>SEAT BELTS</span><span className="cl-dots"></span><span>ON</span></div>
                  <div className="cl-item"><span>ADIRS</span><span className="cl-dots"></span><span>NAV</span></div>
                  <div className="cl-item"><span>BARO REF</span><span className="cl-dots"></span><span>QNH______,______FT (BOTH)</span></div>
                </div>

                {/* BEFORE START */}
                <div className="cl-section">
                  <div className="cl-section-title">BEFORE START</div>
                  <div className="cl-item"><span>PARKING BRAKE</span><span className="cl-dots"></span><span>__________</span></div>
                  <div className="cl-item"><span>T.O SPEEDS & THRUST</span><span className="cl-dots"></span><span>________(BOTH)</span></div>
                  <div className="cl-item"><span>WINDOWS</span><span className="cl-dots"></span><span>CLOSED (BOTH)</span></div>
                  <div className="cl-item"><span>BEACON</span><span className="cl-dots"></span><span>ON</span></div>
                </div>

                {/* AFTER START */}
                <div className="cl-section">
                  <div className="cl-section-title">AFTER START</div>
                  <div className="cl-item"><span>ANTI ICE</span><span className="cl-dots"></span><span>__________</span></div>
                  <div className="cl-item"><span>ECAM STATUS</span><span className="cl-dots"></span><span>CHECKED</span></div>
                  <div className="cl-item"><span>PITCH TRIM</span><span className="cl-dots"></span><span>__________</span></div>
                  <div className="cl-item"><span>RUDDER TRIM</span><span className="cl-dots"></span><span>NEUTRAL</span></div>
                  <div className="cl-item"><span>CLEAR SIGNAL & LIGHTS</span><span className="cl-dots"></span><span>RCVD & ON</span></div>
                </div>

                {/* TAXI */}
                <div className="cl-section">
                  <div className="cl-section-title">TAXI</div>
                  <div className="cl-item"><span>FLIGHT CONTROLS</span><span className="cl-dots"></span><span>CHECKED (BOTH)</span></div>
                  <div className="cl-item"><span>FLAPS SETTING</span><span className="cl-dots"></span><span>CONF ____ (BOTH)</span></div>
                  <div className="cl-item"><span>RADAR & PRED W/S</span><span className="cl-dots"></span><span>ON & AUTO</span></div>
                  <div className="cl-item"><span>ECAM MEMO</span><span className="cl-dots"></span><span>T.O NO BLUE</span></div>
                  <div className="cl-subitems">
                    <div>• AUTO BRK MAX</div>
                    <div>• SEAT BELTS ON</div>
                    <div>• SPLRS ARM</div>
                    <div>• FLAPS T.O</div>
                    <div>• T.O CONFIG NORMAL</div>
                  </div>
                  <div className="cl-item"><span>CABIN</span><span className="cl-dots"></span><span>READY</span></div>
                </div>
                
                {/* DEPARTURE CHANGE */}
                <div className="cl-section">
                  <div className="cl-section-title">DEPARTURE CHANGE</div>
                  <div className="cl-item"><span>RWY & SID</span><span className="cl-dots"></span><span>__________</span></div>
                  <div className="cl-item"><span>FLAPS SETTING</span><span className="cl-dots"></span><span>CONF ____ (BOTH)</span></div>
                  <div className="cl-item"><span>T.O SPEEDS & THRUST</span><span className="cl-dots"></span><span>________(BOTH)</span></div>
                  <div className="cl-item"><span>FCU ALT</span><span className="cl-dots"></span><span>__________</span></div>
                </div>

              </div>

              {/* RIGHT COLUMN */}
              <div className="cl-column">
                
                {/* APPROACH */}
                <div className="cl-section">
                  <div className="cl-section-title">APPROACH</div>
                  <div className="cl-item"><span>BARO REF</span><span className="cl-dots"></span><span>QNH______(BOTH)</span></div>
                  <div className="cl-item"><span>SEAT BELTS</span><span className="cl-dots"></span><span>ON</span></div>
                  <div className="cl-item"><span>MINIMUM</span><span className="cl-dots"></span><span>__________</span></div>
                  <div className="cl-item"><span>RWY COND</span><span className="cl-dots"></span><span>__________</span></div>
                  <div className="cl-item"><span>AUTO BRAKE</span><span className="cl-dots"></span><span>__________</span></div>
                </div>

                {/* LANDING */}
                <div className="cl-section">
                  <div className="cl-section-title">LANDING</div>
                  <div className="cl-item"><span>ECAM MEMO</span><span className="cl-dots"></span><span>LDG NO BLUE</span></div>
                  <div className="cl-subitems">
                    <div>• LDG GEAR DN</div>
                    <div>• SEAT BELTS ON</div>
                    <div>• SPLRS ARM</div>
                    <div>• FLAPS FULL or CONF 3</div>
                  </div>
                  <div className="cl-item"><span>CABIN</span><span className="cl-dots"></span><span>READY</span></div>
                </div>

                {/* AFTER LANDING */}
                <div className="cl-section">
                  <div className="cl-section-title">AFTER LANDING</div>
                  <div className="cl-item"><span>RADAR & PRED W/S</span><span className="cl-dots"></span><span>OFF</span></div>
                </div>

                {/* PARKING */}
                <div className="cl-section">
                  <div className="cl-section-title">PARKING</div>
                  <div className="cl-item"><span>PARK BRK OR CHOCKS</span><span className="cl-dots"></span><span>SET</span></div>
                  <div className="cl-item"><span>ENGINES</span><span className="cl-dots"></span><span>OFF</span></div>
                  <div className="cl-item"><span>FUEL PUMPS</span><span className="cl-dots"></span><span>OFF</span></div>
                  <div className="cl-item"><span>YELLOW ELEC PUMP</span><span className="cl-dots"></span><span>OFF</span></div>
                  <div className="cl-item"><span>AIRCRAFT LOG</span><span className="cl-dots"></span><span>SIGNED</span></div>
                </div>

                {/* SECURING THE AIRCRAFT */}
                <div className="cl-section">
                  <div className="cl-section-title">SECURING THE AIRCRAFT</div>
                  <div className="cl-item"><span>BBAND SYS/ANT</span><span className="cl-dots"></span><span>OFF</span></div>
                  <div className="cl-item"><span>OXYGEN</span><span className="cl-dots"></span><span>OFF</span></div>
                  <div className="cl-item"><span>EMER EXIT LT</span><span className="cl-dots"></span><span>OFF</span></div>
                  <div className="cl-item"><span>BATTERIES</span><span className="cl-dots"></span><span>OFF</span></div>
                </div>
              </div>
            </div>
          </div>
        ) : activeTab === 'Boeing 737 Family' ? (
          <div className="checklist-paper">
            {/* Header */}
            <div className="cl-header">
              <div className="cl-logo-container">
                <img src="/lsa_logo.png" alt="LSA Logo" className="cl-logo" onError={(e) => e.target.style.display = 'none'} />
              </div>
              <div className="cl-title-box">
                <div className="cl-ac-type">B737<br/>FAM</div>
                <div className="cl-main-title">NORMAL CHECKLIST</div>
                <div className="cl-version">NCL 1/2</div>
              </div>
            </div>

            <div className="cl-body">
              {/* LEFT COLUMN */}
              <div className="cl-column">
                
                {/* PREFLIGHT */}
                <div className="cl-section">
                  <div className="cl-section-title">PREFLIGHT</div>
                  <div className="cl-item"><span>Surfaces & Checks</span><span className="cl-dots"></span><span>CHECKED</span></div>
                  <div className="cl-item"><span>Oxygen</span><span className="cl-dots"></span><span>TESTED, 100%</span></div>
                  <div className="cl-item"><span>Battery</span><span className="cl-dots"></span><span>ON</span></div>
                  <div className="cl-item"><span>Window Heat</span><span className="cl-dots"></span><span>ON</span></div>
                  <div className="cl-item"><span>Parking Brake</span><span className="cl-dots"></span><span>SET</span></div>
                </div>

                {/* SECURE (LAST FLIGHT) */}
                <div className="cl-section">
                  <div className="cl-section-title">SECURE (LAST FLIGHT)</div>
                  <div className="cl-item"><span>IRS Mode Selectors</span><span className="cl-dots"></span><span>OFF</span></div>
                  <div className="cl-item"><span>Window Heat</span><span className="cl-dots"></span><span>OFF</span></div>
                  <div className="cl-item"><span>Emergency Exit Lights</span><span className="cl-dots"></span><span>OFF</span></div>
                  <div className="cl-item"><span>Packs</span><span className="cl-dots"></span><span>OFF</span></div>
                  <div className="cl-item"><span>Trim Air</span><span className="cl-dots"></span><span>OFF</span></div>
                  <div className="cl-item"><span>APU / Ground Power</span><span className="cl-dots"></span><span>OFF</span></div>
                  <div className="cl-item"><span>Battery</span><span className="cl-dots"></span><span>OFF</span></div>
                </div>

                {/* LANDING */}
                <div className="cl-section">
                  <div className="cl-section-title">LANDING</div>
                  <div className="cl-item"><span>Engine Start Switches</span><span className="cl-dots"></span><span>CONTINUOUS</span></div>
                  <div className="cl-item"><span>Speedbrake</span><span className="cl-dots"></span><span>ARMED</span></div>
                  <div className="cl-item"><span>Landing Gear</span><span className="cl-dots"></span><span>DOWN</span></div>
                  <div className="cl-item"><span>Flaps __, GREEN LIGHT</span><span className="cl-dots"></span><span>____</span></div>
                </div>

                {/* BEFORE TAXI */}
                <div className="cl-section">
                  <div className="cl-section-title">BEFORE TAXI</div>
                  <div className="cl-item"><span>Generators</span><span className="cl-dots"></span><span>ON</span></div>
                  <div className="cl-item"><span>APU</span><span className="cl-dots"></span><span>OFF</span></div>
                  <div className="cl-item"><span>Engine Start Switches</span><span className="cl-dots"></span><span>CONTINUOUS</span></div>
                  <div className="cl-item"><span>Probe Heat</span><span className="cl-dots"></span><span>ON</span></div>
                  <div className="cl-item"><span>Anti-Ice</span><span className="cl-dots"></span><span>AS RQRD</span></div>
                  <div className="cl-item"><span>Packs & Bleeds</span><span className="cl-dots"></span><span>AS RQRD</span></div>
                  <div className="cl-item"><span>Isolation Valve</span><span className="cl-dots"></span><span>AUTO</span></div>
                  <div className="cl-item"><span>Flaps __ SELECTED, GREEN LIGHT</span><span className="cl-dots"></span><span>____</span></div>
                  <div className="cl-item"><span>Autobrake</span><span className="cl-dots"></span><span>RTO</span></div>
                  <div className="cl-item"><span>Start Levers</span><span className="cl-dots"></span><span>IDLE DETENT</span></div>
                  <div className="cl-item"><span>Flight Controls</span><span className="cl-dots"></span><span>CHECKED</span></div>
                  <div className="cl-item"><span>Recall</span><span className="cl-dots"></span><span>CHECKED</span></div>
                </div>

                {/* BEFORE TAKEOFF */}
                <div className="cl-section">
                  <div className="cl-section-title">BEFORE TAKEOFF</div>
                  <div className="cl-item"><span>Flaps __, GREEN LIGHT</span><span className="cl-dots"></span><span>____</span></div>
                  <div className="cl-item"><span>Stabilizer Trim</span><span className="cl-dots"></span><span>__ UNITS</span></div>
                </div>

                {/* AFTER TAKEOFF */}
                <div className="cl-section">
                  <div className="cl-section-title">AFTER TAKEOFF</div>
                  <div className="cl-item"><span>Packs</span><span className="cl-dots"></span><span>AUTO</span></div>
                  <div className="cl-item"><span>Landing Gear</span><span className="cl-dots"></span><span>UP AND OFF</span></div>
                  <div className="cl-item"><span>Flaps</span><span className="cl-dots"></span><span>UP, NO LIGHTS</span></div>
                </div>

              </div>

              {/* RIGHT COLUMN */}
              <div className="cl-column">
                
                {/* BEFORE START */}
                <div className="cl-section">
                  <div className="cl-section-title">BEFORE START</div>
                  <div className="cl-item"><span>Flight Deck Door</span><span className="cl-dots"></span><span>CLOSED AND LOCKED</span></div>
                  <div className="cl-item"><span>Yaw Damper</span><span className="cl-dots"></span><span>ON</span></div>
                  <div className="cl-item"><span>Fuel __ REQ, __ ONBOARD, PUMPS ON</span><span className="cl-dots"></span><span>____</span></div>
                  <div className="cl-item"><span>Emergency Exit Lights</span><span className="cl-dots"></span><span>ON</span></div>
                  <div className="cl-item"><span>Fasten Belts</span><span className="cl-dots"></span><span>ON</span></div>
                  <div className="cl-item"><span>Packs & Bleeds ON & ON APU</span><span className="cl-dots"></span><span>____</span></div>
                  <div className="cl-item"><span>Speedbrake</span><span className="cl-dots"></span><span>DOWN DETENT</span></div>
                  <div className="cl-item"><span>Parking Brake</span><span className="cl-dots"></span><span>SET</span></div>
                  <div className="cl-item"><span>Rudder & Aileron Trims</span><span className="cl-dots"></span><span>FREE & ZERO</span></div>
                  <div className="cl-item"><span>MCP V2__ HEADING __ ALTITUDE __ SET</span><span className="cl-dots"></span><span>____</span></div>
                  <div className="cl-item"><span>Takeoff Speeds V1__ VR__ V2__</span><span className="cl-dots"></span><span>____</span></div>
                  <div className="cl-item"><span>Takeoff Briefing</span><span className="cl-dots"></span><span>DISCUSSED</span></div>
                  <div className="cl-item"><span>FMC/CDU</span><span className="cl-dots"></span><span>SET</span></div>
                  <div className="cl-item"><span>Stab Trim __ UNITS SET</span><span className="cl-dots"></span><span>____</span></div>
                  <div className="cl-item"><span>Doors</span><span className="cl-dots"></span><span>CLOSED</span></div>
                  <div className="cl-item"><span>ACARS & Company Freq</span><span className="cl-dots"></span><span>STARTED & SET COMM2</span></div>
                  <div className="cl-item"><span>Packs</span><span className="cl-dots"></span><span>OFF</span></div>
                  <div className="cl-item"><span>Anti-Collision Light</span><span className="cl-dots"></span><span>ON</span></div>
                  <div className="cl-item"><span>Parking Brake</span><span className="cl-dots"></span><span>AS RQRD</span></div>
                  <div className="cl-item"><span>Transponder</span><span className="cl-dots"></span><span>ALT ON</span></div>
                </div>

                {/* SHUTDOWN */}
                <div className="cl-section">
                  <div className="cl-section-title">SHUTDOWN</div>
                  <div className="cl-item"><span>Fuel Pumps</span><span className="cl-dots"></span><span>OFF</span></div>
                  <div className="cl-item"><span>Probe Heat</span><span className="cl-dots"></span><span>OFF</span></div>
                  <div className="cl-item"><span>Flaps</span><span className="cl-dots"></span><span>UP NO LIGHTS</span></div>
                  <div className="cl-item"><span>Speedbrake</span><span className="cl-dots"></span><span>DOWN DETENT</span></div>
                  <div className="cl-item"><span>Parking Brake</span><span className="cl-dots"></span><span>SET</span></div>
                  <div className="cl-item"><span>Start Levers</span><span className="cl-dots"></span><span>CUTOFF</span></div>
                  <div className="cl-item"><span>Weather Radar</span><span className="cl-dots"></span><span>OFF</span></div>
                  <div className="cl-item"><span>Autobrake</span><span className="cl-dots"></span><span>OFF</span></div>
                  <div className="cl-item"><span>Electric Hydraulic Pumps</span><span className="cl-dots"></span><span>OFF (if last flight)</span></div>
                  <div className="cl-item"><span>Start Switches</span><span className="cl-dots"></span><span>OFF/AUTO</span></div>
                  <div className="cl-item"><span>Exterior Lights</span><span className="cl-dots"></span><span>NAV ON / BEACON OFF</span></div>
                  <div className="cl-item"><span>Packs & Bleeds</span><span className="cl-dots"></span><span>OFF (if last flight)</span></div>
                  <div className="cl-item"><span>Generators</span><span className="cl-dots"></span><span>APU / EXTERNAL</span></div>
                  <div className="cl-item"><span>Fasten Belts</span><span className="cl-dots"></span><span>OFF</span></div>
                  <div className="cl-item"><span>Anti-Ice</span><span className="cl-dots"></span><span>OFF</span></div>
                  <div className="cl-item"><span>ACARS</span><span className="cl-dots"></span><span>TERMINATE AND LOG FLIGHT</span></div>
                </div>

                {/* DESCENT */}
                <div className="cl-section">
                  <div className="cl-section-title">DESCENT</div>
                  <div className="cl-item"><span>Recall</span><span className="cl-dots"></span><span>CHECKED</span></div>
                  <div className="cl-item"><span>Autobrake</span><span className="cl-dots"></span><span>SELECTED</span></div>
                  <div className="cl-item"><span>Landing Data</span><span className="cl-dots"></span><span>VREF __ MINIMUMS __</span></div>
                  <div className="cl-item"><span>Approach Briefing</span><span className="cl-dots"></span><span>COMPLETED</span></div>
                </div>

                {/* APPROACH */}
                <div className="cl-section">
                  <div className="cl-section-title">APPROACH</div>
                  <div className="cl-item"><span>Altimeters</span><span className="cl-dots"></span><span>__ SET</span></div>
                </div>

              </div>
            </div>
            
            <div style={{ textAlign: 'right', fontWeight: 'bold', fontStyle: 'italic', paddingRight: '20px', paddingBottom: '10px' }}>
              737-800NG
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', marginTop: '100px', color: 'var(--text-secondary)' }}>
             <h3>{activeTab} Checklist Coming Soon...</h3>
             <p>As soon as you provide the reference, I'll digitize it like the others!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Checklist;
