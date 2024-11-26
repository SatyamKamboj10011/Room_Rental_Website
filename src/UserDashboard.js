import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Table, Alert, Modal, Form } from 'react-bootstrap';
import { useUserAuth } from './context/UserAuthContext';
import { db } from './firebase';
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

  return (
    <Container className="mt-5 user-dashboard">
      <style>{`
        .user-dashboard {
          padding: 30px;
          background-color: #f9f9f9;
          border-radius: 15px;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        }

        .dashboard-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .profile-avatar {
          border-radius: 50%;
          width: 150px;
          height: 150px;
          object-fit: cover;
        }

        .card-info {
          font-size: 1.1rem;
          margin-top: 15px;
        }

        .section-title {
          font-size: 1.2rem;
          font-weight: 500;
          color: #555;
        }

        .section-content {
          color: #777;
          font-size: 1rem;
        }

        .btn-logout {
          background-color: #ff4b5c;
          border-color: #ff4b5c;
        }

        .btn-logout:hover {
          background-color: #ff1a32;
          border-color: #ff1a32;
        }

        .table th, .table td {
          vertical-align: middle;
        }

        .modal-content {
          border-radius: 15px;
        }
      `}</style>

      <Row>
        <Col md={8} className="mx-auto">
          <Card className="shadow-sm">
            <Card.Header className="dashboard-header">
              <h2>{userData?.firstname}'s Dashboard</h2>
            </Card.Header>

            <Card.Body>
              {userData ? (
                <>
                  <div className="text-center">
                    <img
                      src={userData?.profilePic || 'https://your-image-url.com/default-avatar.jpg'}
                      alt="Profile"
                      className="profile-avatar"
                    />
                    <div className="profile-details">
                      <h5 className="section-title">Name</h5>
                      <p className="section-content">{userData.firstname} {userData.lastname}</p>

                      <h5 className="section-title">Email</h5>
                      <p className="section-content">{user.email}</p>
                    </div>
                  </div>
                  {/* Card Info Section */}
                  <div className="card-info">
                    <h5 className="section-title">Payment Method</h5>
                    {cardInfo ? (
                      <p className="section-content">
                        {cardInfo.cardType} ending in **** {cardInfo.cardNumber.slice(-4)} (Exp: {cardInfo.expiryDate})
                      </p>
                    ) : (
                      <p className="section-content">No card details found.</p>
                    )}
                    <Button variant="primary" onClick={() => setShowEditCardModal(true)}>
                      Update Card Info
                    </Button>
                  </div>

                  {/* Booking History Section */}
                  <div className="booking-history">
                    <h5 className="section-title">Booking History</h5>
                    {bookings.length > 0 ? (
                      <Table striped bordered hover>
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
                      <Alert variant="info">No booking history available.</Alert>
                    )}
                  </div>
                </>
              ) : (
                <Alert variant="danger" className="text-center">No user data found.</Alert>
              )}
            </Card.Body>

            <Card.Footer className="text-center">
              <Button variant="danger" onClick={handleLogout} className="btn-logout">
                Logout
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>

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
    </Container>
  );
};

export default UserDashboardPage;
