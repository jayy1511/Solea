const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware to allow CORS and JSON parsing
app.use(cors());
app.use(express.json());

// ✅ Custom Middleware — attach timestamp to request object
app.use((req, res, next) => {
  const now = Date.now();
  req.requestTime = now;
  console.log("Request Time:", new Date(now).toLocaleString());
  next(); // pass control to next middleware/route
});

// ✅ Test route to verify middleware works
app.get('/', (req, res) => {
  res.send(`Solea Backend is running 🚀 — Request Time: ${new Date(req.requestTime).toLocaleString()}`);
});

// MongoDB connection
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});
