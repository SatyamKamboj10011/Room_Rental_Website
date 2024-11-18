import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import BookingDataService from "./services/BookingDataService"; // Adjust the path

function ViewBookingPage() {
  const { listingId } = useParams(); // Ensure the route parameter is "listingId"
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
   

    fetchBookingDetails();
  }, [listingId]);
  const fetchBookingDetails = async () => {
    try {
      console.log("Fetching details for ID:", listingId); // Debugging step
      const data = await BookingDataService.getBookingDetailsById(listingId);
  
      if (!data) {
        throw new Error("No booking found with this ID");
      }
  
      setBookingDetails(data);
    } catch (err) {
      console.error("Error fetching booking details:", err);
      setError(err.message || "Error fetching booking details");
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center mt-5">
        <div className="alert alert-danger">{error}</div>
        <Button variant="secondary" onClick={() => window.history.back()}>
          Go Back
        </Button>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      {bookingDetails ? (
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Booking Details</Card.Title>
                <p><strong>Guest Name:</strong> {bookingDetails.guestName}</p>
                <p><strong>Guest Email:</strong> {bookingDetails.guestEmail}</p>
                <p><strong>Check-in Date:</strong> {bookingDetails.checkInDate}</p>
                <p><strong>Check-out Date:</strong> {bookingDetails.checkOutDate}</p>
                <p><strong>Room Title:</strong> {bookingDetails.title}</p>
                <p><strong>Room Location:</strong> {bookingDetails.location}</p>
                <p><strong>Price:</strong> ${bookingDetails.price}</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <p>No booking details available.</p>
      )}
      <Button variant="secondary" onClick={() => window.history.back()}>
        Back
      </Button>
    </Container>
  );
}

export default ViewBookingPage;
