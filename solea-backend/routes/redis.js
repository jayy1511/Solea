const express = require('express');
const router = express.Router();
const {
  saveDraftTrip,
  getDraftTrip,
  saveRecentCity,
  getRecentCities,
  updatePopularCities,
  getPopularCities
} = require('../controllers/redisController');

// Trip Drafts
router.post('/draft/:userId', saveDraftTrip);
router.get('/draft/:userId', getDraftTrip);
router.delete('/draft/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const { clearDraft } = require('../services/cacheService');
    await clearDraft(userId);
    res.json({ message: 'Trip draft cleared ❌' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Recently Viewed Cities
router.post('/recent/:userId', saveRecentCity);
router.get('/recent/:userId', getRecentCities);

// Popular Cities
router.post('/popular', updatePopularCities);
router.get('/popular', getPopularCities);

module.exports = router;
