import React, {useState} from 'react';
import axios from 'axios';
import './ReviewButton.css';

const ReviewButton = ({ movieId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [reviewText, setReviewText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!reviewText.trim()) {
            setError('Review cannot be empty');
            return;
        }

        if (reviewText.length > 1500) {
            setError('Review must be under 1500 characters');
            return;
        }

        setIsSubmitting(true);
        console.log('Review submitted:', reviewText);

        try {
            console.log('POSTing to:', `${BACKEND_URL}/api/reviews`);
            
            await axios.post(`${BACKEND_URL}/api/reviews`, { movieId, text: reviewText },
                { withCredentials: true }
            );

            setIsOpen(false);
            setReviewText('');
        } catch (err) {
            console.error('Review submission failed:', err);
            setError(err.response?.data?.error || 'Failed to submit review'); 
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <button className="review-button" onClick={() => setIsOpen(true)} aria-label="Write a review">
                Write Your Review!
            </button>

            {isOpen && (
                <div className="review-popup-overlay">
                    <div className="review-popup">
                        <button 
                            className="popup-close-button"
                            onClick={() => setIsOpen(false)}
                            aria-label="Close review popup"
                        >
                            ×
                        </button>

                        <h3>Leave a Review</h3>

                        {error && <div className="error-message">{error}</div>}
                        
                        <form onSubmit={handleSubmit}>
                            <textarea
                                value={reviewText}
                                onChange={(e) => {
                                    setReviewText(e.target.value);
                                    setError(null);
                                }}
                                placeholder="Share your thoughts about this movie! (Max 1500 characters)"
                                className="review-textarea"
                                maxLength={1500}
                                required
                                disabled={isSubmitting}
                            />
                            
                            <div className="popup-buttons">
                                <button 
                                    type="button" 
                                    className="cancel-button"
                                    onClick={() => setIsOpen(false)}
                                    // disabled={isSubmitting}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit" 
                                    className="submit-button"
                                    disabled={isSubmitting || !reviewText.trim()}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit'}
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            )}
        </>
    );
};

export default ReviewButton;

/*
                        <form onSubmit={handleSubmit}>
                            <textarea
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                                placeholder="Share your thoughts about this movie!"
                                className="review-textarea"
                            />
                            <div className="popup-buttons">
                                <button 
                                    type="button" className="cancel-button" onClick={() => setIsOpen(false)}>
                                    Cancel
                                </button>
                                <button
                                    type="submit" className="submit-button" >
                                    Submit
                                </button>
                            </div>
                        </form>
*/