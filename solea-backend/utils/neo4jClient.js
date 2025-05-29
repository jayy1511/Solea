const neo4j = require('neo4j-driver');
require('dotenv').config();

const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD)
);

async function verifyConnection() {
  try {
    const session = driver.session();
    await session.run('RETURN 1');
    console.log('✅ Connected to Neo4j AuraDB');
    await session.close();
  } catch (err) {
    console.error('❌ Neo4j connection failed:', err.message);
  }
}

verifyConnection();

module.exports = driver;