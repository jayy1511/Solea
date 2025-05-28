const express = require('express');
const router = express.Router();
const {
  getUserProfile,
  updateUserPreferences,
  getUserTrips,
} = require('../controllers/userController');
const verifyToken = require('../middlewares/authMiddleware');

// 🛡️ Protect these routes
router.get('/profile', verifyToken, getUserProfile);
router.put('/preferences', verifyToken, updateUserPreferences);
router.get('/:id/trips', verifyToken, getUserTrips);

module.exports = router;
