import React from "react";
import { motion } from "framer-motion";
import hero1 from "../assets/images/hero2.jpg";

const borderRadiusVariants = {
  animate: {
    borderRadius: [
      "40% 60% 60% 40% / 60% 40% 60% 40%",
      "60% 40% 40% 60% / 40% 60% 40% 60%",
      "50% 50% 70% 30% / 60% 30% 70% 40%",
      "40% 60% 60% 40% / 60% 40% 60% 40%",
    ],
    transition: {
      duration: 8,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

const Hero2 = () => {
  return (
    <div id="hero2" className="relative min-h-screen w-full px-5 md:px-32 flex items-center justify-between">
      {/* Text */}
      <div className="bg-black/40 p-6 rounded-xl backdrop-blur-md text-white max-w-xl">
        <h1 className="oswald text-7xl font-extralight md:text-start text-center text-white mb-10 tracking-normal reduce-word-spacing">
          A <span className="italic">W </span>indow to <br /> New Adventures
        </h1>
        <p className="oswald mt-6 text-sm md:text-base">
          The path to discovery is limitless, offering views of landscapes yet to be explored. Every journey starts with curiosity, and Soléa is here to turn that curiosity into unforgettable experiences.
        </p>
      </div>

      {/* Animated Blob Image */}
      <motion.img
        src={hero1}
        alt="Hero Visual"
        className="w-1/2 h-auto object-cover"
        variants={borderRadiusVariants}
        animate="animate"
        style={{ borderRadius: "40% 60% 60% 40% / 60% 40% 60% 40%" }}
      />
    </div>
  );
};

export default Hero2;
