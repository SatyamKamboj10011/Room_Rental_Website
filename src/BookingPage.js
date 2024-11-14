import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form, Image } from 'react-bootstrap';
import BookingDataService from './services/BookingDataService'; // Adjust the path as needed
import Spinner from 'react-bootstrap/Spinner';

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
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container className="mt-5">
      <Row className="mb-4">
        <Col md={6}>
          {/* Display room image */}
          <Image src={bookingDetails.image} alt="Room" fluid rounded />
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Booking Information</Card.Title>
              <p><strong>Room:</strong> {bookingDetails.title}</p>
              <p><strong>Price per week:</strong> ${bookingDetails.price}</p>
              <p><strong>Description:</strong> {bookingDetails.description}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Booking Form */}
      <Row>
        <Col>
          <Card>
            <Card.Header>Complete Your Booking</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group controlId="formCheckInDate" className="mb-3">
                  <Form.Label>Check-in Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formCheckOutDate" className="mb-3">
                  <Form.Label>Check-out Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formGuestName" className="mb-3">
                  <Form.Label>Guest Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formGuestEmail" className="mb-3">
                  <Form.Label>Guest Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                  />
                </Form.Group>

                <Button variant="primary" onClick={handleBookingSubmit}>
                  Confirm Booking
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col className="text-center">
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Back to Listings
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default BookingPage;
