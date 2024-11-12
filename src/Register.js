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
      <Row className="justify-content-center">
        <Col md={6}>
          <div className="p-4 bg-light border rounded">
            <h2 className="text-center mb-4">Create an Account</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Control
                      type="text"
                      placeholder="First Name"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicLastName">
                    <Form.Control
                      type="text"
                      placeholder="Last Name"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPhone">
                <Form.Control
                  type="text"
                  placeholder="Phone Number"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicAge">
                <Form.Control
                  type="number"
                  placeholder="Age"
                  onChange={(e) => setAge(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicAddress">
                <Form.Control
                  type="text"
                  placeholder="Address"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicRole">
                <Form.Control
                  type="text"
                  placeholder="User Role"
                  onChange={(e) => setRole(e.target.value)}
                />
              </Form.Group>

              <div className="d-grid gap-2">
                <Button variant="primary" type="submit" className="btn-block">
                  Sign Up
                </Button>
              </div>
            </Form>

            <div className="mt-3 text-center">
              Already have an account? <Link to="/login">Log In</Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
