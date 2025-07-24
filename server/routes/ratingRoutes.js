const express = require('express');
const router = express.Router();
const Rating = require('../models/Rating');
const { isAuthenticated } = require('../middleware/auth');

router.post('/:movieId', isAuthenticated, async (req, res) => {
    const { movieId } = req.params;
    const { rating } = req.body;
    const userId = req.user.id;

    try {
        const existing = await Rating.findOne({ movieId, userId });

        if (existing) {
            existing.rating = rating;
            await existing.save();
            return res.status(200).json({ message: 'Rating updated'});
        }

        const newRating = new Rating({ movieId, userId, rating});
        await newRating.save();

        res.status(201).json({ message: 'Rating added'});
    } catch (err) {
        res.status(500).json({ message: 'Failed to rate movie', error: err.message});
    }
});

module.exports = router;