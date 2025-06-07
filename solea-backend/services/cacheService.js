const client = require('../utils/redisClient');

// Trip Drafts
async function saveDraft(userId, draft) {
  await client.setEx(`tripDraft:${userId}`, 3600, JSON.stringify(draft));
}
async function loadDraft(userId) {
  const json = await client.get(`tripDraft:${userId}`);
  return json ? JSON.parse(json) : null;
}
async function clearDraft(userId) {
  await client.del(`tripDraft:${userId}`);
}

// Recently Viewed Cities
const RECENT_KEY = (userId) => `recentCities:${userId}`;

async function addRecentlyViewedCity(userId, cityId) {
  await client.lPush(RECENT_KEY(userId), cityId);
  await client.lTrim(RECENT_KEY(userId), 0, 9); // Limit to 10 cities
}
async function getRecentlyViewedCities(userId) {
  return await client.lRange(RECENT_KEY(userId), 0, 9);
}

// Popular Cities
const POPULAR_KEY = 'popularCities';

async function cachePopularCities(cityArray) {
  await client.setEx(POPULAR_KEY, 3600, JSON.stringify(cityArray)); // 1hr cache
}
async function getCachedPopularCities() {
  const data = await client.get(POPULAR_KEY);
  return data ? JSON.parse(data) : null;
}

module.exports = {
  saveDraft,
  loadDraft,
  clearDraft,
  addRecentlyViewedCity,
  getRecentlyViewedCities,
  cachePopularCities,
  getCachedPopularCities
};
