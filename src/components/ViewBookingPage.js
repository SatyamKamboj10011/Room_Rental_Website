import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import BookingDataService from '../services/BookingDataService'; // Adjust path as needed

function ViewBookingsPage() {
  const { listingId } = useParams(); // Get listingId from URL params
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch bookings for the particular listing (room)
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Fetch all bookings
        const allBookingsSnapshot = await BookingDataService.getBookingsForListing(listingId);
        
        if (!allBookingsSnapshot.length) {
          setError("No bookings found for this listing.");
        }

        setBookings(allBookingsSnapshot);
      } catch (error) {
        setError("Error fetching bookings for this listing.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (listingId) {
      fetchBookings();
    } else {
      setError('Listing ID is missing.');
      setLoading(false);
    }
  }, [listingId]);

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
        }

        .card {
          border-radius: 10px;
          box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
        }

        .card-body {
          background-color: rgba(255, 255, 255, 0.8);
        }

        .booking-info {
          margin-bottom: 10px;
        }

        .text-center {
          color: #333;
        }
      `}</style>

      <Row className="justify-content-center">
        <Col md={8}>
          {error && <Alert variant="danger">{error}</Alert>}
          <Card>
            <Card.Body>
              <Card.Title className="text-center mb-4" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                Bookings for Your Listing
              </Card.Title>

              {bookings.length === 0 ? (
                <p className="text-center">No bookings available for this listing.</p>
              ) : (
                bookings.map((booking) => (
                  <Card key={booking.id} className="mb-3">
                    <Card.Body>
                      <Row>
                        <Col md={8}>
                          <p className="booking-info"><strong>Guest Name:</strong> {booking.guestName}</p>
                          <p className="booking-info"><strong>Email:</strong> {booking.guestEmail}</p>
                          <p className="booking-info"><strong>Check-in:</strong> {booking.checkInDate}</p>
                          <p className="booking-info"><strong>Check-out:</strong> {booking.checkOutDate}</p>
                          <p className="booking-info"><strong>Total Price:</strong> ${booking.price}</p>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                ))
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ViewBookingsPage;
