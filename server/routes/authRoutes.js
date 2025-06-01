const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User');

router.post('/signup', async (req, res) => {
  const {
    firstName,
    lastName,
    username,
    email,
    dateOfBirth,
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
      email,
      dateOfBirth,
      password: hashedPassword,
      agreedToTerms,
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
