const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const userExists = await User.findOne({ username });
        if (userExists) return res.status(400).json({ message: 'User already exists' });
        
        const user = new User({ username, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully', username: user.username });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        
        if (!user || user.password !== password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        res.json({ message: 'Login successful', username: user.username });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
