import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert, Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../context/UserAuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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
      className="d-flex justify-content-center align-items-center min-vh-100 bg-light"
      style={{ background: 'linear-gradient(to right, #e3f2fd, #bbdefb)' }}
    >
      <div
        className="bg-white shadow rounded p-4"
        style={{ width: "400px", transition: "transform 0.3s ease" }}
      >
        <h2 className="text-center mb-4 text-primary">Otago Room Rental</h2>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                borderRadius: "0.5rem",
                borderColor: "#007bff",
                boxShadow: "0 0 5px rgba(0, 123, 255, 0.2)"
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                borderRadius: "0.5rem",
                borderColor: "#007bff",
                boxShadow: "0 0 5px rgba(0, 123, 255, 0.2)"
              }}
            />
          </Form.Group>

          <div className="d-grid gap-2 mb-3">
            <Button variant="primary" type="submit" className="btn-lg">
              Log In
            </Button>
          </div>
        </Form>

        <div className="text-center my-3">
          <span className="text-muted">or</span>
        </div>

        <div className="d-grid gap-2 mb-3">
          <GoogleButton className="g-btn" type="dark" onClick={handleGoogleSignIn} />
        </div>

        <div className="text-center">
          <p className="text-muted">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
