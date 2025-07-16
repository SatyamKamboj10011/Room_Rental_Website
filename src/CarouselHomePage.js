import React, { useState, useEffect } from 'react';
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
  Form,
  InputGroup,
  Badge
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
  FaSearch,
  FaStar,
  FaBed,
  FaBath,
  FaWifi,
  FaParking,
  FaUtensils,
  FaHeart,
  FaUser,
  FaCalendarAlt,
  FaShieldAlt
} from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, Link } from 'react-router-dom';

function HomePage() {
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredListings, setFeaturedListings] = useState([]);
  const [showNewsletterModal, setShowNewsletterModal] = useState(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching featured listings
    const fetchListings = () => {
      setLoading(true);
      setTimeout(() => {
        setFeaturedListings([
          {
            id: 1,
            title: "Luxury Downtown Apartment",
            price: 120,
            location: "New York, NY",
            beds: 2,
            baths: 1,
            image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            amenities: ['wifi', 'parking', 'kitchen'],
            rating: 4.8,
            reviews: 124
          },
          {
            id: 2,
            title: "Cozy Studio Near Campus",
            price: 85,
            location: "Boston, MA",
            beds: 1,
            baths: 1,
            image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            amenities: ['wifi', 'kitchen'],
            rating: 4.5,
            reviews: 89
          },
          {
            id: 3,
            title: "Modern Loft with City View",
            price: 150,
            location: "Chicago, IL",
            beds: 3,
            baths: 2,
            image: "https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1355&q=80",
            amenities: ['wifi', 'parking', 'kitchen'],
            rating: 4.9,
            reviews: 156
          }
        ]);
        setLoading(false);
      }, 1000);
    };

    fetchListings();
    
    // Show newsletter modal after 5 seconds
    const timer = setTimeout(() => {
      setShowNewsletterModal(true);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

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

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/listings?search=${searchQuery}`);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for subscribing with ${email}!`);
    setEmail('');
    setShowNewsletterModal(false);
  };

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section position-relative">
        <div className="hero-overlay"></div>
        <Container className="position-relative" style={{ zIndex: 1, paddingTop: '120px', paddingBottom: '80px' }}>
          <Row className="align-items-center">
            <Col lg={6} className="text-white mb-5 mb-lg-0">
              <h1 className="display-4 fw-bold mb-4">Find Your Perfect Home</h1>
              <p className="lead mb-4" style={{ fontSize: '1.25rem', maxWidth: '500px' }}>
                Discover thousands of listings and book your dream space with ease.
              </p>
              
              {/* Search Form */}
              <Form onSubmit={handleSearch} className="mb-4">
                <InputGroup className="shadow-lg" style={{ maxWidth: '600px' }}>
                  <Form.Control
                    type="text"
                    placeholder="Search by location, price, or amenities..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="py-3 border-0"
                  />
                  <Button 
                    variant="primary" 
                    type="submit" 
                    className="px-4 border-0"
                    style={{ fontWeight: '600' }}
                  >
                    <FaSearch className="me-2" /> Search
                  </Button>
                </InputGroup>
              </Form>
              
              <div className="d-flex flex-wrap gap-3">
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="px-4 py-3 fw-bold rounded-pill"
                  as={Link}
                  to="/listings"
                >
                  <FaHome className="me-2" /> Browse Listings
                </Button>
                <Button 
                  variant="outline-light" 
                  size="lg" 
                  className="px-4 py-3 fw-bold rounded-pill"
                  onClick={() => handleNavigation('/about')}
                >
                  <FaInfoCircle className="me-2" /> Learn More
                </Button>
              </div>
            </Col>
            
            <Col lg={6} className="d-none d-lg-block">
              <Card className="border-0 shadow-lg" style={{ borderRadius: '16px', overflow: 'hidden' }}>
                <Carousel fade indicators={false} interval={3000}>
                  {featuredListings.slice(0, 3).map((listing) => (
                    <Carousel.Item key={listing.id}>
                      <div style={{ height: '400px', overflow: 'hidden' }}>
                        <img
                          src={listing.image}
                          alt={listing.title}
                          className="w-100 h-100"
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                      <Carousel.Caption className="text-start p-4" style={{ 
                        background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
                        bottom: '0',
                        left: '0',
                        right: '0'
                      }}>
                        <h5 className="fw-bold">{listing.title}</h5>
                        <div className="d-flex align-items-center">
                          <FaStar className="text-warning me-1" />
                          <span className="me-3">{listing.rating} ({listing.reviews})</span>
                          <FaDollarSign className="text-success me-1" />
                          <span>{listing.price}/night</span>
                        </div>
                      </Carousel.Caption>
                    </Carousel.Item>
                  ))}
                </Carousel>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Featured Listings Section */}
      <section className="py-5 bg-light">
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold">Featured Listings</h2>
            <p className="text-muted">Explore our most popular properties</p>
          </div>
          
          <Row>
            {loading ? (
              <Col className="text-center py-5">
                <Spinner animation="border" variant="primary" />
              </Col>
            ) : (
              featuredListings.map((listing) => (
                <Col key={listing.id} lg={4} md={6} className="mb-4">
                  <Card className="h-100 border-0 shadow-sm" style={{ borderRadius: '12px', overflow: 'hidden', transition: 'all 0.3s ease' }}>
                    <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                      <img
                        src={listing.image}
                        alt={listing.title}
                        className="w-100 h-100"
                        style={{ objectFit: 'cover' }}
                      />
                      <Button 
                        variant="light" 
                        size="sm" 
                        className="position-absolute top-3 end-3 rounded-circle"
                        style={{ width: '36px', height: '36px' }}
                      >
                        <FaHeart />
                      </Button>
                      <Badge 
                        bg="success" 
                        className="position-absolute top-3 start-3 d-flex align-items-center"
                        style={{ padding: '5px 10px' }}
                      >
                        <FaStar className="me-1" /> {listing.rating}
                      </Badge>
                    </div>
                    <Card.Body className="p-4">
                      <div className="d-flex justify-content-between mb-2">
                        <h5 className="mb-0">{listing.title}</h5>
                        <h5 className="mb-0 text-primary">
                          <FaDollarSign />{listing.price}/night
                        </h5>
                      </div>
                      <p className="text-muted mb-3">
                        <FaMapMarkerAlt className="me-1" /> {listing.location}
                      </p>
                      
                      <div className="d-flex mb-3">
                        <div className="me-3">
                          <FaBed className="me-1" /> {listing.beds} beds
                        </div>
                        <div>
                          <FaBath className="me-1" /> {listing.baths} baths
                        </div>
                      </div>
                      
                      <div className="d-flex flex-wrap gap-2 mb-4">
                        {listing.amenities.includes('wifi') && (
                          <Badge bg="light" text="dark" className="d-flex align-items-center">
                            <FaWifi className="me-1" /> WiFi
                          </Badge>
                        )}
                        {listing.amenities.includes('parking') && (
                          <Badge bg="light" text="dark" className="d-flex align-items-center">
                            <FaParking className="me-1" /> Parking
                          </Badge>
                        )}
                        {listing.amenities.includes('kitchen') && (
                          <Badge bg="light" text="dark" className="d-flex align-items-center">
                            <FaUtensils className="me-1" /> Kitchen
                          </Badge>
                        )}
                      </div>
                      
                      <Button 
                        variant="primary" 
                        className="w-100"
                        onClick={() => handleNavigation(`/listing/${listing.id}`)}
                      >
                        View Details <IoIosArrowForward />
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            )}
          </Row>
          
          <div className="text-center mt-4">
            <Button 
              variant="outline-primary" 
              size="lg" 
              as={Link} 
              to="/listings"
              className="px-5 rounded-pill"
            >
              View All Listings
            </Button>
          </div>
        </Container>
      </section>

      {/* How It Works Section */}
      <section className="py-5 bg-white">
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold">How It Works</h2>
            <p className="text-muted">Find your perfect home in just a few steps</p>
          </div>
          
          <Row className="g-4">
            <Col md={4}>
              <Card className="border-0 shadow-sm h-100 text-center p-4" style={{ borderRadius: '12px' }}>
                <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4" style={{ width: '80px', height: '80px' }}>
                  <h2 className="mb-0 text-primary">1</h2>
                </div>
                <Card.Body>
                  <h4 className="mb-3">Search</h4>
                  <p className="text-muted">
                    Browse through thousands of listings and filter by location, price, and amenities.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={4}>
              <Card className="border-0 shadow-sm h-100 text-center p-4" style={{ borderRadius: '12px' }}>
                <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4" style={{ width: '80px', height: '80px' }}>
                  <h2 className="mb-0 text-primary">2</h2>
                </div>
                <Card.Body>
                  <h4 className="mb-3">Visit</h4>
                  <p className="text-muted">
                    Schedule a viewing or take a virtual tour of your favorite properties.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={4}>
              <Card className="border-0 shadow-sm h-100 text-center p-4" style={{ borderRadius: '12px' }}>
                <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4" style={{ width: '80px', height: '80px' }}>
                  <h2 className="mb-0 text-primary">3</h2>
                </div>
                <Card.Body>
                  <h4 className="mb-3">Book</h4>
                  <p className="text-muted">
                    Secure your new home with our easy booking process and move in hassle-free.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-5 mb-lg-0">
              <div className="pe-lg-5">
                <h2 className="fw-bold mb-4">Why Choose Our Platform</h2>
                <p className="lead mb-4">
                  We're dedicated to making your home search as seamless and enjoyable as possible.
                </p>
                
                <div className="d-flex mb-4">
                  <div className="me-4">
                    <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                      <FaUser className="text-primary" style={{ fontSize: '1.5rem' }} />
                    </div>
                  </div>
                  <div>
                    <h5 className="fw-bold">Personalized Service</h5>
                    <p className="text-muted mb-0">
                      Our dedicated team works with you to understand your needs and preferences.
                    </p>
                  </div>
                </div>
                
                <div className="d-flex mb-4">
                  <div className="me-4">
                    <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                      <FaCalendarAlt className="text-primary" style={{ fontSize: '1.5rem' }} />
                    </div>
                  </div>
                  <div>
                    <h5 className="fw-bold">Flexible Viewings</h5>
                    <p className="text-muted mb-0">
                      Schedule viewings at your convenience, including virtual tours.
                    </p>
                  </div>
                </div>
                
                <div className="d-flex">
                  <div className="me-4">
                    <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                      <FaShieldAlt className="text-primary" style={{ fontSize: '1.5rem' }} />
                    </div>
                  </div>
                  <div>
                    <h5 className="fw-bold">Secure Transactions</h5>
                    <p className="text-muted mb-0">
                      Your payments and personal information are always protected.
                    </p>
                  </div>
                </div>
              </div>
            </Col>
            
            <Col lg={6}>
              <div className="position-relative" style={{ borderRadius: '16px', overflow: 'hidden', height: '500px' }}>
                <img
                  src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  alt="Happy customer"
                  className="w-100 h-100"
                  style={{ objectFit: 'cover' }}
                />
                <div className="position-absolute bottom-0 start-0 end-0 p-4" style={{ 
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)'
                }}>
                  <div className="d-flex align-items-center">
                    <div className="bg-white rounded-circle me-3" style={{ width: '60px', height: '60px' }}></div>
                    <div>
                      <h5 className="text-white mb-1">Sarah Johnson</h5>
                      <p className="text-white-50 mb-0">Found her dream home in 3 days</p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Call to Action Section */}
      <section className="py-5 bg-primary text-white">
        <Container className="text-center py-4">
          <h2 className="fw-bold mb-3">Ready to Find Your Dream Home?</h2>
          <p className="lead mb-4">Join thousands of happy renters who found their perfect space with us</p>
          <Button 
            variant="light" 
            size="lg" 
            className="px-5 py-3 fw-bold rounded-pill"
            as={Link}
            to="/register"
          >
            Get Started Now
          </Button>
        </Container>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-5">
        <Container>
          <Row>
            <Col lg={4} className="mb-4 mb-lg-0">
              <h5 className="mb-3">About Us</h5>
              <p>
                We're dedicated to helping you find your perfect home with the most comprehensive listings and best customer service in the industry.
              </p>
              <div className="d-flex gap-3 mt-3">
                <Button variant="outline-light" size="sm" className="rounded-circle">
                  <FaFacebook />
                </Button>
                <Button variant="outline-light" size="sm" className="rounded-circle">
                  <FaTwitter />
                </Button>
                <Button variant="outline-light" size="sm" className="rounded-circle">
                  <FaInstagram />
                </Button>
              </div>
            </Col>
            
            <Col lg={2} md={4} className="mb-4 mb-md-0">
              <h5 className="mb-3">Quick Links</h5>
              <Nav className="flex-column">
                <Nav.Link as={Link} to="/" className="text-white px-0 py-1">Home</Nav.Link>
                <Nav.Link as={Link} to="/listings" className="text-white px-0 py-1">Listings</Nav.Link>
                <Nav.Link as={Link} to="/about" className="text-white px-0 py-1">About Us</Nav.Link>
                <Nav.Link as={Link} to="/contact" className="text-white px-0 py-1">Contact</Nav.Link>
              </Nav>
            </Col>
            
            <Col lg={2} md={4} className="mb-4 mb-md-0">
              <h5 className="mb-3">Resources</h5>
              <Nav className="flex-column">
                <Nav.Link as={Link} to="/blog" className="text-white px-0 py-1">Blog</Nav.Link>
                <Nav.Link as={Link} to="/faq" className="text-white px-0 py-1">FAQ</Nav.Link>
                <Nav.Link as={Link} to="/guides" className="text-white px-0 py-1">Guides</Nav.Link>
                <Nav.Link as={Link} to="/terms" className="text-white px-0 py-1">Terms</Nav.Link>
              </Nav>
            </Col>
            
            <Col lg={4} md={4}>
              <h5 className="mb-3">Newsletter</h5>
              <p>Subscribe to get updates on new listings and special offers.</p>
              <Form className="mt-3">
                <InputGroup>
                  <Form.Control 
                    type="email" 
                    placeholder="Your email" 
                    className="py-2 border-0"
                  />
                  <Button variant="light" type="submit" className="border-0">
                    Subscribe
                  </Button>
                </InputGroup>
              </Form>
            </Col>
          </Row>
          
          <hr className="my-4 bg-secondary opacity-25" />
          
          <div className="text-center text-muted">
            <small className='text-light'>© {new Date().getFullYear()} Satyam Kamboj. All rights reserved.</small>
          </div>
        </Container>
      </footer>

      {/* Authentication Modal */}
      <Modal show={showAuthModal} onHide={() => setShowAuthModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Join Our Community</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-4">Sign in or create an account to access all features:</p>
          <div className="d-grid gap-3">
            <Button 
              variant="primary" 
              size="lg" 
              onClick={handleLogin}
              as={Link}
              to="/login"
              className="rounded-pill"
            >
              Sign In
            </Button>
            <Button 
              variant="outline-primary" 
              size="lg"
              as={Link}
              to="/register"
              className="rounded-pill"
            >
              Create Account
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Newsletter Modal */}
      <Modal show={showNewsletterModal} onHide={() => setShowNewsletterModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Stay Updated</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleNewsletterSubmit}>
            <p className="mb-3">Subscribe to our newsletter for the latest listings and special offers!</p>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 rounded-pill">
              Subscribe
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Loading Spinner */}
      {loading && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ zIndex: 9999, background: 'rgba(0,0,0,0.5)' }}>
          <Spinner animation="border" variant="light" style={{ width: '3rem', height: '3rem' }} />
        </div>
      )}

      {/* Custom CSS */}
      <style>{`
        .hero-section {
          position: relative;
          min-height: 80vh;
          overflow: hidden;
          background: linear-gradient(135deg, #2b5876 0%, #4e4376 100%);
        }
        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.4);
        }
        .homepage {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        .card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
        }
        .btn {
          transition: all 0.3s ease;
        }
        .btn:hover {
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}

export default HomePage;