import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const DestinationPage = () => {
  const { continent } = useParams();
  const [cities, setCities] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/cities/continent/${continent}`)
      .then((res) => setCities(res.data))
      .catch((err) => console.error("Failed to fetch cities:", err));
  }, [continent]);

  return (
    <div className="w-full bg-[#f2f2f2] py-20 px-5 md:px-20 min-h-screen">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="oswald text-5xl font-extralight md:text-start text-center text-black mb-10 tracking-normal capitalize">
          Explore {continent}
        </h1>

        <p className="oswald mt-2 text-sm md:text-base text-black max-w-xl mb-12">
          Discover cities in {continent} filled with vibrant culture, history, and adventure.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cities.map((city) => {
            const formattedContinent = city.continent; // Preserve spaces like "North America"
            const formattedCityName = encodeURIComponent(city.name); // Encodes "New York" to "New%20York"
            const imageUrl = `http://localhost:5000/assets/${formattedContinent}/${formattedCityName}.jpg`;

            return (
              <div
                key={city._id}
                className="relative bg-white rounded-lg shadow-lg overflow-hidden hover:scale-[1.02] transition-transform"
              >
                <img
                  src={imageUrl}
                  alt={city.name}
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    e.target.src = "/fallback.jpg"; // Optional: use a local fallback image
                  }}
                />
                <div className="absolute top-4 left-4 text-white font-bold text-sm oswald bg-black/50 px-2 py-1 rounded">
                  {city.name.toUpperCase()}
                </div>
                <div className="absolute bottom-4 left-4 text-white font-medium text-xs oswald bg-black/40 px-2 py-1 rounded">
                  {city.country}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DestinationPage;
