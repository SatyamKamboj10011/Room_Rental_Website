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
import AdminDashboard from './AdminDashboard';
import UserProfileDashboard from './ProfilePage';
import ProfilePage from './ProfilePage';
import BookingPage from './BookingPage';
import { AdminRoute, HostRoute,GuestRoute,UserRoute } from './components/ProtectedRoute';
import { Check } from 'lucide-react';
import CheckoutPage from './CheckoutPage';
import HomePage from './CarouselHomePage';
import AboutContactPage from './Aboutus';

function App() {
  return (
    <UserAuthContextProvider>
    <BrowserRouter>
    <div>
      <OffcanvasExample/>
     <Routes>
      
          <Route path = '/Login' element={<Login/>}/>
         
          <Route path="/register" element={<Register />} />
        
          <Route path = '/listings' element={<Listings/>}/>
          <Route path="/DescriptionPage/:id" element={<DescriptionPage />} />
          <Route path="/Aboutus" element={<AboutContactPage />} />
          <Route path="/AddListings" element={<AddListings />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/ProfilePage" element={<ProfilePage/>}/>
          <Route path='/booking/:id' element={<BookingPage/>}/>
          <Route path="/CheckoutPage" element={<CheckoutPage/>}/>
          <Route
                path="/admindashboard"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />
              <Route
                path="/ProfilePage"
                element={
                  <HostRoute>
                    <ProfilePage />
                  </HostRoute>
                }
              />
              <Route
                path="/ProfilePage"
                element={
                  <UserRoute>
                    <ProfilePage />
                  </UserRoute>
                }
              />
               <Route
                path="/"
                element={
                  <>
             <HomePage />
                </>
                }
              />
              <Route
                path="/"
                element={
                  <GuestRoute>
             <CarouselHomePage />
              <HomeCards />
              <HeaderAndFooterExample />
              <AboutContactPage/>
                  </GuestRoute>
                }
              />
        
         
           <Route path='/Feedback' element={<Create/>}/>
           <Route path='/Booking' element={<BookingPage/>}/>
        </Routes>
      </div>
    </BrowserRouter>
    </UserAuthContextProvider>
  );
}

export default App;
