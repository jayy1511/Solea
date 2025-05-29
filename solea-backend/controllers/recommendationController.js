const driver = require('../utils/neo4jClient');

// 🔍 City-based: Get cities that share similar tags
const getCityRecommendations = async (req, res) => {
  const { cityId } = req.params;
  const session = driver.session();

  try {
    const query = `
      MATCH (c1:City {name: $cityId})-[:HAS_TAG]->(t:Tag)<-[:HAS_TAG]-(c2:City)
      WHERE c1 <> c2
      RETURN DISTINCT c2.name AS recommendedCity
    `;

    const result = await session.run(query, { cityId });

    const cities = result.records.map(record => record.get('recommendedCity'));
    res.json({ recommendedCities: cities });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await session.close();
  }
};

// 👤 User-based: Recommend based on tags in user's trip history
const getUserRecommendations = async (req, res) => {
  const { userId } = req.params;
  const session = driver.session();

  try {
    const query = `
      MATCH (u:User {id: $userId})-[:BOOKED]->(:Trip)-[:CONTAINS]->(city:City)-[:HAS_TAG]->(tag:Tag)
      MATCH (tag)<-[:HAS_TAG]-(rec:City)
      RETURN DISTINCT rec.name AS recommendedCity
    `;

    const result = await session.run(query, { userId });

    const cities = result.records.map(record => record.get('recommendedCity'));
    res.json({ personalizedRecommendations: cities });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await session.close();
  }
};

module.exports = {
  getCityRecommendations,
  getUserRecommendations
};
