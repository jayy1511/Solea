// routes/redis.js
const express = require('express');
const router = express.Router();
const { saveDraft, loadDraft, clearDraft } = require('../services/cacheService');

// Save trip draft
router.post('/draft/:userId', async (req, res) => {
  try {
    await saveDraft(req.params.userId, req.body);
    res.json({ message: 'Trip draft saved ✅' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Load trip draft
router.get('/draft/:userId', async (req, res) => {
  try {
    const draft = await loadDraft(req.params.userId);
    res.json({ draft });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Clear trip draft
router.delete('/draft/:userId', async (req, res) => {
  try {
    await clearDraft(req.params.userId);
    res.json({ message: 'Trip draft cleared ❌' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
