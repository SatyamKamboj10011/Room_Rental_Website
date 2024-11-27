import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert, Button, Row, Col, Container } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
import UserDataService from "../services/UserDataService"; // Assuming you have a service to save user data

const Register = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [address, setAddress] = useState("");

  const { signUp } = useUserAuth();
  const navigate = useNavigate();

  const saveUser = async (uid) => {
    const newData = {
      uid,
      firstname,
      lastname,
      age,
      phone,
      address,
      email,
      role: "user", // Default role assignment
    };

    try {
      await UserDataService.setUser(newData); // Assuming setUser is your method to save user data to Firestore
      console.log("Data added to Firestore");
      navigate("/"); // Redirect to home or another page after saving user data
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error messages

    try {
      // Sign up the user with email and password
      const userCredential = await signUp(email, password);
      const user = userCredential.user; // Get the user object from the credential

      // Save user details to Firestore using their UID
      await saveUser(user.uid); // Passing the UID here to save the user data

      // After successful signup, navigate to the login page
      navigate("/login");
    } catch (err) {
      setError(err.message); // If any error occurs, display it
    }
  };

  return (
    <Container className="mt-5">
      <style>{`
        body {
          background-image: url('https://cdn.pixabay.com/photo/2024/02/16/20/02/living-room-8578263_1280.jpg');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          font-family: 'Poppins', sans-serif;
          margin: 0;
          padding: 0;
        }
        .register-container {
          background: rgba(255, 255, 255, 0.9);
          border-radius: 15px;
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
          padding: 40px;
        }
        .register-title {
          font-size: 28px;
          font-weight: bold;
          color: #007bff;
          text-align: center;
          margin-bottom: 20px;
        }
        .input-field {
          border-radius: 8px;
          padding: 10px;
          margin-bottom: 15px;
          border: 1px solid #ddd;
        }
        .input-field:focus {
          box-shadow: 0 0 5px rgba(0, 123, 255, 0.8);
          border-color: #007bff;
        }
        .register-button {
          background: linear-gradient(90deg, #007bff, #0056b3);
          border: none;
          border-radius: 8px;
          padding: 10px;
          color: #fff;
          font-size: 16px;
          font-weight: bold;
          width: 100%;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        .register-button:hover {
          background: linear-gradient(90deg, #0056b3, #003d7a);
        }
        .right-column {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .register-link {
          text-align: center;
          margin-top: 15px;
          font-size: 14px;
        }
        .register-link a {
          color: #007bff;
          text-decoration: none;
          font-weight: bold;
        }
        .register-link a:hover {
          text-decoration: underline;
        }
      `}</style>

      <Row className="justify-content-center align-items-center">
        {/* Left Column for Form */}
        <Col md={6} className="register-container">
          <h2 className="register-title">Create an Account</h2>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicFirstName" className="mb-3">
              <Form.Control
                className="input-field"
                type="text"
                placeholder="First Name"
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicLastName" className="mb-3">
              <Form.Control
                className="input-field"
                type="text"
                placeholder="Last Name"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Control
                className="input-field"
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Control
                className="input-field"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPhone" className="mb-3">
              <Form.Control
                className="input-field"
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicAge" className="mb-3">
              <Form.Control
                className="input-field"
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicAddress" className="mb-3">
              <Form.Control
                className="input-field"
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </Form.Group>

            <Button className="register-button" type="submit">
              Sign Up
            </Button>
          </Form>

          <div className="register-link">
            Already have an account? <Link to="/login">Log In</Link>
          </div>
        </Col>

        {/* Right Column for Illustration */}
        <Col
          md={6}
          className="right-column d-none d-md-flex"
        >
          <img
            src="https://images.squarespace-cdn.com/content/v1/6220ad1db2910108f6cfc24f/46da4dd1-e009-4d51-92bc-7bd013235df1/googlevsprivacy.gif" // Stylish room-related illustration
            alt="Register Illustration"
            className="img-fluid"
            style={{
              borderRadius: "15px",
              maxWidth: "70%",
              background:"transparent",
            }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
