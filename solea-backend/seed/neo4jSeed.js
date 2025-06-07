const fs = require('fs');
const path = require('path');
const driver = require('../utils/neo4jClient');

const files = [
  'Africa.json',
  'Asia.json',
  'europe_cities.json',
  'NorthAmerica_cities.json',
  'SouthAmerica.json',
  'Oceania.json',
];

const dataDir = path.join(__dirname, '..', 'data');

async function seedNeo4j() {
  const session = driver.session();

  try {
    for (const file of files) {
      const filePath = path.join(dataDir, file);
      const rawData = fs.readFileSync(filePath, 'utf-8');
      const cities = JSON.parse(rawData);

      for (const city of cities) {
        const cityName = city.city || city.name;
        const continent = city.continent;
        const tags = city.tags || [];

        const queryParts = [
          `MERGE (c:City {name: $cityName})`,
          `MERGE (c)-[:IN_CONTINENT]->(cont:Continent {name: $continent})`,
          ...tags.map(
            (tag, idx) =>
              `MERGE (t${idx}:Tag {name: $tag${idx}})\nMERGE (c)-[:HAS_TAG]->(t${idx})`
          ),
        ];

        const cypher = queryParts.join('\n');

        const params = {
          cityName,
          continent,
        };

        tags.forEach((tag, idx) => {
          params[`tag${idx}`] = tag;
        });

        await session.run(cypher, params);
        console.log(`✅ Seeded: ${cityName}`);
      }
    }

    console.log('🌍 Neo4j seeding complete for all cities!');
  } catch (err) {
    console.error('❌ Error seeding Neo4j:', err.message);
  } finally {
    await session.close();
    await driver.close();
  }
}

seedNeo4j();