const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { isAuthenticated } = require('../middleware/auth');

router.get('/watchedStats', async (req, res) => {
    try {
        const userId = req.session.user.id;
        console.log('Session user ID:', userId);
        if (!userId) {
            return res.status(401).json({message: 'Unauthorised'});
        }
        const user = await User.findById(userId);
        console.log('Watched list from DB:', user.watchedListMovies);
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        res.json({ watchedListMovies: user.watchedListMovies || [] });

    } catch (err) {
        console.error('Error fetching watched list:', err);
        res.status(500).json({ message: 'Server error'});
    }
});

module.exports = router;