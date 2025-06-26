import { useParams, useEffect, useState } from "react";
import axios from "axios";

const DestinationPage = () => {
  const { continent } = useParams();
  const [cities, setCities] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/cities/continent/${continent}`)
      .then((res) => setCities(res.data))
      .catch((err) => console.error(err));
  }, [continent]);

  return (
    <div className="p-8 text-white">
      <h2 className="text-4xl oswald mb-6 capitalize">{continent} Cities</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cities.map((city) => (
          <div key={city._id} className="bg-black/30 p-4 rounded shadow">
            <h3 className="text-xl oswald">{city.name}</h3>
            <p>{city.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DestinationPage;
