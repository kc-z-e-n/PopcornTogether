import React, {useState} from 'react';
import {useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Filter from '../components/Filter';
import './MovieMatchPage.css';
import axios from 'axios';

function MovieMatchPage() {
    const [showFilters, setShowFilters] = useState(false);
    const navigate = useNavigate();
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
    const [selected, setSelected] = useState('');
    const [movies, setMovies] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0)

    const handleSearch = async (queryParams) => {
        try {
            const res = await axios.get(`${BACKEND_URL}/api/movie/search`, {params : queryParams});
            navigate('/results', {state : {results: res.data.result, totalPages: res.data.totalPages, query: queryParams}} );
        } catch (err) {
            console.error('Search failed', err);
        }
    };

    const fetchType = async (type) => {
        try {
            const res = await axios.get(`${BACKEND_URL}/api/movie/match`, {params: {type}});
            setMovies(res.data.result);
            setSelected(type);
        } catch (err) {
            console.error(err);
        }
    };

    const checkSessionLogin = async () => {
        try {
            const res = await axios.get(`${BACKEND_URL}/api/me`, {
                withCredentials:true
            });
            if (res.status === 200) {
                return true;
            }
        } catch (err) {
            return false;
        }
    };

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

    const goNext = () => {
        setCurrentIndex((prev) => (prev + 1) % movies.length);
    };

    const goPrev = () => {
        setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);
    };

    return (
        <div className='movie-match-container'>
            <Header onSearchBarFocus={() => !showFilters && setShowFilters(true)} onSearch={handleSearch}/>
            {showFilters && <Filter onSearch={handleSearch} onClose={()=> setShowFilters(false)}/>}

            <div className='match-banner'>
                <h2>Movie Match</h2>
            </div>

            <div className='match-selector'>
                <h3>Theme: </h3>
                <button onClick={() => fetchType('Random')}>Random</button>
                <button onClick={() => fetchType('Gems')}>Gems</button>
            </div>

            <h3>{selected}</h3>
            <div className='match-carousel'>
                {movies.length > 0 && (
                    <button onClick={goPrev} className='match-arrow'>{`<`}</button>
                )}

                {movies.length > 0 && (
                    <div>
                        <img 
                            src={`https://image.tmdb.org/t/p/w300${movies[currentIndex].poster_path}`}
                            alt={movies[currentIndex].title} 
                            className='match-poster'
                            />
                        <p>{movies[currentIndex].title}</p>
                        <button className='add-button' onClick={() => navigate(`/community/${movies[currentIndex].id}`)}>Reviews</button>
                        <hr/>
                        <div className='button-group'>
                            <button className='add-button' onClick={() => addToList('addWatched', movies[currentIndex].id)}>+ Watchedlist</button>
                            <button className='add-button' onClick={() => addToList('addWish', movies[currentIndex].id)}>+ Wishlist</button>
                        </div>
                    </div>
                )}

                {movies.length > 0 && (
                    <button onClick={goNext} className='match-arrow'>{`>`}</button>
                )}
            </div>
        </div>
    );
};

export default MovieMatchPage;