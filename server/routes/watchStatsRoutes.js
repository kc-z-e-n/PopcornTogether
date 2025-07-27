const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { isAuthenticated } = require('../middleware/Auth');
const axios = require('axios');
const Review = require('../models/Review');
const {ObjectId} = require('mongodb');

router.get('/watchedStats', async (req, res) => {
    try {
        const userId = req.session.user.id;
        if (!userId) {
            return res.status(401).json({message: 'Unauthorised'});
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        res.json({ watchedListMovies: user.watchedListMovies || [] });

    } catch (err) {
        console.error('Error fetching watched list:', err);
        res.status(500).json({ message: 'Server error'});
    }
});

router.get('/review-count/:userId', async (req, res) => {
    try {
        console.log('Received userId:', req.params.userId);
        const userId = req.params.userId;
        const count = await Review.countDocuments({userId});
        res.json({ count });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/runtime', async (req, res) => {
    const {movieIds} = req.body;

    if(!Array.isArray(movieIds)) {
        return res.status(400).json({message: 'movieIds must be an array'});
    }

    try {
        const movieDetails = await Promise.all(
            movieIds.map(id =>
                axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
                    params : {api_key:process.env.TMDB_API_KEY}
                }).then(res => res.data).catch(() => null)
            )
        );
        
        const totalRuntime = movieDetails.reduce((sum, movie) => {
            return sum + (movie?.runtime || 0);
        }, 0);

        res.json({totalRuntime});
    } catch (err) {
        console.error('Failed to calculate runtime', err);
        res.status(500).json({message : 'Internal server error'});
    }
});

router.post('/top-genre', async (req, res) => {
    const {movieIds} = req.body;

    if (!Array.isArray(movieIds)) {
        return res.status(400).json({message: 'movieIds must be an array'});
    }

    try {
        const movieDetails = await Promise.all(
            movieIds.map(id => 
                axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
                    params : {api_key: process.env.TMDB_API_KEY}
                }).then(res => res.data).catch(() => null)
            )
        );
        const genreCount = {};

        movieDetails.forEach(movie => {
            if (movie?.genres) {
                movie.genres.forEach(genre => {
                    genreCount[genre.name] = (genreCount[genre.name] || 0) + 1;
                });
            }
        });

        const maxCount = Math.max(...Object.values(genreCount));
        const topGenres = Object.entries(genreCount)
            .filter(([_, count]) => count === maxCount)
            .map(([genre]) => genre);

        res.json({topGenres});
    } catch (err) {
        console.error('Failed to calculate top genre', err);
        res.status(500).json({message: 'Internal server error'});
    }
});

module.exports = router;