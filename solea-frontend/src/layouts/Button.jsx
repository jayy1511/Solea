import React from "react";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";

const Button = ({ title, link, state, scrollTo }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (link && !scrollTo) {
      if (state) {
        navigate(`/${link}`, { state });
      } else {
        navigate(`/${link}`);
      }
    }
  };

  return scrollTo ? (
    <Link
      to={scrollTo}
      spy={true}
      smooth={true}
      duration={500}
      className="relative inline-flex items-center justify-start px-5 py-3 overflow-hidden font-bold rounded-full group cursor-pointer"
    >
      <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
      <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-[#FFFFFF] opacity-100 group-hover:-translate-x-8"></span>
      <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out oswald group-hover:text-[#222]">
        {title}
      </span>
      <span className="absolute inset-0 border-2 border-white rounded-full"></span>
    </Link>
  ) : (
    <button
      onClick={handleClick}
      className="relative inline-flex items-center justify-start px-5 py-3 overflow-hidden font-bold rounded-full group"
    >
      <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
      <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-[#FFFFFF] opacity-100 group-hover:-translate-x-8"></span>
      <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out oswald group-hover:text-[#222]">
        {title}
      </span>
      <span className="absolute inset-0 border-2 border-white rounded-full"></span>
    </button>
  );
};

export default Button;
