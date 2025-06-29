import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Hero2 from './components/Hero2';
import Hero3 from './components/hero3';
import Hero4 from './components/hero4';
import Blog from './components/Blog';
import ContinentCarousel from './components/ContinentCrousel';
import DestinationPage from "./landing pages/DestinationPage";
import UserProfile from "./components/UserProfile";
import SelectHotelPage from "./landing pages/SelectHotelPage";
import TripSummary from "./components/TripSummary";


const MainPage = () => (
  <div id="home">
    <Home />
    <Hero2 />
    <Hero3 />
    <Hero4 />
    <ContinentCarousel />
    <Blog />
  </div>
);

// Conditional layout wrapper
const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <>
      <Navbar isLoginPage={isLoginPage} />
      {children}
      {!isLoginPage && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <LayoutWrapper>
        <main>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/destinations/:continent" element={<DestinationPage />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/hotels/:cityId" element={<SelectHotelPage />} />
            <Route path="/trip-summary/:tripId" element={<TripSummary />} />
          </Routes>
        </main>
      </LayoutWrapper>
    </Router>
  );
};

export default App;
