import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form, Image, Spinner, Badge, Alert } from 'react-bootstrap';
import BookingDataService from '../services/BookingDataService'; // Adjust the path as needed
import { FaCalendarAlt, FaUser, FaEnvelope } from 'react-icons/fa';

function BookingPage() {
  const { listingId: paramListingId } = useParams();
  const { state } = useLocation(); // In case we passed the listingId in the state from the previous page
  const [bookingDetails, setBookingDetails] = useState(null);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [error, setError] = useState(''); // State for error message
  const [loading, setLoading] = useState(true); // Loading state for data fetching
  const navigate = useNavigate();
  const listingId = paramListingId || state?.listingId; // Prioritize URL parameter, fallback to state

  // Fetch booking details from Firestore
  useEffect(() => {
    const currentListingId = listingId || state?.listingId; // Ensure listingId is fetched from the correct source
    if (!currentListingId) {
      setError('Listing ID is missing');
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const data = await BookingDataService.getListingById(currentListingId);
        setBookingDetails(data);
      } catch (error) {
        setError('Error fetching listing details');
        console.error("Error fetching booking details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [listingId, state?.listingId]);

  // Handle booking form submission
  const handleBookingSubmit = async () => {
    if (!checkInDate || !checkOutDate || !guestName || !guestEmail) {
      alert('Please fill in all fields!');
      return;
    }
    if (new Date(checkInDate) >= new Date(checkOutDate)) {
      alert('Check-out date must be after check-in date.');
      return;
    }
  
    // Prepare booking data
    const bookingData = {
      guestName,
      guestEmail,
      checkInDate,
      checkOutDate,
      price: bookingDetails.price,
      listingId, // Store listingId for checkout
    };
  console.log(bookingData);
  console.log('Listing ID:', listingId); 
  if (!listingId) {
    alert('Listing ID is missing!');
    return;
  }
  // Debugging line
    // Navigate to Checkout page with booking data
    navigate(`/CheckoutPage/${listingId}`, { state: { bookingData, listingId } });
  };
  
  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" variant="info" />
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger" className="mt-3">{error}</Alert>;
  }

  if (!bookingDetails) {
    return (
      <div className="text-center">
        <p>Listing details not found!</p>
      </div>
    );
  }

  return (
    <Container className="mt-5">
       <style>{`
        body {
          background-image: url('https://cdn.pixabay.com/photo/2017/01/07/17/48/interior-1961070_1280.jpg');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          font-family: 'Arial', sans-serif;
          margin: 0;
          padding: 0;
        `}
        </style>
      <Row className="mb-4">
        <Col md={6}>
          <Image src={bookingDetails.image} alt="Room" fluid rounded />
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>{bookingDetails.title}</Card.Title>
              <p><strong>Price:</strong> ${bookingDetails.price} per night</p>
              <p><strong>Description:</strong> {bookingDetails.description}</p>
              <Badge pill bg="success">Available</Badge>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Header>Complete Your Booking</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group controlId="formCheckInDate" className="mb-3">
                  <Form.Label><FaCalendarAlt /> Check-in Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formCheckOutDate" className="mb-3">
                  <Form.Label><FaCalendarAlt /> Check-out Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formGuestName" className="mb-3">
                  <Form.Label><FaUser /> Guest Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formGuestEmail" className="mb-3">
                  <Form.Label><FaEnvelope /> Guest Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                  />
                </Form.Group>

                {error && <Alert variant="danger">{error}</Alert>}
                <Row>
                  <Col className="d-flex justify-content-between">
                <Button variant="success" size="lg" onClick={handleBookingSubmit}>
                  Confirm Booking
                </Button>
                
                    <Button variant="secondary" size="lg" onClick={() => navigate(-1)}>
                      Back
                    </Button>
                
                </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default BookingPage;
