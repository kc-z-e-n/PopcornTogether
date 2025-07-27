import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ReviewsPage.css';
import EditReviewButton from '../components/EditReviewButton';
import DeleteReviewButton from '../components/DeleteReviewButton';

const ReviewsPage = () => {
    const {movieId} = useParams();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
    const navigate = useNavigate();
    
    const handleDeleteReview = (reviewId) => {
        setReviews(reviews.filter(review => review._id !== reviewId));
      };

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

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const res = await axios.get(`${BACKEND_URL}/api/retrieve`, {
                    withCredentials: true
                });
                setCurrentUser(res.data.user);
            } catch (err) {
                console.error('Failed to fetch user:', err);
            }
        };
        fetchCurrentUser();
    }, []);

    if (loading) return <div>Loading reviews...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="reviews-page-wrapper">
            <div className="reviews-container">
                <button className="back-button" onClick={() => navigate(-1)} >
                    Back
                </button>
                <h1>Community Reviews</h1>
                {reviews.length === 0 ? (
                    <p>No reviews yet. Be the first!</p>
                ) : (
                    reviews.map((review) => {
                        return (
                        <div key={review._id} className="review-card">
                            <div className="review-header">
                                <h3>{review.userId?.username || 'Anonymous'}</h3>
                                <div className="review-actions">
                                    {review.userId?._id === currentUser?._id && (
                                        <EditReviewButton review={review} onReviewUpdated={(updatedReview) => {
                                            setReviews(reviews.map(r =>
                                                r._id === updatedReview._id ? updatedReview : r
                                            ));
                                        }} />
                                    )}
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                            <p className="review-text">{review.text}</p>
                            {review.userId?._id === currentUser?._id && (
                                <div className="delete-buttons-container">
                                    <DeleteReviewButton reviewId={review._id} onDelete={handleDeleteReview} />
                                </div>
                            )}
                        </div>
                    );
                })
                )}
            </div>
        </div>
    );
};

export default ReviewsPage;