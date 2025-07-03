import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OTPVerification.css';
import axios from 'axios';

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
      const response = await axios.post('http://localhost:5050/api/otp/verify-otp', {
        email,
        otp,
      });

      if (response.data.success) {
        alert('OTP verified successfully!');
        navigate('/profile-builder'); // Redirect to profile builder
      } else {
        setError(response.data.message || 'Verification failed');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Server error');
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
