import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Filter from '../components/Filter';
import './StarWarsPage.css';

const StarWarsPage = () => {
    const [starWarsMovies, setStarWarsMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showFilters, setShowFilters] = useState(false);
    const navigate = useNavigate();
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    const handleSearch = async (queryParams) => {
        try {
            const res = await axios.get(`${BACKEND_URL}/api/movie/search`, {params : queryParams});
            navigate('/results', {state : {results: res.data.result, totalPages: res.data.totalPages, query: queryParams}} );
        } catch (err) {
            console.error('Search failed', err);
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const fetchStarWarsMovies = async () => {
            try {
                // const res = await axios.get(`http://localhost:5050/api/movie/disney?page=${page}`);
                const res = await axios.get(`${BACKEND_URL}/api/movie/starwars?page=${page}`);
                setStarWarsMovies(res.data.result);
                setTotalPages(res.data.totalPages);
            } catch (err) {
                console.error('Failed to fetch Disney movies:', err);
            }
        };
        fetchStarWarsMovies();
    }, []);

    return (
        <div className='results-container'>
            <Header onSearchBarFocus={() => !showFilters && setShowFilters(true)} onSearch={handleSearch}/>
            {showFilters && <Filter onSearch={handleSearch} onClose={()=> setShowFilters(false)}/>}
            <div className='results-banner'>Star Wars Movies</div>
            <div className='movie-grid'>
                {starWarsMovies.map((movie) => (
                    <div key={movie.id} className='movie-card'>
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} 
                        className='movie-poster'/>
                        <p className='movie-title'>{movie.title}</p>
                        <div className='button-group'>
                            <button className='add-button'>+ Watchedlist</button>
                            <button className='add-button'>+ Wishlist</button>
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

export default StarWarsPage;