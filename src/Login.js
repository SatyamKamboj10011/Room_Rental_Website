import React from 'react';
import { Button, Form, Container, InputGroup } from 'react-bootstrap';
import { FaUser, FaLock } from 'react-icons/fa';
 
function Login() {
  return (
    <div
      className="signup-background"
      style={{
        background: 'linear-gradient(135deg, #72c2ff, #f7e6ff)',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container
        className="signup-container"
        style={{
          padding: '40px',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '22px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
          width: '100%',  
          maxWidth: '450px',
        }}
      >
        <h2 className="mb-4" style={{ fontWeight: 'bold', textAlign: 'center', color: '#333', fontSize: '28px' }}>LOGIN</h2>
       
        <Form>
          <Form.Group className="mb-4" controlId="Username">
            <Form.Label style={{ color: '#555', fontSize: '16px' }}>Username/Email</Form.Label>
            <InputGroup>
              <InputGroup.Text style={{ borderRadius: '5px 0 0 5px', backgroundColor: '#007bff', color: '#fff' }}>
                <FaUser />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Enter Your Username/Email"
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '0 5px 5px 0',
                  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
                }}
              />
            </InputGroup>
          </Form.Group>
 
          <Form.Group controlId="Password" className="mb-4">
            <Form.Label style={{ color: '#555', fontSize: '16px' }}>Password</Form.Label>
            <InputGroup>
              <InputGroup.Text style={{ borderRadius: '5px 0 0 5px', backgroundColor: '#007bff', color: '#fff' }}>
                <FaLock />
              </InputGroup.Text>
              <Form.Control
                type="password"
                placeholder='Password'
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '0 5px 5px 0',
                  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
                }}
              />
            </InputGroup>
          </Form.Group>
 
          <Button
            variant="primary"
            type="submit"
            className="w-100"
            style={{
              borderRadius: '5px',
              boxShadow: '0 5px 15px rgba(0, 123, 255, 0.6)',
              fontWeight:'bold',
            }}
          >
            Login
          </Button>
         
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <a href="/" style={{ color: '#007bff',fontWeight:'bold' }}>Forgot Password?</a>
            <br /> <br />
            <a href="/register" style={{ color: '#007bff', fontWeight:'bold' }}>Create Account</a>
          </div>
        </Form>
      </Container>
    </div>
  );
}
 
export default Login;
 