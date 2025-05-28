const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  startDate: Date,
  endDate: Date,
  cities: [
    {
      name: String,
      country: String,
      activities: [String],
      hotels: [
        {
          name: String,
          address: String,
          stars: Number,
          pricePerNight: Number,
        },
      ],
    },
  ],
  isConfirmed: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Trip', tripSchema);
