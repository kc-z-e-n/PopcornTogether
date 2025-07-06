import React, {useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Filter from '../components/Filter';
import './CommunityReviewsPage.css';
import axios from 'axios';

function CommunityReviewsPage() {
    const {movieId} = useParams();
    const [movie, setMovie] = useState(null);
    const [showFilters, setShowFilters] = useState(false);
    const navigate = useNavigate();
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    const handleSearch = async (queryParams) => {
        try {
            const res = await axios.get(`${BACKEND_URL}/api/movie/search`, {params : queryParams});
            navigate('/results', {state : {results: res.data}} );
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

    if (!movie) {
        return <div className='community-reviews-container'>Loading...</div>;
    }

    return (
        <div className='community-reviews-container'>
            <Header onSearchBarFocus={() => !showFilters && setShowFilters(true)} onSearch={handleSearch}/>
            {showFilters && <Filter onSearch={handleSearch} onClose={()=> setShowFilters(false)}/>}

            <div className='review-banner'>
                <h2>{movie.title} Reviews</h2>
            </div>

            <button className='back-button'>Back</button>

            <div className='movie-info'>
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className='movie-poster' />

                <div className='movie-details'>
                    <h1>{movie.title}</h1>

                    <div className='movie-meta'>
                        <span>{movie.release_date?.substring(0, 4)}</span>
                        {movie.genres?.length > 0 && (
                            <span>
                                {movie.genres.map((genre) => genre.name).join(', ')}
                            </span>
                        )}
                    </div>

                    <p className='movie-synopsis'>{movie.overview}</p>
                </div>
            </div>


        </div>
    );
}

export default CommunityReviewsPage;