// src/pages/Dashboard.tsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const [myMissions, setMyMissions] = useState<any[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('/default-avatar.png');

  const navigate = useNavigate();
  const userId = localStorage.getItem('userId') || '';

  const handleLogoClick = () => navigate('/dashboard');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const fetchMissions = async () => {
    try {
      const res = await axios.get(`http://localhost:5050/api/missions/accepted/${userId}`);
      setMyMissions(res.data);
    } catch (err) {
      console.error('❌ Error fetching missions:', err);
    }
  };

  const fetchAvatar = async () => {
    try {
      const res = await axios.get(`http://localhost:5050/api/profile/get/${userId}`);
      setAvatarUrl(res.data.avatar || '/default-avatar.png');
    } catch (err) {
      console.error('❌ Error fetching avatar:', err);
    }
  };

  useEffect(() => {
    if (!userId) {
      navigate('/login');
    } else {
      fetchMissions();
      fetchAvatar();
    }
  }, [userId]);

  return (
    <div className="dashboard-wrapper">
      {/* 🔷 Navbar */}
      <div className="navbar">
        <div className="navbar-left">
          <div className="navbar-logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
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
              src={avatarUrl}
              alt="Profile"
              className="profile-avatar"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              style={{ cursor: 'pointer' }}
            />
            {dropdownOpen && (
              <div className="profile-dropdown">
                
                <a onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 🧠 Jedi Story Section */}
      <div className="mission-story">
        <h2>🚀 The Jedi Mission Protocol</h2>
        <p>
          Launch a mission to call upon fellow Jedi collaborators for help in your project.
          Each mission prompt includes your project’s purpose, required skills, and contact info.
          The Force will guide the most apt Jedi to accept it.
        </p>
      </div>

      {/* 🚀 Launch Section */}
      <div className="launch-section">
        <div
          className="new-mission-box"
          onClick={() => navigate('/launch')}
          style={{ cursor: 'pointer' }}
        >
          <h3>+ Launch New Mission</h3>
          <p>Use the Launch Mission page to create a prompt-based mission using AI parsing.</p>
        </div>

    
      </div>
    </div>
  );
};

export default Dashboard;
