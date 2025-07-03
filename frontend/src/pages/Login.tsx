// src/pages/Login.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ import navigate hook
import './Login.css';

const Login = () => {
  const navigate = useNavigate(); // ✅ hook to redirect user

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Add your real authentication logic here if needed

    navigate('/dashboard'); // ✅ redirect to dashboard
  };

  return (
    <div className="auth-background">
      {/* Background Layers */}
      <div className="login-bg" />
      <div className="starry-bg" />
      <div className="nebula-overlay" />
      <div className="lens-flare" />

      {/* Login Box */}
      <div className="auth-container">
        <h2 className="auth-title">Login to JediConnect</h2>
        <form className="auth-form" onSubmit={handleLogin}>
          <input type="email" placeholder="Email" className="auth-input" required />
          <input type="password" placeholder="Password" className="auth-input" required />
          <button type="submit" className="blue-button">Login</button>
        </form>
        <p className="auth-footer">New here? <a href="/signup">Sign up</a></p>
      </div>
    </div>
  );
};

export default Login;
