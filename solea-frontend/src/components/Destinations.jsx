import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const continents = ['North America', 'South America', 'Asia', 'Europe', 'Africa', 'Oceania'];

const cities = {
  'North America': [
    { name: 'Hollywood', image: '/assets/North America/Hollywood.jpg' },
    { name: 'Beverly Hills', image: '/assets/North America/Beverly Hills.jpg' },
    { name: 'Santa Monica', image: '/assets/North America/Santa Monica.jpg' },
    { name: 'New York', image: '/assets/North America/New York City.jpg' },
    { name: 'Las Vegas', image: '/assets/North America/Las Vegas.jpg' },
    { name: 'Miami', image: '/assets/North America/Miami.jpg' },
    { name: 'Banff National Park', image: '/assets/North America/Quebec City.jpg' },
    { name: 'Cancun', image: '/assets/North America/Cancún.jpg' },
  ],
  // Add other continents the same way
};

const Destinations = () => {
  const [selectedContinent, setSelectedContinent] = useState('North America');
  const navigate = useNavigate();

  const handleLoadMore = () => {
    navigate(`/${selectedContinent.toLowerCase().replace(/\s/g, '-')}`);
  };

  const handleAddToTrip = (city) => {
    navigate(`/hotels?city=${encodeURIComponent(city)}`);
  };

  return (
    <div className="min-h-screen bg-white text-black px-4 md:px-10">
      <div className="flex justify-center border-b border-gray-300">
        {continents.map((continent) => (
          <button
            key={continent}
            onClick={() => setSelectedContinent(continent)}
            className={`px-6 py-4 font-bold uppercase text-sm tracking-wide ${
              selectedContinent === continent ? 'bg-black text-white' : 'text-black'
            }`}
          >
            {continent}
          </button>
        ))}
      </div>

      <h2 className="text-4xl md:text-5xl font-bold mt-10 mb-6">
        Discover the <span className="italic font-semibold">Wonders</span> of {selectedContinent}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {cities[selectedContinent].slice(0, 8).map((city) => (
          <div
            key={city.name}
            className="relative group overflow-hidden rounded-md shadow-md cursor-pointer"
          >
            <img
              src={city.image}
              alt={city.name}
              className="w-full h-60 object-cover transform group-hover:scale-105 transition duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition duration-300" />
            <div className="absolute top-3 left-3 text-white font-bold text-sm drop-shadow-md uppercase">
              {city.name}
            </div>
            <button
              className="absolute bottom-3 right-3 text-xs bg-white text-black px-3 py-1 rounded-md font-semibold shadow-md hover:bg-black hover:text-white transition"
              onClick={() => handleAddToTrip(city.name)}
            >
              Add to Trip
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <button
          onClick={handleLoadMore}
          className="bg-black text-white px-8 py-3 text-sm font-semibold uppercase rounded-md hover:bg-gray-800 transition"
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default Destinations;
