const express = require('express');
const router = express.Router();
const {
  getCityRecommendations,
  getUserRecommendations
} = require('../controllers/recommendationController');

router.get('/city/:cityId', getCityRecommendations);
router.get('/user/:userId', getUserRecommendations);

module.exports = router;
