const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User');

router.post('/register', async (req, res) => {
    const {
        firstName,
        lastName,
        username,
        dateOfBirth,
        email,
        password,
        confirmPassword,
        agreedToTerms,
    } = req.body;

    if (!agreedToTerms) {
        return res.status(400).json({ message: 'You must agree to the terms and privacy policy.' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match.' });
    }

    try {
        const existing = await User.findOne({ $or: [{ email }, { username }] });
        if (existing) {
            return res.status(409).json({ message: 'Email or username already in use.' });
        }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({
          firstName,
          lastName,
          username,
          dateOfBirth,
          email,
          password: hashedPassword,
          agreedToTerms,
      });

       await user.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user)
            return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(401).json({ message: 'Invalid password' });

    res.status(200).json({
        message: 'Login successful',
        user: {
            id: user._id,
            firstName: user.firstName,
            username: user.username,
            email: user.email,
        }
    });
    } catch (err) {
        res.status(500).json({ message: 'Login failed', error: err.message });
    }
});

module.exports = router;
