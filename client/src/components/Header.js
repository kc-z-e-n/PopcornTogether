// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
      <header className="header">
        <div className="header-left">
          <img src="PT_logo.jpg" alt="logo" className="logo" />
          <Link to="/" className="brand">PopcornTogether</Link>
        </div>
        <nav className="header-nav">
          <Link to="/" className="nav-link">HOME</Link>
          <Link to="/profile" className="nav-link">MY PROFILE</Link>
          <Link to="/lists" className="nav-link">MY LISTS</Link>
          <Link to="/friends" className="nav-link">MY FRIENDS</Link>
        </nav>
        <div className="header-search">
          <input type="text" placeholder="Search..." className="search-input" />
          <button className="search-button">🔍</button>
        </div>
      </header>
    );
  };

export default Header;