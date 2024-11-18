import React, { useEffect, useState } from "react";
import {
  Table,
  Spinner,
  Card,
  Row,
  Col,
  Container,
  Alert,
  Form,
  InputGroup,
  Button,
  Pagination,
} from "react-bootstrap";
import UserDataService from "./services/UserDataService";
import ListingsDataService from "./services/ListingsDataService";
import { FaSearch, FaDollarSign } from "react-icons/fa";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [listings, setListings] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0); // Admin earnings state
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingListings, setLoadingListings] = useState(true);
  const [loadingEarnings, setLoadingEarnings] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [listingSearch, setListingSearch] = useState("");
  const [currentUserPage, setCurrentUserPage] = useState(1);
  const [currentListingPage, setCurrentListingPage] = useState(1);

  const usersPerPage = 5;
  const listingsPerPage = 5;

  // Fetch admin earnings
  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const response = await fetch("/api/admin-earnings"); // API endpoint to get earnings
        const data = await response.json();
        setTotalEarnings(data.totalEarnings);
      } catch (error) {
        console.error("Error fetching admin earnings:", error);
        setError("Failed to load admin earnings.");
      } finally {
        setLoadingEarnings(false);
      }
    };

    fetchEarnings();
  }, []);

  // Fetch all users from Firestore
  const fetchUsers = async () => {
    try {
      const data = await UserDataService.getAllUsers();
      const usersList = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setUsers(usersList);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to load users.");
    } finally {
      setLoadingUsers(false);
    }
  };

  // Fetch all listings from Firestore
  const fetchListings = async () => {
    try {
      const data = await ListingsDataService.getAllListings();
      setListings(data);
    } catch (error) {
      console.error("Error fetching listings:", error);
      setError("Failed to load listings.");
    } finally {
      setLoadingListings(false);
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    fetchUsers();
    fetchListings();
  }, []);

  // Handle role change
  const handleRoleChange = async (userId, newRole) => {
    setError(""); // Reset any previous errors
    setSuccess(""); // Reset any previous success messages
    try {
      await UserDataService.updateUserRole(userId, { role: newRole });

      // Update the role in the local state for instant feedback
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );
      setSuccess("User role updated successfully.");
    } catch (error) {
      console.error("Error updating user role:", error);
      setError("Failed to update user role. Please try again.");
    }
  };

  // Pagination logic for users
  const userIndexOfLast = currentUserPage * usersPerPage;
  const userIndexOfFirst = userIndexOfLast - usersPerPage;
  const currentUsers = users.slice(userIndexOfFirst, userIndexOfLast);

  // Pagination logic for listings
  const listingIndexOfLast = currentListingPage * listingsPerPage;
  const listingIndexOfFirst = listingIndexOfLast - listingsPerPage;
  const currentListings = listings.slice(listingIndexOfFirst, listingIndexOfLast);

  // Handle page change for users
  const handleUserPageChange = (pageNumber) => setCurrentUserPage(pageNumber);

  // Handle page change for listings
  const handleListingPageChange = (pageNumber) => setCurrentListingPage(pageNumber);

  return (
    <Container className="my-4">
      <h1 className="text-center mb-4 text-primary">Admin Dashboard</h1>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      {/* Admin Earnings Section */}
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <h5>
            <FaDollarSign className="text-success" /> Total Earnings:{" "}
            {loadingEarnings ? (
              <Spinner animation="border" variant="success" size="sm" />
            ) : (
              `$${totalEarnings.toFixed(2)}`
            )}
          </h5>
        </Card.Body>
      </Card>

      {/* Search Bar */}
      <Row className="mb-4">
        <Col md={6}>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Search Users"
              aria-label="Search Users"
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
            />
            <Button variant="outline-secondary" onClick={() => setUserSearch("")}>
              <FaSearch />
            </Button>
          </InputGroup>
        </Col>
        <Col md={6}>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Search Listings"
              aria-label="Search Listings"
              value={listingSearch}
              onChange={(e) => setListingSearch(e.target.value)}
            />
            <Button variant="outline-secondary" onClick={() => setListingSearch("")}>
              <FaSearch />
            </Button>
          </InputGroup>
        </Col>
      </Row>


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
                <Alert variant="warning" className="text-center">
                  No users found
                </Alert>
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
                    {currentUsers
                      .filter(user =>
                        user.firstname.toLowerCase().includes(userSearch.toLowerCase()) ||
                        user.email.toLowerCase().includes(userSearch.toLowerCase())
                      )
                      .map((user) => (
                        <tr key={user.id}>
                          <td>{user.id}</td>
                          <td>{user.firstname || "N/A"}</td>
                          <td>{user.email}</td>
                          <td>
                            <Form.Select
                              value={user.role || "guest"} // Default role is "guest"
                              onChange={(e) => handleRoleChange(user.id, e.target.value)}
                            >
                              <option value="admin">Admin</option>
                              <option value="host">Host</option>
                              <option value="guest">Guest</option>
                            </Form.Select>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              )}
              {/* Pagination for users */}
              <Pagination className="justify-content-center">
                {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, i) => (
                  <Pagination.Item
                    key={i + 1}
                    active={i + 1 === currentUserPage}
                    onClick={() => handleUserPageChange(i + 1)}
                  >
                    {i + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
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
                <Alert variant="warning" className="text-center">
                  No listings found
                </Alert>
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
                    {currentListings
                      .filter(listing =>
                        listing.title.toLowerCase().includes(listingSearch.toLowerCase())
                      )
                      .map((listing) => (
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
              {/* Pagination for listings */}
              <Pagination className="justify-content-center">
                {Array.from({ length: Math.ceil(listings.length / listingsPerPage) }, (_, i) => (
                  <Pagination.Item
                    key={i + 1}
                    active={i + 1 === currentListingPage}
                    onClick={() => handleListingPageChange(i + 1)}
                  >
                    {i + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
