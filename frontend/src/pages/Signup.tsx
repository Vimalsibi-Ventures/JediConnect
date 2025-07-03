import React from 'react';
import './Signup.css';

const Signup = () => {
  return (
    <div className="auth-background">
      <div className="overlay" />
      <div className="auth-container">
        <h2 className="auth-title">Join the Jedi Order</h2>
        <form className="auth-form">
          <input type="text" placeholder="Name" className="auth-input" />
          <input type="email" placeholder="Email" className="auth-input" />
          <input type="password" placeholder="Create Password" className="auth-input" />
          <button type="submit" className="yellow-button">Sign Up</button>
        </form>
        <p className="auth-footer">Already a member? <a href="/login">Login</a></p>
      </div>
    </div>
  );
};

export default Signup;
