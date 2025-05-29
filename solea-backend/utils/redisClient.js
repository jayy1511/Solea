const { createClient } = require('redis');

const client = createClient({
  url: process.env.REDIS_URL, // must be set in .env
});

client.on('error', (err) => {
  console.error('❌ Redis Client Error:', err);
});

// ✅ Connect immediately
client.connect()
  .then(() => console.log('✅ Connected to Redis Cloud'))
  .catch(err => console.error('❌ Redis connection failed:', err.message));

module.exports = client;
