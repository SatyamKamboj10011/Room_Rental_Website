import React from 'react';
import { Button, Form, Container, InputGroup } from 'react-bootstrap';
import './App.css';

function Login() {
  return (
    <div className="signup-background" style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }} >
      <Container className="signup-container" style={{
          padding: '20px',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '8px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
          width: '100%',  
          maxWidth: '450px',
        }}>
          <h2 className="mb-3" style={{ fontWeight: 'bold', textAlign: 'center' }}>LOGIN</h2>
          <Form>
            <Form.Group className="mb-3" controlId="Username">
              <Form.Label>Username/Email</Form.Label>
              <InputGroup>
                <Form.Control type="text" placeholder="Enter Your Username/Email" />
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="Password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <Form.Control type="password" placeholder='Password' />
              </InputGroup>
            </Form.Group>

            <Button variant="outline-secondary" type="submit" className="w-100">
              Login
            </Button>
          </Form>
      </Container>
    </div>
  );
}

export default Login;
