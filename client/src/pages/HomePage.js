import React, {useEffect, useState} from 'react';
import './HomePage.css';
import Header from '../components/Header';
import Filter from '../components/Filter';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
    const [showFilters, setShowFilters] = useState(false);
    const navigate = useNavigate();
    const [latestMovies, setLatestMovies] = useState([]);
    const location = useLocation();
    const initialQuery = location.state?.query || {};
    const [results, setResults] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    const handleSearch = async (queryParams) => {
        try {
            const res = await axios.get(`${BACKEND_URL}/api/movie/search`, {params : queryParams});
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
        const isLoggedIn = await checkSessionLogin();
        if (!isLoggedIn) {
            alert('Please log in first');
            navigate('/auth');
            return;
        }

        try {
            await axios.post(`http://localhost:5050/api/user/${listType}`, {movieId}, {withCredentials:true});
            alert('Add Successful!')
        } catch (err) {
            console.error('Add failed', err);
        }
    };

    const checkSessionLogin = async () => {
        try {
            const res = await axios.get('http://localhost:5050/api/me', {
                withCredentials:true
            });
            if (res.status === 200) {
                return true;
            }
        } catch (err) {
            return false;
        }
    };

    useEffect(() => {
        const fetchLatestMovies = async () => {
            try {
                const res = await axios.get(
                    `https://api.themoviedb.org/3/movie/now_playing?api_key=4dfda16375a1b5d4f55333fc85b7a5e1&language=en-US&page=1`
                );
                setLatestMovies(res.data.results.slice(0, 4));
            } catch (err) {
                console.error('Failed to fetch latest movies:', err);
            }
        };
        fetchLatestMovies();
    }, [])

    return (
        <div className='home-container'>
            <Header onSearchBarFocus={() => !showFilters && setShowFilters(true)} onSearch={handleSearch}/>
            {showFilters && <Filter onSearch={handleSearch} onClose={()=> setShowFilters(false)}/>}

            <section className='banner-section'>
                <div className='banner-content'>
                    <div>
                        <h1 className='main-heading'>
                            <span className='highlight'>Watch, Discover, Connect</span>
                        </h1>
                        <p className='sub-heading'>
                            Movies are better <span className='highlight'>together</span>, with <span className='highlight'>popcorn</span>.
                        </p>
                        <h2 className='movie-title'>Kingdom of the Planet of the Apes</h2>
                        <p className='movie-meta'>Movie - Action, Drama - 2024</p>
                        <div className='button-group'>
                            <button className='play-button'
                            onClick={() => addToList('addWatched', 'kingdom-of-apes')} >+ Watchedlist</button>
                            <button className='play-button'
                            onClick={() => addToList('addWish', 'kingdom-of-apes')} >+ Wishlist</button>
                        </div>
                    </div>
                    <div>
                        <img src='./Monkey.png' alt="Kingdom of the Planet of the Apes" className='banner-image' />
                    </div>
                </div>
            </section>

            <section className='movie-section'>
                <h2 className='section-heading'>Latest Movies</h2>
                {latestMovies.map((movie) => (
                    <div key={movie.id} className='movie-card'>
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className='movie-poster'/>
                    <p className='movie-label'>{movie.title}</p>
                    <div className='button-group'>
                        <button className='play-button'
                        onClick={() => addToList('addWatched', movie.id)} >+ Watchedlist</button>
                        <button className='play-button'
                        onClick={() => addToList('addWish', movie.id)} >+ Wishlist</button>
                    </div>
                    </div>
                ))}
            </section>

            <section className='movie-section'>
                <h2 className='section-heading'>Timeless Favourites</h2>
                <img
                    src='./TimelessFavourites.png' alt='Timeless Favourites' className='poster'
                    onClick={() => navigate('/timeless')} style={{ custor: 'pointer'}}
                />
            </section>

            <section className='movie-section'>
                <h2 className='section-heading'>Friend Activity</h2>
                <img src='./FriendActivity.png' alt='Friends' className='poster' />
            </section>

            <section className='movie-section franchise-section'>
                <h2 className='section-heading'>Popular Franchises</h2>
                <div className='franchise-grid'>
                    <div className='franchise-card' onClick={() => navigate('/franchise/disney')}>
                        <h3>Disney</h3>
                        <img src='./Disney.png' alt='Disney' />
                    </div>

                    <div className='franchise-card' onClick={() => navigate('/franchise/marvel')}>
                        <h3>Marvel</h3>
                        <img src='./Marvel.png' alt='Marvel' />
                    </div>

                    <div className='franchise-card dc' onClick={() => navigate('/franchise/dc')}>
                        <h3>DC</h3>
                        <img src='./DC.png' alt='DC' />
                    </div>

                    <div className='franchise-card starwars' onClick={() => navigate('/franchise/starwars')}>
                        <h3>Star Wars</h3>
                        <img src='./StarWars.png' alt='Star Wars' />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;