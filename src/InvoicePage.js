import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { jsPDF } from "jspdf";
import BookingDataService from "./services/BookingDataService";
import { format } from "date-fns";
import { FaDownload } from 'react-icons/fa';

function InvoicePage() {
  const { bookingId } = useParams();
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    fetchBookingDetails();
  }, [bookingId]);

  const fetchBookingDetails = async () => {
    try {
      const data = await BookingDataService.getBookingDetailsById(bookingId);
      if (!data || !data.guestName || !data.checkInDate) {
        throw new Error("No booking found or data is incomplete");
      }
      setBookingDetails(data);
    } catch (err) {
      setError(err.message || "Error fetching booking details");
    } finally {
      setLoading(false);
    }
  };

  const downloadInvoice = () => {
    setIsDownloading(true);
    const doc = new jsPDF();
    const formattedCheckIn = format(new Date(bookingDetails.checkInDate), "PPP");
    const formattedCheckOut = format(new Date(bookingDetails.checkOutDate), "PPP");

    doc.setFont("helvetica", "bold").text("Invoice", 105, 20, { align: "center" });
    doc.setFont("helvetica", "normal").setFontSize(12);
    const details = [
      `Guest Name: ${bookingDetails.guestName}`,
      `Guest Email: ${bookingDetails.guestEmail}`,
      `Room Title: ${bookingDetails.title}`,
      `Room Location: ${bookingDetails.location}`,
      `Check-in Date: ${formattedCheckIn}`,
      `Check-out Date: ${formattedCheckOut}`,
      `Total Price: $${bookingDetails.price}`,
    ];
    details.forEach((line, index) => doc.text(line, 20, 40 + index * 10));
    doc.text("Thank you for booking with us!", 20, 130);

    doc.save("invoice.pdf");
    setIsDownloading(false);
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
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

  const formattedCheckIn = format(new Date(bookingDetails.checkInDate), "PPP");
  const formattedCheckOut = format(new Date(bookingDetails.checkOutDate), "PPP");

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        backgroundImage: 'url("https://cdn.pixabay.com/photo/2015/10/31/21/31/bookkeeper-1016299_960_720.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "40px 20px",
      }}
    >
      <Card
        style={{
          maxWidth: "900px",
          width: "100%",
          padding: "30px",
          borderRadius: "15px",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Card.Title
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#333",
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          Invoice Details
        </Card.Title>
        <Row>
          <Col md={6}>
            <p><strong>Guest Name:</strong> {bookingDetails.guestName}</p>
            <p><strong>Guest Email:</strong> {bookingDetails.guestEmail}</p>
            <p><strong>Room Title:</strong> {bookingDetails.title}</p>
          </Col>
          <Col md={6}>
            <p><strong>Room Location:</strong> {bookingDetails.location}</p>
            <p><strong>Check-in Date:</strong> {formattedCheckIn}</p>
            <p><strong>Check-out Date:</strong> {formattedCheckOut}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p
              style={{
                fontWeight: "bold",
                fontSize: "1.5rem",
                color: "#444",
                textAlign: "center",
                marginTop: "20px",
              }}
            >
              Total Price: ${bookingDetails.price}
            </p>
          </Col>
        </Row>
        <div
          className="d-flex justify-content-center mt-4"
          style={{ gap: "20px" }}
        >
          <Button
            variant="success"
            onClick={downloadInvoice}
            disabled={isDownloading}
            style={{
              padding: "10px 20px",
              fontSize: "1.2rem",
              borderRadius: "8px",
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            {isDownloading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              <>
                <FaDownload style={{ marginRight: "10px" }} />
                Download Invoice
              </>
            )}
          </Button>
        </div>
      </Card>
    </Container>
  );
}

export default InvoicePage;
