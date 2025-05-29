const redisClient = require('../utils/redisClient');

// Save a draft trip
const saveDraftTrip = async (req, res) => {
  const { userId, draft } = req.body;
  if (!userId || !draft) return res.status(400).json({ message: 'userId and draft are required' });

  try {
    await redisClient.set(`tripDraft:${userId}`, JSON.stringify(draft), {
      EX: 3600 // expires in 1 hour
    });
    res.json({ message: 'Draft trip saved in Redis' });
  } catch (err) {
    res.status(500).json({ message: 'Redis error', error: err.message });
  }
};

// Get a draft trip
const getDraftTrip = async (req, res) => {
  const { userId } = req.params;
  try {
    const data = await redisClient.get(`tripDraft:${userId}`);
    if (!data) return res.status(404).json({ message: 'No draft found' });
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ message: 'Redis error', error: err.message });
  }
};

module.exports = { saveDraftTrip, getDraftTrip };
