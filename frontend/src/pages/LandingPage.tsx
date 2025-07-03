import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './LandingPage.css';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-container">
      {/* Background Layers */}
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
      <section className="hero-section">
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
      </section>

      {/* Features Section Wrapper */}
      <div className="features-wrapper">
        <section className="features-section">
          {/* Feature 1 */}
          <div className="feature-row">
            <img src="/discover-missions.png" alt="Discover Missions" className="feature-image" />
            <div className="feature-text">
              <h2>Discover Galactic Missions</h2>
              <p>Explore Jedi missions posted by Masters across the galaxy. Each mission has unique planets, skill levels, and objectives.</p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="feature-row reverse">
            <img src="/accept-missions.png" alt="Accept Missions" className="feature-image" />
            <div className="feature-text">
              <h2>Accept and Complete Jedi Missions</h2>
              <p>Take on missions, track your progress, and complete objectives to earn recognition and rise in Jedi ranks.</p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="feature-row">
            <img src="/build-profile.png" alt="Build Jedi Profile" className="feature-image" />
            <div className="feature-text">
              <h2>Build Your Own Jedi Profile</h2>
              <p>Create your glowing Jedi profile, choose your saber color, Force alignment, and share your unique Jedi story.</p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="feature-row reverse">
            <img src="/manage-missions.png" alt="Manage Missions" className="feature-image" />
            <div className="feature-text">
              <h2>View and Manage Accepted Missions</h2>
              <p>Track all your accepted missions in one place. Easily update progress or mark missions as complete.</p>
            </div>
          </div>

          {/* Feature 5 */}
          <div className="feature-row">
            <img src="/track-growth.png" alt="Track Progress" className="feature-image" />
            <div className="feature-text">
              <h2>Track Your Jedi Growth</h2>
              <p>Visualize your journey from Padawan to Jedi Knight. Watch your growth as you complete missions and level up.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
