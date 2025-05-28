const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { hashPassword } = require('../middlewares/passencrypt');

// @route   POST /api/auth/register
// @desc    Register a new user (with real DB handling)
router.post('/register', register);

// @route   POST /api/auth/login
// @desc    Log in user and return JWT
router.post('/login', login);

// (OPTIONAL) TEMP: middleware test route (keep only if needed)
router.post('/test-register', hashPassword, (req, res) => {
  const { email, password } = req.body;
  res.json({
    email,
    hashedPassword: password,
    msg: 'User registration simulation with password encryption'
  });
});

module.exports = router;
