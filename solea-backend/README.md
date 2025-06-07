# 🌍 Solea Travel Planner — Backend

Welcome to the **Solea** backend API — a RESTful travel planning server built with Node.js, Express.js, MongoDB, Neo4j, and Redis. This backend powers everything from user authentication and trip planning to graph-based recommendations and session-based caching.

---

## 📦 Tech Stack

- **Node.js + Express** — API server
- **MongoDB + Mongoose** — Core data storage
- **Neo4j (AuraDB)** — Graph-based city & recommendation system
- **Redis (Redis Cloud)** — Session caching and draft trip storage
- **JWT Authentication** — Secure user sessions
- **Bcrypt** — Password hashing
- **CORS + Dotenv + Nodemon** — Dev & security helpers

---

## 🔐 Auth Routes

- POST /api/auth/register — Register a new user
- POST /api/auth/login — Login and receive JWT token

---

## 👤 User Routes

- GET /api/users/profile — Get logged-in user profile (JWT required)
- PUT /api/users/preferences — Update preferences
- GET /api/users/:id/trips — Fetch user's trips

Users can save their travel preferences (tags such as "romantic", "historic", "beach", etc.). These preferences are used for personalized city recommendations.

---

## ✈️ Trip Routes

- POST /api/trips — Create a trip
- POST /api/trips/:tripId/cities — Add city to trip
- POST /api/trips/:tripId/hotels — Add hotel to trip
- GET /api/trips/:tripId — Trip details
- POST /api/trips/:tripId/confirm — Confirm and finalize

---

## 🏙️ City Routes

- GET /api/cities — All cities
- GET /api/cities/continent/:continent — Cities in a continent
- GET /api/cities/:cityId — Details of a city

Each city includes:
- Continent, country, and city name
- Tags for personalization
- Top attractions
- Hotels (3-star to 7-star)
- Local image path (for frontend use)

---

## 📝 Blog Routes

- GET /api/blogs — Fetch all blog posts

---

## Recommendation Routes (Neo4j)

Neo4j is used to model cities, tags, and relationships for smarter travel suggestions.

- GET /api/recommendations/city/:cityId — Get cities with shared tags
- GET /api/recommendations/user/:userId — Recommend cities based on user's past trips and preferences

**Enhancements:**
- Cities are now prioritized based on number of matching tags
- Recommendations exclude cities the user has already visited

Graph structure:
- `City` nodes linked to `Tag` and `Continent`
- `User` nodes linked to `City` through `BOOKED` → `Trip` → `CONTAINS` → `City`

Neo4j seed script auto-generates nodes for all cities and their tags.

---

## Redis Routes (Trip Draft Caching)

Redis is used to temporarily store in-progress trip drafts per user.

- POST /api/redis/draft/:userId — Save a draft trip
- GET /api/redis/draft/:userId — Load a saved draft
- DELETE /api/redis/draft/:userId — Clear a saved draft

The backend uses `cacheService.js` to interact with Redis using the `tripDraft:<userId>` key format.

---

## Seeding Setup

### MongoDB Seeding

1. Ensure all city JSON files (Africa.json, Asia.json, etc.) are in the `/data` folder.
2. Run:
```bash
node scripts/addImages.js   # Adds image paths to JSON
node scripts/seedCities.js  # Seeds MongoDB with cities and hotels
```

### Neo4j Seeding

1. Run:
```bash
node scripts/neo4jSeed.js
```

This script will:
- Seed all `City` nodes from JSON data
- Link `Tag` nodes to cities (based on `tags[]` array)
- Connect each city to a `Continent` node

---

## Deployment

- MongoDB: MongoDB Atlas
- Redis: Redis Cloud
- Neo4j: Neo4j AuraDB
- Backend: Render.com
- Secrets: .env file

---

## Author

Made with care for the Solea Project — *Your next-level travel companion.*
