import React from "react";
import Button from "../layouts/Button";
import videoBg from "../assets/videos/video_bg2.mp4"; // 1. Import the video

const Home = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={videoBg} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-row justify-between min-h-screen md:px-32 px-5 bg-black/50">
        <div className="flex flex-col justify-center">
          <h4 className="oswald text-8xl font-light md:text-start text-center md:w-2/3 text-white">
            Step Into a World of Discovery
          </h4>

          <div className="w-full md:w-2/4 mt-5 flex flex-row justify-center">
            <Button title="Checkout Plans" scrollTo="Plans" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
