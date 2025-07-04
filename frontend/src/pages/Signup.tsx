import React, { useState } from 'react';
import './Signup.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '/LOGO.png';
import axios from 'axios';
import { sendOtp } from '../services/otp'; // Adjust path as needed

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. Signup API
      const res = await axios.post('http://localhost:5050/api/auth/signup', {
        name,
        email,
        password,
      });

      if (res.status === 201) {
        // 2. Send OTP
        await sendOtp(email);

        // 3. Redirect to OTP page
        navigate('/verify-otp');
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

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
          <form className="signup-form" onSubmit={handleSignup}>
            <input
              type="email"
              placeholder="Email"
              className="signup-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="signup-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="error">{error}</p>}
            <button type="submit" className="signup-button" disabled={loading}>
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>
          <p className="signup-footer">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
