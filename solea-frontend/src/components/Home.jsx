import React from "react";
import Button from "../layouts/Button";
import bgImage from "../assets/images/bg.jpg";

const Home = () => {
  return (
    <div
      className="relative min-h-screen w-full overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Content Overlay */}
      <div className="relative z-10 flex flex-row justify-between min-h-screen md:px-32 px-5 bg-black/60">
        <div className="flex flex-col justify-center md:w-2/3 w-full">
          <h5 className="oswald text-8xl font-extralight md:text-start text-center text-white mb-25 tracking-normal reduce-word-spacing">
            Step Into a <span className="italic">W</span>orld of Discovery
          </h5>

          <p className="text-white text-sm md:text-base mb-4 mt-10 md:text-left text-center max-w-xl oswald">
            Behind every door lies a world of endless possibilities. Soléa guides
            you to hidden gems, uncharted places, and unforgettable adventures that
            go beyond the ordinary. Explore captivating destinations, save your
            favorites, and start planning the journey of a lifetime.
          </p>

          <div className="flex flex-row justify-start">
            <Button
              title="Explore Now"
              scrollTo="Destinations"
              className="px-8 py-4 text-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
