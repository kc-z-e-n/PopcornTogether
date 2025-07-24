const express = require('express');
const router = express.Router();
const Rating = require('../models/Rating');
const { isAuthenticated } = require('../middleware/auth');

router.get('/:movieId', isAuthenticated, async (req, res) => {
    const {movieId} = req.params;
    const userId = req.user.id;

    try {
        const rating = await Rating.findOne({ movieId, userId });
        res.json({ rating: rating ? rating.rating : null});
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch rating', error: err.message });
    }
});

router.post('/:movieId', isAuthenticated, async (req, res) => {
    console.log('POST /api/rating/:movieId called');
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

router.get('/average/:movieId', async (req, res) => {
    //const {movieId} = req.params;

    try {
        const movieId = Number(req.params.movieId);
        const result = await Rating.find({movieId});
        console.log(`Found ${result.length} ratings for movie ${movieId}`);

        if (result.length === 0) {
            return res.json({
                averageRating: 0, count: 0
            });
        } 

        const sum = result.reduce((acc, curr) => acc + curr.rating, 0);
        const average = sum / result.length;

        res.json({
            averageRating: parseFloat(average.toFixed(1)), count: result.length
        });

    } catch (err) {
        res.status(500).json({ message: 'Failed to calculate average rating', error: err.message});
    }
});

module.exports = router;