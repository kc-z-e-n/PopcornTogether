import React from 'react';
import { useLocation } from 'react-router-dom';
import './RegisterPage.css';

function RegisterPage() {
  const location = useLocation();
  const email = location.state?.email || '';

  return (
    <div className="register-container">
      <div className="register-form">
        <img src="/PT_logo.jpg" alt="PopcornTogether" className="logo" />
        <h2>Create your account</h2>
        <p className="subtitle">You are one step away from popcorning together with your friends!</p>

        <form>
          <div className="form-grid">
            <input type="text" placeholder="First name" name="firstName" required />
            <input type="text" placeholder="Last name (optional)" name="lastName" />
            <input type="text" placeholder="Username" name="username" required />
            <input type="date" placeholder="Date of birth (MM/DD/YY)" name="dob" />
            <input type="email" placeholder="Email" name="email" defaultValue={email} required />
            <input type="password" placeholder="Password" name="password" required />
            <input type="password" placeholder="Confirm password" name="confirmPassword" required />
          </div>

          <div className="checkbox">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">
              I agree to all the <a href="#">Terms</a> and <a href="#">Privacy policy</a>
            </label>
          </div>



          <button type="submit" className="register-btn">Create account</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
