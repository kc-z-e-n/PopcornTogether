import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css';

function AuthPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const handleRegister = (e) => {
        e.preventDefault(); // prevent page reload
        navigate('/register', {state: {email}}); //pass email to /register
    };

    const handleLogin = () => {
        navigate('/login');
    }

    return (
        <div className='auth-layout'>
            <div className='auth-image-side'></div>

            <div className='auth-form-side'>
                <div className='auth-form'>
                    <img src='/PT_logo.jpg' alt="Popocorn Together" className='logo' /> 
                    <h2>Welcome to PopcornTogether!</h2>
                    <p>Create an account</p>
                    <p className='subtext'>Enter your email to sign up for this app</p>
                    <form onSubmit={handleRegister}>
                        <input 
                            type='email' 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='email@domain.com'
                            className='input'
                            required />
                    <button type='submit' className='primary-btn'>Continue</button>
                    </form>

                    <div className='separator'>
                        <hr />
                        <span>or</span>
                        <hr />
                    </div>

                    <button className='secondary-btn' onClick={handleLogin}>
                        Log in to existing account
                    </button>

                    <p className='terms'>
                        By clicking continue, you agree to our <a href='#'>Terms of Service</a> and <a href='#'>Privacy Policy</a>
                    </p>
                </div>
            </div>
        </div>
    )
}
export default AuthPage;