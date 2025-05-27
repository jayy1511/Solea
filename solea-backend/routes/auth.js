const express = require('express');
const router = express.Router();
const { hashPassword } = require('../middlewares/passencrypt');

// TEMP: Test password encryption directly via route
router.post('/register', hashPassword, (req, res) => {
  const { email, password } = req.body;
  res.json({
    email,
    hashedPassword: password,
    msg: 'User registration simulation with password encryption'
  });
});

module.exports = router;
