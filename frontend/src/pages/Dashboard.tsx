// src/pages/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './dashboard.css';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'accept' | 'launch'>('accept');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [matchedMissions, setMatchedMissions] = useState<any[]>([]);
  const [myMissions, setMyMissions] = useState<any[]>([]);

  const navigate = useNavigate();
  const userId = '68668fdd534fc4ead2781a3c'; // Replace dynamically when auth is ready

  const handleLogoClick = () => window.location.reload();
  const handleLogout = () => navigate('/');

  const fetchMissions = async () => {
    try {
      const [matchedRes, acceptedRes] = await Promise.all([
        axios.get('http://localhost:5050/api/missions/available'),
        axios.get(`http://localhost:5050/api/missions/accepted/${userId}`)
      ]);
      setMatchedMissions(matchedRes.data);
      setMyMissions(acceptedRes.data);
    } catch (err) {
      console.error('❌ Error fetching missions:', err);
    }
  };

  const handleAcceptMission = async (missionId: string) => {
    try {
      const res = await axios.post('http://localhost:5050/api/missions/accept', {
        userId,
        missionId,
      });
      console.log('✅ Mission accepted:', res.data);
      fetchMissions(); // Refresh both lists after accepting
    } catch (err) {
      console.error('❌ Failed to accept mission:', err);
    }
  };

  useEffect(() => {
    fetchMissions();
  }, []);

  return (
    <div className="dashboard-wrapper">
      {/* Navbar */}
      <div className="navbar">
        <div className="navbar-left">
          <div className="navbar-logo" onClick={handleLogoClick}>
            <img src="/LOGO.png" alt="JediConnect Logo" className="logo-image" />
            <span className="logo-text">JediConnect</span>
          </div>
        </div>

        <div className="navbar-center">
          <div className="bridge-title">Command Bridge</div>
        </div>

        <div className="navbar-right">
          <div className="profile-container">
            <img
              src="/default-avatar.png"
              alt="Profile"
              className="profile-avatar"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
              <div className="profile-dropdown">
                <a href="/profile">Profile Settings</a>
                <a onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="dashboard-tabs">
        <div
          className={`dashboard-tab ${activeTab === 'accept' ? 'active' : ''}`}
          onClick={() => setActiveTab('accept')}
        >
          Accept Your Mission
        </div>
        <div
          className={`dashboard-tab ${activeTab === 'launch' ? 'active' : ''}`}
          onClick={() => setActiveTab('launch')}
        >
          Launch Your Mission
        </div>
      </div>

      {/* Tab Content */}
      <div className="dashboard-content">
        {activeTab === 'accept' && (
          <div className="mission-list">
            {matchedMissions.length === 0 ? (
              <p>No available missions.</p>
            ) : (
              matchedMissions.map((mission) => (
                <div className="mission-wrapper" key={mission._id}>
                  <div className="mission-card">
                    <h3>{mission.title}</h3>
                    <p><strong>Recruiter:</strong> Unknown</p>
                    <p><strong>Score:</strong> ???</p>
                    <p><em>{mission.explanation || 'No explanation provided.'}</em></p>
                    <button
                      className="accept-button"
                      onClick={() => handleAcceptMission(mission._id)}
                    >
                      Accept Mission
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'launch' && (
          <div className="launch-section">
            <div
              className="new-mission-box"
              onClick={() => navigate('/launch')}
              style={{ cursor: 'pointer' }}
            >
              <h3>+ Launch New Mission</h3>
              <p>Use the Launch Mission page to create a prompt-based mission with AI.</p>
            </div>

            <div className="mission-list">
              {myMissions.length === 0 ? (
                <p>No launched missions yet.</p>
              ) : (
                myMissions.map((mission) => (
                  <div className="mission-wrapper" key={mission._id}>
                    <div className="mission-card">
                      <h3>{mission.title}</h3>
                      <p>{mission.description}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
