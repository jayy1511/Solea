const driver = require('../utils/neo4jClient');

// Get recommended cities based on tag
async function getCitiesByTag(tagName) {
  const session = driver.session();
  try {
    const result = await session.run(
      `
      MATCH (t:Tag {name: $tag})<-[:HAS_TAG]-(c:City)
      RETURN c.name AS city, c.description AS description
      `,
      { tag: tagName }
    );
    return result.records.map(rec => rec.toObject());
  } finally {
    await session.close();
  }
}

// Get recommendations from a city (connected nodes)
async function getCityRecommendations(cityName) {
  const session = driver.session();
  try {
    const result = await session.run(
      `
      MATCH (c:City {name: $city})-[:RELATED_TO]->(rec:City)
      RETURN rec.name AS recommendation
      `,
      { city: cityName }
    );
    return result.records.map(rec => rec.get('recommendation'));
  } finally {
    await session.close();
  }
}

module.exports = { getCitiesByTag, getCityRecommendations };