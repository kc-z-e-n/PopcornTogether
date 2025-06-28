import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Filter from '../components/Filter';
import './WatchStatsPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const WatchStatsPage = () => {
    const [username, setUsername] = useState('');
    const [watchedList, setWatchedList] = useState([]);
    const [watched, setWatched] = useState([]);
    const [runtime, setRuntime] = useState(0);
    const [showFilters, setShowFilters] = useState(false);
    const [topGenre, setTopGenre] = useState([]);
    const navigate = useNavigate();

    const handleSearch = async (queryParams) => {
        try {
            const res = await axios.get('http://localhost:5050/api/movie/search', {params : queryParams});
            navigate('/results', {state : {results: res.data}} );
        } catch (err) {
            console.error('Search failed', err);
        }
    };
    
    const formatRuntime = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h ${minutes}min`;
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get('http://localhost:5050/api/retrieve', {
                    withCredentials: true    
                });
                setUsername(res.data.user.username);
                setWatched(res.data.user.watchedListMovies);
            } catch (err) {
                console.error('Failed to fetch user:', err);
            }
        };
        
        const fetchWatchedList = async () => {
            try {
                const res = await axios.get('http://localhost:5050/api/stats/watchedStats', {
                    withCredentials: true
                });
                setWatchedList(res.data.watchedListMovies);
            } catch (err) {
                console.error('Failed to fetch watched list:', err);
            }
        };

        fetchUser();
        fetchWatchedList();
    }, []);

    useEffect(() => {
        if (watched.length > 0) {
            const fetchRuntime = async () => {
                try {
                    console.log('watched list state:', watched);
                    const res = await axios.post('http://localhost:5050/api/stats/runtime', {
                        movieIds : watched
                    });
                    setRuntime(res.data.totalRuntime);
                } catch (err) {
                    console.error('Failed to get runtime', err);
                }
            };

            const fetchTopGenre = async () => {
                try {
                    const res = await axios.post('http://localhost:5050/api/stats/top-genre', {
                        movieIds : watched
                    });
                    setTopGenre(res.data.topGenres);
                } catch (err) {
                    console.error('Failed to get top genre', err);
                }
            };
            fetchRuntime();
            fetchTopGenre();
        }
    }, [watched]);

    return (
        <div>
            <Header onSearchBarFocus={() => !showFilters && setShowFilters(true)} onSearch={handleSearch}/>
            {showFilters && <Filter onSearch={handleSearch} onClose={()=> setShowFilters(false)}/>}

            <div className='watch-stats-container'>
                <div className='watch-stats-banner'>
                    <h2>Watch Statistics</h2>
                </div>
                <div className='watch-stats-content'>
                    <h3 className='watch-stats-username'>@{username || 'Username Not Loaded Yet'}</h3>
                    <div className='watch-stats-grid'>
                        <div className='watch-stats-item'>
                            <i className='fas fa-eye'></i>
                            <h1>{watched.length}</h1>
                            <p>Films Watched</p>
                        </div>
                        <div className='watch-stats-item'>
                            <i className='fas fa-clock'></i>
                            <h1>{formatRuntime(runtime)}</h1>
                            <p>Time Watched</p>
                        </div>
                        <div className='watch-stats-item'>
                            <i className='fas fa-theater-masks'></i>
                            <div className='genres-container'>
                                <ul className='watch-stats-genres'>
                                    {topGenre.map((genre, idx) => (
                                        <li key={idx}>{genre}</li>
                                    ))}
                                </ul>
                            </div>
                            <p>Top Genres</p>
                        </div>
                        <div className='watch-stats-item'>
                            <i className='fas fa-pen'></i>
                            <h1>0</h1>
                            <p>Reviews Given</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default WatchStatsPage;