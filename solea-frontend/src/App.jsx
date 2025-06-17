import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Hero2 from './components/Hero2';
import Hero3 from './components/hero3';

const MainPage = () => (
  <div id="home">
    <Home />
    <Hero2 />
    <Hero3 />
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
          </Routes>
        </main>
      </LayoutWrapper>
    </Router>
  );
};

export default App;
