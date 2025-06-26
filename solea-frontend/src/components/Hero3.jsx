import React from "react";
import { motion } from "framer-motion";
import hero2 from "../assets/images/hero3.jpg";

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

const Hero3 = () => {
  return (
    <div className="relative min-h-screen w-full px-5 md:px-32 flex items-center justify-between">
      <motion.img
        src={hero2}
        alt="Hero Visual"
        className="w-1/2 h-auto object-cover"
        variants={borderRadiusVariants}
        animate="animate"
        style={{ borderRadius: "40% 60% 60% 40% / 60% 40% 60% 40%" }}
      />
      <div className="bg-black/40 p-6 rounded-xl backdrop-blur-md text-white max-w-xl text-right">
        <h1 className="oswald text-7xl font-extralight md:text-right text-center text-white mb-10 tracking-normal reduce-word-spacing">
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
