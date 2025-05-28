const express = require('express');
const router = express.Router();
const {
  getRecommendationsByCity,
  getRecommendationsByUser
} = require('../controllers/recommendationController');

// @route   GET /api/recommendations/city/:cityId
// @desc    Get recommendations based on a city
router.get('/city/:cityId', getRecommendationsByCity);

// @route   GET /api/recommendations/user/:userId
// @desc    Get personalized recommendations for a user
router.get('/user/:userId', getRecommendationsByUser);

module.exports = router;
