import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../public/PT_logo_copy.jpg';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-black bg-opacity-80 text-white shadow-md z-50">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center space-x-3 text-2xl font-bold">
          <img src={logo} alt="logo" className="h-8 w-8" />
          <Link to="/">PopcornTogether</Link>
        </div>
        <nav className="flex space-x-6">
          <Link to="/profile" className="hover:text-yellow-400">My Profile</Link>
          <Link to="/lists" className="hover:text-yellow-400">My Lists</Link>
          <Link to="/friends" className="hover:text-yellow-400">My Friends</Link>
        </nav>
        <div className="relative">
          <input type="text" placeholder="Search..." className="px-3 py-1 rounded bg-gray-800 text-white" />
          <button className="absolute right-1 top-1 text-yellow-400">
            🔍
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;