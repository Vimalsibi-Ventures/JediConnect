// src/pages/Login.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ import navigate hook
import './Login.css';
import { Link } from 'react-router-dom';
import logo from '/LOGO.png'; // <-- replace with actual path to your logo

const Login = () => {
  const navigate = useNavigate(); // ✅ hook to redirect user

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Add your real authentication logic here if needed

    navigate('/dashboard'); // ✅ redirect to dashboard
  };

  return (
    <div className="login-background">
      {/* 🔹 Logo (Top-Left) */}
      <div className="login-logo">
        <Link to="/">
          <img src={logo} alt="JediConnect" className="login-logo-img" />
        </Link>
      </div>

      {/* Login Box */}
      <div className="auth-container">
        <h2 className="auth-title">Login to JediConnect</h2>
        <form className="auth-form" onSubmit={handleLogin}>
          <input type="email" placeholder="Email" className="auth-input" required />
          <input type="password" placeholder="Password" className="auth-input" required />
          <button type="submit" className="blue-button">Login</button>
        </form>
        <p className="login-footer">New here? <a href="/signup">Sign up</a></p>
      </div>
    </div>
  );
};

export default Login;
