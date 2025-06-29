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
    const slug = req.params.continent.toLowerCase().replace(/\s/g, "");
    const allCities = await City.find();
    const filteredCities = allCities.filter(city =>
      city.continent &&
      city.continent.toLowerCase().replace(/\s/g, "") === slug
    );
    res.status(200).json(filteredCities);
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
