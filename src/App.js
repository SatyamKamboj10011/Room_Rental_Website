import React from 'react';
import OffcanvasExample from './components/Navbar';
import CarouselHomePage from './CarouselHomePage';

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
 
import Show from './Review/Show';
import Register from './components/Register';
import Login from './components/Login';
import { UserAuthContextProvider } from './context/UserAuthContext';
import Listings from './Listings';
import DescriptionPage from './components/DescriptionPage';
import Create from './Review/Create';
import AddListings from './components/AddListings';
import AdminDashboard from './components/AdminDashboard';
import ProfilePage from './components/ProfilePage';
import BookingPage from './components/BookingPage';
import { AdminRoute, HostRoute,GuestRoute,UserRoute } from './components/ProtectedRoute';
import CheckoutPage from './components/CheckoutPage';
import HostDashboard from './components/Hostdashboard';
import AboutContactPage from './Aboutus';
import ViewBookingPage from './components/ViewBookingPage';
import InvoicePage from './components/InvoicePage';
import Guestlistings from './components/Guestlisting';
import UserDashboardPage from './UserDashboard';
import { BlogPage, FaqPage, GuidesPage, TermsPage, PrivacyPage, NotFoundPage, UnauthorizedPage } from './StaticPages';
import ForgotPassword from './components/ForgotPassword';

// The login/register pages are full-bleed hero layouts with their own
// minimal top bar, so the standard site nav would duplicate that chrome.
const NO_NAVBAR_PATHS = ['/login', '/register'];

function SiteNavbar() {
  const { pathname } = useLocation();
  if (NO_NAVBAR_PATHS.includes(pathname.toLowerCase())) {
    return null;
  }
  return <OffcanvasExample />;
}

function App() {
  return (
    <UserAuthContextProvider>
    <BrowserRouter>
    <div>
      <SiteNavbar/>
     <Routes>
     
          <Route path = '/Login' element={<Login/>}/>
         
          <Route path="/register" element={<Register />} />
       
          <Route path = '/listings' element={<Listings/>}/>
          <Route path="/DescriptionPage/:id" element={<DescriptionPage />} />
          <Route path="/Aboutus" element={<AboutContactPage />} />
          <Route path="/AddListings" element={<AddListings />} />
          <Route path ='/show/:listingId' element={<Show/>}/>

         {/* Admin */}
          <Route
                path="/admindashboard"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />
              {/* Host */}
              <Route
                path="/hostdashboard"
                element={
                  <HostRoute>
                    <HostDashboard/>
                  </HostRoute>
                }
              />

                <Route
                path="/add-listing/:id"
                element={
                  <HostRoute>
                    <AddListings/>
                  </HostRoute>
                }
              />

              <Route
              path="/view-booking/:listingId"
              element={
                <HostRoute>
                  <ViewBookingPage />
                </HostRoute>
              }
            />
              <Route
                path="/userdashboard"
                element={
                  <UserRoute>
                    <UserDashboardPage />
                  </UserRoute>
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
              path="/booking/:listingId"
              element={
                <UserRoute>
                  <BookingPage />
                </UserRoute>
              }
            />
            <Route
              path="/CheckoutPage/:listingId"
              element={
                <UserRoute>
                  <CheckoutPage />
                </UserRoute>
              }
            />
            <Route
              path="/invoice/:bookingId"
              element={
                <UserRoute>
                  <InvoicePage />
                </UserRoute>
              }
              />
              {/* HomePage */}
              <Route
                path="/"
                element={
                  <GuestRoute>
                    <CarouselHomePage />
                  </GuestRoute>
                }
              />

         
           <Route path='/feedback/:id' element={<Create/>}/>
           <Route path='/Booking' element={<BookingPage/>}/>
           <Route path='/Guestlistings' element={<Guestlistings/>}/>
           <Route path='/blog' element={<BlogPage/>}/>
           <Route path='/faq' element={<FaqPage/>}/>
           <Route path='/guides' element={<GuidesPage/>}/>
           <Route path='/terms' element={<TermsPage/>}/>
           <Route path='/privacy' element={<PrivacyPage/>}/>
           <Route path='/forgot-password' element={<ForgotPassword/>}/>
           <Route path='/unauthorized' element={<UnauthorizedPage/>}/>
           <Route path='*' element={<NotFoundPage/>}/>
        </Routes>
      </div>
    </BrowserRouter>
    </UserAuthContextProvider>
  );
}
 
export default App;