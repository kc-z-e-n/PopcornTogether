import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Filter from '../components/Filter';
import './ResultsPage.css';


const ResultsPage = () => {
    const location = useLocation();
    const initialQuery = location.state?.query || {};
    const [results, setResults] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showFilters, setShowFilters] = useState(false);
    const navigate = useNavigate();

    const handleSearch = async (queryParams) => {
        try {
            const res = await axios.get('http://localhost:5050/api/movie/search', {params : queryParams});
            navigate('/results', {state : {results: res.data}} );
        } catch (err) {
            console.error('Search failed', err);
        }
    }

    const fetchMovies = async (pageNum) => {
        try {
            const res = await axios.get('http://localhost:5050/api/movie/search', {
                params: { ...initialQuery, page: pageNum }
            });

            const resultsArray = res.data.result || [];
            setResults(res.data.result);
            setTotalPages(Math.min(res.data.totalPages, 10));
        } catch (err) {
            console.error(err);
            setResults([]);
        }
    };

      const addToList = async (listType, movieId) => {
        try {
            await axios.post(`http://localhost:5050/api/user/${listType}`, {movieId}, {withCredentials:true});
            alert('Add Successful!')
        } catch (err) {
            console.error('Add failed', err);
        }
      };

    useEffect(() => {
        fetchMovies(page);
    }, [page]);

    return (
        <div className = "results-container">
            <Header onSearchBarFocus={() => !showFilters && setShowFilters(true)} onSearch={handleSearch}/>
            {showFilters && <Filter onSearch={handleSearch} onClose={()=> setShowFilters(false)}/>}

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
                    <div className='button-group'>
                        <button className='add-button' onClick={() => addToList('addWatched', movie.id)}>+ Watched</button>
                        <button className='add-button' onClick={() => addToList('addWish', movie.id)}>+ Watched</button>
                    </div>
                </div>
                ))}
            </div>
            <div className="pagination">
                {[...Array(totalPages)].map((_, i) => (
                    <button
                    key={i}
                    className={i + 1 === page ? 'active' : ''}
                    onClick={() => setPage(i + 1)}
                >
                    {i+1}
                </button>
                ))}
            </div>
        </div>
    );
};

export default ResultsPage;