import React, { useState } from 'react';
import {
  Button,
  Spinner,
  Modal,
  Container,
  Row,
  Col,
  Card,
  Carousel,
  InputGroup,
  FloatingLabel,
  Form,
  Nav,
  CardGroup,
} from 'react-bootstrap';
import { FaMapMarkerAlt, FaDollarSign, FaCheckCircle, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function HomePage() {
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate();

  // Handles page navigation based on authentication state
  const handleNavigation = (path) => {
    if (!isAuthenticated) {
      setShowAuthModal(true); // Show login/register modal if not authenticated
    } else {
      setLoading(true);
      setTimeout(() => {
        navigate(path);
        setLoading(false);
      }, 1000);
    }
  };
  

  // Handle login action
  const handleLogin = () => {
   // setIsAuthenticated(true);
    setShowAuthModal(false);
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="container my-5">
        <Row className="text-light text-center">
          {/* Left Column for Search */}
          <Col
            md={6}
            className="bg-primary d-flex flex-column justify-content-center align-items-center py-5"
            style={{
              borderRadius: '10px',
              boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
            }}
          >
            <h2 className="fw-bold mb-4" style={{ fontSize: '2.5rem' }}>
              Unlock Your Dream Home
            </h2>
            <p style={{ fontSize: '1.2rem' }}>Search for the perfect space today!</p>
            {/* Search Form */}
            <Card className="p-3" style={{ borderRadius: '10px', boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)' }}>
              <InputGroup>
                <InputGroup.Text id="basic-addon1">
                  <FaMapMarkerAlt />
                </InputGroup.Text>
                <Form.Control placeholder="Enter location" aria-label="Location" />
                <FloatingLabel controlId="floatingSelectGrid" label="Price Range">
                  <Form.Select aria-label="Select Price Range">
                    <option>Choose...</option>
                    <option value="1">$200-$400</option>
                    <option value="2">$400-$600</option>
                    <option value="3">$600-$1000</option>
                  </Form.Select>
                </FloatingLabel>
                <Button variant="warning" className="ms-2">
                  Search
                </Button>
              </InputGroup>
            </Card>
          </Col>
          {/* Right Column for Carousel */}
          {/* Right Column for Carousel */}
<Col md={6}>
  <Carousel fade>
    <Carousel.Item>
      <img
        src="https://media.karousell.com/media/photos/products/2022/5/18/rent_big_common_room_bishan_st_1652846989_cb2bc9f3.jpg"
        alt="Affordable Room"
        className="d-block w-100"
        style={{
          height: '450px',
          objectFit: 'cover',
          borderRadius: '10px',
        }}
      />
      {/* Transparent Button */}
      <Carousel.Caption>
        <Button
          variant="light"
          className="border-0 bg-opacity-50"
          onClick={() => handleNavigation('/Listings')}
          style={{ padding: '10px 20px', fontSize: '1.2rem', background: 'rgba(255, 255, 255, 0.6)' }}
        >
          Explore Listings
        </Button>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        src="https://i.pinimg.com/originals/3d/0f/86/3d0f862d1f7d07f1005e615e0d934b83.png"
        alt="Luxury Apartment"
        className="d-block w-100"
        style={{
          height: '450px',
          objectFit: 'cover',
          borderRadius: '10px',
        }}
      />
      {/* Transparent Button */}
      <Carousel.Caption>
        <Button
          variant="light"
          className="border-0 bg-opacity-50"
          onClick={() => handleNavigation('/Listings')}
          style={{ padding: '10px 20px', fontSize: '1.2rem', background: 'rgba(255, 255, 255, 0.6)' }}
        >
          Explore Listings
        </Button>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        src="https://www.offcampuspads.com/wp-content/uploads/2018/10/rooms-for-rent-south-boston.jpg"
        alt="Spacious Living"
        className="d-block w-100"
        style={{
          height: '450px',
          objectFit: 'cover',
          borderRadius: '10px',
        }}
      />
      {/* Transparent Button */}
      <Carousel.Caption>
        <Button
          variant="light"
          className="border-0 bg-opacity-50"
          onClick={() => handleNavigation('/Listings')}
          style={{ padding: '10px 20px', fontSize: '1.2rem', background: 'rgba(255, 255, 255, 0.6)' }}
        >
          Explore Listings
        </Button>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
</Col>        </Row>
      </div>

      {/* Why Choose Us Section */}
      <Container className="my-5 text-center">
        <h2 className="mb-4">Why Choose Us</h2>
        <Row>
          <Col md={4}>
            <Card className="shadow-lg">
              <Card.Body>
                <FaDollarSign className="text-success mb-3" size={50} />
                <Card.Title>Affordable Prices</Card.Title>
                <Card.Text>Rooms to fit every budget.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-lg">
              <Card.Body>
                <FaMapMarkerAlt className="text-primary mb-3" size={50} />
                <Card.Title>Prime Locations</Card.Title>
                <Card.Text>Find homes in the best neighborhoods.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-lg">
              <Card.Body>
                <FaCheckCircle className="text-warning mb-3" size={50} />
                <Card.Title>Reliable Service</Card.Title>
                <Card.Text>24/7 customer support to assist you.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Testimonials Section */}
      <Container className="my-5 text-center">
        <h2 className="mb-4">What Our Clients Say</h2>
        <Carousel fade>
          <Carousel.Item>
            <div className="bg-light p-4" style={{ borderRadius: '10px' }}>
              <p>"This platform made finding my dream home so easy!"</p>
              <h6>- Happy Client</h6>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="bg-light p-4" style={{ borderRadius: '10px' }}>
              <p>"The best customer service I've experienced in years."</p>
              <h6>- Satisfied User</h6>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="bg-light p-4" style={{ borderRadius: '10px' }}>
              <p>"Highly recommend to anyone looking for quality homes."</p>
              <h6>- Loyal Customer</h6>
            </div>
          </Carousel.Item>
        </Carousel>
      </Container>

      {/* Footer Section */}
      <footer className="bg-dark text-light py-4">
        <Container>
          <Row>
            <Col md={4}>
              <h5>About Us</h5>
              <p>Your trusted platform for finding your next dream home.</p>
            </Col>
            <Col md={4}>
              <h5>Quick Links</h5>
              <Nav className="flex-column">
                <Nav.Link as={Link} to='/home'className="text-light">Home</Nav.Link>
                <Nav.Link href="#!" className="text-light">Listings</Nav.Link>
                <Nav.Link as={Link} to="/Aboutus" className="text-light">About Us / Contact</Nav.Link> 
                </Nav>
            </Col>
            <Col md={4}>
              <h5>Contact</h5>
              <p>Email: support@example.com</p>
              <p>Phone: +123 456 7890</p>
              <div className="d-flex">
                <Button variant="outline-light" className="me-2">
                  <FaFacebook /> Facebook
                </Button>
                <Button variant="outline-light">
                  <FaTwitter /> Twitter
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>

      {/* Authentication Modal */}
      <Modal show={showAuthModal} onHide={() => setShowAuthModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login or Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please log in or register to access this page.</p>
          <div className="d-flex justify-content-around">
            <Button variant="primary" onClick={handleLogin} as={Link} to="/Login">
              Login
            </Button>
            <Button variant="secondary" as={Link} to="/Register">
              Register
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Loading Spinner */}
      {loading && (
        <Spinner animation="border" role="status" className="position-fixed top-50 start-50 translate-middle">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    </div>
  );
}

export default HomePage;
