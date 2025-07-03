import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '/LOGO.png';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5050/api/auth/login', {
        email,
        password,
      });

      const user = response.data.user;

      if (user.profileCompleted) {
        navigate('/dashboard');
      } else {
        navigate('/profile-builder');
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

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
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="login-error">{error}</p>}
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="login-footer">
          New here? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
