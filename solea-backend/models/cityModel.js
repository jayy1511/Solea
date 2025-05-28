const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  country: { type: String, required: true },
  continent: { type: String, required: true }, // Add this line
  description: String,
  popularSpots: [String],
  image: String,
  tags: [String],
}, {
  timestamps: true,
});

module.exports = mongoose.model('City', citySchema);
