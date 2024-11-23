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
    <div className="login-page">
      {/* Background Video */}
      <video
        src="https://videos.pexels.com/video-files/4770380/4770380-hd_1920_1080_30fps.mp4" // Replace with your video URL
        type="video/mp4"
        autoPlay
        loop
        muted
        className="background-video"
      />
      
      {/* Overlay for readability */}
      <div className="overlay"></div>

      <div className="login-container">
        <h2 className="login-title">Welcome to Otago Room Rental</h2>
        
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
            />
          </Form.Group>

          <div className="login-btn-container">
            <Button
              variant="primary"
              type="submit"
              className="login-btn"
            >
              Log In
            </Button>
          </div>
        </Form>

        <div className="divider">or continue with</div>

        <div className="google-btn-container">
          <GoogleButton
            type="dark"
            onClick={handleGoogleSignIn}
            className="google-btn" style={{
              backgroundColor: 'white',
              color: 'black',
              width: '100%',
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
              borderRadius: '10px',
            }}
          />
        </div>

        <div className="signup-link">
          <p>
            Don't have an account?{" "}
            <Link to="/Register" className="signup-link-text">Sign up</Link>
          </p>
        </div>
      </div>

      {/* Internal CSS */}
      <style>{`
        /* Base styles */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Roboto', sans-serif;
        }

        /* Full-screen layout */
        .login-page {
          position: relative;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #111;
        }

        /* Background video */
        .background-video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: -1;
          filter: brightness(0.5); /* Darken the video for readability */
        }

        /* Overlay for better text contrast */
        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6); /* Dark overlay */
          z-index: 0;
        }

        /* Centering the login form */
        .login-container {
          z-index: 1;
          background-color: white;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
          max-width: 400px;
          width: 100%;
          text-align: center;
          transition: transform 0.3s ease;
        }

        /* Hover effect for the login container */
        .login-container:hover {
          transform: translateY(-10px);
        }

        /* Title style */
        .login-title {
          font-size: 28px;
          color: #007bff;
          font-weight: 600;
          margin-bottom: 20px;
        }

        /* Form input fields */
        .input-field {
          border-radius: 10px;
          border: 1px solid #007bff;
          padding: 12px;
          margin-bottom: 20px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        /* Submit button style */
        .login-btn {
          border-radius: 10px;
          font-weight: 600;
          padding: 12px;
          background-color: #007bff;
          border: none;
          width: 100%;
          transition: background-color 0.3s ease;
        }

        .login-btn:hover {
          background-color: #0056b3;
        }

        /* Divider between forms */
        .divider {
          margin: 20px 0;
          font-weight: lighter;
          color: #555;
        }

        /* Google sign-in button container */
        .google-btn-container {
          margin-bottom: 20px;
        }

        /* Signup link */
        .signup-link {
          font-weight: lighter;
        }

        .signup-link-text {
          color: #007bff;
          font-weight: 600;
          text-decoration: none;
        }

        .signup-link-text:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default Login;
