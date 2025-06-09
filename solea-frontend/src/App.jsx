import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// other components
import Home from './components/Home';


const MainPage = () => (
  <div>
    <div id="home">
      <Home />
    </div>
  </div>
);

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<MainPage />} />
          </Routes>
          <Footer />
        </main>
      </div>
    </Router>
  );
};

export default App;
