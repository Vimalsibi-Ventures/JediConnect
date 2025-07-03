import React from 'react';
import './dashboard.css';
import { FaUserCircle } from 'react-icons/fa';

const Dashboard: React.FC = () => {
  const handleLogoClick = () => {
    window.location.reload(); // Can be updated later to go to landing or dashboard
  };

  return (
    <div className="dashboard-wrapper">
      

      {/* Dashboard Content */}
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div className="brand-title">JediConnect</div>
          <div className="bridge-title">Command Bridge</div>
          <FaUserCircle className="user-icon" />
        </div>

        <button className="new-mission-button">+ New Mission</button>

        <div className="dashboard-main">
          <div className="dashboard-grid">
            {/* Left Column: Transmissions */}
            <div className="transmissions">
              <h3 className="section-title">Transmission Inbox</h3>

              <div className="mission-card">
                <div>
                  <div className="mission-title">Build a galactic analytics dashboard</div>
                  <div className="mission-description">
                    React and D3.js experience, strong understanding of data visualization.
                  </div>
                </div>
                <div className="mission-score">93 ›</div>
              </div>

              <div className="mission-card">
                <div>
                  <div className="mission-title">Develop an AI companion for pilots</div>
                  <div className="mission-description">
                    Experience with AI systems and a good selection of relevant tools.
                  </div>
                </div>
                <div className="mission-score">78 ›</div>
              </div>
            </div>

            {/* Right Column: Droids */}
            <div className="droids">
              <h3 className="section-title">Top Performing Droids</h3>
              <ol className="droid-list">
                <li>1 R2-D2</li>
                <li>2 Ruque</li>
                <li>3 IG-88</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
