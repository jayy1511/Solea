import React from "react";
import hero2 from "../assets/images/hero3.jpg"; // Added your hero2 image

const Hero3 = () => {
  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat px-5 md:px-32 flex items-center justify-between"
    >
      {/* Image on the left */}
      <img
        src={hero2}
        alt="Hero Visual"
        className="w-1/2 h-auto rounded-xl object-cover"
      />

      {/* Text on the right */}
      <div className="bg-black/40 p-6 rounded-xl backdrop-blur-md text-white max-w-xl text-right">
        <h1 className="oswald text-6xl md:text-7xl font-light leading-snug">
          Where the <span className="italic">Sky</span> <br /> Meets the Earth
        </h1>
        <p className="oswald mt-6 text-sm md:text-base">
          Travel to places where nature’s beauty and human wonder come together in perfect harmony. Let your curiosity guide you to new heights, where unforgettable experiences and breathtaking destinations await.
        </p>
      </div>
    </div>
  );
};

export default Hero3;
