import React from "react";
import hero1 from "../assets/images/hero2.jpg";

const Hero2 = () => {
  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat px-5 md:px-32 flex items-center justify-between"
    >
      <div className="bg-black/40 p-6 rounded-xl backdrop-blur-md text-white max-w-xl">
        <h1 className="oswald text-6xl md:text-7xl font-light leading-snug">
          A <span className="italic">Window</span> to <br /> New Adventures
        </h1>
        <p className="oswald mt-6 text-sm md:text-base">
          The path to discovery is limitless, offering views of landscapes yet to be explored. Every journey starts with curiosity, and Soléa is here to turn that curiosity into unforgettable experiences.
        </p>
      </div>
      <img
        src={hero1}
        alt="Hero Visual"
        className="w-1/2 h-auto rounded-xl object-cover"
      />
    </div>
  );
};

export default Hero2;
