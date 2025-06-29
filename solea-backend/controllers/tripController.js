const Trip = require('../models/tripModel');

//  Create a new trip
exports.createTrip = async (req, res) => {
  try {
    const { title } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(400).json({ message: "User ID is missing from token" });
    }

    const trip = new Trip({
      title,
      user: userId,
      status: 'draft'
    });

    const savedTrip = await trip.save();
    res.status(201).json(savedTrip);
  } catch (error) {
    console.error("Trip creation error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

//  Add a city to the trip
exports.addCityToTrip = async (req, res) => {
  try {
    const { tripId } = req.params;
    const { name, country, activities } = req.body;

    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    trip.cities.push({
      name,
      country,
      activities: activities || []
    });

    await trip.save();
    res.status(200).json(trip);
  } catch (error) {
    console.error("Add city error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

//  Add a hotel to a city inside the trip
exports.addHotelToTrip = async (req, res) => {
  try {
    const { tripId } = req.params;
    const { cityName, hotel } = req.body;

    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    const city = trip.cities.find(c => c.name === cityName);
    if (!city) {
      return res.status(404).json({ message: 'City not found in trip' });
    }

    city.hotels.push(hotel);
    await trip.save();
    res.status(200).json(trip);
  } catch (error) {
    console.error("Add hotel error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Get full trip by ID
exports.getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripId).populate('user');
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    res.status(200).json(trip);
  } catch (error) {
    console.error("Get trip error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

//  Confirm and finalize trip
exports.confirmTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripId);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    trip.isConfirmed = true;
    await trip.save();

    // You could trigger email here later if needed
    res.status(200).json({ message: 'Trip confirmed successfully', trip });
  } catch (error) {
    console.error("Confirm trip error:", error.message);
    res.status(500).json({ message: error.message });
  }
};
