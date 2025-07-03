import React, { useState } from 'react';
import './dashboard.css';
import { FaUserCircle } from 'react-icons/fa';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'accept' | 'launch'>('accept');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogoClick = () => {
    window.location.href = '/';
  };

  const dummyMatchedMissions = [
    {
      title: 'Build a sci-fi dashboard',
      recruiter: 'Obi-Wan Kenobi',
      score: 92,
      explanation: 'Great MERN skills and strong thematic alignment.',
    },
    {
      title: 'Design rebel intelligence UI',
      recruiter: 'Leia Organa',
      score: 85,
      explanation: 'Experience with data viz and story-driven UIs.',
    },
  ];

  const dummyMyMissions = [
    {
      title: 'AI Droid for Jedi Training',
      description: 'GPT-driven assistant to help padawans learn faster.',
    },
    {
      title: 'Star System Explorer',
      description: 'Interactive galaxy map built with Three.js.',
    },
  ];

  return (
    <div className="dashboard-wrapper">
      {/* 🔹 Navbar */}
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
              src="/default-avatar.png" // Replace with dynamic image from MongoDB later
              alt="Profile"
              className="profile-avatar"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
              <div className="profile-dropdown">
                <a href="/profile">Profile Settings</a>
                <a href="/logout">Logout</a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 🔸 Tabs */}
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

      {/* 🔸 Tab Content */}
      <div className="dashboard-content">
        {activeTab === 'accept' && (
          <div className="mission-list">
            {dummyMatchedMissions.map((mission, idx) => (
              <div className="mission-card" key={idx}>
                <h3>{mission.title}</h3>
                <p><strong>Recruiter:</strong> {mission.recruiter}</p>
                <p><strong>Score:</strong> {mission.score}</p>
                <p><em>{mission.explanation}</em></p>
                <button className="accept-button">Accept Mission</button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'launch' && (
          <div className="launch-section">
            <div className="new-mission-box">
              <h3>+ Launch New Mission</h3>
              <p>Coming soon: Start your own mission with GPT-powered prompts.</p>
            </div>

            <div className="mission-list">
              {dummyMyMissions.map((mission, idx) => (
                <div className="mission-card" key={idx}>
                  <h3>{mission.title}</h3>
                  <p>{mission.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
