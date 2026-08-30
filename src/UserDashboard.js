import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Table, Alert, Modal, Form } from 'react-bootstrap';
import { useUserAuth } from './context/UserAuthContext';
import { db } from './services/firebase';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const UserDashboardPage = () => {
  const { user } = useUserAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [cardInfo, setCardInfo] = useState(null);
  const [showEditCardModal, setShowEditCardModal] = useState(false);
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

          // Fetch booking history
          const bookingsRef = collection(db, 'bookings');
          const q = query(bookingsRef, where('userId', '==', user.uid));
          const bookingSnapshot = await getDocs(q);
          const bookingList = bookingSnapshot.docs.map((doc) => doc.data());
          setBookings(bookingList);

          // Fetch card information (assuming card info is stored in usersdetails)
          const cardRef = doc(db, 'paymentMethods', user.uid);
          const cardSnap = await getDoc(cardRef);
          if (cardSnap.exists()) {
            setCardInfo(cardSnap.data());
          } else {
            console.log('No card data found');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [user]);

  // Handle logout
  const handleLogout = () => {
    navigate('/login');
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  const initials = `${userData?.firstname?.[0] || ''}${userData?.lastname?.[0] || ''}`.toUpperCase() || '?';

  return (
    <div style={{ background: '#F7F3EC', minHeight: '100vh', padding: '3rem 0', fontSize: '16px' }}>
      <style>{`
        .user-dashboard-card {
          border-radius: 24px;
          border: none;
          box-shadow: 0 8px 30px rgba(30, 58, 46, 0.08);
        }
        .dashboard-header {
          text-align: center;
          background: linear-gradient(135deg, #1E3A2E 0%, #12241c 100%);
          color: white;
          border-radius: 24px 24px 0 0;
          padding: 2rem;
        }
        .dashboard-header h3 {
          font-family: 'Fraunces', Georgia, serif;
          font-weight: 600;
        }
        .profile-avatar-initials {
          width: 96px;
          height: 96px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          border: 2px solid rgba(255,255,255,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.75rem;
          font-weight: 700;
          margin: 0 auto 0.75rem;
        }
        .section-tile {
          background: #F7F3EC;
          border: 1px solid #e6ddcf;
          border-radius: 16px;
          padding: 1.25rem;
          margin-bottom: 1.25rem;
        }
        .section-title {
          font-size: 0.82rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 700;
          color: #6b6459;
          margin-bottom: 0.5rem;
        }
        .section-content {
          color: #1E3A2E;
          font-size: 1.05rem;
        }
        .user-dashboard-card .btn {
          border-radius: 8px;
        }
        .table th, .table td {
          vertical-align: middle;
        }
        .modal-content {
          border-radius: 20px;
        }
      `}</style>

      <Container style={{ maxWidth: 800 }}>
        <Card className="user-dashboard-card">
          <Card.Header className="dashboard-header border-0">
            <div className="profile-avatar-initials">{initials}</div>
            <h3 className="mb-0 fw-bold">{userData?.firstname || 'User'}'s Dashboard</h3>
          </Card.Header>

          <Card.Body className="p-4">
            {userData ? (
              <>
                <Row className="g-3">
                  <Col md={6}>
                    <div className="section-tile">
                      <h6 className="section-title">Name</h6>
                      <p className="section-content mb-0">{userData.firstname} {userData.lastname}</p>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="section-tile">
                      <h6 className="section-title">Email</h6>
                      <p className="section-content mb-0">{user.email}</p>
                    </div>
                  </Col>
                </Row>

                <div className="section-tile">
                  <h6 className="section-title">Payment Method</h6>
                  {cardInfo ? (
                    <p className="section-content">
                      {cardInfo.cardType} ending in **** {cardInfo.cardNumber?.slice(-4)} (Exp: {cardInfo.expiryDate})
                    </p>
                  ) : (
                    <p className="section-content">No card details found.</p>
                  )}
                  <Button variant="primary" onClick={() => setShowEditCardModal(true)}>
                    Update Card Info
                  </Button>
                </div>

                <div className="section-tile">
                  <h6 className="section-title">Booking History</h6>
                  {bookings.length > 0 ? (
                    <Table striped bordered hover className="mb-0">
                      <thead>
                        <tr>
                          <th>Room</th>
                          <th>Booking Date</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings.map((booking, index) => (
                          <tr key={index}>
                            <td>{booking.roomName}</td>
                            <td>{new Date(booking.bookingDate.seconds * 1000).toLocaleDateString()}</td>
                            <td>{booking.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  ) : (
                    <Alert variant="info" className="mb-0">No booking history available.</Alert>
                  )}
                </div>
              </>
            ) : (
              <Alert variant="danger" className="text-center">No user data found.</Alert>
            )}
          </Card.Body>

          <Card.Footer className="text-center border-0 pb-4">
            <Button variant="outline-danger" onClick={handleLogout}>
              Logout
            </Button>
          </Card.Footer>
        </Card>
      </Container>

      {/* Update Card Modal */}
      <Modal show={showEditCardModal} onHide={() => setShowEditCardModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Card Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Card Number</Form.Label>
              <Form.Control type="text" placeholder="Enter new card number" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control type="text" placeholder="MM/YY" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Card Type</Form.Label>
              <Form.Control as="select">
                <option>Visa</option>
                <option>MasterCard</option>
                <option>American Express</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditCardModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => setShowEditCardModal(false)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserDashboardPage;
