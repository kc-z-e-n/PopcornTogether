import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import './ResultsPage.css';

const ResultsPage = () => {
    const location = useLocation();
    const initialQuery = location.state?.query || {};
    const [results, setResults] = useState(1);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchMovies = async (pageNum) => {
        try {
            const res = await axios.get('/api/movie/search', {
                params: { ...initialQuery, page: pageNum }
            });
            setResults(res.data.results);
            setTotalPages(Math.min(res.data.totalPages, 10));
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchMovies(page);
    }, [page]);

    return (
        <div className = "results-container">
            <Header />
            <div className = "results-banner">
                <h2>Showing Matches for "{initialQuery.title || 'Your Filters'}"</h2>
            </div>
            <div className="results-grid">
                {results.map((movie) => (
                    <div key={movie.id} className="movie-card">
                        <img
                        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                        alt={movie.title}
                        className="movie-poster"
                    />
                    <p className="movie-title">{movie.title}</p>
                </div>
                ))}
            </div>
            <div className="pagination">
                {[...Array(totalPages)].map((_, i) => (
                    <button
                    key={i}
                    className={i + 1 === page ? 'active' : ''}
                    onClick={() => setTotalPages(i + 1)}
                >
                    {i+1}
                </button>
                ))}
            </div>
        </div>
    );
};

export default ResultsPage;