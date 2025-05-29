const driver = require('../utils/neo4jClient');

async function seedNeo4j() {
  const session = driver.session();

  const queries = `
    MERGE (paris:City {name: "Paris"})
    MERGE (rome:City {name: "Rome"})
    MERGE (london:City {name: "London"})

    MERGE (europe:Continent {name: "Europe"})
    MERGE (romantic:Tag {name: "Romantic"})
    MERGE (historical:Tag {name: "Historical"})
    MERGE (cultural:Tag {name: "Cultural"})

    MERGE (paris)-[:IN_CONTINENT]->(europe)
    MERGE (rome)-[:IN_CONTINENT]->(europe)
    MERGE (london)-[:IN_CONTINENT]->(europe)

    MERGE (paris)-[:HAS_TAG]->(romantic)
    MERGE (paris)-[:HAS_TAG]->(cultural)
    MERGE (rome)-[:HAS_TAG]->(historical)
    MERGE (london)-[:HAS_TAG]->(cultural)

    MERGE (h1:Hotel {id: "hotel123", name: "Paris Luxury Stay"})
    MERGE (h2:Hotel {id: "hotel124", name: "Rome Boutique Inn"})

    MERGE (h1)-[:LOCATED_IN]->(paris)
    MERGE (h2)-[:LOCATED_IN]->(rome)
  `;

  try {
    await session.run(queries);
    console.log('✅ Seeded Neo4j with cities, tags, hotels');
  } catch (err) {
    console.error('❌ Seeding error:', err.message);
  } finally {
    await session.close();
    await driver.close();
  }
}

seedNeo4j();