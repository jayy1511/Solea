import React from "react";
import { Link } from "react-scroll";
import { AiTwotonePhone } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="bg-[#111] rounded-t-3xl">
      <div className="flex flex-col md:flex-row justify-between md:px-32 px-5 p-5">
        <div className="w-full md:w-1/4">
          <Link to="/">
            <h1 className="oswald font-semibold text-2xl text-brightRed">Soléa</h1>
          </Link>
          <p className="oswald mt-4">
            Your ultimate travel partner, helping you to travel carefree.
          </p>
        </div>
        <div>
          <h1 className="oswald font-medium text-xl mt-4">Contact</h1>
          <div className="flex flex-row items-center gap-2 mt-4">
            <AiTwotonePhone size={20} />
            <p className="oswald">+33 7 83 49 00 04</p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <AiOutlineMail size={20} />
            <p className="oswald">contact@Soléa.com</p>
          </div>
        </div>
      </div>
      <div>
        <p className="oswald text-center mt-4">
          &copy; 2025 <span className="text-brightRed">Soléa</span> | All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
