import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import './DisneyPage.css';
//import { useLocation } from 'react-router-dom';

const DisneyPage = () => {
    const [disneyMovies, setDisneyMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const fetchDisneyMovies = async () => {
            try {
                // const res = await axios.get(`http://localhost:5050/api/movie/disney?page=${page}`);
                const res = await axios.get(`${BACKEND_URL}/api/movie/disney?page=${page}`);
                setDisneyMovies(res.data.result);
                setTotalPages(res.data.totalPages);
            } catch (err) {
                console.error('Failed to fetch Disney movies:', err);
            }
        };
        fetchDisneyMovies();
    }, []);

    return (
        <div className='results-container'>
            <Header />
            <div className='results-banner'>Disney Movies</div>
            <div className='movie-grid'>
                {disneyMovies.map((movie) => (
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

export default DisneyPage;