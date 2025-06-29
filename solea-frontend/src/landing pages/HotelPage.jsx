import { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const HotelPage = () => {
  const { cityId } = useParams();
  const [searchParams] = useSearchParams();
  const tripId = searchParams.get("tripId");

  const [hotels, setHotels] = useState([]);
  const [cityName, setCityName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/hotels/city/${cityId}`);
        setHotels(res.data.hotels);
        setCityName(res.data.cityName);
      } catch (error) {
        console.error("Failed to fetch hotels:", error);
      }
    };

    fetchHotels();
  }, [cityId]);

  const handleSelectHotel = async (hotelId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/trips/add-hotel",
        { tripId, hotelId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const addAnother = window.confirm("Do you want to add another city to this trip?");
      if (addAnother) {
        navigate("/#continent-carousel");
      } else {
        const confirmTrip = window.confirm("Do you want to confirm and save this trip?");
        if (confirmTrip) {
          await axios.post(
            "http://localhost:5000/api/trips/confirm",
            { tripId },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          alert("Trip confirmed! You can view it in your profile.");
          navigate("/profile");
        }
      }
    } catch (error) {
      console.error("Failed to select hotel or confirm trip:", error);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="w-full bg-black py-20 px-5 md:px-20 min-h-screen text-white mt-12">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="oswald text-4xl font-light mb-8 capitalize">
          Choose a hotel in {cityName}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <div
              key={hotel._id}
              className="relative bg-white rounded-lg shadow-lg overflow-hidden hover:scale-[1.02] transition-transform"
            >
              <img
                src={`http://localhost:5000/assets/hotels/${hotel.image || "default.jpg"}`}
                alt={hotel.name}
                loading="lazy"
                className="w-full h-64 object-cover"
              />
              <div className="p-4 text-black">
                <h3 className="oswald text-lg font-semibold mb-2">{hotel.name}</h3>
                <p className="text-sm mb-2">{hotel.description || "No description provided."}</p>
                <p className="text-sm mb-4">Stars: {hotel.stars} ⭐</p>
                <button
                  onClick={() => handleSelectHotel(hotel._id)}
                  className="oswald px-4 py-2 bg-black text-white rounded hover:bg-white hover:text-black border border-black transition-all"
                >
                  Select Hotel
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelPage;
