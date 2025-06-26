import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import North from "../assets/images/North_America.jpg";
import South from "../assets/images/South_America.jpg";
import Asia from "../assets/images/asia.jpg";
import Europe from "../assets/images/europe.jpg";
import Africa from "../assets/images/Africa.jpg";
import Oceania from "../assets/images/Oceania.jpg";

const continents = [
  { name: "North America", image: North },
  { name: "South America", image: South },
  { name: "Asia", image: Asia },
  { name: "Europe", image: Europe },
  { name: "Africa", image: Africa },
  { name: "Oceania", image: Oceania },
];

const ContinentCarousel = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const prev = () => setIndex((prev) => (prev === 0 ? continents.length - 1 : prev - 1));
  const next = () => setIndex((prev) => (prev === continents.length - 1 ? 0 : prev + 1));

  const handleExplore = () => {
    const continentSlug = continents[index].name.toLowerCase().replace(/\s+/g, "");
    navigate(`/destinations/${continentSlug}`);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev === continents.length - 1 ? 0 : prev + 1));
    }, 5000); // 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative w-full h-[90vh] bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${continents[index].image})` }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* Arrows */}
      <button onClick={prev} className="absolute left-4 text-white text-3xl z-10">
        <FaChevronLeft />
      </button>
      <button onClick={next} className="absolute right-4 text-white text-3xl z-10">
        <FaChevronRight />
      </button>

      {/* Title and Button */}
      <div className="text-center z-10">
        <h1 className="text-white oswald text-5xl md:text-7xl mb-6 drop-shadow-lg">
          {continents[index].name}
        </h1>
        <button
          onClick={handleExplore}
          className="oswald px-6 py-3 text-white border-2 border-white bg-transparent hover:bg-white hover:text-black transition-all duration-300 rounded-md"
        >
          Explore Now
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 flex gap-2 z-10">
        {continents.map((_, i) => (
          <div
            key={i}
            className={`h-2 w-2 rounded-full ${i === index ? 'bg-white' : 'bg-white/40'}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ContinentCarousel;
