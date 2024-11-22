import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Spinner, Alert, Image, Form } from 'react-bootstrap';
import BookingDataService from './services/BookingDataService';

function CheckoutPage() {
  const { state } = useLocation();
  const { bookingData, listingId } = state || {};
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [listingDetails, setListingDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolderName: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!listingId || !bookingData) {
      setError('Listing ID or booking data is missing. Cannot proceed.');
      setLoading(false);
      return;
    }

    const fetchListingDetails = async () => {
      try {
        const data = await BookingDataService.getListingById(listingId);
        setListingDetails(data);
      } catch (error) {
        setError('Error fetching listing details. Please try again later.');
        console.error('Error fetching listing details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchListingDetails();
  }, [listingId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirmPayment = async () => {
    setIsSubmitting(true);

    // Basic validation for card details
    if (!cardDetails.cardNumber || !cardDetails.expiryDate || !cardDetails.cvv || !cardDetails.cardHolderName) {
      setError('Please fill in all card details.');
      setIsSubmitting(false);
      return;
    }

    try {
      const bookingId = await BookingDataService.createBooking(bookingData, listingId);
      navigate(`/invoice/${bookingId}`);
    } catch (error) {
      console.error('Error confirming payment:', error);
      setError('There was an error confirming your booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="info" />
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
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-lg border-0">
            <Card.Body>
              <Card.Title className="text-center mb-4" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                Confirm Your Booking
              </Card.Title>

              {error && <Alert variant="danger">{error}</Alert>}

              <Row className="mb-4">
                <Col md={6} className="d-flex align-items-center justify-content-center">
                  <Image
                    src={listingDetails?.image || 'https://via.placeholder.com/300'}
                    alt="Room Image"
                    fluid
                    rounded
                    style={{ maxHeight: '250px' }}
                  />
                </Col>
                <Col md={6}>
                  <p>
                    <strong>Listing:</strong> {listingDetails?.title}
                  </p>
                  <p>
                    <strong>Location:</strong> {listingDetails?.location}
                  </p>
                  <p>
                    <strong>Guest Name:</strong> {bookingData?.guestName}
                  </p>
                  <p>
                    <strong>Check-in:</strong> {bookingData?.checkInDate}
                  </p>
                  <p>
                    <strong>Check-out:</strong> {bookingData?.checkOutDate}
                  </p>
                  <p>
                    <strong>Price:</strong> ${bookingData?.price} per night
                  </p>
                </Col>
              </Row>

              <Form>
                <h5 className="text-center mb-3">Enter Payment Details</h5>
                <Form.Group className="mb-3">
                  <Form.Label>Card Holder's Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="cardHolderName"
                    placeholder="Full Name"
                    value={cardDetails.cardHolderName}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Card Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={cardDetails.cardNumber}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Expiry Date</Form.Label>
                      <Form.Control
                        type="text"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={cardDetails.expiryDate}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>CVV</Form.Label>
                      <Form.Control
                        type="password"
                        name="cvv"
                        placeholder="123"
                        value={cardDetails.cvv}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button
                  variant="success"
                  size="lg"
                  className="w-100"
                  onClick={handleConfirmPayment}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <Spinner animation="border" size="sm" /> : 'Confirm Payment'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CheckoutPage;
