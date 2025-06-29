import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TripSummary = () => {
  const { tripId } = useParams();
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
    return <div className="text-white p-10">Loading trip summary...</div>;
  }

  return (
    <div className="w-full bg-black py-20 px-5 md:px-20 min-h-screen text-white mt-12">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="oswald text-4xl font-light mb-6">Trip Summary</h1>
        <p className="mb-4">Trip Title: <strong>{trip.title}</strong></p>
        <p>Status: {trip.isConfirmed ? "✅ Confirmed" : "📝 Draft"}</p>

        {trip.cities.map((city, index) => (
          <div key={index} className="mt-6 border-t border-white/20 pt-4">
            <h2 className="text-2xl oswald mb-2">{city.name}, {city.country}</h2>
            <p>Activities: {city.activities?.join(", ") || "None"}</p>
            <div className="mt-2">
              <h3 className="text-xl mb-1">Selected Hotels:</h3>
              {city.hotels?.length > 0 ? (
                city.hotels.map((hotel, i) => (
                  <div key={i} className="text-sm">
                    🏨 {hotel.name} — €{hotel.pricePerNight} per night, {hotel.stars}★
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400">No hotels selected for this city yet.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripSummary;
