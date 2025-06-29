import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const TripSummary = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/trips/${tripId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTrip(res.data);
      } catch (error) {
        console.error("Failed to fetch trip summary:", error);
      }
    };

    fetchTrip();
  }, [tripId]);

  if (!trip) {
    return (
      <div className="text-white py-20 px-5 md:px-20 min-h-screen bg-black mt-12">
        <div className="max-w-screen-xl mx-auto">
          <p className="oswald text-xl text-gray-300">Loading trip summary...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-black py-20 px-5 md:px-20 min-h-screen text-white mt-12">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="oswald text-4xl font-light mb-6">Trip Summary</h1>

        <div className="text-gray-300 mb-6">
          <p className="oswald mb-2">Title: <span className="oswald text-white font-semibold">{trip.title}</span></p>
          <p className="oswald">Status: <span className={`font-medium ${trip.isConfirmed ? "text-green-400" : "text-yellow-400"}`}>
            {trip.isConfirmed ? "Confirmed" : "Draft"}
          </span></p>
        </div>

        {trip.cities.map((city, index) => (
          <div key={index} className="mb-8 border-t border-white/10 pt-4">
            <h2 className="oswald text-2xl font-semibold mb-1">{city.name}, {city.country}</h2>
            <p className="oswald text-sm text-gray-400 mb-2">
              Activities: {city.activities?.length > 0 ? city.activities.join(", ") : "None"}
            </p>

            <div className="ml-2">
              <h3 className="oswald text-lg font-medium mb-1">Selected Hotels</h3>
              {city.hotels?.length > 0 ? (
                city.hotels.map((hotel, i) => (
                  <div key={i} className="oswald text-sm text-gray-300">
                    {hotel.name} — €{hotel.pricePerNight} per night, {hotel.stars} stars
                  </div>
                ))
              ) : (
                <p className="oswald text-sm text-gray-500">No hotels selected yet.</p>
              )}
            </div>
          </div>
        ))}

        <div className="flex gap-4 mt-10">
          <button
            onClick={() => navigate(`/destinations`)}
            className="oswald px-6 py-2 border border-white text-white hover:bg-white hover:text-black transition rounded"
          >
            Add Another City
          </button>

          <button
            onClick={async () => {
              try {
                const token = localStorage.getItem("token");
                await axios.post(`http://localhost:5000/api/trips/${tripId}/confirm`, {}, {
                  headers: { Authorization: `Bearer ${token}` },
                });
                alert("Trip confirmed successfully.");
                window.location.reload();
              } catch (err) {
                alert("Failed to confirm trip.");
                console.error(err);
              }
            }}
            className="oswald px-6 py-2 bg-white text-black hover:bg-gray-200 transition rounded"
          >
            Confirm Trip
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripSummary;
