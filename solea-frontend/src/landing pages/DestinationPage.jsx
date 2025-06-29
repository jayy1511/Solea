import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const DestinationPage = () => {
  const { continent } = useParams();
  const navigate = useNavigate();

  const [cities, setCities] = useState([]);
  const [visibleCount, setVisibleCount] = useState(9);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/cities/continent/${continent}`)
      .then((res) => {
        setCities(res.data);
        setVisibleCount(9);
      })
      .catch((err) => console.error("Failed to fetch cities:", err));
  }, [continent]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 9);
  };

  const handleAddToTrip = async (cityId, cityName) => {
    if (!user) {
      alert("Please login or sign up to start building your trip.");
      navigate("/login");
      return;
    }

    const title = prompt("Name your trip:");
    if (!title || title.trim().length === 0) {
      alert("Trip name is required.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/trips",
        { cityId, title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const tripId = response.data._id; // ✅ FIXED
      navigate(`/hotels/${cityId}?tripId=${tripId}`); // ✅ Correct URL
    } catch (error) {
      console.error("Failed to create trip draft:", error);
      alert("Something went wrong while creating your trip.");
    }
  };

  return (
    <div className="w-full bg-black py-20 px-5 md:px-20 min-h-screen text-white mt-12">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="oswald text-5xl font-extralight md:text-start text-center mb-10 tracking-normal capitalize">
          Explore {continent}
        </h1>

        <p className="oswald mt-2 text-sm md:text-base max-w-xl mb-12">
          Discover cities in {continent} filled with vibrant culture, history, and adventure.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cities.slice(0, visibleCount).map((city) => {
            const formattedContinent = city.continent;
            const formattedCityName = encodeURIComponent(city.name);
            const imageUrl = `http://localhost:5000/assets/${formattedContinent}/${formattedCityName}.jpg`;

            return (
              <div
                key={city._id}
                className="relative bg-white rounded-lg shadow-lg overflow-hidden hover:scale-[1.02] transition-transform"
              >
                <img
                  src={imageUrl}
                  alt={city.name}
                  loading="lazy"
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    e.target.src = "/fallback.jpg";
                  }}
                />
                <div className="absolute top-4 left-4 text-white font-bold text-sm oswald bg-black/50 px-2 py-1 rounded">
                  {city.name.toUpperCase()}
                </div>
                <div className="absolute bottom-4 left-4 text-white font-medium text-xs oswald bg-black/40 px-2 py-1 rounded">
                  {city.country}
                </div>

                {/* Add to Trip Button */}
                <button
                  onClick={() => handleAddToTrip(city._id, city.name)}
                  className="absolute bottom-4 right-4 text-xs bg-white text-black font-semibold py-1 px-3 rounded-full shadow hover:bg-black hover:text-white transition-all duration-300"
                >
                  Add to Trip
                </button>
              </div>
            );
          })}
        </div>

        {/* Load More Button */}
        {visibleCount < cities.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={handleLoadMore}
              className="oswald px-6 py-3 text-white border-2 border-white bg-transparent hover:bg-white hover:text-black transition-all duration-300 rounded-md"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DestinationPage;
