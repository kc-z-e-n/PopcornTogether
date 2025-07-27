const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const { isAuthenticated } = require('../middleware/Auth');

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

//update review
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


 // delete review
router.post('/remove-review', isAuthenticated, async (req, res) => {
  try {
    const {reviewId} = req.body;
    const userId = req.user.id;
    console.log('STARTING DELETE');

    const review = await Review.deleteOne({ _id: reviewId, userId});
    console.log('DELETE OPERATION COMPLETE', review);

    if (!review) {
      console.log('NO REVIEW FOUND');
      return res.status(404).json({ error: "Review not found or not authorized" });
    }

    const stillExists = await Review.findById(req.params.id);
    console.log('Post-deletion verification:', stillExists); // Should be null

    res.json({ message: 'Review deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;