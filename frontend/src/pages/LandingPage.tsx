import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './LandingPage.css';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-container">
      {/* Background Layers */}
      {/* To insert your custom background, replace the image URL in LandingPage.css under .custom-bg */}
      <div className="custom-bg" />
      <div className="starry-bg" />
      <div className="nebula-overlay" />
      <div className="lens-flare" />

      {/* Logo (Top Left Corner) */}
      <div className="logo-top-left">
        <img src="/LOGO.png" alt="JediConnect Logo" style={{ height: '50px' }} />
      </div>

      {/* Auth Buttons (Top Right Corner) */}
      <div className="auth-top-right">
        <Link to="/login" className="auth-btn blue-btn">Login</Link>
        <Link to="/signup" className="auth-btn gold-btn">Sign Up</Link>
      </div>

      {/* Hero Section */}
      <motion.div
        className="hero-glass-panel"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="hero-title flicker"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          JediConnect
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          A Galactic Recruitment & Mission Portal for Jedi Masters and Padawans
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LandingPage;