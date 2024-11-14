import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert, Button, Row, Col, Container } from "react-bootstrap";
import { useUserAuth } from "./context/UserAuthContext";
import UserDataService from "./services/UserDataService"; // Assuming you have a service to save user data

const Register = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");

  const { signUp } = useUserAuth();
  const navigate = useNavigate();

  const saveUser = async (uid) => {
    const newData = {
      uid, // Use the UID here
      firstname,
      lastname,
      age,
      phone,
      address,
      email,
      role,
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
      <Row className="justify-content-center align-items-center">
        {/* Left Column for Form */}
        <Col md={6} className="bg-light p-5 rounded">
          <h2 className="text-center mb-4">Create an Account</h2>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicFirstName" className="mb-3">
              <Form.Control
                type="text"
                placeholder="First Name"
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicLastName" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Last Name"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPhone" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicAge" className="mb-3">
              <Form.Control
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicAddress" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicRole" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Role (e.g. User, Admin)"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 py-2">
              Sign Up
            </Button>
          </Form>

          <div className="mt-3 text-center">
            Already have an account? <Link to="/login">Log In</Link>
          </div>
        </Col>

        {/* Right Column for Image */}
        <Col md={6} className="d-none d-md-flex justify-content-center align-items-center">
          <img
            src="https://cdn.vectorstock.com/i/preview-1x/55/57/set-people-fill-in-form-registration-page-vector-38895557.jpg.jpg" // Replace with your image path or URL
            alt="Registration"
            className="img-fluid rounded"
            style={{ maxWidth: "90%" }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
