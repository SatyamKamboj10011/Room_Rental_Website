// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OffcanvasExample from './Navbar';
import CarouselHomePage from './CarouselHomePage';
import CategoryButtons from './ButtonGroup';
import HomeCards from './HomeCards';
import HeaderAndFooterExample from './WhyChooseUs';
import Register from './Register';

function App() {
  return (
    <Router>
      <div>
        <OffcanvasExample />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={
            <>
              <CarouselHomePage />
              <CategoryButtons />
              <HomeCards />
              <HeaderAndFooterExample />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
