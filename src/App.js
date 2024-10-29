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


function App() {
  return (
    <div>
<OffcanvasExample/>
<CarouselHomePage/>
<CategoryButtons/>
<HomeCards/>
<HeaderAndFooterExample/>



</div>

  );
}

export default App;
