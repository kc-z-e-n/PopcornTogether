import React from 'react';
import './AverageRating.css';

const AverageRating = ({ average, count}) => {
    const roundedAverage = Math.round(average * 10) / 10;

    return (
        <div className="average-rating-container">
            <div className="average-rating-value">
                <span className="average-number">{roundedAverage}</span>
                <span className="average-star">★</span>
            </div>
            <div  className="rating-count">({count} ratings)</div>
        </div>
    );
};

export default AverageRating;