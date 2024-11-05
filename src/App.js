// src/App.js
import React from 'react';
import OffcanvasExample from './Navbar';
import CarouselHomePage from './CarouselHomePage';
import CategoryButtons from './ButtonGroup';
import HomeCards from './HomeCards';
import HeaderAndFooterExample from './WhyChooseUs';
import Login from './Login';
import Create from './Review/Create';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Register from './Register';
import { UserAuthContextProvider } from './context/UserAuthContext';

function App() {
  return (
    <UserAuthContextProvider>
    <BrowserRouter>
    <div>
      <OffcanvasExample/>
     <Routes>
      
          <Route path="/Login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={
            <>
              <CarouselHomePage />
              <CategoryButtons />
              <HomeCards />
              <HeaderAndFooterExample />
            </>
           
          } />
           <Route path='/Feedback' element={<Create/>}/>
        </Routes>
      </div>
    </BrowserRouter>
    </UserAuthContextProvider>
  );
}

export default App;
