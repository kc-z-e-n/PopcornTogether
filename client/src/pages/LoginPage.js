import React, {useState} from 'react';
import './LoginPage.css';
import axios from 'axios'; //for backend
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] =useState('');
    const navigate = useNavigate();

    const handleLogin = async(e) => {
        e.preventDefault(); //prevent refresh
        console.log('Logging in with:', {email, password});
        try {
            const res = await axios.post('http://localhost:5050/api/login', {
                email,
                password
            },{
                withCredentials: true
            });
            alert('Login Successful');
            navigate('/');
        } catch(err) {
            console.error('Login failed:', err.message);
            const errorMessage = err.response?.data?.error || 'Unable to connect to server.';
            alert('Login Failed: ' + errorMessage);
        }
    };

    return (
        <div className='login-container'>
            <div className='login-form'>
                <img src='/PT_logo.jpg' alt='PopcornTogether' className='logo' />
                <h2>Welcome back!</h2>
                <p className='subtitle'>We are glad to have you back popcorning with us!</p>

                <form onSubmit={handleLogin}>
                    <label>Email address</label>
                    <input
                        type='email'
                        placeholder='email@domain.com'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required />

                    <label>Password</label>
                    <input
                        type='password'
                        placeholder='Enter your password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />

                    <button type='submit' className='login-btn'>Log in</button>
                </form>
            </div>
        </div>
    );
}
export default LoginPage;