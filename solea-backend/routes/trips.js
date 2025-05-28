const express = require('express');
const router = express.Router();
const {
  createTrip,
  addCityToTrip,
  addHotelToTrip,
  getTripById,
  confirmTrip
} = require('../controllers/tripController');
const verifyToken = require('../middlewares/authMiddleware');

// 🛡️ Protect all trip routes
router.post('/', verifyToken, createTrip);
router.post('/:tripId/cities', verifyToken, addCityToTrip);
router.post('/:tripId/hotels', verifyToken, addHotelToTrip);
router.get('/:tripId', verifyToken, getTripById);
router.post('/:tripId/confirm', verifyToken, confirmTrip);

module.exports = router;
