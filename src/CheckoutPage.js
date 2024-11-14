import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Dropdown } from 'react-bootstrap';
import './CheckoutPage.css'; // Ensure you have your CSS file for styling

function CheckoutPage() {
  const [showCheckout, setShowCheckout] = useState(false);

  const handleDropdownToggle = () => {
    setShowCheckout(!showCheckout);
  };

  return (
    <Container className="checkout-container">
      <h2 className="checkout-title">Room Rental Checkout</h2>
      
            <Row>
              {/* Room Details Section */}
              <Col md={6}>
                <Card className="room-details">
                  <Card.Img variant="top" src="room-image-url.jpg" alt="Room" />
                  <Card.Body>
                    <Card.Title>Room Name</Card.Title>
                    <Card.Text>
                      Location: City, Area <br />
                      Price per week: $250 <br />
                      Description: Cozy and comfortable room with all amenities.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              {/* User and Payment Form */}
              <Col md={6}>
                <Form className="payment-form">
                  <h4>User Details</h4>
                  <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your name" />
                  </Form.Group>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter your email" />
                  </Form.Group>

                  <h4>Payment Information</h4>
                  <Form.Group controlId="formCardNumber">
                    <Form.Label>Card Number</Form.Label>
                    <Form.Control type="text" placeholder="xxxx-xxxx-xxxx-xxxx" />
                  </Form.Group>
                  <Form.Group controlId="formExpiration">
                    <Form.Label>Expiration Date</Form.Label>
                    <Form.Control type="text" placeholder="MM/YY" />
                  </Form.Group>
                  <Form.Group controlId="formCVV">
                    <Form.Label>CVV</Form.Label>
                    <Form.Control type="password" placeholder="CVV" />
                  </Form.Group>
                  

                  <Button variant="success" type="submit" className="checkout-button">
                    Complete Payment
                  </Button>
                </Form>
              </Col>
            </Row>
    </Container>
  );
}

export default CheckoutPage;