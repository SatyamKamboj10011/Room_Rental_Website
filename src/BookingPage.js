import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form, Image } from 'react-bootstrap';
import BookingDataService from './services/BookingDataService'; // Adjust the path as needed
import Spinner from 'react-bootstrap/Spinner';

function BookingPage() {
  const { id } = useParams();
  const [bookingDetails, setBookingDetails] = useState(null);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await BookingDataService.getBookingDetailsById(id);
      setBookingDetails(data);
    };
    fetchData();
  }, [id]);

  const handleBookingSubmit = async () => {
    if (!checkInDate || !checkOutDate || !guestName || !guestEmail) {
      setMessage("Please fill in all fields");
      setMessageType("error");
      return;
    }

    setIsLoading(true);

    try {
      const bookingData = {
        listingId: id,
        checkInDate,
        checkOutDate,
        guestName,
        guestEmail,
        status: "pending", // Set initial status as pending
      };

      const bookingId = await BookingDataService.createBooking(bookingData);

      setIsLoading(false);
      setMessage("Booking confirmed!");
      setMessageType("success");
    } catch (error) {
      setIsLoading(false);
      console.error("Error creating booking:", error);
      setMessage("An error occurred. Please try again.");
      setMessageType("error");
    }
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
      {/* Message Display */}
      <Row className="mb-4">
        <Col>
          {message && (
            <div className={`alert ${messageType === 'success' ? 'alert-success' : 'alert-danger'}`} role="alert">
              {message}
            </div>
          )}
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={6}>
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

                <Button variant="primary" onClick={handleBookingSubmit} disabled={isLoading}>
                  {isLoading ? "Booking..." : "Confirm Booking"}
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
