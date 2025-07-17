import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config';

const Recommendation = () => {
  const [userPreferences, setUserPreferences] = useState([]);
  const [recommendedCities, setRecommendedCities] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const token = localStorage.getItem('token');
        const userRes = await axios.get(`${BASE_URL}/api/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const tags = userRes.data.preferences?.tags || [];
        setUserPreferences(tags);

        const citiesRes = await axios.get(`${BASE_URL}/api/cities`);

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
    <div className="oswald bg-black text-white py-16 px-6 md:px-20 mt-12">
      <h2 className="text-3xl font-bold oswald mb-6">Recommended Destinations</h2>
      {recommendedCities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendedCities.map(city => {
            const imageUrl = `${BASE_URL}/${city.image}`; // uses value like assets/Europe/Barcelona.jpg

            return (
              <div key={city._id} className="bg-zinc-800 rounded shadow-md overflow-hidden hover:scale-[1.02] transition-transform">
                <img
                  src={imageUrl}
                  alt={city.name}
                  className="w-full h-52 object-cover"
                  onError={(e) => {
                    e.target.src = "/fallback.jpg";
                  }}
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-1">{city.name}, {city.country}</h3>
                  <p className="text-sm text-gray-400 mb-3">{city.tags.join(', ')}</p>
                  <button
                    onClick={() => window.location.href = `/destinations/${city.continent}`}
                    className="px-4 py-1 text-sm text-white border-2 border-white bg-transparent hover:bg-white hover:text-black transition-all duration-300 rounded-md"
                  >
                    Explore
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-400">No recommendations yet. Update your preferences.</p>
      )}
    </div>
  );
};

export default Recommendation;
