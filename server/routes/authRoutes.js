const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User');
const {isAuthenticated} = require('../middleware/auth');

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
    
    req.session.user = {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    };
    res.status(200).json({
        message: 'Login successful',
        user: req.session.user
    });
    } catch (err) {
        res.status(500).json({ message: 'Login failed', error: err.message });
    }
});
  
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
          console.error('Logout error: ', err);
          return res.status(500).json({ message: 'Logout failed'});
        }
        res.clearCookie('connect.sid');
        res.status(200).json({ message: 'Logout successful'});
  });
})

router.get('/me', (req, res) => {
    if (req.session && req.session.user) {
        res.json({user : req.session.user});
    }else {
        res.status(401).json({message: 'Unauthorized'});
    }
})

router.get('/retrieve', isAuthenticated, async (req, res) => {
    try {
        const user = await User.findById(req.session.user.id).select('-password');
        if (!user) {
            return res.status(404).json({message : 'User not found'});
        }
        console.log('User info:', user)
        res.json({user});
    } catch (err) {
        console.error('Failed to retrieve info: ', err);
        res.status(500).json({message : 'Error retrieving info'});
    }
});

module.exports = router;
