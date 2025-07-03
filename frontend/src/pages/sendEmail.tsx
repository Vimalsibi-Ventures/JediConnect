import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OTPVerification.css'; // Reuse same style
import { sendOtp } from '../services/otp';

const SendEmail: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await sendOtp(email);
      alert('OTP sent successfully!');
      navigate('/verify-otp'); // Navigate to OTP page
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="otp-page-background">
      <div className="otp-verification-container">
        <h2>📧 Enter Email for OTP</h2>
        <form onSubmit={handleSendOtp} className="otp-form">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send OTP'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendEmail;
