# 🌍 Solea Travel Planner — Backend

Welcome to the **Solea** backend API — a RESTful travel planning server built with Node.js, Express.js, MongoDB, Neo4j, and Redis. This backend powers everything from user authentication and trip planning to recommendations and session-based caching.

---

## 📦 Tech Stack

- **Node.js + Express** — API server
- **MongoDB + Mongoose** — Core data storage
- **Neo4j** — Graph-based city & recommendation system
- **Redis** — Session caching and draft trip storage
- **JWT Authentication** — Secure user sessions
- **Bcrypt** — Password hashing
- **CORS + Dotenv + Nodemon** — Dev & security helpers

---

## 🔐 Auth Routes

- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and receive JWT token

---

## 👤 User Routes

- `GET /api/users/profile` — Get logged-in user profile (🔒 JWT required)
- `PUT /api/users/preferences` — Update preferences
- `GET /api/users/:id/trips` — Fetch user's trips

---

## ✈️ Trip Routes

- `POST /api/trips` — Create a trip
- `POST /api/trips/:tripId/cities` — Add city to trip
- `POST /api/trips/:tripId/hotels` — Add hotel to trip
- `GET /api/trips/:tripId` — Trip details
- `POST /api/trips/:tripId/confirm` — Confirm and finalize

---

## 🏙️ City Routes

- `GET /api/cities` — All cities
- `GET /api/cities/continent/:continent` — Cities in a continent
- `GET /api/cities/:cityId` — Details of a city

---

## 📝 Blog Routes

- `GET /api/blogs` — Fetch all blog posts

---

## 🤖 Recommendation Routes (Neo4j)

- `GET /api/recommendations/city/:cityId` — Get similar city recommendations
- `GET /api/recommendations/user/:userId` — Personalized suggestions

---

## 🧠 Redis Routes (Trip Draft Caching)

Used for saving temporary draft trip data per user (like a trip cart).

- `POST /api/redis/draft/:userId` — Save a draft trip
- `GET /api/redis/draft/:userId` — Load a saved draft
- `DELETE /api/redis/draft/:userId` — Clear a saved draft

Backend uses `cacheService.js` to interact with Redis.

---

## 🧪 Testing with Postman

- Use `/api/auth/login` to obtain a JWT.
- Copy token into headers of protected requests: Authorization: Bearer <your_token_here>
- Test Redis by saving/loading trips to `/api/redis/draft/:userId`.

---

## 🚀 Deployment

- MongoDB via MongoDB Atlas
- Redis via Redis Cloud
- Deployed backend on Render
- Uses `.env` for environment variables

---

## 🧾 Author

Made with 💙 for Solea Project — *Your next-level travel companion.*
