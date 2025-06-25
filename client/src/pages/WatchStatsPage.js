import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import './WatchStatsPage.css';
import axios from 'axios';

const WatchStatsPage = () => {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get('http://localhost:5050/api/retrieve', {
                    withCredentials: true    
                });
                setUsername(res.data.user.username);
            } catch (err) {
                console.error('Failed to fetch user:', err);
            }
        };
        fetchUser();
    }, []);

    return (
        <div>
            <Header />
            <div className='watch-stats-container'>
                <div className='watch-stats-banner'>
                    <h2>Watch Statistics</h2>
                </div>
                <div className='watch-stats-content'>
                    <h3>@{username || 'Username Not Loaded Yet'}</h3>
                    <div className='watch-stats-grid'>
                        <div className='watch-stats-item'>
                            <h1>69</h1>
                            <p>Films Watched</p>
                        </div>
                        <div className='watch-stats-item'>
                            <h1>69</h1>
                            <p>Hours Watched</p>
                        </div>
                        <div className='watch-stats-item'>
                            <h1>69</h1>
                            <p>Reviews Given</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default WatchStatsPage;