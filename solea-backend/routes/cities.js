const express = require('express');
const router = express.Router();

// Get all cities
router.get('/', (req, res) => {
  res.send('Fetch all cities (to be implemented)');
});

// Get cities by continent
router.get('/continent/:continent', (req, res) => {
  res.send(`Fetch cities in ${req.params.continent} (to be implemented)`);
});

// Get detailed info for a single city
router.get('/:cityId', (req, res) => {
  res.send(`Get full details of city ${req.params.cityId} (to be implemented)`);
});

module.exports = router;
