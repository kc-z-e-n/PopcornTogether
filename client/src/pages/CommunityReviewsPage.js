import React, {useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Filter from '../components/Filter';
import StarRating from '../components/StarRating';
import './CommunityReviewsPage.css';
import axios from 'axios';
import AverageRating from '../components/AverageRating';

function CommunityReviewsPage() {
    const {movieId} = useParams();
    const [movie, setMovie] = useState(null);
    const [showFilters, setShowFilters] = useState(false);
    const [user, setUser] = useState(null);
    const [averageRating, setAverageRating] = useState({ average: 0, count: 0});
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
        const fetchMovie = async () => {
            try {
                const res = await axios.get(`${BACKEND_URL}/api/movie/community/${movieId}`);
                setMovie(res.data);
            } catch (err) {
                console.error('Failed to retrieve movie', err);
            }
        };
        fetchMovie();
    }, [movieId]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`${BACKEND_URL}/api/retrieve`, {withCredentials: true});
                setUser(res.data.user);
            } catch (err) {
                console.error('Failed to fetch user', err);
            }
        };
        fetchUser();
    }, []);

    useEffect(() => {
        const fetchAverageRating = async () => {
            try {
                console.log("Fetching average for movieId:", movieId);
                const res = await axios.get(`${BACKEND_URL}/api/rating/average/${movieId}`, {withCredentials: true});
                console.log("API Response:", res.data);
                setAverageRating({
                    average: res.data.averageRating || 0, count: res.data.count || 0
                });
            } catch (err) {
                console.error('Failed to fetch average rating', err);
            }
        };
        fetchAverageRating();
    }, [movieId]);

    if (!movie) {
        return <div className='community-reviews-container'>Loading...</div>;
    }

    return (
        <div className='community-reviews-container'>
            <Header onSearchBarFocus={() => !showFilters && setShowFilters(true)} onSearch={handleSearch}/>
            {showFilters && <Filter onSearch={handleSearch} onClose={()=> setShowFilters(false)}/>}

            <div className='review-banner'>
                <h2>{movie.title}'s Reviews</h2>
            </div>

            <button className='back-button' onClick={() => navigate(-1)}>Back</button>

            <div className='movie-info'>
                <div className='poster-rating=group'>
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className='movie-poster' />

                    <AverageRating average={averageRating.average} count={averageRating.count} className="movie-rating"/>
                </div>

                <div className='movie-details'>
                    <h1>{movie.title}</h1>

                    <div className='movie-meta'> 
                        <span>{movie.release_date?.substring(0, 4)}</span>
                        {movie.genres?.length > 0 && (
                            <span>
                                &nbsp;&nbsp;•&nbsp;&nbsp;
                                {movie.genres.map((genre) => genre.name).join(', ')}
                            </span>
                        )}
                    </div>

                    <p className='movie-synopsis'>{movie.overview}</p>
                    {user && <StarRating movieId={movie.id} userId={user._id} />}
                
                </div>
            </div>
        </div>
    );
}

export default CommunityReviewsPage;