const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Import Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const tripRoutes = require('./routes/trips');
const cityRoutes = require('./routes/cities');
const hotelRoutes = require('./routes/hotels');
const recommendationRoutes = require('./routes/recommendations');
const blogRoutes = require('./routes/blogs');
const redisRoutes = require('./routes/redis');

// CORS Middleware
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      'https://voluble-scone-617f6ee.netlify.app',
      'http://localhost:5173',
      undefined // allow tools like curl/Postman
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS: ' + origin));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

// Optional: explicit handling of OPTIONS preflight requests
app.options('*', (req, res) => {
  res.sendStatus(204); // OK with no content
});

// Body Parser & Static Assets
app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Debug log for origin
app.use((req, res, next) => {
  console.log("🔥 Request from:", req.headers.origin);
  next();
});

// Attach timestamp
app.use((req, res, next) => {
  const now = Date.now();
  req.requestTime = now;
  console.log("Request Time:", new Date(now).toLocaleString());
  next();
});

// Test route
app.get('/', (req, res) => {
  res.send(`Solea Backend is running 🚀 — Request Time: ${new Date(req.requestTime).toLocaleString()}`);
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/redis', redisRoutes);

// Connect to MongoDB
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });
