const client = require('../utils/redisClient');

// save draft
async function saveDraft(userId, draft) {
  await client.setEx(`tripDraft:${userId}`, 3600, JSON.stringify(draft));
}

// load draft
async function loadDraft(userId) {
  const json = await client.get(`tripDraft:${userId}`);
  return json ? JSON.parse(json) : null;
}

// delete draft
async function clearDraft(userId) {
  await client.del(`tripDraft:${userId}`);
}

module.exports = { saveDraft, loadDraft, clearDraft };
