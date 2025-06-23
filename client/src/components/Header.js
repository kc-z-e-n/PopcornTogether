import React, {useEffect, useState} from  'react';
import { Link, useNavigate} from 'react-router-dom';
import './Header.css';
import axios from 'axios';

const Header = ({onSearchBarFocus, onSearch}) => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkLogin = async () => {
            try {
                const res = await axios.get('http://localhost:5050/api/me', {
                    withCredentials:true
                });
                if (res.status === 200) {
                    setIsLoggedIn(true);
                }
            } catch (err) {
                setIsLoggedIn(false);
            }
        };
        checkLogin();
    }, []);

    const handleProtectedRoute = async (path) => {
        try {
            const res = await axios.get('http://localhost:5050/api/me', {withCredentials: true}) ;
            if (res.status === 200) {
                navigate(path);
            }
        } catch(err) {
            alert('Not logged in');
            navigate('/auth');
        }
    };

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5050/api/logout', {}, {
                withCredentials: true
            });
            setIsLoggedIn(false);
            navigate('/auth');
        } catch (err) {
            console.error('logout error: ', err);
            alert('Logout failed');
        }
    }

    return (
        <header className="header">
            <div className='header-left'>
                <img src='PT_logo.jpg' alt='PopocornTogether' className='logo'/>
                <Link to="/" className='brand'>PopcornTogether</Link>
            </div>
            <nav className='header-nav'>
                {!isLoggedIn ? (
                    <Link to="/auth" className='nav-link'>LOGIN</Link>
                ) : (
                    <span className='nav-link' onClick={handleLogout}>LOGOUT</span>
                )}
                <span className='nav-link' onClick={() => handleProtectedRoute('/profile')}>MY PROFILE</span>
                <span className='nav-link' onClick={() => handleProtectedRoute('/lists')}>MY LISTS</span>
                <span className='nav-link' onClick={() => handleProtectedRoute('/friends')}>MY FRIENDS</span>
            </nav>
            <div className='header-search'>
                <input type="text" placeholder="Search..." className='search-input' onFocus={onSearchBarFocus} 
                value={query} onChange={(e) => setQuery(e.target.value)}/>
                <button className="search-button" onClick={() => onSearch({q:query})}>🔍</button>
            </div>
        </header>
    );
};

export default Header;