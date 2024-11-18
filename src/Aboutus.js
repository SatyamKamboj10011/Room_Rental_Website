import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Image } from 'react-bootstrap';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

function AboutContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission (e.g., send an email or store the message)
    console.log('Contact Form Submitted:', { name, email, message });
  };

  return (
    <div style={pageStyle}>
      <Container className="mt-5" style={containerStyle}>
        {/* About Us Section */}
        <Row className="mb-5">
          <Col md={6}>
            <Card style={aboutCardStyle}>
              <Card.Body>
                <Card.Title style={cardTitleStyle}>About Us</Card.Title>
                <Card.Text style={cardTextStyle}>
                  Welcome to our service! We strive to provide the best experience for
                  our customers. Our mission is to ensure you find exactly what you're
                  looking for, with exceptional customer service and quality.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Image src="https://via.placeholder.com/600x400" alt="About Us" fluid rounded />
          </Col>
        </Row>

        {/* Contact Us Section */}
        <Row>
          <Col md={12}>
            <Card style={contactCardStyle}>
              <Card.Header style={cardHeaderStyle}>Contact Us</Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formName" className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formEmail" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formMessage" className="mb-3">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Enter your message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit" style={submitButtonStyle}>
                    Send Message
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Contact Info Section */}
        <Row className="mt-5 text-center">
          <Col>
            <h4>Contact Information</h4>
            <div style={contactInfoStyle}>
              <p><FaMapMarkerAlt /> 123 Main Street, Cityville</p>
              <p><FaPhoneAlt /> +1 (800) 123-4567</p>
              <p><FaEnvelope /> contact@ourcompany.com</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

// Inline styles
const pageStyle = {
  backgroundImage: 'url(https://via.placeholder.com/1600x900)', // Replace with your background image URL
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
  color: 'white',
  paddingBottom: '50px',
};

const containerStyle = {
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background to make text more readable
  paddingTop: '50px',
  paddingBottom: '50px',
  borderRadius: '10px',
};

const aboutCardStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.8)', // Light background for readability
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const cardTitleStyle = {
  fontSize: '1.8rem',
  fontWeight: 'bold',
  color: '#f39c12',
};

const cardTextStyle = {
  color: '#34495e',
};

const contactCardStyle = {
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const cardHeaderStyle = {
  backgroundColor: '#f39c12',
  color: 'white',
  fontWeight: 'bold',
  borderRadius: '10px 10px 0 0',
};

const submitButtonStyle = {
  width: '100%',
  padding: '12px',
  backgroundColor: '#27ae60',
  border: 'none',
  borderRadius: '8px',
};

const contactInfoStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  borderRadius: '10px',
  padding: '20px',
  marginTop: '20px',
  display: 'inline-block',
};

export default AboutContactPage;
