import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert, Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../context/UserAuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const { logIn, googleSignIn } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: 'linear-gradient(135deg, #e3f2fd, #77C0ED)',
        padding: "15px",
      }}
    >
      <div
        style={{
          width: "400px",
          backgroundColor: isHovered ? "#f1f9ff" : "white",
          borderRadius: "30px",
          boxShadow: isHovered ? "0 4px 20px rgba(0,0,0,0.9)": "0 4px 20px rgba(0,0,0,0.5)",
          padding: "25px",          
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h2 style={{ color: "#007bff", fontWeight: "650", textAlign: 'center' }}>
          Otago Room Rental
        </h2>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label style={{ color: "#555" }}>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                borderRadius: "10px",
                borderColor: "#007bff",
                padding: "8px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.5)",
              }}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label style={{ color: "#555" }}>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                borderRadius: "10px",
                borderColor: "#007bff",
                padding: "8px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.5)",
              }}
            />
          </Form.Group>

          <div className="mb-3">
            <Button
              variant="primary"
              type="submit"
              className="w-100"
              style={{
                borderRadius: "10px",
                fontWeight: "600",
                padding: "8px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.5)",
              }}
            >
              Log In
            </Button>
          </div>
        </Form>

        <div className="my-3" style={{ textAlign: 'center', fontWeight: 'lighter' }}>or continue with</div>

        <div className="mb-3">
          <GoogleButton
            type="dark"
            onClick={handleGoogleSignIn}
            style={{
              backgroundColor: '#fffff',
              color: 'black',
              width: '100%',
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
              borderRadius: '10px',
            }}
          />
        </div>

        <div style={{ textAlign: 'center', fontWeight: 'lighter' }}>
          <p>
            Don't have an account? <Link to="/Register" style={{ color: "#007bff", fontWeight: "600" }}>Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
