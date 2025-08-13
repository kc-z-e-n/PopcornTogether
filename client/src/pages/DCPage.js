import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Filter from '../components/Filter';
import './DCPage.css';

const DCPage = () => {
    const [dcMovies, setDCMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showFilters, setShowFilters] = useState(false);
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
    const navigate = useNavigate();

    const handleSearch = async (queryParams) => {
        try {
            const res = await axios.get(`${BACKEND_URL}/api/movie/search`, {params : queryParams});
            navigate('/results', {state : {results: res.data.result, totalPages: res.data.totalPages, query: queryParams}} );
        } catch (err) {
            console.error('Search failed', err);
        }
    }

    const addToList = async (listType, movieId) => {
        const isLoggedIn = await checkSessionLogin();
        if (!isLoggedIn) {
            alert('Please log in first');
            navigate('/auth');
            return;
        }

        try {
            await axios.post(`${BACKEND_URL}/api/user/${listType}`, {movieId}, {withCredentials:true});
            alert('Add Successful!')
        } catch (err) {
            console.error('Add failed', err);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const fetchDCMovies = async () => {
            try {
                const res = await axios.get(`${BACKEND_URL}/api/movie/dc?page=${page}`);
                // withCredentials: true;
                setDCMovies(res.data.result);
                setTotalPages(res.data.totalPages);
            } catch (err) {
                console.error('Failed to fetch DC movies:', err);
            }
        };
        fetchDCMovies();
    }, []);

    return (
        <div className='results-container'>
            <Header onSearchBarFocus={() => !showFilters && setShowFilters(true)} onSearch={handleSearch}/>
            {showFilters && <Filter onSearch={handleSearch} onClose={()=> setShowFilters(false)}/>}
            <div className='results-banner'>DC Movies</div>
            <div className='movie-grid'>
                {dcMovies.map((movie) => (
                    <div key={movie.id} className='movie-card'>
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} 
                        className='movie-poster'/>
                        <p className='movie-title'>{movie.title}</p>
                        <div className='button-group'>
                            <button className='add-button' onClick={() => addToList('addWatched', movie.id)}>+ Watchedlist</button>
                            <button className='add-button' onClick={() => addToList('addWish', movie.id)}>+ Wishlist</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className='pagination'>
                {[...Array(Math.min(totalPages, 10))].map((_, i) => (
                    <button
                        key={i}
                        className={i + 1 === page ? 'active' : ''}
                        onClick={() => setPage(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default DCPage;