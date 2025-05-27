const express = require('express');
const router = express.Router();

// Example protected route (we'll add middleware later)
router.get('/profile', (req, res) => {
  res.send('User profile route (to be implemented)');
});

router.put('/preferences', (req, res) => {
  res.send('Update user preferences route (to be implemented)');
});

router.get('/:id/trips', (req, res) => {
  res.send('Get all user trips route (to be implemented)');
});

module.exports = router;
