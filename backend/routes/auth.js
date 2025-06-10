const express = require('express');
const router = express.Router();
const auth = require('../auth');

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const { token, user } = await auth.loginUser(username, password);
        res.json({ token, user });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
});

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const userId = await auth.registerUser(username, email, password);
        res.json({ message: 'User registered successfully', userId });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
