import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Recommendation = () => {
  const [userPreferences, setUserPreferences] = useState([]);
  const [recommendedCities, setRecommendedCities] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const token = localStorage.getItem('token');
        const userRes = await axios.get('http://localhost:5000/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const tags = userRes.data.preferences?.tags || [];
        setUserPreferences(tags);

        const citiesRes = await axios.get('http://localhost:5000/api/cities');
        const cities = citiesRes.data;

        const scored = cities.map(city => {
          const matchCount = city.tags.filter(tag => tags.includes(tag)).length;
          return { ...city, matchScore: matchCount };
        });

        const sorted = scored
          .filter(city => city.matchScore > 0)
          .sort((a, b) => b.matchScore - a.matchScore)
          .slice(0, 10); // top 10

        setRecommendedCities(sorted);
      } catch (err) {
        console.error("Recommendation fetch error:", err);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div className="bg-black text-white py-16 px-6 md:px-20 mt-12">
      <h2 className="text-3xl font-bold oswald mb-6">Recommended Destinations</h2>
      {recommendedCities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendedCities.map(city => (
            <div key={city.name} className="bg-zinc-800 p-4 rounded shadow-md">
              <h3 className="text-xl font-semibold mb-2">{city.name}, {city.country}</h3>
              <p className="text-sm text-gray-400 mb-2">{city.tags.join(', ')}</p>
              <button
                onClick={() => window.location.href = `/destinations/${city.continent}`}
                className="mt-2 px-4 py-1 text-sm border border-white rounded hover:bg-white hover:text-black transition"
              >
                Explore
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No recommendations yet. Update your preferences.</p>
      )}
    </div>
  );
};

export default Recommendation;
