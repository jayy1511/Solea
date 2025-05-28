const Trip = require('../models/tripModel');

// Create a new trip
exports.createTrip = async (req, res) => {
  try {
    const trip = new Trip({ ...req.body });
    const savedTrip = await trip.save();
    res.status(201).json(savedTrip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a city
exports.addCityToTrip = async (req, res) => {
  try {
    const { tripId } = req.params;
    const { name, country, activities } = req.body;

    const trip = await Trip.findById(tripId);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });

    trip.cities.push({ name, country, activities });
    await trip.save();
    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a hotel
exports.addHotelToTrip = async (req, res) => {
  try {
    const { tripId } = req.params;
    const { cityName, hotel } = req.body;

    const trip = await Trip.findById(tripId);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });

    const city = trip.cities.find(c => c.name === cityName);
    if (!city) return res.status(404).json({ message: 'City not found in trip' });

    city.hotels.push(hotel);
    await trip.save();
    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get trip details
exports.getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripId).populate('user');
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Confirm trip
exports.confirmTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripId);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });

    trip.isConfirmed = true;
    await trip.save();
    res.status(200).json({ message: 'Trip confirmed', trip });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
