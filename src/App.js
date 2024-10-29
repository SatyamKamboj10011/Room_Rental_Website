// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OffcanvasExample from './Navbar';
import CarouselHomePage from './CarouselHomePage';
import CategoryButtons from './ButtonGroup';
import HomeCards from './HomeCards';
import HeaderAndFooterExample from './WhyChooseUs';
<<<<<<< HEAD
import Register from './Register';

function App() {
  return (
    <Router>
      <div>
        <OffcanvasExample />
        <Routes>
          <Route path="/register" element={<Register />} />
=======
import Login from './Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
    <div>
      <OffcanvasExample/>
     <Routes>
      
          <Route path="/Login" element={<Login />} />
>>>>>>> 89d58cfb7823a3afdd7c38a8d07b903ff42a5ec4
          <Route path="/" element={
            <>
              <CarouselHomePage />
              <CategoryButtons />
              <HomeCards />
              <HeaderAndFooterExample />
            </>
          } />
        </Routes>
<<<<<<< HEAD
      </div>
    </Router>
=======





</div>
</BrowserRouter>

>>>>>>> 89d58cfb7823a3afdd7c38a8d07b903ff42a5ec4
  );
}

export default App;
