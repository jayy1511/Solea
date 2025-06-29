const User = require('../models/userModel');

// @desc    Get user profile
// @route   GET /api/users/profile
const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId)
  .select('-password')
  .populate({
    path: 'trips',
    match: { isConfirmed: true }, // ✅ only confirmed trips
  });

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @desc    Update user preferences
// @route   PUT /api/users/preferences
const updateUserPreferences = async (req, res) => {
  try {
    const userId = req.user.id;
    const { tags } = req.body;

    if (!tags || !Array.isArray(tags) || tags.length === 0) {
      return res.status(400).json({ message: 'Preferences tags are required' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { preferences: { tags } },
      { new: true }
    ).select('-password');

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @desc    Get all trips for a user
// @route   GET /api/users/:id/trips
const getUserTrips = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).populate('trips');

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user.trips || []);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
  getUserProfile,
  updateUserPreferences,
  getUserTrips,
};
