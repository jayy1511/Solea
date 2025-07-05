import React, { useState, useEffect, useRef } from 'react';
import { scroller } from 'react-scroll';
import { useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import logo from '../assets/images/logo2.png';
import Button from '../layouts/Button';

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isOnHero4, setIsOnHero4] = useState(false);
  const [user, setUser] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleChange = () => setMenu(!menu);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowNavbar(currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);

      const hero4Start = 2000;
      const hero4End = 2600;
      setIsOnHero4(currentScrollY >= hero4Start && currentScrollY <= hero4End);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setDropdownOpen(false);
    navigate("/login");
  };

  const scrollToSection = (id) => {
    scroller.scrollTo(id, {
      duration: 500,
      smooth: true,
      offset: -80,
    });
  };

  const handleHomeClick = () => {
    if (location.pathname === '/') {
      scrollToSection('home');
    } else {
      navigate('/');
      setTimeout(() => scrollToSection('home'), 300);
    }
  };

  const isLoginPage = location.pathname === '/login';
  const linkColorClass = isOnHero4 ? 'text-black hover:text-gray-700' : 'text-white hover:text-white';

  if (isLoginPage) {
    return (
      <div className="fixed top-0 left-0 w-full z-50 bg-transparent px-6 py-4">
        <img src={logo} alt="Logo" style={{ width: '60px', height: '40px' }} />
      </div>
    );
  }

  return (
    <div className={`fixed top-0 left-0 w-full z-50 shadow-lg transition-transform duration-700 ${showNavbar ? "translate-y-0" : "-translate-y-full"}`}>
      <div className="flex flex-row justify-between px-5 md:px-32 py-4">
        {/* Logo */}
        <div className="flex items-center">
          <span onClick={handleHomeClick} className="cursor-pointer">
            <img src={logo} alt="Logo" style={{ width: '60px', height: '40px' }} />
          </span>
        </div>

        {/* Main Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <span onClick={handleHomeClick} className={`oswald cursor-pointer ${linkColorClass}`}>
            Home
          </span>
          <span onClick={() => scrollToSection('ContinentCrousel')} className={`oswald cursor-pointer ${linkColorClass}`}>Destinations</span>
          <span onClick={() => scrollToSection('hero2')} className={`oswald cursor-pointer ${linkColorClass}`}>Activities</span>
          <span onClick={() => scrollToSection('blog')} className={`oswald cursor-pointer ${linkColorClass}`}>Blogs</span>
          <span onClick={() => scrollToSection('about')} className={`oswald cursor-pointer ${linkColorClass}`}>About</span>
          <span onClick={() => scrollToSection('contact')} className={`oswald cursor-pointer ${linkColorClass}`}>Contact</span>

          {/* Search Input */}
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

          {/* User Dropdown */}
          {user ? (
            <div className="relative font-oswald" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(prev => !prev)}
                className={`oswald px-4 py-1 rounded-full border text-sm tracking-wide transition-all duration-300
                  ${isOnHero4
                    ? 'text-black border-black hover:bg-black hover:text-white'
                    : 'text-white border-white hover:bg-white hover:text-black'
                  }`}
              >
                {user.name.split(" ")[0]} 🇻
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-zinc-900 border border-zinc-700 text-white rounded-xl shadow-xl z-50 overflow-hidden animate-fadeIn">
                  <a
                    href="/profile"
                    className="oswald block px-4 py-3 hover:bg-zinc-800 text-md font-oswald transition"
                  >
                    Profile
                  </a>
                  <button
                    onClick={handleLogout}
                    className="oswald block w-full text-left px-4 py-3 hover:bg-zinc-800 text-md font-oswald transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Button title="Sign In" link="login" className={isOnHero4 ? "text-black" : "text-white"} />
          )}
        </nav>

        {/* Hamburger Menu */}
        <div className="md:hidden flex items-center" onClick={handleChange}>
          <AiOutlineMenuUnfold size={28} className={isOnHero4 ? 'text-black' : 'text-white'} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
