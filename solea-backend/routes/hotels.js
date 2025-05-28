const express = require('express');
const router = express.Router();
const {
  getAllHotels,
  getHotelsByCity,
  getHotelById,
} = require('../controllers/hotelController');

// Get all hotels
router.get('/', getAllHotels);

// Get hotels in a specific city
router.get('/city/:cityId', getHotelsByCity);

// Get hotel details by ID
router.get('/:hotelId', getHotelById);

module.exports = router;
