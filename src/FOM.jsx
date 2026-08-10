import React from 'react';

function FOM() {
  const sections = [
    {
      id: "intro",
      title: "1. Introduction",
      content: (
        <>
          <p>This manual has been developed to provide all <strong>Lisboa Airlines</strong> pilots with a clear understanding of the operational policies and procedures that govern their activity within the virtual airline. Currently, Lisboa Airlines is not officially registered on any traditional online flight networks (such as IVAO, VATSIM, or POSCON); however, <strong>we officially operate and will continue to operate using BeyondATC</strong> as our primary air traffic control environment. All Lisboa Airlines pilots are expected to adhere strictly to the Standard Operating Procedures (SOPs) outlined in this document, as well as the rules governing our operations within the BeyondATC platform.</p>
          <p>This manual reflects best practices and operational standards, carefully adapted to ensure consistency and realism within the virtual framework of Lisboa Airlines. In the event of any conflict between this manual and external sources (e.g., real-world aircraft procedures), the procedures outlined by <strong>Lisboa Airlines</strong> shall take precedence for the purposes of our virtual airline operations.</p>
          <p>Welcome to <strong>Lisboa Airlines</strong>! We hope you have a fantastic time flying with us and truly enjoy your experience!</p>
        </>
      )
    },
    {
      id: "policies",
      title: "2. Policies",
      content: (
        <>
          <h3>2.1 Language</h3>
          <p>Lisboa Airlines Virtual Airline is a Portuguese-based virtual airline officially registered at Beyond ATC. While our roots are in Portugal, we operate in a global environment where English is the standard language of aviation. Therefore, all official company communications are conducted in English to ensure clarity and inclusivity for both Portuguese and international members.</p>
          
          <h3>2.2 Pilot Earnings</h3>
          <p>Pilots in our virtual airline earn Euros (€) based on their total flight time, with longer flights resulting in higher rewards. With the introduction of our Progressive Salary System, pilot earnings are now determined by rank, meaning your hourly rate increases as you advance in your career.</p>
          <table className="fom-table">
            <thead>
              <tr><th>Rank (Posto)</th><th>Hours (Horas)</th><th>Salary (Salário)</th></tr>
            </thead>
            <tbody>
              <tr><td>Cadet</td><td>N/A + Self Study & Exam</td><td>N/A €/hr</td></tr>
              <tr><td>Second Officer</td><td>25 hours</td><td>170 €/hr</td></tr>
              <tr><td>Trainee First Officer</td><td>75 hours</td><td>200 €/hr</td></tr>
              <tr><td>First Officer</td><td>150 hours</td><td>220 €/hr</td></tr>
              <tr><td>Senior First Officer</td><td>250 hours</td><td>240 €/hr</td></tr>
              <tr><td>Junior Captain</td><td>450 hours + Exam</td><td>280 €/hr</td></tr>
              <tr><td>Captain</td><td>600 hours</td><td>320 €/hr</td></tr>
              <tr><td>Senior Captain</td><td>900 hours</td><td>360 €/hr</td></tr>
              <tr><td>Line Captain</td><td>1200 hours</td><td>400 €/hr</td></tr>
              <tr><td>Chief Pilot</td><td>Assigned to staff</td><td>450 €/hr</td></tr>
            </tbody>
          </table>

          <h3>2.3 Company Structure</h3>
          <p>Our company is structured to ensure smooth operations and a great experience for all members. At the top of the company is the Chief Executive Officer (CEO), responsible for overseeing the overall management and vision of the airline. Supporting the CEO are key executive positions such as the Chief Operations Officer (COO), who manages the day-to-day activities; the Chief Financial Officer (CFO), who oversees financial planning and reporting; and the Chief Technology Officer (CTO), who ensures the technical infrastructure is maintained and developed. In addition to the Executive Team, we have a specialized Community Department, managed by the Community Manager. This department is responsible for organizing events and handling all membership related matters, ensuring an engaging and well-managed community experience.</p>

          <h3>2.4 Rank Progression</h3>
          <p>Our pilot career path is structured around nine progressive ranks, each designed to recognize your experience and commitment to our VA. Progression through the ranks is based primarily on your total accumulated flight hours. <strong>Some ranks will also require the successful completion of a theoretical and/or practical examination!</strong> To ensure operational knowledge and flying proficiency. Promotions for ranks that do not require exams are processed automatically.</p>

          <h3>2.5 Leave of Absence</h3>
          <p>We understand that real life comes first. Unexpected changes in our life may completely change our plans and availability. Any member of Lisboa Airlines Virtual Airline that cannot comply with the minimum flight requirements is able to request a Leave of Absence (LOA) for up to 2 (two) years, which has to be submitted to a Chief Pilot and approved by ALL Chief Pilots or explain the reason to the staff team.</p>

          <h3>2.6 Retirement</h3>
          <p>No one is forced to work forever, and neither should you! After obtaining the rank of Captain and being employed for at least 24 (twenty-four) months, any Lisboa Airline pilot is able to request retirement. The retirement request has to be approved by all Chief Pilots. Retired pilots will not progress any further in the ranks and are exempt from meeting the minimum flight requirements. Real life on top ;)</p>

          <h3>2.7 Time System</h3>
          <p>All times given are UTC. This includes flight schedules, PIREP times, and Event times. All dates use the dd/mm/yyyy format. Be aware, in Mainland Portugal and Madeira, during winter Local Time = Zulu time but during summer Local Time = Zulu time + 1 hour.</p>

          <h3>2.8 Simulator Settings</h3>
          <p><strong>Simulation Rate:</strong> Pilots are not permitted to use any simulation rate enhancement.</p>
          <p><strong>Crash Detection:</strong> If flying online, pilots must ensure that crash detection is TURNED OFF. This is to avoid unnecessary collisions and subsequent aircraft “crashes” that can be caused due to glitches/bugs, that might disrupt online operations.</p>
          <p><strong>Simulator Pause:</strong> Pilots should never pause their simulators. While they are allowed to do so, any time spent in pause will not count towards their flight hours.</p>

          <h3>2.9 Aircraft Types & Liveries</h3>
          <p>Lisboa Airlines pilots are required to operate the correct aircraft assigned to their booking, as indicated on the Flight Booking page. This policy applies across all supported simulators. We strive to offer official LSA liveries for commonly used aircraft, both freeware. However, due to variations in aircraft availability across platforms, it may not always be possible to provide liveries for every configuration or simulator. Pilots can access available downloads via the Downloads section on the website or discord server.</p>

          <h3>2.10 NOTAMS</h3>
          <p>Lisboa Airlines uses NOTAMs to communicate important operational information that may affect your flight, particularly on online networks. These notices are issued to inform pilots about software or system updates, changes to SOP’s, relevant network-specific NOTAMs, airport closures or restrictions, aircraft specific guidance or temporary limitations. All pilots are expected to check NOTAMs before each flight to stay informed and compliant with current procedures.</p>

          <h3>2.11 Manual PIREP</h3>
          <p>If the ACARS software crashes or fails to log your flight, you may submit a manual PIREP using the provided form. This will create a pending flight that must be approved by staff. Note that the landing rate (FPM) cannot be recorded without ACARS. You may also add any relevant details about your flight in the Remarks field.</p>

          <h3>2.12 Jumpseat</h3>
          <p>At Lisboa Airlines, you can start your flight from any airport by either flying there or purchasing a jumpseat ticket. Jumpseats are free to base airports, while flights to non-base airports cost a base fee of €50 plus €0.05 per nautical mile. A standard jumpseat has a 12-hour cooldown, but you can bypass this restriction by paying an additional €250. Simply enter your destination airport.</p>

          <h3>2.13 Bring a Friend Program</h3>
          <p>Our Bring a Friend Program rewards pilots who invite friends to join our community and take to the skies together. Any active pilot can invite a friend to join LSA. During registration, the new pilot must indicate who invited them in the “Where did you find us?” section. The new pilot must complete at least 10 total flight hours and 5 company flights to be eligible for the reward. Once these requirements are met, either pilot must inform the Membership Department directly to receive the bonus. Both the recruiter and the recruited pilot will then receive a 3000€ bonus.</p>

          <h3>2.14 Last Flown Aircraft Courtesy Rule</h3>
          <p>To promote fairness and respect among pilots, a gentleman’s agreement applies to aircraft usage within the fleet. If an aircraft has been flown within the last 24 hours, it is considered in use by the previous pilot. Other pilots should not operate that aircraft during this period. If you wish to use it, you are encouraged to contact the previous pilot first to confirm availability.</p>
        </>
      )
    },
    {
      id: "sops",
      title: "3. Standard Operating Procedures",
      content: (
        <>
          <h3>3.1 Callsigns</h3>
          <p>When operating under Lisboa Virtual Airline, pilots are encouraged to use the official callsign to ensure consistency and proper representation across all supported networks.</p>
          <p><strong>Authorized Callsigns:</strong><br/>Passenger Flights: Lisboeta<br/>Cargo Flights: Lisboeta<br/>ICAO Code: LSA</p>
          <p>Pilots are free to choose their flight number, and may use any valid callsign, as long as it follows network rules and maintains professional conduct. However, the use of our official Lisboa Airline callsigns is highly recommended to promote company identity and consistency.</p>
          <div className="fom-alert">
            ❗Important: While the use of Lisboa callsigns is highly recommended, codeshare operations are allowed - pilots may use callsigns from other partner airlines.
          </div>

          <h3>3.2 Cost Index</h3>
          <p>To ensure the perfect balance between fuel efficiency, flight time, and overall performance, pilots are required to use the Cost Index given on the OFB when a flight is booked (Cost Index may also be checked on SimBrief).</p>
          <p>SimBrief determines the best cost index for each flight based on the route, aircraft type, payload, and operational conditions. All pilots are expected to use the cost index provided by ACIS during flight planning and FMC setup, unless otherwise specified in a NOTAM or special operational instruction.</p>

          <h3>3.3 Online Network Company Frequency</h3>
          <p>While cruising the virtual skies, you may wish to communicate directly with fellow AIRTAXI pilots. When supported by the online network you’re flying on (such as IVAO or VATSIM), we encourage you to monitor our dedicated company frequency: 131.600 MHz. This frequency is intended for communication between Lisboa members, allowing friendly exchanges & coordination without disrupting public airspace communications. Recommendation: Tune 131.600 MHz on COM2, and leave it on active monitoring throughout your flight.</p>

          <h3>3.4 Stopovers/Diversions</h3>
          <p>All booked flights must be operated from their scheduled departure airport to their designated destination, following an appropriate and coherent flight plan. Stopovers or diversions are only permitted when strictly necessary, in which case the flight will be flagged for staff review and may be approved or denied based on the justification provided.</p>

          <h3>3.5 Aircraft Operations</h3>
          <p>While our fleet is diverse, there are a few common procedures we expect all pilots to follow:</p>
          <ul>
            <li>Landing Lights: ON below 10,000 ft AGL.</li>
            <li>Seatbelts: ON/OFF when climbing or descending through 10,000 ft AGL.</li>
            <li><strong>Packs: Must be set to OFF for takeoff (Airbus family only).</strong></li>
            <li>Landing Configuration: Landings should be performed in Flaps 3 or full depending of the weather configuration when suitable on Airbus family, Flaps 30 configuration on the 737 Family and Flaps 25 configuration on the 777 Family.</li>
            <li>Maximum taxi speed is 30 knots GS, with turns recommended at 13 knots for safe handling.</li>
            <li>Maximum bank angle of 30º during normal operation, never exceeding 45º.</li>
            <li>Descent rate shall never exceed -3000fpm</li>
          </ul>

          <h3>3.6 Command Exam</h3>
          <p>Senior First Officers who have reached 300 total flight hours are eligible to schedule their Command Exam, which is required for promotion to Junior Captain. To book your exam slot, please use the scheduling link: Command Exam Booking. A fee of €5,000 will be applied after each exam attempt.</p>
          
          <h3>3.7 Base Airports</h3>
          <p>Company Stands: Each of our base airports has designated company parking stands reserved for Lisboa operations. Whenever possible, pilots should use these stands as their first choice. If all company stands are occupied, you may park at an alternative stand of your choice.</p>
          
          <p><strong>Destinations:</strong></p>
          <ul style={{ columns: 2 }}>
            <li>Lisboa - Ponta Delgada</li>
            <li>Lisboa - Porto</li>
            <li>Lisboa - Madrid</li>
            <li>Porto - Paris CDG</li>
            <li>Porto - Amesterdão</li>
            <li>Porto - Barcelona</li>
            <li>Faro - Zurich</li>
            <li>Faro - Manchester</li>
            <li>Faro - Dublin</li>
            <li>Funchal - Gatwick</li>
          </ul>
        </>
      )
    }
  ];

  return (
    <div className="fom-container" style={{ padding: '20px', color: 'var(--text-primary)', lineHeight: '1.6', height: '100%', overflowY: 'auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px', padding: '40px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
        <img src="/lsa_logo.png" alt="Lisboa Airlines" style={{ height: '80px', marginBottom: '20px' }} onError={(e) => e.target.style.display = 'none'} />
        <h1 style={{ fontSize: '2.5rem', color: '#fff', margin: '0 0 10px 0' }}>FLIGHT OPERATIONS MANUAL (FOM)</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>Standard Operating Procedures and Policies for Lisboa Airlines Virtual Airline Pilots</p>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', background: 'rgba(0,0,0,0.4)', borderRadius: '12px', padding: '40px', border: '1px solid rgba(255,255,255,0.1)' }}>
        {sections.map((section, index) => (
          <div key={section.id} style={{ marginBottom: index === sections.length - 1 ? '0' : '50px' }}>
            <h2 style={{ fontSize: '1.8rem', color: 'var(--vivid-cyan)', borderBottom: '2px solid rgba(0, 243, 255, 0.2)', paddingBottom: '10px', marginBottom: '20px' }}>
              {section.title}
            </h2>
            <div className="fom-content">
              {section.content}
            </div>
          </div>
        ))}
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .fom-content h3 {
          color: #fff;
          margin-top: 30px;
          margin-bottom: 15px;
          font-size: 1.3rem;
        }
        .fom-content p {
          margin-bottom: 15px;
          color: #d1d5db;
        }
        .fom-content ul {
          margin-bottom: 15px;
          padding-left: 20px;
          color: #d1d5db;
        }
        .fom-content li {
          margin-bottom: 8px;
        }
        .fom-table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
          background: rgba(0,0,0,0.5);
          border-radius: 8px;
          overflow: hidden;
        }
        .fom-table th {
          background: rgba(0, 243, 255, 0.1);
          color: var(--vivid-cyan);
          text-align: left;
          padding: 12px 15px;
          border-bottom: 1px solid rgba(0, 243, 255, 0.3);
        }
        .fom-table td {
          padding: 12px 15px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          color: #d1d5db;
        }
        .fom-table tr:last-child td {
          border-bottom: none;
        }
        .fom-alert {
          background: rgba(239, 68, 68, 0.1);
          border-left: 4px solid var(--primary-red);
          padding: 15px;
          border-radius: 4px;
          margin: 20px 0;
          color: #fca5a5;
        }
      `}} />
    </div>
  );
}

export default FOM;
