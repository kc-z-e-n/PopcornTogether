import React from  'react';
import { Link, useNavigate} from 'react-router-dom';
import './Header.css';
import axios from 'axios';

const Header = ({onSearchBarFocus}) => {
    const navigate = useNavigate();

    const handleProtectedRoute = async (path) => {
        try {
            const res = await axios.get('/api/auth.ne', {withCredentials: true}) ;
            if (res.status==200) {
                navigate(path);
            }
        } catch(err) {
            navigate('/auth');
        }
    };

    {/* onClick={() => handleProtectedRoute('/friends')}*/}

    return (
        <header className="header">
            <div className='header-left'>
                <img src='PT_logo.jpg' alr='PopocornTogether' className='logo'/>
                <Link to="/" className='brand'>PopcornTogether</Link>
            </div>
            <nav className='header-nav'>
                <Link to="/auth" className='nav-link'>LOGIN</Link>
                <Link to="/profile" className='nav-link'>MY PROFILE</Link>
                <Link to="/lists" className='nav-link'>MY LISTS</Link>
                <Link to="/friends" className='nav-link'>MY FRIENDS</Link>
            </nav>
            <div className='header-search'>
                <input type="text" placeholder="Search..." className='search-input' onFocus={onSearchBarFocus} />
                <button className="search-button">🔍</button>
            </div>
        </header>
    );
};

export default Header;