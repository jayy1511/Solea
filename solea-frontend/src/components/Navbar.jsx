import React, { useState } from 'react';
import { Link } from 'react-scroll';
import { AiOutlineMenuUnfold } from "react-icons/ai";
import logo from '../assets/images/logo.png';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
    const [menu, setMenu] = useState(false);

    const handleChange = () => {
        setMenu(!menu);
    };

    return (
        <div className="fixed top-0 left-0 w-full bg-[#222] text-white z-50 rounded-b-3xl shadow-lg">
            <div className="flex flex-row justify-between px-5 md:px-32 py-4">
                <div className="flex items-center">
                    <Link to="home" spy={true} smooth={true} duration={500}>
                        <img src={logo} alt="Logo" className="cursor-pointer" style={{ width: '60px', height: '40px' }} />
                    </Link>
                </div>
                <nav className="hidden md:flex items-center gap-6">
                    <Link to="home" spy={true} smooth={true} duration={500} className="oswald hover:text-brightRed transition-all cursor-pointer">Home</Link>
                    <Link to="subscriptions" spy={true} smooth={true} duration={500} className="oswald hover:text-brightRed transition-all cursor-pointer">Subscriptions</Link>
                    <Link to="activities" spy={true} smooth={true} duration={500} className="oswald hover:text-brightRed transition-all cursor-pointer">Activities</Link>
                    <Link to="clubs" spy={true} smooth={true} duration={500} className="oswald hover:text-brightRed transition-all cursor-pointer">Clubs</Link>
                    <Link to="about" spy={true} smooth={true} duration={500} className="oswald hover:text-brightRed transition-all cursor-pointer">About</Link>
                    <Link to="contact" spy={true} smooth={true} duration={500} className="oswald hover:text-brightRed transition-all cursor-pointer">Contact</Link>
                    <RouterLink to="/login">
                        <button className="oswald bg-brightRed text-white px-4 py-2 rounded-full hover:bg-[#F4A261] transition-all">Sign In</button>
                    </RouterLink>
                </nav>
                <div className="md:hidden flex items-center" onClick={handleChange}>
                    <AiOutlineMenuUnfold size={28} />
                </div>
            </div>
            <div
                className={`${menu ? "translate-x-0" : "-translate-x-full"
                    } md:hidden flex flex-col absolute bg-[#222] text-white left-0 top-20 font-semibold text-xl text-center pt-8 pb-4 gap-6 w-full h-auto transition-transform duration-300`}
            >
                <Link to="home" spy={true} smooth={true} duration={500} className="hover:text-brightRed transition-all cursor-pointer">Home</Link>
                <Link to="subscriptions" spy={true} smooth={true} duration={500} className="hover:text-brightRed transition-all cursor-pointer">Subscriptions</Link>
                <Link to="activities" spy={true} smooth={true} duration={500} className="hover:text-brightRed transition-all cursor-pointer">Activities</Link>
                <Link to="clubs" spy={true} smooth={true} duration={500} className="hover:text-brightRed transition-all cursor-pointer">Clubs</Link>
                <Link to="about" spy={true} smooth={true} duration={500} className="hover:text-brightRed transition-all cursor-pointer">About</Link>
                <Link to="contact" spy={true} smooth={true} duration={500} className="hover:text-brightRed transition-all cursor-pointer">Contact</Link>
                <RouterLink to="/login">
                    <button className="bg-brightRed text-white px-4 py-2 rounded-full hover:bg-red-600 transition-all">Sign In</button>
                </RouterLink>
            </div>
        </div>
    );
};

export default Navbar;
