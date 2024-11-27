import React from 'react';
import OffcanvasExample from './components/Navbar';
import CarouselHomePage from './CarouselHomePage';
import CategoryButtons from './ButtonGroup';
import HomeCards from './HomeCards';
import HeaderAndFooterExample from './WhyChooseUs';
 
import { BrowserRouter, Routes, Route } from 'react-router-dom';
 
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
import { Check } from 'lucide-react';
import CheckoutPage from './components/CheckoutPage';
import HostDashboard from './components/Hostdashboard';
import HomePage from './CarouselHomePage';
import AboutContactPage from './Aboutus';
import ViewBookingPage from './components/ViewBookingPage';
import InvoicePage from './components/InvoicePage';
import Guestlistings from './components/Guestlisting';
import UserDashboardPage from './UserDashboard';

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
          <Route path='/booking/:listingId' element={<BookingPage/>}/>
          <Route path="/CheckoutPage/:listingId" element={<CheckoutPage/>}/>
          <Route path="/HostDashboard" element={<HostDashboard/>}/>
          <Route path="/view-booking/:listingId" element={<ViewBookingPage/>}/>
          <Route path ='/show/:listingId' element={<Show/>}/>
          <Route path = '/add-listing/:id' element={<AddListings/>}/>
          <Route path="/invoice/:bookingId" element={<InvoicePage />} />
          <Route path ='/userdashboard' element={<UserDashboardPage/>}/>

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
                path="/ProfilePage"
                element={
                  <UserRoute>
                    <ProfilePage />
                  </UserRoute>
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
       
         
           <Route path='/feedback/:id' element={<Create/>}/>
           <Route path='/Booking' element={<BookingPage/>}/>
           <Route path='/Guestlistings' element={<Guestlistings/>}/>
        </Routes>
      </div>
    </BrowserRouter>
    </UserAuthContextProvider>
  );
}
 
export default App;