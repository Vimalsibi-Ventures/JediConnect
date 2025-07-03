import React from 'react';
import './Signup.css';
import { Link } from 'react-router-dom';
import logo from '/LOGO.png'; // ← Change this path to match your asset folder

const Signup = () => {
  return (
    <div className="signup-page-wrapper">
      <div className="signup-background">
        
        {/* 🔹 Logo Top-Left */}
        <div className="signup-logo">
          <Link to="/">
            <img src={logo} alt="JediConnect Logo" className="signup-logo-img" />
          </Link>
        </div>

        {/* 🔸 Background Layers */}
        <div className="signup-bg" />
        <div className="signup-starry-bg" />
        <div className="signup-nebula-overlay" />
        <div className="signup-lens-flare" />

        {/* 🔸 Signup Box */}
        <div className="signup-container">
          <h2 className="signup-title">Sign Up for JediConnect</h2>
          <form className="signup-form">
            <input type="text" placeholder="Name" className="signup-input" />
            <input type="email" placeholder="Email" className="signup-input" />
            <input type="password" placeholder="Password" className="signup-input" />
            <button type="submit" className="signup-button">Sign Up</button>
          </form>
          <p className="signup-footer">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
