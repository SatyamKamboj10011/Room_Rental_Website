import React, { useEffect, useState } from 'react';
import { Col, Container, Image, Row, Button, Card, ListGroup, Badge, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ListingsDataService from '../services/ListingsDataService';
import { 
  FaStar, FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined, 
  FaWifi, FaParking, FaUtensils, FaSwimmingPool, FaSnowflake,
  FaTv, FaCoffee, FaUmbrellaBeach
} from 'react-icons/fa';
import { IoIosPeople, IoIosArrowBack } from 'react-icons/io';
import { GiHomeGarage, GiFlowerPot } from 'react-icons/gi';
import Spinner from 'react-bootstrap/Spinner';
import FBDataService from '../services/fbServices';
import { Carousel } from 'react-bootstrap';

function DescriptionPage() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    getListingById(id);
    getFeedbackData(id);
  }, [id]);

  const getFeedbackData = async () => {
    try {
      const feedbackData = await FBDataService.getAllData();
      if (!feedbackData || feedbackData.length === 0) {
        setFeedback([]);
        return;
      }
      const filteredFeedback = feedbackData.filter((fb) => fb.listingId === id);
      setFeedback(filteredFeedback);
    } catch (error) {
      console.error("Error fetching feedback data:", error);
    }
  };
  
  const getListingById = async (listingId) => {
    try {
      const data = await ListingsDataService.getListingById(listingId);
      if (!data) {
        setListing(null);
        navigate('/listings');
        return;
      }
      setListing(data);
    } catch (error) {
      setListing(null);
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = () => {
    navigate(`/booking/${listing.id}`, { 
      state: { 
        listingData: listing,
        listingId: listing.id,
        images: [listing.image, listing.image2, listing.image3].filter(img => img)
      } 
    });
  };

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" style={{ width: '4rem', height: '4rem' }} />
      </div>
    );
  }

  if (!listing) {
    return (
      <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
        <h3 className="mb-4 text-center">Listing not found</h3>
        <Link to="/listings" className="btn btn-primary px-4 py-3 rounded-pill shadow-sm">
          Browse Available Listings
        </Link>
      </Container>
    );
  }

  return (
    <div className="description-page">
      <style>{`
        .description-page {
          background-color: #f8fafc;
          min-height: 100vh;
        }
        
        .hero-section {
          background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ed 100%);
          padding: 3rem 0;
          position: relative;
          overflow: hidden;
        }
        
        .hero-section::before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background: url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80') no-repeat center center;
          background-size: cover;
          opacity: 0.05;
          z-index: 0;
        }
        
        .property-card {
          border: none;
          border-radius: 16px;
          box-shadow: 0 15px 30px rgba(0,0,0,0.05);
          overflow: hidden;
          transition: transform 0.3s ease;
        }
        
        .property-card:hover {
          transform: translateY(-5px);
        }
        
        .detail-card {
          border: none;
          border-radius: 12px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.03);
        }
        
        .amenity-card {
          border: none;
          border-radius: 12px;
          background-color: rgba(255,255,255,0.7);
          backdrop-filter: blur(10px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.03);
        }
        
        .price-tag {
          font-size: 2.5rem;
          font-weight: 700;
          color: #2e59d9;
          line-height: 1;
        }
        
        .section-title {
          position: relative;
          padding-bottom: 1rem;
          margin-bottom: 2rem;
        }
        
        .section-title::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 60px;
          height: 4px;
          background: linear-gradient(135deg, #4e73df 0%, #224abe 100%);
          border-radius: 2px;
        }
        
        .amenity-icon {
          font-size: 1.5rem;
          margin-right: 12px;
          color: #4e73df;
        }
        
        .carousel-image {
          height: 500px;
          object-fit: cover;
          width: 100%;
        }
        
        .thumbnail {
          width: 90px;
          height: 70px;
          border-radius: 8px;
          border: 2px solid transparent;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .thumbnail:hover, .thumbnail.active {
          border-color: #4e73df;
          transform: scale(1.05);
        }
        
        .active {
          border-color: #4e73df !important;
        }
        
        .btn-book {
          background: linear-gradient(135deg, #4e73df 0%, #224abe 100%);
          border: none;
          border-radius: 50px;
          padding: 12px 30px;
          font-weight: 600;
          letter-spacing: 0.5px;
          transition: all 0.3s;
        }
        
        .btn-book:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(78, 115, 223, 0.3);
        }
        
        .review-card {
          border: none;
          border-radius: 12px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
          transition: transform 0.3s ease;
        }
        
        .review-card:hover {
          transform: translateY(-5px);
        }
        
        .cta-section {
          background: linear-gradient(135deg, #4e73df 0%, #224abe 100%);
          border-radius: 16px;
          overflow: hidden;
          position: relative;
        }
        
        .cta-pattern {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background-image: radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 15px 15px;
          opacity: 0.5;
        }
        
        .back-btn {
          border-radius: 50px;
          padding: 8px 20px;
          transition: all 0.3s;
        }
        
        .back-btn:hover {
          background-color: #f1f5f9;
        }
      `}</style>

      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Button 
            variant="light" 
            className="back-btn d-inline-flex align-items-center mb-4 shadow-sm"
            onClick={() => navigate('/listings')}
          >
            <IoIosArrowBack className="me-2" /> Back to Listings
          </Button>
          
          <Row className="align-items-center mb-4">
            <Col lg={8}>
              <h1 className="display-4 fw-bold mb-3" style={{color: '#1e293b'}}>{listing.title}</h1>
              <div className="d-flex align-items-center mb-3">
                <Badge pill bg="light" text="dark" className="me-3 d-flex align-items-center py-2 px-3">
                  <FaStar className="text-warning me-2" /> 
                  <span className="fw-bold">{listing.rating}</span>
                  <span className="ms-1 text-muted">({listing.reviewCount} reviews)</span>
                </Badge>
                <div className="d-flex align-items-center text-muted">
                  <FaMapMarkerAlt className="me-2" />
                  <span>{listing.location}</span>
                </div>
              </div>
            </Col>
            <Col lg={4} className="text-lg-end mt-3 mt-lg-0">
              <div className="bg-white p-3 rounded-3 shadow-sm d-inline-block">
                <span className="d-block text-muted small">Starting from</span>
                <span className="price-tag">${listing.price}</span>
                <span className="text-muted"> / week</span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Container className="py-5 position-relative" style={{zIndex: 1}}>
        {/* Property Gallery */}
        <Row className="mb-5">
          <Col lg={8} className="mb-4 mb-lg-0">
            <Card className="property-card mb-4">
              <Carousel 
                activeIndex={activeIndex} 
                onSelect={handleSelect} 
                fade 
                indicators={false}
                interval={null}
              >
                {[listing.image, listing.image2, listing.image3].filter(img => img).map((img, idx) => (
                  <Carousel.Item key={idx}>
                    <img
                      src={img}
                      alt={`Property view ${idx + 1}`}
                      className="carousel-image"
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
              <div className="d-flex mt-3">
                {[listing.image, listing.image2, listing.image3].filter(img => img).map((img, idx) => (
                  <div 
                    key={idx}
                    style={{backgroundImage: `url(${img})`}}
                    className={`thumbnail me-3 ${activeIndex === idx ? 'active' : ''}`}
                    onClick={() => setActiveIndex(idx)}
                  />
                ))}
              </div>
            </Card>

            {/* Property Description */}
            <Card className="property-card p-4 mb-4">
              <h3 className="section-title">About this property</h3>
              <p className="lead mb-4" style={{lineHeight: '1.8'}}>{listing.description}</p>
              
              <div className="row g-4">
                <div className="col-md-6">
                  <Card className="h-100 amenity-card p-3">
                    <h5 className="fw-bold mb-3">Features</h5>
                    <ListGroup variant="flush">
                      <ListGroup.Item className="d-flex align-items-center border-0 px-0 py-2">
                        <FaBed className="amenity-icon" />
                        <div>
                          <div className="fw-semibold">{listing.bedrooms || 'N/A'} Bedrooms</div>
                          <small className="text-muted">Comfortable sleeping arrangements</small>
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex align-items-center border-0 px-0 py-2">
                        <FaBath className="amenity-icon" />
                        <div>
                          <div className="fw-semibold">{listing.bathrooms || 'N/A'} Bathrooms</div>
                          <small className="text-muted">Modern facilities</small>
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex align-items-center border-0 px-0 py-2">
                        <FaRulerCombined className="amenity-icon" />
                        <div>
                          <div className="fw-semibold">{listing.area || 'N/A'} sq ft</div>
                          <small className="text-muted">Spacious living area</small>
                        </div>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card>
                </div>
                <div className="col-md-6">
                  <Card className="h-100 amenity-card p-3">
                    <h5 className="fw-bold mb-3">Capacity</h5>
                    <ListGroup variant="flush">
                      <ListGroup.Item className="d-flex align-items-center border-0 px-0 py-2">
                        <IoIosPeople className="amenity-icon" />
                        <div>
                          <div className="fw-semibold">{listing.guests || 'N/A'} Guests</div>
                          <small className="text-muted">Perfect for families or groups</small>
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex align-items-center border-0 px-0 py-2">
                        <GiHomeGarage className="amenity-icon" />
                        <div>
                          <div className="fw-semibold">Parking Available</div>
                          <small className="text-muted">Convenient for guests with vehicles</small>
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex align-items-center border-0 px-0 py-2">
                        <GiFlowerPot className="amenity-icon" />
                        <div>
                          <div className="fw-semibold">Outdoor Space</div>
                          <small className="text-muted">Garden or patio area</small>
                        </div>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card>
                </div>
              </div>
            </Card>

            {/* Amenities */}
            <Card className="property-card p-4">
              <h3 className="section-title">Amenities</h3>
              <Row>
                <Col md={6}>
                  <ListGroup variant="flush">
                    <ListGroup.Item className="d-flex align-items-center border-0 px-0 py-2">
                      <FaWifi className="amenity-icon" />
                      <span>High-speed WiFi</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex align-items-center border-0 px-0 py-2">
                      <FaParking className="amenity-icon" />
                      <span>Free parking</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex align-items-center border-0 px-0 py-2">
                      <FaSwimmingPool className="amenity-icon" />
                      <span>Swimming pool</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex align-items-center border-0 px-0 py-2">
                      <FaCoffee className="amenity-icon" />
                      <span>Coffee maker</span>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col md={6}>
                  <ListGroup variant="flush">
                    <ListGroup.Item className="d-flex align-items-center border-0 px-0 py-2">
                      <FaUtensils className="amenity-icon" />
                      <span>Kitchen facilities</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex align-items-center border-0 px-0 py-2">
                      <FaSnowflake className="amenity-icon" />
                      <span>Air conditioning</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex align-items-center border-0 px-0 py-2">
                      <FaTv className="amenity-icon" />
                      <span>Smart TV</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex align-items-center border-0 px-0 py-2">
                      <FaUmbrellaBeach className="amenity-icon" />
                      <span>Beach access</span>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </Card>
          </Col>

          {/* Booking Sidebar */}
          <Col lg={4}>
            <Card className="property-card p-4 sticky-top" style={{top: '20px'}}>
              <h3 className="fw-bold mb-4">Book Your Stay</h3>
              
              <div className="bg-light p-4 rounded-3 mb-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-muted">From</span>
                  <span className="price-tag">${listing.price}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-muted">Per night</span>
                  <span className="text-success fw-semibold">Available</span>
                </div>
              </div>
              
              <Button 
                variant="primary" 
                size="lg" 
                className="w-100 btn-book mb-3"
                onClick={handleBookNow}
              >
                Check Availability
              </Button>
              
              <div className="text-center mb-4">
                <small className="text-muted">No booking fees • Secure payment</small>
              </div>
              
              <Card className="detail-card mb-4">
                <Card.Body>
                  <h5 className="fw-bold mb-3">Property Highlights</h5>
                  <ListGroup variant="flush">
                    <ListGroup.Item className="d-flex align-items-center border-0 px-0 py-2">
                      <FaMapMarkerAlt className="amenity-icon" />
                      <div>
                        <div className="fw-semibold">Prime Location</div>
                        <small className="text-muted">{listing.location}</small>
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex align-items-center border-0 px-0 py-2">
                      <FaStar className="amenity-icon text-warning" />
                      <div>
                        <div className="fw-semibold">{listing.rating} Rating</div>
                        <small className="text-muted">Based on {listing.reviewCount} reviews</small>
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
              
              <Card className="detail-card">
                <Card.Body>
                  <h5 className="fw-bold mb-3">Nearby Attractions</h5>
                  <ListGroup variant="flush">
                    {listing.attractions && listing.attractions.map((attraction, index) => (
                      <ListGroup.Item key={index} className="d-flex align-items-center border-0 px-0 py-2">
                        <FaMapMarkerAlt className="amenity-icon" />
                        <span>{attraction}</span>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Card>
          </Col>
        </Row>

        {/* Reviews Section */}
        <Row className="mb-5">
          <Col>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="section-title">Guest Reviews</h3>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Share your experience</Tooltip>}
              >
                <Button variant="outline-primary" as={Link} to={`/feedback/${listing.id}`}>
                  Write a Review
                </Button>
              </OverlayTrigger>
            </div>
            
            {feedback.length > 0 ? (
              <Row>
                {feedback.slice(0, 3).map((fb) => (
                  <Col md={4} key={fb.id} className="mb-4">
                    <Card className="h-100 review-card">
                      <Card.Body>
                        <div className="d-flex align-items-center mb-3">
                          <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{width: '40px', height: '40px'}}>
                            {fb.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="ms-3">
                            <h6 className="mb-0 fw-semibold">{fb.name}</h6>
                            <div className="d-flex align-items-center">
                              <FaStar className="text-warning me-1 small" />
                              <small className="text-muted">{fb.date}</small>
                            </div>
                          </div>
                        </div>
                        <p className="mb-0" style={{lineHeight: '1.6'}}>"{fb.feedback}"</p>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
                {feedback.length > 3 && (
                  <div className="text-center mt-3">
                    <Link to={`/feedback/${listing.id}`} className="btn btn-link text-primary">
                      View all {feedback.length} reviews
                    </Link>
                  </div>
                )}
              </Row>
            ) : (
              <Card className="text-center py-5">
                <Card.Body>
                  <h5 className="text-muted mb-3">No reviews yet</h5>
                  <p className="mb-4">Be the first to share your experience!</p>
                  <Button variant="outline-primary" as={Link} to={`/feedback/${listing.id}`}>
                    Write a Review
                  </Button>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>

        {/* CTA Section */}
        <Row className="mb-5">
          <Col>
            <Card className="cta-section text-white">
              <div className="cta-pattern"></div>
              <Card.Body className="p-5 position-relative">
                <Row className="align-items-center">
                  <Col md={8}>
                    <h2 className="fw-bold mb-3">Ready for your perfect stay?</h2>
                    <p className="mb-0">Book now and experience luxury accommodation with exceptional service.</p>
                  </Col>
                  <Col md={4} className="text-md-end mt-4 mt-md-0">
                    <Button 
                      variant="light" 
                      size="lg" 
                      className="fw-bold px-4 rounded-pill"
                      onClick={handleBookNow}
                    >
                      Book Now
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default DescriptionPage;