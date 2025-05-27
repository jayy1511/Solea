const express = require('express');
const router = express.Router();

// Get all hotels (optional)
router.get('/', (req, res) => {
  res.send('Fetch all hotels (to be implemented)');
});

// Get hotels by city ID
router.get('/city/:cityId', (req, res) => {
  res.send(`Fetch hotels in city ${req.params.cityId} (to be implemented)`);
});

// (Optional) Get detailed hotel info
router.get('/:hotelId', (req, res) => {
  res.send(`Get hotel details for ${req.params.hotelId} (to be implemented)`);
});

module.exports = router;
