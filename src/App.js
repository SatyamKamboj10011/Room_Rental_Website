// src/App.js
import React from 'react';
import OffcanvasExample from './Navbar';
import CarouselHomePage from './CarouselHomePage';
import CategoryButtons from './ButtonGroup';
import HomeCards from './HomeCards';
import HeaderAndFooterExample from './WhyChooseUs';

import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Register from './Register';
import Login from './components/Login';
import { UserAuthContextProvider } from './context/UserAuthContext';
import Listings from './Listings';
import DescriptionPage from './DescriptionPage';
import Create from  './Review/Create';
import AddListings from './AddListings';

function App() {
  return (
    <UserAuthContextProvider>
    <UserAuthContextProvider>
    <BrowserRouter>
    <div>
      <OffcanvasExample/>
     <Routes>
      
          <Route path = '/Login' element={<Login/>}/>
         
          <Route path="/register" element={<Register />} />
        
          <Route path = '/listings' element={<Listings/>}/>
          <Route path="/DescriptionPage/:id" element={<DescriptionPage />} />
          <Route path="/AddListings" element={<AddListings />} />
          <Route path="/" element={
            <>
              <CarouselHomePage />
              
              <HomeCards />
              <HeaderAndFooterExample />
            </>
           
          } />
           <Route path='/Feedback' element={<Create/>}/>
        </Routes>
      </div>
    </BrowserRouter>
    </UserAuthContextProvider>
    </UserAuthContextProvider>
  );
}

export default App;
