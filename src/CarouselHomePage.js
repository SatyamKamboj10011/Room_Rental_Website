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
  Nav,
} from 'react-bootstrap';
import {
  FaMapMarkerAlt,
  FaDollarSign,
  FaCheckCircle,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaHome,
  FaInfoCircle,
} from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function HomePage() {
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
    } else {
      setLoading(true);
      setTimeout(() => {
        navigate(path);
        setLoading(false);
      }, 1000);
    }
  };

  const handleLogin = () => {
    setShowAuthModal(false);
  };

  return (
    <>
      <div
        style={{
          background: `url('https://cdn.pixabay.com/photo/2016/08/26/15/06/home-1622401_1280.jpg') no-repeat center center/cover`,
          minHeight: '110vh',
          color: '#fff',
        }}
      >
        {/* Hero Section */}
        <div className="container my-5 mt-0" >
          <Row className="text-light text-center">
            {/* Left Column for Search */}
            <Col
              md={6}
              className="d-flex flex-column justify-content-center align-items-center py-5 mt-5"
              style={{
                borderRadius: '10px',
                background: 'rgba(0, 0, 255, 0.8)',
                color: '#fff',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
              }}
            >
              <h2
                className="fw-bold mb-4"
                style={{ fontSize: '2.5rem', textAlign: 'center' }}
              >
                Your Dream Home Awaits
              </h2>
              <p
                className="text-center"
                style={{ fontSize: '1.2rem', maxWidth: '80%' }}
              >
                Discover amazing spaces that match your lifestyle and start your
                next chapter today!
              </p>
              <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
                <Button
                  variant="warning"
                  className="px-4 py-2"
                  style={{
                    borderRadius: '50px',
                    fontWeight: 'bold',
                  }}
                  as={Link}
                  to="/listings"
                >
                  <FaHome className="me-2" /> Explore Homes
                </Button>
                <Button
                  variant="outline-light"
                  className="px-4 py-2"
                  style={{
                    borderRadius: '50px',
                    fontWeight: 'bold',
                    borderWidth: '2px',
                  }}
                >
                  <FaInfoCircle className="me-2" /> Learn More
                </Button>
              </div>
            </Col>

            {/* Right Column for Carousel */}
            <Col md={6}className='mt-5'>
              <Carousel fade className="shadow-lg">
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
                  <Carousel.Caption>
                    <Button
                      variant="light"
                      className="border-0"
                      onClick={() => handleNavigation('/Listings')}
                      style={{
                        padding: '10px 20px',
                        fontSize: '1.2rem',
                        background: 'rgba(255, 255, 255, 0.7)',
                      }}
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
                  <Carousel.Caption>
                    <Button
                      variant="light"
                      className="border-0"
                      onClick={() => handleNavigation('/Listings')}
                      style={{
                        padding: '10px 20px',
                        fontSize: '1.2rem',
                        background: 'rgba(255, 255, 255, 0.7)',
                      }}
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
                  <Carousel.Caption>
                    <Button
                      variant="light"
                      className="border-0"
                      onClick={() => handleNavigation('/Listings')}
                      style={{
                        padding: '10px 20px',
                        fontSize: '1.2rem',
                        background: 'rgba(255, 255, 255, 0.7)',
                      }}
                    >
                      Explore Listings
                    </Button>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </Col>
          </Row>
        </div>

        {/* Why Choose Us Section */}
        <Container className="my-5 text-center">
          <h2 className="mb-4">Why Choose Us</h2>
          <Row>
            <Col md={4}>
              <Card className="shadow-lg border-0">
                <Card.Body>
                  <FaDollarSign className="text-success mb-3" size={50} />
                  <Card.Title>Affordable Prices</Card.Title>
                  <Card.Text>Rooms to fit every budget.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="shadow-lg border-0">
                <Card.Body>
                  <FaMapMarkerAlt className="text-primary mb-3" size={50} />
                  <Card.Title>Prime Locations</Card.Title>
                  <Card.Text>
                    Find homes in the best neighborhoods.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="shadow-lg border-0">
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
        <div
  className="py-5"
  style={{
    background: 'linear-gradient(to right, #3a7bd5, #3a6073)',
    color: 'white',
  }}
>
  <Container>
    <h2 className="mb-4 text-center" style={{ fontWeight: 'bold', fontSize: '2.5rem' }}>
      What Our Clients Say
    </h2>
    <Carousel fade indicators={false} interval={3000} className="text-center">
      <Carousel.Item>
        <div
          className="p-4 mx-auto"
          style={{
            maxWidth: '600px',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '15px',
            boxShadow: '0 6px 15px rgba(0, 0, 0, 0.3)',
            color: '#fff',
          }}
        >
          <p
            style={{
              fontStyle: 'italic',
              fontSize: '1.3rem',
              lineHeight: '1.8',
              marginBottom: '15px',
            }}
          >
            "This platform made finding my dream home so easy!"
          </p>
          <h6 className="text-white" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
            - Happy Client
          </h6>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div
          className="p-4 mx-auto"
          style={{
            maxWidth: '600px',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '15px',
            boxShadow: '0 6px 15px rgba(0, 0, 0, 0.3)',
            color: '#fff',
          }}
        >
          <p
            style={{
              fontStyle: 'italic',
              fontSize: '1.3rem',
              lineHeight: '1.8',
              marginBottom: '15px',
            }}
          >
            "The best customer service I've experienced in years."
          </p>
          <h6 className="text-white" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
            - Satisfied User
          </h6>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div
          className="p-4 mx-auto"
          style={{
            maxWidth: '600px',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '15px',
            boxShadow: '0 6px 15px rgba(0, 0, 0, 0.3)',
            color: '#fff',
          }}
        >
          <p
            style={{
              fontStyle: 'italic',
              fontSize: '1.3rem',
              lineHeight: '1.8',
              marginBottom: '15px',
            }}
          >
            "Highly recommend to anyone looking for quality homes."
          </p>
          <h6 className="text-white" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
            - Loyal Customer
          </h6>
        </div>
      </Carousel.Item>
    </Carousel>
  </Container>
</div>


        {/* Footer Section */}
        <footer className="bg-dark text-light py-4">
          <Container>
            <Row>
              <Col md={4}>
                <h5>About Us</h5>
                <p>
                  Your trusted platform for finding your next dream home.
                </p>
              </Col>
              <Col md={4}>
                <h5>Quick Links</h5>
                <Nav className="flex-column">
                  <Nav.Link as={Link} to="/home" className="text-light">
                    Home
                  </Nav.Link>
                  <Nav.Link as={Link} to="/Listings" className="text-light">
                    Listings
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/Aboutus"
                    className="text-light"
                  >
                    About Us / Contact
                  </Nav.Link>
                </Nav>
              </Col>
              <Col md={4}>
                <h5>Contact</h5>
                <p>Email: support@example.com</p>
                <p>Phone: +123 456 7890</p>
                <div className="d-flex gap-2">
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
              <Button
                variant="primary"
                onClick={handleLogin}
                as={Link}
                to="/Login"
              >
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
          <Spinner
            animation="border"
            role="status"
            className="position-fixed top-50 start-50 translate-middle"
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
      </div>
    </>
  );
}

export default HomePage;
