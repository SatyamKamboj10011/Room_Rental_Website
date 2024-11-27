import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Tabs, Tab, ProgressBar, ListGroup, Badge, Modal, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useUserAuth } from '../context/UserAuthContext';
import { db } from '../services/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Bootstrap icons

const ProfilePage = () => {
  const { user } = useUserAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false); // State for edit modal
  const [theme, setTheme] = useState('light'); // Theme switcher state
  const navigate = useNavigate();

  // Fetch user data from Firestore
  useEffect(() => {
    if (user && user.uid) {
      const fetchUserData = async () => {
        try {
          const userRef = doc(db, 'usersdetails', user.uid);
          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            console.error('No user data found');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [user]);

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Profile completion percentage (example logic)
  const profileCompletionPercentage = (() => {
    const fields = ['firstname', 'lastname', 'email', 'phone', 'address', 'age'];
    const filledFields = fields.filter((field) => userData?.[field]);
    return Math.round((filledFields.length / fields.length) * 100);
  })();

  // Handle logout
  const handleLogout = () => {
    navigate('/login');
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className={`mt-5 ${theme === 'dark' ? 'bg-dark text-white' : ''}`} style={{ borderRadius: '10px', padding: '20px' }}>
          <style>{`
        body {
          background-image: url('https://cdn.pixabay.com/photo/2021/10/03/03/48/living-room-6676758_1280.jpg');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          font-family: 'Arial', sans-serif;
          margin: 0;
          padding: 0;
        `}
        </style>
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className={theme === 'dark' ? 'bg-secondary' : ''}>
            <Card.Header className="bg-primary text-white text-center">
              <h2>My Profile</h2>
              <ProgressBar now={profileCompletionPercentage} label={`${profileCompletionPercentage}%`} className="mt-3" />
            </Card.Header>

            <Card.Body>
              {userData ? (
                <Tabs defaultActiveKey="info" id="profile-tabs" className="mb-3">
                  <Tab eventKey="info" title="Personal Info">
                    <Row>
                      <Col md={6}>
                        <h5>First Name:</h5>
                        <p>{userData.firstname}</p>
                      </Col>
                      <Col md={6}>
                        <h5>Last Name:</h5>
                        <p>{userData.lastname}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <h5>Email:</h5>
                        <p>{user.email}</p>
                      </Col>
                      <Col md={6}>
                        <h5>Phone:</h5>
                        <p>{userData.phone}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <h5>Address:</h5>
                        <p>{userData.address}</p>
                      </Col>
                      <Col md={6}>
                        <h5>Age:</h5>
                        <p>{userData.age}</p>
                      </Col>
                      <Col md={6}>
                        <h5>Role:</h5>
                        <p>{userData.role}</p>
                      </Col>
                    </Row>
                    <Button variant="primary" className="btn-gradient" onClick={() => setShowEditModal(true)}>Edit Profile</Button>
                  </Tab>

                  <Tab eventKey="security" title="Security">
                    <p>Password: **********</p>
                    <p>{userData.role}</p>
                    <Button variant="warning">
                      <a
                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=admin@example.com&su=Host%20Request&body=Dear%20Admin,%0A%0AI%20would%20like%20to%20become%20a%20host.%0A%0APlease%20review%20my%20request%20and%20change%20my%20role.%0A%0AThank%20you!%0A%0AUsername:%20${userData.firstname}%20${userData.lastname}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Request to Become a Host
                      </a>
                    </Button>
                  </Tab>
                </Tabs>
              ) : (
                <p className="text-center">User data not found.</p>
              )}
            </Card.Body>

            <Card.Footer className="text-center">
              <div className="my-3">
                <Badge bg="success" className="mx-1">Verified User</Badge>
                <Badge bg="info" className="mx-1">Member for 2 years</Badge>
              </div>
              <div className="d-flex justify-content-center my-3">
                <OverlayTrigger placement="top" overlay={<Tooltip>Twitter</Tooltip>}>
                  <Button variant="link" href="https://twitter.com">
                    <i className="bi bi-twitter text-info"></i>
                  </Button>
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={<Tooltip>LinkedIn</Tooltip>}>
                  <Button variant="link" href="https://linkedin.com">
                    <i className="bi bi-linkedin text-primary"></i>
                  </Button>
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={<Tooltip>GitHub</Tooltip>}>
                  <Button variant="link" href="https://github.com">
                    <i className="bi bi-github text-dark"></i>
                  </Button>
                </OverlayTrigger>
              </div>
              <Button variant="danger" onClick={handleLogout} className="btn-gradient">Logout</Button>
              <Button variant={theme === 'dark' ? 'light' : 'dark'} onClick={toggleTheme} className="ml-2">
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>

      {/* Edit Profile Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" value={userData?.firstname || ''} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" value={userData?.lastname || ''} />
            </Form.Group>
            {/* Add other fields if needed */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Close</Button>
          <Button variant="primary" onClick={() => setShowEditModal(false)}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProfilePage;
