const driver = require('../utils/neo4jClient');

// City-based: Get cities that share similar tags
const getCityRecommendations = async (req, res) => {
  const { cityId } = req.params;
  const session = driver.session();

  try {
    const query = `
      MATCH (c1:City {name: $cityId})-[:HAS_TAG]->(tag:Tag)
      MATCH (c2:City)-[:HAS_TAG]->(tag)
      WHERE c1 <> c2
      WITH c2, COUNT(DISTINCT tag) AS score
      RETURN c2.name AS recommendedCity, score
      ORDER BY score DESC
    `;

    const result = await session.run(query, { cityId });

    const cities = result.records.map(record => ({
      city: record.get('recommendedCity'),
      score: record.get('score').toInt()
    }));

    res.json({ recommendedCities: cities });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  } finally {
    await session.close();
  }
};

// User-based: Recommend based on tags in user's trip history
const getUserRecommendations = async (req, res) => {
  const { userId } = req.params;
  const session = driver.session();

  try {
    const query = `
      MATCH (u:User {id: $userId})-[:BOOKED]->(:Trip)-[:CONTAINS]->(visited:City)
      MATCH (visited)-[:HAS_TAG]->(tag:Tag)
      MATCH (rec:City)-[:HAS_TAG]->(tag)
      WHERE NOT (u)-[:BOOKED]->(:Trip)-[:CONTAINS]->(rec)
      WITH rec, COUNT(DISTINCT tag) AS score
      RETURN rec.name AS city, score
      ORDER BY score DESC
    `;

    const result = await session.run(query, { userId });

    const cities = result.records.map(record => ({
      city: record.get('city'),
      score: record.get('score').toInt()
    }));

    res.json({ personalizedRecommendations: cities });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  } finally {
    await session.close();
  }
};

module.exports = {
  getCityRecommendations,
  getUserRecommendations
};
