import React from 'react';
import './Login.css';

const Login = () => {
  return (
    <div className="auth-background">
      <div className="auth-container">
        <h2 className="auth-title">Login to JediConnect</h2>
        <form className="auth-form">
          <input type="email" placeholder="Email" className="auth-input" />
          <input type="password" placeholder="Password" className="auth-input" />
          <button type="submit" className="blue-button">Login</button>
        </form>
        <p className="auth-footer">New here? <a href="/signup">Sign up</a></p>
      </div>
    </div>
  );
};

export default Login;
