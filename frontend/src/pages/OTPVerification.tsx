// src/pages/OTPVerification.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OTPVerification.css';
import { verifyOtp } from '../services/otp'; // ✅ Correct path

const OTPVerification: React.FC = () => {
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await verifyOtp(email, otp);
      localStorage.setItem('email', email); // ✅ Store email for session
      alert('✅ OTP verified successfully! Please complete your profile.');
      navigate('/profile'); // 🔄 Redirect to ProfileBuilder instead of Login
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="otp-page-background">
      <div className="otp-verification-container">
        <h2>🔐 Verify Your Email</h2>
        <form onSubmit={handleVerify} className="otp-form">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <label>OTP</label>
          <input
            type="text"
            placeholder="Enter the OTP"
            value={otp}
            onChange={e => setOtp(e.target.value)}
            required
          />

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OTPVerification;
