import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './LandingPage.css';

const LandingPage: React.FC = () => {
  const [clickCount, setClickCount] = useState(0);
  const [showLightsaber, setShowLightsaber] = useState(false);
  const [crackText, setCrackText] = useState(false);

  const handleLogoClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount === 3) {
      setShowLightsaber(true);

      setTimeout(() => {
        setCrackText(true);
      }, 1500); // Trigger text switch shortly after saber crosses

      setTimeout(() => {
        setShowLightsaber(false);
      }, 2000); // Hide saber quickly after pass

      setTimeout(() => {
        setCrackText(false);
        setClickCount(0);
      }, 5000); // Full reset
    }
  };

  return (
    <div className="landing-container">
      {/* Background Layers */}
      <div className="custom-bg" />
      <div className="starry-bg" />
      <div className="nebula-overlay" />
      <div className="lens-flare" />

      {/* Logo (Top Left Corner) */}
      <div className="logo-top-left" onClick={handleLogoClick}>
        <img src="/LOGO.png" alt="JediConnect Logo" style={{ height: '50px', cursor: 'pointer' }} />
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
          {/* Animated Title with Smooth Transition */}
          <AnimatePresence mode="wait" initial={false}>
            {!crackText ? (
              <motion.h1
                key="jedi-title"
                className="hero-title flicker"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                JediConnect
              </motion.h1>
            ) : (
              <motion.h1
                key="invadis-title"
                className="hero-title cracked"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                INVADIS INC.
              </motion.h1>
            )}
          </AnimatePresence>

          {/* Lightsaber Animation */}
          {showLightsaber && (
            <motion.img
              src="/redL.png"
              alt="Lightsaber"
              className="lightsaber-image"
              initial={{ x: '-150%', opacity: 0.9 }}
              animate={{ x: '250%', opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
            />
          )}

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
            <img src="/featimg1.jpeg" alt="Discover Missions" className="feature-image" />
            <div className="feature-text">
              <h2>Discover Galactic Missions</h2>
              <p>Explore Jedi missions posted by Masters across the galaxy. Each mission has unique planets, skill levels, and objectives.</p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="feature-row reverse">
            <img src="/featimg2.jpeg" alt="Accept Missions" className="feature-image" />
            <div className="feature-text">
              <h2>Accept and Complete Jedi Missions</h2>
              <p>Take on missions, track your progress, and complete objectives to earn recognition and rise in Jedi ranks.</p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="feature-row">
            <img src="/featimg3.jpg" alt="Build Jedi Profile" className="feature-image" />
            <div className="feature-text">
              <h2>Build Your Own Jedi Profile</h2>
              <p>Create your glowing Jedi profile, choose your saber color, Force alignment, and share your unique Jedi story.</p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="feature-row reverse">
            <img src="/featimg4.jpeg" alt="Manage Missions" className="feature-image" />
            <div className="feature-text">
              <h2>View and Manage Accepted Missions</h2>
              <p>Track all your accepted missions in one place. Easily update progress or mark missions as complete.</p>
            </div>
          </div>

          {/* Feature 5 */}
          <div className="feature-row">
            <img src="/featimg5.jpeg" alt="Track Progress" className="feature-image" />
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
