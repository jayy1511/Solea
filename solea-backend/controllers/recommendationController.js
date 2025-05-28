// Dummy logic for now — you can enhance this later
const getRecommendationsByCity = async (req, res) => {
  const { cityId } = req.params;
  res.json({
    cityId,
    recommendations: [
      'Visit a popular museum',
      'Try a famous local restaurant',
      'Join a city walking tour'
    ]
  });
};

const getRecommendationsByUser = async (req, res) => {
  const { userId } = req.params;
  res.json({
    userId,
    recommendations: [
      'Based on your preferences, visit the Eiffel Tower',
      'Book a spa hotel in Nice',
      'Explore hidden gems in Amsterdam'
    ]
  });
};

module.exports = {
  getRecommendationsByCity,
  getRecommendationsByUser
};
