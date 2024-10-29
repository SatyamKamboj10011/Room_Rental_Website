import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavScrollExample from './Navbar';
import OffcanvasExample from './Navbar';
import CarouselHomePage from './CarouselHomePage';
import { ButtonGroup } from 'react-bootstrap';
import CategoryButtons from './ButtonGroup';
import HomeCards from './HomeCards';
import HeaderAndFooterExample from './WhyChooseUs';
import Login from './Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
    <div>
      <OffcanvasExample/>
     <Routes>
      
          <Route path="/Login" element={<Login />} />
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
</BrowserRouter>

  );
}

export default App;
