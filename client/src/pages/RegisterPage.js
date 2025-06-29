import React, {useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './RegisterPage.css';
import axios from 'axios'; // for backend

function RegisterPage() {
    const location = useLocation(); 
    const navigate = useNavigate();
    const email = location.state?.email || '';
    const [agreed, setAgreed] = useState(false);
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    const handleRegister = async(e)=> {
        e.preventDefault();
        const formData = new FormData(e.target);

        const data = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            username: formData.get('username'),
            dob: formData.get('dob'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
            agreedToTerms: agreed,
        };

        try {
            const res = await axios.post(`${BACKEND_URL}/api/register`, data);
            alert('Registration successful');
        } catch(err) {
            const msg = err.response?.data?.message || err.message || 'Unknown error'
            alert('Registration failed: ' + msg);
        }
    };

    const handleLogin = () => {
        navigate('/login');
    }

    return (
        <div className='register-container'>
            <div className='register-form'>
                <img src='/PT_logo.jpg' alt='PopocornTogether' className='logo' /> 
                <h2>Create your account</h2>
                <p className='subtitle'>You are one step away from popcorning together with your friends!</p>

                <form onSubmit={handleRegister}>
                    <div className='form-grid'>
                        <input type='text' placeholder='First name' name='firstName' required />
                        <input type='text' placeholder='Last name (Optional)' name='lastName' />
                        <input type='text' placeholder='Username' name='username' required />
                        <input type='date' placeholder='Date of birth (MM/DD/YY)' name='dob' required />
                        <input type='email' placeholder='Email' name='email' defaultValue={email} required />
                        <input type='password' placeholder='Password' name='password' required />
                        <input type='password' placeholder='Confirm password' name='confirmPassword' required />
                    </div>

                    <label className='container'>
                        I agree to all the <a href='#'>Terms</a> and <a href='#'>Privacy policy</a>
                        <input type='checkbox' id='terms' required checked={agreed} 
                    onChange={(e) => setAgreed(e.target.checked)}/>
                    <span class="checkmark"></span>
                    </label>
                    
                    <button type='submit' className='register-btn'>Create account</button>
                </form>

                <div className='separator'>
                        <hr />
                    </div>

                <button className='login-btn' onClick={handleLogin}>
                        Log in to existing account
                </button>
            </div>
        </div>
    );
}
export default RegisterPage;