// src/pages/Dashboard.tsx
import React from 'react';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-background">
      {/* Jedi Logo */}
      <img
        src="/jedi-logo.png"
        alt="Jedi Logo"
        className="jedi-logo"
      />

      {/* Auth Buttons */}
      <div className="auth-buttons">
        <a href="/login" className="btn login-btn">Login</a>
        <a href="/signup" className="btn signup-btn">Sign Up</a>
      </div>

      {/* Center Content */}
      <div className="dashboard-card">
        <h1 className="dashboard-title">JediConnect</h1>
        <p className="dashboard-subtitle">
          A Galactic Recruitment & Mission Portal for Jedi Masters and Padawans
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
