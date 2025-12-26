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

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      'https://voluble-scone-617f6ee.netlify.app',
      'http://localhost:5173',
      undefined // allow curl/Postman or same-origin
    ];
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS: ' + origin));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Optional debug log for CORS origin (can remove later)
app.use((req, res, next) => {
  console.log("🔥 Request from:", req.headers.origin);
  next();
});

// Custom Middleware — attach timestamp to request object
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

// Register API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/redis', redisRoutes);

// MongoDB connection
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