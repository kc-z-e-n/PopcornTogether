import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ReviewsPage.css';

const ReviewsPage = () => {
    const {movieId} = useParams();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await axios.get(`${BACKEND_URL}/api/reviews/movie${movieId}`);
                setReviews(res.data);
            } catch (err) {
                setError('Failed to load reviews');
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, [movieId]);

    if (loading) return <div>Loading reviews...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="reviews-page-wrapper">
            <div className="reviews-container">
                <h1>Community Reviews</h1>
                {reviews.length === 0 ? (
                    <p>No reviews yet. Be the first!</p>
                ) : (
                    reviews.map((review) => (
                        <div key={review._id} className="review-card">
                            <div className="review-header">
                                <h3>{review.userId?.username || 'Anonymous'}</h3>
                                <small>
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </small>
                            </div>
                            <p className="review-text">{review.text}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ReviewsPage;