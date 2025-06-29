import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import logo from '../assets/images/logo2.png';
import Button from '../layouts/Button';

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isOnHero4, setIsOnHero4] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleChange = () => {
    setMenu(!menu);
  };

  useEffect(() => {
    let throttleTimeout = null;

    const handleScroll = () => {
      if (throttleTimeout === null) {
        throttleTimeout = setTimeout(() => {
          const currentScrollY = window.scrollY;

          if (currentScrollY < lastScrollY) {
            setShowNavbar(true);
          } else if (currentScrollY > lastScrollY) {
            setShowNavbar(false);
          }
          setLastScrollY(currentScrollY);

          const hero4Start = 2000;
          const hero4End = 2600;

          if (currentScrollY >= hero4Start && currentScrollY <= hero4End) {
            setIsOnHero4(true);
          } else {
            setIsOnHero4(false);
          }

          throttleTimeout = null;
        }, 200);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const linkColorClass = isOnHero4 ? 'text-black hover:text-gray-700' : 'text-white hover:text-white';

  return (
    <div className={`fixed top-0 left-0 w-full z-50 shadow-lg transition-transform duration-700 ${showNavbar ? "translate-y-0" : "-translate-y-full"}`}>
      <div className="flex flex-row justify-between px-5 md:px-32 py-4">
        <div className="flex items-center">
          <Link to="home" spy={true} smooth={true} duration={500}>
            <img
              src={logo}
              alt="Logo"
              className="cursor-pointer"
              style={{ width: '60px', height: '40px' }}
            />
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="home" spy smooth duration={500} className={`oswald transition-all cursor-pointer ${linkColorClass}`}>
            Home
          </Link>
          <Link to="subscriptions" spy smooth duration={500} className={`oswald transition-all cursor-pointer ${linkColorClass}`}>
            Destinations
          </Link>
          <Link to="activities" spy smooth duration={500} className={`oswald transition-all cursor-pointer ${linkColorClass}`}>
            Hotels
          </Link>
          <Link to="clubs" spy smooth duration={500} className={`oswald transition-all cursor-pointer ${linkColorClass}`}>
            Blogs
          </Link>
          <Link to="about" spy smooth duration={500} className={`oswald transition-all cursor-pointer ${linkColorClass}`}>
            Partnership
          </Link>
          <Link to="contact" spy smooth duration={500} className={`oswald transition-all cursor-pointer ${linkColorClass}`}>
            Contact
          </Link>

          <div className="relative w-full max-w-[180px] min-w-[150px]">
            <FiSearch className={`absolute w-5 h-5 top-2.5 left-2.5 ${isOnHero4 ? 'text-black' : 'text-white'}`} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className={`w-full bg-transparent placeholder:${isOnHero4 ? 'text-black' : 'text-white'} text-${isOnHero4 ? 'black' : 'white'} text-sm border rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-brightRed shadow-sm`}
              style={{ borderColor: isOnHero4 ? '#000000' : '#FFFFFF', color: isOnHero4 ? '#000000' : '#FFFFFF' }}
            />
          </div>

          {user ? (
            <div className="relative group">
              <button className="border-2 border-white px-4 py-1 rounded-full">
                {user.name.split(" ")[0]} ▼
              </button>
              <div className="absolute right-0 mt-2 bg-white text-black py-2 px-4 rounded hidden group-hover:block z-20">
                <button onClick={handleLogout} className="hover:text-red-500">
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Button
              title="Sign In"
              link="login"
              className={isOnHero4 ? "text-black" : "text-white"}
            />
          )}
        </nav>

        <div className="md:hidden flex items-center" onClick={handleChange}>
          <AiOutlineMenuUnfold size={28} className={isOnHero4 ? 'text-black' : 'text-white'} />
        </div>
      </div>

      <div className={`${menu ? "translate-x-0" : "-translate-x-full"} md:hidden flex flex-col absolute bg-[#222] text-white left-0 top-20 font-semibold text-xl text-center pt-8 pb-4 gap-6 w-full h-auto transition-transform duration-300`}>
        <Link to="home" spy smooth duration={500} className="oswald hover:text-white transition-all cursor-pointer">
          Home
        </Link>
        <Link to="subscriptions" spy smooth duration={500} className="oswald hover:text-white transition-all cursor-pointer">
          Destinations
        </Link>
        <Link to="activities" spy smooth duration={500} className="oswald hover:text-white transition-all cursor-pointer">
          Hotels
        </Link>
        <Link to="clubs" spy smooth duration={500} className="oswald hover:text-white transition-all cursor-pointer">
          Blogs
        </Link>
        <Link to="about" spy smooth duration={500} className="oswald hover:text-white transition-all cursor-pointer">
          Partnership
        </Link>
        <Link to="contact" spy smooth duration={500} className="oswald hover:text-white transition-all cursor-pointer">
          Contact
        </Link>

        <div className="w-full flex justify-center mt-2">
          <div className="relative w-full max-w-[250px]">
            <FiSearch className="absolute w-5 h-5 top-2.5 left-2.5 text-[#111]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="w-full bg-white text-black placeholder-[#111] text-sm border border-gray-300 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:ring-2 focus:ring-brightRed focus:border-brightRed shadow-sm"
            />
          </div>
        </div>

        {user ? (
          <button onClick={handleLogout} className="oswald hover:text-red-500 transition-all cursor-pointer">
            Logout
          </button>
        ) : (
          <Button title="Sign In" link="login" />
        )}
      </div>
    </div>
  );
};

export default Navbar;
