console.log('🧭 reviewRoutes.js loaded');

const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const { isAuthenticated } = require('../middleware/Auth');

router.post('/test-route', async (req, res) => {
    console.log('🎯 TEST ROUTE HIT');
    res.send('OK');
  });

router.post('/', isAuthenticated, async(req, res) => {
    try {
        const { movieId, text } = req.body;
        const userId = req.user.id;

        if (!text || text.trim().length < 10) {
            return res.status(400).json({ error: "Review must be at least 10 characters"});
        }

        const review = new Review({ movieId, userId, text: text.trim()});
        await review.save();
        res.status(201).json(review);
    } catch (err) {
        res.status(400).json({ error: err.message});
    }
});

// all public movie reviews
router.get('/movie:movieId', async (req, res) => {
    try {
        const reviews = await Review.find({ movieId: req.params.movieId }).populate('userId', 'username')
            .sort({ createdAt: -1});
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch reviews"});
    }
});

//specific user's reviews
router.get('/user/:movieId', isAuthenticated, async (req, res) => {
    try {
        const review = await Review.findOne({ movieId: req.params.movieId, userId: req.user.id });
        res.json(review || null);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
});

/* PUT - Update review
router.put('/:id', isAuthenticated, async (req, res) => {
    try {
      const review = await Review.findOneAndUpdate(
        { _id: req.params.id, userId: req.user.id },
        { text: req.body.text, rating: req.body.rating },
        { new: true }
      );
      res.json(review);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  */

 /* // DELETE - Remove review
router.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    await Review.deleteOne({ 
      _id: req.params.id, 
      userId: req.user.id 
    });
    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
*/

module.exports = router;