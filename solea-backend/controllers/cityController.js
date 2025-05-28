const City = require('../models/cityModel');

// Get all cities
exports.getAllCities = async (req, res) => {
  try {
    const cities = await City.find();
    res.status(200).json(cities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get cities by continent
exports.getCitiesByContinent = async (req, res) => {
  try {
    const continent = req.params.continent.toLowerCase();
    const cities = await City.find({ continent: new RegExp(`^${continent}$`, 'i') });
    res.status(200).json(cities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get city by ID
exports.getCityById = async (req, res) => {
  try {
    const city = await City.findById(req.params.cityId);
    if (!city) return res.status(404).json({ message: 'City not found' });
    res.status(200).json(city);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
