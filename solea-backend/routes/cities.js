const express = require('express');
const router = express.Router();
const {
  getAllCities,
  getCitiesByContinent,
  getCityById,
} = require('../controllers/cityController');

// Get all cities
router.get('/', getAllCities);

// Get cities by continent
router.get('/continent/:continent', getCitiesByContinent);

// Get detailed info for a single city
router.get('/:cityId', getCityById);

module.exports = router;
