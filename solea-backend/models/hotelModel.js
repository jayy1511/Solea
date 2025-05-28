const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true },
  address: String,
  pricePerNight: Number,
  stars: { type: Number, min: 1, max: 5 },
  amenities: [String],
  image: String,
}, {
  timestamps: true,
});

module.exports = mongoose.model('Hotel', hotelSchema);
