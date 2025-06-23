const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { isAuthenticated } = require('../middleware/auth');

router.post('/addWatched', isAuthenticated, async (req, res) => {
    const {movieId} = req.body;
    await User.findByIdAndUpdate(req.session.user.id, {
        $addToSet: {watchedListMovies: movieId}
    });
    res.json({success: true});
});

router.post('/addWish', isAuthenticated, async (req, res) => {
    const {movieId} = req.body;
    await User.findByIdAndUpdate(req.session.user.id, {
        $addToSet: {wishlistMovies: movieId}
    });
    res.json({success: true});
});

router.get('/watched', isAuthenticated, async (req,res) => {
    const user = await User.findById(req.session.user.id);
    res.json({ movies: user.watchedListMovies});
});

router.get('/user/wish', isAuthenticated, async (req,res) => {
    const user = await User.findById(req.session.user.id);
    res.json({ movies: user.wishlistMovies});
});

module.exports = router;