import React, { useEffect, useState } from "react";
import { Table, Spinner, Card, Row, Col, Container, Alert } from 'react-bootstrap';
import UserDataService from './services/UserDataService';
import ListingsDataService from './services/ListingsDataService';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [listings, setListings] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingListings, setLoadingListings] = useState(true);

  // Fetch users and listings when the component mounts
  useEffect(() => {
    fetchUsers();
    fetchListings();
  }, []);

  // Fetch all users from Firestore
  const fetchUsers = async () => {
    try {
      const data = await UserDataService.getAllUsers(); // Fetch users
      console.log("Fetched Data:", data);  // Log the raw response
  
      if (data && data.docs && data.docs.length > 0) {
        const usersList = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setUsers(usersList); // Set the users state with the mapped data
      } else {
        setUsers([]);
        console.log('No Users found');
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoadingUsers(false);
    }
  };
  
  // Fetch all listings from Firestore

  const fetchListings = async () => {
    try {
      const data = await ListingsDataService.getAllListings();
      if (!data || data.length === 0) {
        console.log('No listings found');
        setListings([]);
        return;
      }
      setListings(data);
    } catch (error) {
      console.error("Error fetching listings: ", error);
    } finally {
      setLoadingListings(false);
    }
  };

  return (
    <Container className="my-4">
      <h1 className="text-center mb-4 text-primary">Admin Dashboard</h1>

      {/* Users Section */}
      <Row className="mb-4">
        <Col md={12}>
          <Card className="shadow-sm">
            <Card.Header className="bg-info text-white">
              <h5>Users</h5>
            </Card.Header>
            <Card.Body>
              {loadingUsers ? (
                <div className="text-center">
                  <Spinner animation="border" variant="primary" />
                  <p>Loading Users...</p>
                </div>
              ) : users.length === 0 ? (
                <Alert variant="warning" className="text-center">No users found</Alert>
              ) : (
                <Table striped bordered hover responsive variant="light">
                  <thead>
                    <tr className="table-info">
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.firstname || "N/A"}</td>
                        <td>{user.email}</td>
                        <td>{user.role || "N/A"}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Listings Section */}
      <Row>
        <Col md={12}>
          <Card className="shadow-sm">
            <Card.Header className="bg-success text-white">
              <h5>Listings</h5>
            </Card.Header>
            <Card.Body>
              {loadingListings ? (
                <div className="text-center">
                  <Spinner animation="border" variant="secondary" />
                  <p>Loading Listings...</p>
                </div>
              ) : listings.length === 0 ? (
                <Alert variant="warning" className="text-center">No listings found</Alert>
              ) : (
                <Table striped bordered hover responsive variant="light">
                  <thead>
                    <tr className="table-success">
                      <th>ID</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listings.map((listing) => (
                      <tr key={listing.id}>
                        <td>{listing.id}</td>
                        <td>{listing.title}</td>
                        <td>{listing.price}</td>
                        <td>{listing.location || "N/A"}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Optional Action Buttons */}
      <Row className="mt-4">
        <Col className="text-center">
          <button className="btn btn-primary mx-2">Add New User</button>
          <button className="btn btn-success mx-2">Add New Listing</button>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
