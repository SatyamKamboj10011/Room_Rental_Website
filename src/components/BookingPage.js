import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
  Container, Row, Col, Card, Button, Form, 
  Image, Spinner, Badge, Alert, Carousel,
  ListGroup, Accordion
} from 'react-bootstrap';
import BookingDataService from '../services/BookingDataService';
import { 
  FaCalendarAlt, FaUser, FaEnvelope, FaStar, 
  FaWifi, FaParking, FaSwimmingPool, FaUtensils,
  FaTv, FaPaw, FaSmokingBan
} from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';
import { MdAcUnit, MdBeachAccess } from 'react-icons/md';

function BookingPage() {
  const { listingId: paramListingId } = useParams();
  const { state } = useLocation();
  const [bookingDetails, setBookingDetails] = useState(state?.listingData || null);
  const [images, setImages] = useState(state?.images || []);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(!state?.listingData);
  const [nights, setNights] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const listingId = paramListingId || state?.listingId;

  // Calculate nights and total price when dates change (weekly pricing)
  useEffect(() => {
    if (checkInDate && checkOutDate && bookingDetails) {
      const diffTime = Math.abs(new Date(checkOutDate) - new Date(checkInDate));
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const weeks = Math.ceil(diffDays / 7); // Calculate number of weeks
      setNights(diffDays);
      setTotalPrice(weeks * bookingDetails.price); // Multiply by weeks instead of days
    }
  }, [checkInDate, checkOutDate, bookingDetails]);

  useEffect(() => {
    const currentListingId = listingId || state?.listingId;
    if (!currentListingId) {
      setError('Listing ID is missing');
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const data = await BookingDataService.getListingById(currentListingId);
        setBookingDetails(data);
        if (!images.length) {
          setImages(data.images || []);
        }
      } catch (error) {
        setError('Error fetching listing details');
        console.error("Error fetching booking details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!state?.listingData) {
      fetchData();
    }
  }, [listingId, state]);

  const handleBookingSubmit = async () => {
    if (!checkInDate || !checkOutDate || !guestName || !guestEmail) {
      setError('Please fill in all fields!');
      return;
    }
    if (new Date(checkInDate) >= new Date(checkOutDate)) {
      setError('Check-out date must be after check-in date.');
      return;
    }
  
    const bookingData = {
      guestName,
      guestEmail,
      checkInDate,
      checkOutDate,
      price: bookingDetails.price,
      totalPrice,
      nights,
      weeks: Math.ceil(nights / 7),
      listingId,
      listingTitle: bookingDetails.title,
      listingImage: images[0] || ''
    };

    if (!listingId) {
      setError('Listing ID is missing!');
      return;
    }

    navigate(`/CheckoutPage/${listingId}`, { state: { bookingData, listingId } });
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" style={{ width: '4rem', height: '4rem' }} />
      </div>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger" className="text-center">
          {error}
          <Button variant="link" onClick={() => navigate('/')}>Return to Home</Button>
        </Alert>
      </Container>
    );
  }

  if (!bookingDetails) {
    return (
      <Container className="mt-5">
        <Alert variant="warning" className="text-center">
          Listing details not found!
          <Button variant="link" onClick={() => navigate('/')}>Browse other listings</Button>
        </Alert>
      </Container>
    );
  }

  return (
    <div className="booking-page">
      <style>{`
        .booking-page {
          background-color: #f8f9fa;
          min-height: 100vh;
          padding-top: 2rem;
          padding-bottom: 4rem;
        }
        
        .luxury-card {
          border: none;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          overflow: hidden;
          transition: transform 0.3s;
        }
        
        .luxury-card:hover {
          transform: translateY(-5px);
        }
        
        .booking-form-card {
          border: none;
          border-radius: 15px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.05);
        }
        
        .form-control {
          border-radius: 10px;
          padding: 12px 15px;
          border: 1px solid #e0e0e0;
        }
        
        .form-control:focus {
          border-color: #4e73df;
          box-shadow: 0 0 0 0.2rem rgba(78, 115, 223, 0.25);
        }
        
        .btn-booking {
          background: linear-gradient(135deg, #4e73df 0%, #224abe 100%);
          border: none;
          border-radius: 10px;
          padding: 12px 30px;
          font-weight: 600;
          letter-spacing: 0.5px;
          transition: all 0.3s;
        }
        
        .btn-booking:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(78, 115, 223, 0.3);
        }
        
        .price-display {
          font-size: 1.8rem;
          font-weight: 700;
          color: #2e59d9;
        }
        
        .section-title {
          position: relative;
          margin-bottom: 2rem;
          font-weight: 700;
        }
        
        .section-title:after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -10px;
          width: 50px;
          height: 3px;
          background: linear-gradient(135deg, #4e73df 0%, #224abe 100%);
        }
        
        .amenity-icon {
          font-size: 1.5rem;
          margin-right: 10px;
          color: #4e73df;
        }
        
        .carousel-indicators li {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        
        .rating-badge {
          background-color: #f8f9fa;
          color: #ffc107;
          font-size: 0.9rem;
          padding: 5px 10px;
          border-radius: 20px;
        }
        
        .date-input-icon {
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: #6c757d;
        }
        
        .input-group-icon {
          position: relative;
        }
      `}</style>

      <Container>
        <Button 
          variant="outline-primary" 
          onClick={() => navigate(-1)}
          className="mb-4 d-flex align-items-center"
        >
          <IoIosArrowForward className="rotate-180 me-2" /> Back to Results
        </Button>
        
        <Row className="g-4">
          <Col lg={8}>
            <Card className="luxury-card mb-4">
              {images.length > 0 ? (
                <Carousel indicators interval={null}>
                  {images.map((img, idx) => (
                    <Carousel.Item key={idx}>
                      <div style={{ height: '400px', overflow: 'hidden' }}>
                        <Image 
                          src={img} 
                          alt={`Room view ${idx + 1}`} 
                          fluid 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                    </Carousel.Item>
                  ))}
                </Carousel>
              ) : (
                <div style={{ height: '400px', backgroundColor: '#eee' }} className="d-flex align-items-center justify-content-center">
                  <span className="text-muted">No images available</span>
                </div>
              )}
              
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h2 className="mb-1">{bookingDetails.title}</h2>
                    <p className="text-muted mb-2">
                      {bookingDetails.location || 'Premium location'} • {bookingDetails.type || 'Luxury accommodation'}
                    </p>
                    <div className="d-flex align-items-center">
                      <Badge pill bg="light" text="dark" className="rating-badge me-2">
                        <FaStar className="text-warning me-1" />
                        {bookingDetails.rating || '4.8'} ({bookingDetails.reviews || '24'} reviews)
                      </Badge>
                      <Badge pill bg="success" className="me-2">
                        {bookingDetails.available ? 'Available' : 'Booked'}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-end">
                    <div className="price-display">${bookingDetails.price}<small className="text-muted fs-6"> / week</small></div>
                    {nights > 0 && (
                      <div className="text-muted">
                        ${totalPrice} for {Math.ceil(nights / 7)} {Math.ceil(nights / 7) === 1 ? 'week' : 'weeks'} ({nights} nights)
                      </div>
                    )}
                  </div>
                </div>
                
                <hr />
                
                <h5 className="section-title">Description</h5>
                <p className="mb-4">{bookingDetails.description || 'This premium accommodation offers comfort and luxury in a prime location. Perfect for both short and extended stays.'}</p>
                
                <h5 className="section-title">Amenities</h5>
                <Row className="mb-4">
                  <Col md={6}>
                    <ListGroup variant="flush">
                      <ListGroup.Item className="border-0 ps-0 py-2">
                        <FaWifi className="amenity-icon" /> High-speed WiFi
                      </ListGroup.Item>
                      <ListGroup.Item className="border-0 ps-0 py-2">
                        <FaParking className="amenity-icon" /> Free parking
                      </ListGroup.Item>
                      <ListGroup.Item className="border-0 ps-0 py-2">
                        <FaSwimmingPool className="amenity-icon" /> Swimming pool
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
                  <Col md={6}>
                    <ListGroup variant="flush">
                      <ListGroup.Item className="border-0 ps-0 py-2">
                        <FaUtensils className="amenity-icon" /> Kitchen
                      </ListGroup.Item>
                      <ListGroup.Item className="border-0 ps-0 py-2">
                        <MdAcUnit className="amenity-icon" /> Air conditioning
                      </ListGroup.Item>
                      <ListGroup.Item className="border-0 ps-0 py-2">
                        <FaTv className="amenity-icon" /> Smart TV
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
                </Row>
                
                <Accordion defaultActiveKey="0" className="mb-4">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>House Rules</Accordion.Header>
                    <Accordion.Body>
                      <ListGroup variant="flush">
                        <ListGroup.Item className="border-0 ps-0 py-1">
                          <FaSmokingBan className="text-danger me-2" /> No smoking
                        </ListGroup.Item>
                        <ListGroup.Item className="border-0 ps-0 py-1">
                          <FaPaw className="text-primary me-2" /> Pets allowed with prior approval
                        </ListGroup.Item>
                        <ListGroup.Item className="border-0 ps-0 py-1">
                          <MdBeachAccess className="text-info me-2" /> Check-in after 3 PM, check-out by 11 AM
                        </ListGroup.Item>
                      </ListGroup>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg={4}>
            <Card className="booking-form-card sticky-top" style={{ top: '20px' }}>
              <Card.Body>
                <h4 className="mb-4">Book Your Stay</h4>
                
                {error && <Alert variant="danger" className="mb-4">{error}</Alert>}
                
                <Form>
                  <Form.Group className="mb-3 input-group-icon">
                    <Form.Label>Check-in Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                    <FaCalendarAlt className="date-input-icon" />
                  </Form.Group>
                  
                  <Form.Group className="mb-3 input-group-icon">
                    <Form.Label>Check-out Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      min={checkInDate || new Date().toISOString().split('T')[0]}
                    />
                    <FaCalendarAlt className="date-input-icon" />
                  </Form.Group>
                  
                  {nights > 0 && (
                    <div className="mb-3 p-3 bg-light rounded">
                      <div className="d-flex justify-content-between mb-2">
                        <span>${bookingDetails.price} x {Math.ceil(nights / 7)} {Math.ceil(nights / 7) === 1 ? 'week' : 'weeks'}</span>
                        <span>${totalPrice}</span>
                      </div>
                      <div className="d-flex justify-content-between fw-bold">
                        <span>Total</span>
                        <span>${totalPrice}</span>
                      </div>
                      <div className="text-muted small mt-2">
                        ({nights} nights total)
                      </div>
                    </div>
                  )}
                  
                  <Form.Group className="mb-3">
                    <Form.Label><FaUser className="me-2" />Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Your name"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-4">
                    <Form.Label><FaEnvelope className="me-2" />Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Your email"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                    />
                  </Form.Group>
                  
                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="w-100 btn-booking mb-3"
                    onClick={handleBookingSubmit}
                  >
                    Reserve Now
                  </Button>
                  
                  <p className="text-center text-muted small">
                    You won't be charged yet. Secure your booking instantly.
                  </p>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default BookingPage;