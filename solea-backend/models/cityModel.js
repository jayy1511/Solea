const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // previously "city"
  country: { type: String, required: true },
  continent: { type: String, required: true },
  tags: [String],
  popularSpots: [String], // renamed from "attractions"
}, {
  timestamps: true,
});

module.exports = mongoose.model('City', citySchema);
