const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { isAuthenticated } = require('../middleware/auth');
const axios = require('axios');

//add
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

//fetch
router.get('/watchedList', isAuthenticated, async (req, res) => {
    const {page = 1, pageSize = 8} = req.query;
    const skip = (page - 1) * pageSize;

    try {
        console.log('User session id: ', req.session.user.id)
        const user = await User.findById(req.session.user.id);
        if (!user) {
            return res.status(404).json({message: 'User not found'}) ;
        }

        const totalMovies = user.watchedListMovies.length;
        const totalPages = Math.ceil(totalMovies / pageSize);
        const movieIds = user.watchedListMovies.slice(skip, skip + parseInt(pageSize)) || [];

        const movieDetails = await Promise.all(
            movieIds.map(id => 
                axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
                    params: {api_key: process.env.TMDB_API_KEY}
            }).then(res=> res.data).catch(() => null)
            )
        );

        res.json({result: movieDetails, totalPages});
    } catch (err) {
        console.error('Failed to fetch Watched list', err);
        res.status(500).json({message: 'Error fetching Watched list'});
    }
});


router.get('/wishList', isAuthenticated, async (req, res) => {
    const {page = 1, pageSize = 8} = req.query;
    const skip = (page - 1) * pageSize;

    try {
        console.log('User session id: ', req.session.user.id)
        const user = await User.findById(req.session.user.id);
        if (!user) {
            return res.status(404).json({message: 'User not found'}) ;
        }

        const totalMovies = user.wishlistMovies.length;
        const totalPages = Math.ceil(totalMovies / pageSize);
        const movieIds = user.wishlistMovies.slice(skip, skip + parseInt(pageSize)) || [];

        const movieDetails = await Promise.all(
            movieIds.map(id => 
                axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
                    params: {api_key: process.env.TMDB_API_KEY}
            }).then(res=> res.data).catch(() => null)
            )
        );

        res.json({result: movieDetails, totalPages});
    } catch (err) {
        console.error('Failed to fetch Wishlist', err);
        res.status(500).json({message: 'Error fetching Wishlist'});
    }
});

//remove
router.post('/removeFromWatchedlist', isAuthenticated, async (req, res) => {
    const {movieId} = req.body;
    try {
        await User.findByIdAndUpdate(req.session.user.id,  {
            $pull: {watchedListMovies: movieId}
        });
        res.json({success : true});
    } catch(err) {
        res.status(500).json({message : 'Failed to remove movie'});
    }
});

router.post('/removeFromWishlist', isAuthenticated, async (req, res) => {
    const {movieId} = req.body;
    try {
        await User.findByIdAndUpdate(req.session.user.id,  {
            $pull: {wishlistMovies: movieId}
        });
        res.json({success : true});
    } catch(err) {
        res.status(500).json({message : 'Failed to remove movie'});
    }
});

//friends
router.get('/:id/watchedlist', async (req, res) => {
    const {id} = req.params;
    const {page = 1, pageSize = 8} = req.query;
    const skip = (page - 1) * pageSize;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({message:'User not found'});
        }

        const totalMovies = user.watchedListMovies.length;
        const totalPages = Math.ceil(totalMovies / pageSize);
        const movieIds = user.watchedListMovies.slice(skip, skip + parseInt(pageSize)) || [];

        const movieDetails = await Promise.all(
            movieIds.map(id => 
                axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
                    params: {api_key: process.env.TMDB_API_KEY}
            }).then(res=> res.data).catch(() => null)
            )
        );

        res.json({result: movieDetails, totalPages});
    } catch (err) {
        console.error('Failed to fetch Watched List:', err);
        res.status(500).json({message: 'Error fetching Watched List'});
    }
});

router.get('/:id/wishlist', async (req, res) => {
    const {id} = req.params;
    const {page = 1, pageSize = 8} = req.query;
    const skip = (page - 1) * pageSize;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({message:'User not found'});
        }

        const totalMovies = user.wishlistMovies.length;
        const totalPages = Math.ceil(totalMovies / pageSize);
        const movieIds = user.wishlistMovies.slice(skip, skip + parseInt(pageSize)) || [];

        const movieDetails = await Promise.all(
            movieIds.map(id => 
                axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
                    params: {api_key: process.env.TMDB_API_KEY}
            }).then(res=> res.data).catch(() => null)
            )
        );

        res.json({result: movieDetails, totalPages});
    } catch (err) {
        console.error('Failed to fetch Wishlist:', err);
        res.status(500).json({message: 'Error fetching Wishlist'});
    }
});

module.exports = router;