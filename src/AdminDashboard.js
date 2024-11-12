import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Navbar, Nav, Table, Button, Modal, Form, Card, Alert } from 'react-bootstrap';
import { FaUsers, FaChartLine, FaHome, FaDollarSign, FaEdit, FaTrashAlt, FaCog } from 'react-icons/fa';
import { getDocs, collection, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase'; // Adjust path based on your project structure

function AdminDashboard() {
  // State to manage users and selected user for editing
  const [users, setUsers] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState(null);

  // Fetch users from Firestore
  const fetchUsers = async () => {
    try {
      const userSnapshot = await getDocs(collection(db, "usersdetails"));
      const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(userList);
    } catch (error) {
      setMessage({ type: 'danger', text: "Error fetching users: " + error.message });
    }
  };

  // Edit user handler
  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setShowEditModal(false);
    setSelectedUser(null);
  };

  // Update user details in Firestore
  const handleSaveChanges = async () => {
    if (!selectedUser) return;
    try {
      const userRef = doc(db, "usersdetails", selectedUser.id);
      await updateDoc(userRef, {
        name: selectedUser.name,
        email: selectedUser.email,
        role: selectedUser.role,
        status: selectedUser.status,
      });
      fetchUsers();  // Refresh the users list after updating
      setMessage({ type: 'success', text: "User updated successfully!" });
      setShowEditModal(false);
    } catch (error) {
      setMessage({ type: 'danger', text: "Error updating user: " + error.message });
    }
  };

  // Delete user from Firestore
  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const userRef = doc(db, "usersdetails", userId);
        await deleteDoc(userRef);
        fetchUsers();  // Refresh the list after deleting
        setMessage({ type: 'success', text: "User deleted successfully!" });
      } catch (error) {
        setMessage({ type: 'danger', text: "Error deleting user: " + error.message });
      }
    }
  };

  // Fetch users when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <div className="bg-dark text-white p-3" style={{ width: "250px", minHeight: "100vh" }}>
        <h4 className="text-center">Admin Panel</h4>
        <Nav defaultActiveKey="/admin" className="flex-column mt-4">
          <Nav.Link href="#dashboard" className="text-white">
            <FaHome className="mr-2" /> Dashboard
          </Nav.Link>
          <Nav.Link href="#users" className="text-white">
            <FaUsers className="mr-2" /> User Management
          </Nav.Link>
          <Nav.Link href="#analytics" className="text-white">
            <FaChartLine className="mr-2" /> Analytics
          </Nav.Link>
          <Nav.Link href="#settings" className="text-white">
            <FaCog className="mr-2" /> Settings
          </Nav.Link>
        </Nav>
      </div>

      {/* Main Dashboard Area */}
      <div style={{ flex: 1 }}>
        {/* Top Navbar */}
        <Navbar bg="light" expand="lg" className="shadow-sm">
          <Container>
            <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#dashboard">Dashboard</Nav.Link>
                <Nav.Link href="#users">Users</Nav.Link>
                <Nav.Link href="#analytics">Analytics</Nav.Link>
              </Nav>
              <Button variant="outline-danger" href="#logout">Logout</Button>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container fluid className="mt-4">
          <Row>
            {/* Dashboard Widgets */}
            <Col md={12}>
              <Row className="mb-4">
                <Col md={3}>
                  <Card className="text-center shadow-sm">
                    <Card.Body>
                      <FaUsers size={40} className="mb-3" />
                      <Card.Title>Total Users</Card.Title>
                      <Card.Text>{users.length}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card className="text-center shadow-sm">
                    <Card.Body>
                      <FaHome size={40} className="mb-3" />
                      <Card.Title>Active Listings</Card.Title>
                      <Card.Text>320</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card className="text-center shadow-sm">
                    <Card.Body>
                      <FaChartLine size={40} className="mb-3" />
                      <Card.Title>Site Analytics</Card.Title>
                      <Card.Text>5.2K Visitors</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card className="text-center shadow-sm">
                    <Card.Body>
                      <FaDollarSign size={40} className="mb-3" />
                      <Card.Title>Revenue</Card.Title>
                      <Card.Text>$45,000</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>

            {/* User Management Table */}
            <Col md={12} className="mt-5">
              <h4>User Management</h4>
              {message && (
                <Alert variant={message.type} dismissible onClose={() => setMessage(null)}>
                  {message.text}
                </Alert>
              )}
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user.id}>
                      <td>{index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>{user.status}</td>
                      <td>
                        <Button variant="info" size="sm" onClick={() => handleEdit(user)}>
                          <FaEdit /> Edit
                        </Button>{' '}
                        <Button variant="danger" size="sm" onClick={() => handleDelete(user.id)}>
                          <FaTrashAlt /> Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>

        {/* Edit User Modal */}
        <Modal show={showEditModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedUser && (
              <Form>
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedUser.name}
                    onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                  />
                </Form.Group>

                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={selectedUser.email}
                    onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                  />
                </Form.Group>

                <Form.Group controlId="formRole">
                  <Form.Label>Role</Form.Label>
                  <Form.Control
                    as="select"
                    value={selectedUser.role}
                    onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
                  >
                    <option>Admin</option>
                    <option>User</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="formStatus">
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    as="select"
                    value={selectedUser.status}
                    onChange={(e) => setSelectedUser({ ...selectedUser, status: e.target.value })}
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default AdminDashboard;
