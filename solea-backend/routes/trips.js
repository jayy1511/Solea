const express = require('express');
const router = express.Router();

// Create a new trip
router.post('/create', (req, res) => {
  res.send('Create a new trip (to be implemented)');
});

// Add a city to an existing trip
router.post('/:tripId/add-city', (req, res) => {
  res.send(`Add city to trip ${req.params.tripId} (to be implemented)`);
});

// Add a hotel to a city inside a trip
router.post('/:tripId/add-hotel', (req, res) => {
  res.send(`Add hotel to trip ${req.params.tripId} (to be implemented)`);
});

// View trip details
router.get('/:tripId', (req, res) => {
  res.send(`View details for trip ${req.params.tripId} (to be implemented)`);
});

// Confirm and finalize trip
router.post('/:tripId/confirm', (req, res) => {
  res.send(`Confirm trip ${req.params.tripId} (to be implemented)`);
});

module.exports = router;
