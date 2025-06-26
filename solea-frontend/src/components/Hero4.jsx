import React from "react";
import hollywood from "../assets/images/hollywood.jpg";
import beverly from "../assets/images/beverly.jpg";
import banff from "../assets/images/banff.jpg";

const Hero4 = () => {
  return (
    <div className="w-full bg-[#f2f2f2] py-20 px-5 md:px-20">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="oswald text-8xl font-extralight md:text-start text-center text-black mb-10 tracking-normal reduce-word-spacing">
          Explore <span className="italic">Worlds</span>
          <br />
          Beyond Imagination
        </h1>

        <p className="oswald mt-6 text-sm md:text-base text-black max-w-xl mb-12">
          Step into a realm where the extraordinary becomes reality. From hidden valleys to untouched coastlines, these are places that defy imagination and stir the soul. Discover the world’s most remarkable wonders, carefully curated to inspire your next unforgettable journey.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="relative">
            <img
              src={hollywood}
              alt="Hollywood"
              className="w-full h-80 object-cover rounded-lg"
            />
            <div className="absolute top-4 left-4 text-white font-bold text-sm oswald">HOLLYWOOD</div>
            <div className="absolute bottom-4 left-4 text-white font-medium text-xs oswald">
              Los Angeles, USA
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative">
            <img
              src={beverly}
              alt="Beverly Hills"
              className="w-full h-80 object-cover rounded-lg"
            />
            <div className="absolute top-4 left-4 text-white font-bold text-sm oswald">BEVERLY HILLS</div>
            <div className="absolute bottom-4 left-4 text-white font-medium text-xs oswald">
              Los Angeles, USA
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative">
            <img
              src={banff}
              alt="Banff National Park"
              className="w-full h-80 object-cover rounded-lg"
            />
            <div className="absolute top-4 left-4 text-white font-bold text-sm oswald">
              BANFF NATIONAL PARK
            </div>
            <div className="absolute bottom-4 left-4 text-white font-medium text-xs oswald">
              Alberta, Canada
              <br />
              6,641 km
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero4;
