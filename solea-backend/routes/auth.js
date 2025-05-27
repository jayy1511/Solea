const express = require('express');
const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
router.post('/register', (req, res) => {
  res.send('Register route hit (controller not implemented yet)');
});

// @route   POST /api/auth/login
// @desc    Login a user and return JWT
router.post('/login', (req, res) => {
  res.send('Login route hit (controller not implemented yet)');
});

module.exports = router;
