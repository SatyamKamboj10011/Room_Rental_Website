import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form, Image, Spinner, Badge } from 'react-bootstrap';
import BookingDataService from './services/BookingDataService'; // Adjust the path as needed
import { FaCalendarAlt, FaUser, FaEnvelope } from 'react-icons/fa';

function BookingPage() {
  const { id } = useParams(); // Get the listing ID from the route
  const [bookingDetails, setBookingDetails] = useState(null);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const navigate = useNavigate();

  // Fetch booking details from Firestore (you can use your BookingDataService)
  useEffect(() => {
    const fetchData = async () => {
      const data = await BookingDataService.getBookingDetailsById(id);
      setBookingDetails(data);
    };
    fetchData();
  }, [id]);

  const handleBookingSubmit = () => {
    // Submit booking logic here (e.g., save to database, send confirmation)
    console.log('Booking submitted:', { checkInDate, checkOutDate, guestName, guestEmail });
  };

  if (!bookingDetails) {
    return (
      <div className="text-center">
        <Spinner animation="border" variant="info" />
      </div>
    );
  }

  return (
    <Container className="mt-5">
      {/* Title and Room Info */}
      <Row className="mb-4">
        <Col md={6}>
          <Image src={bookingDetails.image} alt="Room" fluid rounded style={imageStyle} />
        </Col>
        <Col md={6}>
          <Card style={cardStyle}>
            <Card.Body>
              <Card.Title style={cardTitleStyle}>{bookingDetails.title}</Card.Title>
              <p style={roomInfoStyle}><strong>Price:</strong> ${bookingDetails.price} per night</p>
              <p style={roomInfoStyle}><strong>Description:</strong> {bookingDetails.description}</p>
              <Badge pill bg="success" className="my-2">Available</Badge>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Booking Form */}
      <Row>
        <Col>
          <Card style={formCardStyle}>
            <Card.Header style={formCardHeaderStyle}>Complete Your Booking</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group controlId="formCheckInDate" className="mb-3">
                  <Form.Label><FaCalendarAlt /> Check-in Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    style={formControlStyle}
                  />
                </Form.Group>

                <Form.Group controlId="formCheckOutDate" className="mb-3">
                  <Form.Label><FaCalendarAlt /> Check-out Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    style={formControlStyle}
                  />
                </Form.Group>

                <Form.Group controlId="formGuestName" className="mb-3">
                  <Form.Label><FaUser /> Guest Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    style={formControlStyle}
                  />
                </Form.Group>

                <Form.Group controlId="formGuestEmail" className="mb-3">
                  <Form.Label><FaEnvelope /> Guest Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    style={formControlStyle}
                  />
                </Form.Group>

                <Button variant="success" size="lg" onClick={handleBookingSubmit} style={submitButtonStyle}>
                  Confirm Booking
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Back Button */}
      <Row className="mt-4">
        <Col className="text-center">
          <Button variant="outline-danger" onClick={() => navigate(-1)} style={backButtonStyle}>
            Back to Listings
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

// Inline styles for the page
const imageStyle = {
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const cardStyle = {
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  borderRadius: '10px',
};

const cardTitleStyle = {
  fontSize: '1.8rem',
  color: '#2c3e50',
  fontWeight: 'bold',
};

const roomInfoStyle = {
  color: '#7f8c8d',
  fontSize: '1rem',
};

const formCardStyle = {
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const formCardHeaderStyle = {
  backgroundColor: '#f39c12',
  color: 'white',
  fontWeight: 'bold',
};

const formControlStyle = {
  borderRadius: '8px',
  border: '1px solid #ccc',
  padding: '12px',
};

const submitButtonStyle = {
  width: '100%',
  backgroundColor: '#27ae60',
  border: 'none',
  borderRadius: '8px',
  padding: '12px',
};

const backButtonStyle = {
  width: '100%',
  backgroundColor: '#e74c3c',
  border: 'none',
  borderRadius: '8px',
  padding: '12px',
};

export default BookingPage;
