import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import './WatchedListPage.css';
import Filter from '../components/Filter';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const WatchedListPage = () => {
    const [showFilters, setShowFilters] = useState(false);
    const [ movies, setMovies]= useState([]);
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [ totalPages, setTotalPages] = useState(1);
    const {id} = useParams();

    const handleSearch = async (queryParams) => {
        try {
            const res = await axios.get('http://localhost:5050/api/movie/search', {params : queryParams});
            navigate('/results', {state : {results: res.data}} );
        } catch (err) {
            console.error('Search failed', err);
        }
    }

    const removeFromWatchedList = async (movieId) => {
        try {
            await axios.post('http://localhost:5050/api/user/removeFromWatchedlist', {movieId }, { withCredentials: true});
            setMovies((prev) => prev.filter((m) => m.id !== movieId));
        } catch (err) {
            console.error('Failed to remove movie');
        }
    };

    useEffect(() => {
        const fetchWatchedMovies = async (pageNum) => {
            try {
                const endpoint = id 
                ? `http://localhost:5050/api/user/${id}/watchedlist`
                : 'http://localhost:5050/api/user/watchedlist'

                const res = await axios.get(endpoint, {
                    params: {page: pageNum},
                    withCredentials : true
                });
                setMovies(res.data.result);
                setTotalPages(res.data.totalPages)
            } catch(err) {
                console.error('Failed to get movies', err);
                setMovies([]);
            }
        };
        fetchWatchedMovies(page);
    }, [page, id]);

    return (
        <div className='watched-list-container'>
            <Header onSearchBarFocus={() => !showFilters && setShowFilters(true)} onSearch={handleSearch}/>
            {showFilters && <Filter onSearch={handleSearch} onClose={()=> setShowFilters(false)}/>}
            
            <h1 className='page-title'>Your Watchedlist</h1>
            <p>Movies marked as Watched will appear here</p>

            <div className='movie-grid'>
                {movies.map((movie, index) => (
                    <div className='movie-card' key={movie.id}>
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt= {movie.title} />
                        <h4>{movie.title}, {movie.release_date?.slice(0,4)}</h4>
                        <button className='remove-button'
                        onClick={() => removeFromWatchedList(movie.id)}>Remove</button>
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

export default WatchedListPage;