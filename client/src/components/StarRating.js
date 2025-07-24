import React, {useState} from 'react';
import './StarRating.css';
import axios from 'axios';

const StarRating = ({ movieId, userId }) => {
    const [hovered, setHovered] = useState(0);
    const [selected, setSelected] = useState(0);
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    const handleClick = async (rating) => {
        console.log(`Star clicked: ${rating}`);
        setSelected(rating);

        try {
            await axios.post(`${BACKEND_URL}/api/rating/${movieId}`, {rating}, {withCredentials: true});
        } catch (err) {
            console.error('Failed to save rating:', err);
        }
    };

    return (
        <div className="star-rating">
            <p>Rate The Show</p>
            {[1, 2, 3, 4, 5].map((star) => (
                <span 
                    key={star} className={star <= (hovered || selected) ? 'filled-star' : 'star'}
                    onClick={() => handleClick(star)}
                    onMouseEnter={() => setHovered(star)}
                    onMouseLeave={() => setHovered(0)}
                >
                    ★
                </span>
            ))}
        </div>
    );
};

export default StarRating;