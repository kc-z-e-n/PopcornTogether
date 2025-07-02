import React, {useEffect, useState} from 'react';
import './TimelessFavouritesPage.css';
import Header from '../components/Header';
import axios from 'axios';

const TimelessFavouritesPage = () => {
    const [results, setResults] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const fetchTimelessFavourites = async () => {
            try {
                const res = await axios.get(`${BACKEND_URL}/api/movie/timeless?page=${page}`);
                    /*params: {page: page},
                    withCredentials: true
            }); */
            setResults(res.data.result);
            setTotalPages(res.data.totalPages);
            } catch (err) {
                console.error('Failed to fetch timeless favourites', err);
            }
        };
        fetchTimelessFavourites();
    }, [page]);

    return (
        <div className='results-container'>
            <Header />
            <div className='results-banner'>Timeless Favourites</div>
            <div className='movie-grid'>
                {results.map((movie) => (
                    <div key={movie.id} className='movie-card'>
                        <div>
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} 
                            className='movie-poster'
                            />
                        <p className='timeless-movie-title'>{movie.title}</p>
                        </div>
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

export default TimelessFavouritesPage;