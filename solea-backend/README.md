# 🌍 Solea Travel Planner — Backend

Welcome to the **Solea** backend API — a RESTful Node.js + Express.js server with MongoDB, Neo4j and Redis, built to power a modern travel planning experience. Users can register, log in, manage trips, view city data, fetch blog articles, and get personalized recommendations.

## 📦 Tech Stack

- Node.js + Express
- MongoDB + Mongoose + Neo4j + Redis
- JWT Authentication
- CORS + Bcrypt
- RESTful API architecture

## 📁 Folder Structure

```
solea-backend/
├── controllers/       # Business logic
├── middlewares/       # Auth and encryption
├── models/            # Mongoose models
├── routes/            # Express route handlers
├── db.js              # MongoDB connection
├── index.js           # Entry point
```

## 🔐 Auth Routes

- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login with email/password

## 👤 User Routes

- `GET /api/users/profile` — Get logged-in user profile
- `PUT /api/users/preferences` — Update user preferences
- `GET /api/users/:id/trips` — Get trips of a user

## ✈️ Trip Routes

- `POST /api/trips` — Create new trip
- `POST /api/trips/:tripId/cities` — Add city to trip
- `POST /api/trips/:tripId/hotels` — Add hotel to trip
- `GET /api/trips/:tripId` — Get trip details
- `POST /api/trips/:tripId/confirm` — Confirm trip

## 🏙️ City Routes

- `GET /api/cities` — All cities
- `GET /api/cities/continent/:continent` — Cities by continent
- `GET /api/cities/:cityId` — Single city details

## 📝 Blog Routes

- `GET /api/blogs` — Fetch blog posts

## 🤖 Recommendation Routes

- `GET /api/recommendations/city/:cityId` — Based on city
- `GET /api/recommendations/user/:userId` — Based on user

## 🧪 Testing

Use Postman to test routes. Auth-protected routes require a valid `Authorization: Bearer <token>` header.

## 📄 License

MIT
