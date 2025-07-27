import React, {useState} from 'react';
import axios from 'axios';
import './EditReviewButton.css';

const EditReviewButton = ({ review, onReviewUpdated }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [reviewText, setReviewText] = useState(review.text);
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
            const response = await axios.post(`${BACKEND_URL}/api/reviews${review._id}`, { text: reviewText },
                { withCredentials: true }
            );

            setIsOpen(false);
            onReviewUpdated(response.data);
        } catch (err) {
            console.error('Review update failed:', err);
            setError(err.response?.data?.error || 'Failed to update review'); 
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <button className="edit-review-button" onClick={() => setIsOpen(true)} aria-label="Edit your review">
                ✏️
            </button>

            {isOpen && (
                <div className="review-popup-overlay">
                    <div className="review-popup">
                        <button 
                            className="popup-close-button"
                            onClick={() => setIsOpen(false)}
                            aria-label="Close edit popup"
                        >
                            ×
                        </button>

                        <h3>Edit Your Review</h3>

                        {error && <div className="error-message">{error}</div>}
                        
                        <form onSubmit={handleSubmit}>
                            <textarea
                                value={reviewText}
                                onChange={(e) => {
                                    setReviewText(e.target.value);
                                    setError(null);
                                }}
                                placeholder="Edit your review here."
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
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit" 
                                    className="submit-button"
                                    disabled={isSubmitting || !reviewText.trim()}
                                >
                                    {isSubmitting ? 'Updating...' : 'Update'}
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            )}
        </>
    );
};

export default EditReviewButton;