import { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const HotelPage = () => {
  const { cityId } = useParams();
  const [searchParams] = useSearchParams();
  const [hotels, setHotels] = useState([]);
  const [cityName, setCityName] = useState("");
  const navigate = useNavigate();
  const tripId = searchParams.get("tripId");

  useEffect(() => {
    // Fetch hotels for this city
    axios
      .get(`http://localhost:5000/api/hotels/city/${cityId}`)
      .then((res) => setHotels(res.data))
      .catch((err) => console.error("Failed to fetch hotels:", err));

    // Fetch city name
    axios
      .get(`http://localhost:5000/api/cities/${cityId}`)
      .then((res) => setCityName(res.data.name))
      .catch((err) => console.error("Failed to fetch city info:", err));
  }, [cityId]);

  const handleHotelSelect = async (hotelId) => {
    const token = localStorage.getItem("token");

    if (!tripId || !token) {
      alert("Missing trip ID or authentication. Please log in again.");
      navigate("/login");
      return;
    }

    try {
      // Fetch full hotel details
      const hotelRes = await axios.get(`http://localhost:5000/api/hotels/${hotelId}`);
      const hotel = hotelRes.data;

      const res = await axios.post(
        `http://localhost:5000/api/trips/${tripId}/hotels`,
        { cityName, hotel },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("✅ Hotel added:", res.data);
      navigate(`/trip-summary/${tripId}`);
    } catch (error) {
      console.error("❌ Error selecting hotel:", error.response?.data || error.message);
      alert("Failed to add hotel to trip. Please try again.");
    }
  };

  return (
    <div className="w-full bg-black py-20 px-5 md:px-20 min-h-screen text-white mt-12">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="oswald text-5xl font-extralight md:text-start text-center mb-10 tracking-normal">
          Select a Hotel
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {hotels.map((hotel, index) => {
            const imageUrl = `http://localhost:5000/assets/Hotels/hotel${(index % 10) + 11}.jpg`;

            return (
              <div
                key={hotel._id}
                className="relative bg-white rounded-lg shadow-lg overflow-hidden hover:scale-[1.02] transition-transform"
              >
                <img
                  src={imageUrl}
                  alt={hotel.name}
                  loading="lazy"
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    e.target.src = "/fallback.jpg";
                  }}
                />
                <div className="absolute top-4 left-4 text-white font-bold text-sm oswald bg-black/50 px-2 py-1 rounded">
                  {hotel.name}
                </div>
                <div className="absolute bottom-4 left-4 text-white font-medium text-xs oswald bg-black/40 px-2 py-1 rounded">
                  Price: €{hotel.pricePerNight} / night <br />
                  Stars: {hotel.stars}
                </div>

                <button
                  onClick={() => handleHotelSelect(hotel._id)}
                  className="absolute bottom-4 right-4 text-xs bg-white text-black font-semibold py-1 px-3 rounded-full shadow hover:bg-black hover:text-white transition-all duration-300"
                >
                  Select Hotel
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HotelPage;
