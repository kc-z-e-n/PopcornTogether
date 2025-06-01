import React, { useState } from 'react';
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Optional: integrate axios POST to /api/login here
    console.log('Logging in with:', { email, password });
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <img src="/PT_logo.jpg" alt="PopcornTogether" className="logo" />
        <h2>Welcome back!</h2>
        <p className="subtitle">We are glad to have you back popcorning with us!</p>

        <form onSubmit={handleLogin}>
          <label>Email address</label>
          <input
            type="email"
            placeholder="email@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="login-btn">Log in</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
