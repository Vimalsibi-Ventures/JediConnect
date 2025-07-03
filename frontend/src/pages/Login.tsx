import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '/LOGO.png';
import axios from 'axios';

const Login = () => {
  return (
    <div className="login-background">
      {/* 🔹 Logo (Top-Left) */}
      <div className="login-logo">
        <Link to="/">
          <img src={logo} alt="JediConnect" className="login-logo-img" />
        </Link>
      </div>

      {/* 🔸 Background Layers */}
      <div className="login-bg" />
      <div className="login-starry-bg" />
      <div className="login-nebula-overlay" />
      <div className="login-lens-flare" />

      {/* 🔸 Login Box */}
      <div className="login-container">
        <h2 className="login-title">Login to JediConnect</h2>
        <form className="login-form">
          <input type="email" placeholder="Email" className="login-input" />
          <input type="password" placeholder="Password" className="login-input" />
          <button type="submit" className="login-button">Login</button>
        </form>
        <p className="login-footer">New here? <a href="/signup">Sign up</a></p>
      </div>
    </div>
  );
};

export default Login;
