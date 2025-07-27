import React from 'react';
import axios from 'axios';
import './DeleteReviewButton.css';

const DeleteReviewButton = ({ reviewId, onDelete }) => {
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this review?')) {
            try {
                await axios.post(`${BACKEND_URL}/api/reviews/remove-review`, {reviewId}, {withCredentials: true}
                );
                onDelete(reviewId);
            } catch (err) {
                console.error('Delete failed:', err);
                alert('Failed to delete review');
            }
        }
    };

    return (
        <button className="delete-review-button" onClick={handleDelete} aria-label="Delete review">
            🗑️
        </button>
    );
};

export default DeleteReviewButton;