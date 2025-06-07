const {
  saveDraft,
  loadDraft,
  clearDraft,
  addRecentlyViewedCity,
  getRecentlyViewedCities,
  cachePopularCities,
  getCachedPopularCities
} = require('../services/cacheService');

// 🔄 Draft Trip
const saveDraftTrip = async (req, res) => {
  const { userId, draft } = req.body;
  if (!userId || !draft) return res.status(400).json({ message: 'userId and draft are required' });

  try {
    await saveDraft(userId, draft);
    res.json({ message: 'Draft trip saved in Redis' });
  } catch (err) {
    res.status(500).json({ message: 'Redis error', error: err.message });
  }
};

const getDraftTrip = async (req, res) => {
  try {
    const data = await loadDraft(req.params.userId);
    if (!data) return res.status(404).json({ message: 'No draft found' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Redis error', error: err.message });
  }
};

// 🕒 Recently Viewed
const saveRecentCity = async (req, res) => {
  const { userId } = req.params;
  const { cityId } = req.body;
  if (!cityId) return res.status(400).json({ message: 'cityId is required' });

  try {
    await addRecentlyViewedCity(userId, cityId);
    res.json({ message: 'City added to recently viewed list' });
  } catch (err) {
    res.status(500).json({ message: 'Redis error', error: err.message });
  }
};

const getRecentCities = async (req, res) => {
  try {
    const cities = await getRecentlyViewedCities(req.params.userId);
    res.json({ cities });
  } catch (err) {
    res.status(500).json({ message: 'Redis error', error: err.message });
  }
};

// 🔥 Popular Cities
const updatePopularCities = async (req, res) => {
  const { cities } = req.body;
  if (!cities || !Array.isArray(cities)) {
    return res.status(400).json({ message: 'cities (array) is required' });
  }

  try {
    await cachePopularCities(cities);
    res.json({ message: 'Popular cities cached' });
  } catch (err) {
    res.status(500).json({ message: 'Redis error', error: err.message });
  }
};

const getPopularCities = async (req, res) => {
  try {
    const cities = await getCachedPopularCities();
    if (!cities) return res.status(404).json({ message: 'No cache found' });
    res.json({ cities });
  } catch (err) {
    res.status(500).json({ message: 'Redis error', error: err.message });
  }
};

module.exports = {
  saveDraftTrip,
  getDraftTrip,
  saveRecentCity,
  getRecentCities,
  updatePopularCities,
  getPopularCities
};
