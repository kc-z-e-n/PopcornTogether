const express = require('express');
const mongoose = require('mongoose');
const { isAuthenticated } = require('../middleware/auth');
const router = express.Router();
const User = require('../models/User');

router.get('/search', isAuthenticated, async (req, res) => {
    const {query} = req.query;

    try {
        const users = await User.find({
            Username : {username: {$regex: query, $options: 'i'}}
        }).select('_id username');

        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Search failed'});
    }
});
  
router.post('/add', async (req, res) => {
    const {userId, friendId} = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(friendId)) {
        return res.status(400).json({message: "invalid user IDs"});
    }

    if (userId == friendId) {
        return res.status(400).json({message: "You cannot add yourself"});
    }

    try {
        const user = await User.findById(userId);
        const friend = await User.findById(friendId);

        if (!user || !friend) {
            return res.status(404).json({message: "User or friend not found"});
        }

        if (!user.friends.include(friendId)) {
            user.friends.push(friendId);
            await user.save();
        }

        res.status(200).json({message: "Friend added successfully"});
    } catch (err) {
        res.status(500).json({message: "Server error", error : err.message});
    }
});

router.post('./remove', async (req, res) => {
    const {userId, friendId} = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found"});
        };

        user.friends = user.friends.filter(id => id.toString() != friendId);
        await user.save();

        res.status(200).json({message: "Friend removed successfully"})
    } catch (err) {
        res.status(500).json({message: " Server error", error: err.message});
    }
});

router.get('/:userId', async (req, res) => {
    const {userId} = req.params;

    try {
        const user = await User.findById(userId).populate('friends', 'username firstName lastName watchedlistMovies wishlistMovies')
        if (!user) {
            return res.status(404).json({ message: "User not found"});
        };
        
        res.status(200).json({friends: user.friends});
    } catch (err) {
        res.status(500).json({message: 'Server error', error: err.message});
    }
});

module.exports = router;
