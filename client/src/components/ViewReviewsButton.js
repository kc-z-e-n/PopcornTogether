import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ViewReviewsButtons.css';

const ViewReviewsButton = ({ movieId }) => {
    const navigate = useNavigate();

    return (
        <button
            className="view-reviews-btn"
            onClick={() => navigate(`/movie/${movieId}/reviews`)}
        >
            Read All Reviews
        </button>
    );
};

export default ViewReviewsButton;