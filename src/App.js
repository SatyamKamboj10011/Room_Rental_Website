import React from 'react';
import OffcanvasExample from './Navbar';
import CarouselHomePage from './CarouselHomePage';
import CategoryButtons from './ButtonGroup';
import HomeCards from './HomeCards';
import HeaderAndFooterExample from './WhyChooseUs';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Show from './Review/Show';
import Register from './Register';
import Login from './components/Login';
import { UserAuthContextProvider } from './context/UserAuthContext';
import Listings from './Listings';
import DescriptionPage from './DescriptionPage';
import Create from './Review/Create';
import AddListings from './AddListings';
import AdminDashboard from './AdminDashboard';
import UserProfileDashboard from './ProfilePage';
import ProfilePage from './ProfilePage';
import BookingPage from './BookingPage';
import { AdminRoute, HostRoute, GuestRoute } from './components/ProtectedRoute';

function App() {
  return (
    <UserAuthContextProvider>
      <BrowserRouter>
        <div>
          <OffcanvasExample />
          <Routes>
            {/* Public routes */}
            <Route path="/Login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/listings" element={<Listings />} />
            <Route path="/DescriptionPage/:id" element={<DescriptionPage />} />
            <Route path='/booking/:id' element={<BookingPage />} />
            <Route path="/Feedback/:id" element={<Create />} />
            <Route path="/show/:listingId/:feedbackId" element={<Show />} />

            {/* Host Routes */}
            <Route
              path="/AddListings"
              element={
                <HostRoute>
                  <AddListings />
                </HostRoute>
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

            {/* Admin Routes */}
            <Route
              path="/AdminDashboard"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />

            {/* Guest Routes */}
            <Route
              path="/home"
              element={
                <GuestRoute>
                  <CarouselHomePage />
                  <HomeCards />
                  <HeaderAndFooterExample />
                </GuestRoute>
              }
            />

            {/* Routes without restrictions */}
            <Route path="/" element={<> <CarouselHomePage />
                  <HomeCards />
                  <HeaderAndFooterExample /></>} />
          </Routes>
        </div>
      </BrowserRouter>
    </UserAuthContextProvider>
  );
}

export default App;
