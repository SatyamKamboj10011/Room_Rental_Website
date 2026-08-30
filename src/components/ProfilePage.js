import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Spinner, Tabs, Tab, Badge, Modal, Form } from 'react-bootstrap';
import { useUserAuth } from '../context/UserAuthContext';
import { db } from '../services/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaHome, FaBirthdayCake, FaUserShield, FaSignOutAlt } from 'react-icons/fa';

const ProfilePage = () => {
  const { user } = useUserAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();

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

  const profileCompletionPercentage = (() => {
    const fields = ['firstname', 'lastname', 'email', 'phone', 'address', 'age'];
    const filledFields = fields.filter((field) => userData?.[field]);
    return Math.round((filledFields.length / fields.length) * 100);
  })();

  const handleLogout = () => {
    navigate('/login');
  };

  const requestRoleChangeHref = userData
    ? `https://mail.google.com/mail/?view=cm&fs=1&to=satyamkamboj296@gmail.com&su=Host%20Request&body=Dear%20Admin,%0A%0AI%20would%20like%20to%20become%20a%20host.%0A%0APlease%20review%20my%20request%20and%20change%20my%20role.%0A%0AThank%20you!%0A%0AUsername:%20${userData.firstname}%20${userData.lastname}`
    : '#';

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  const initials = `${userData?.firstname?.[0] || ''}${userData?.lastname?.[0] || ''}`.toUpperCase() || <FaUser />;

  return (
    <div style={{ background: '#F7F3EC', minHeight: '100vh', padding: '3rem 0', fontSize: '16px' }}>
      <style>{`
        .profile-hero {
          background: linear-gradient(135deg, #1E3A2E 0%, #12241c 100%);
          border-radius: 24px;
          padding: 2.5rem;
          color: white;
          box-shadow: 0 16px 40px rgba(18, 36, 28, 0.25);
        }
        .profile-hero h3 {
          font-family: 'Fraunces', Georgia, serif;
          font-weight: 600;
        }
        .profile-avatar {
          width: 84px;
          height: 84px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.75rem;
          font-weight: 700;
          border: 2px solid rgba(255,255,255,0.4);
        }
        .profile-card {
          background: white;
          border-radius: 24px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.06);
          padding: 2rem;
        }
        .info-tile {
          background-color: #fafafa;
          border-radius: 16px;
          padding: 1rem 1.25rem;
          height: 100%;
        }
        .info-tile-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #6e6e73;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }
        .info-tile-value {
          font-size: 1rem;
          font-weight: 600;
          color: #1d1d1f;
        }
        .completion-ring {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: conic-gradient(white ${profileCompletionPercentage * 3.6}deg, rgba(255,255,255,0.25) 0deg);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 700;
        }
        .completion-ring-inner {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #1E3A2E;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .profile-card { font-size: 1rem; }
        .info-tile-label { font-size: 0.8rem; }
        .info-tile-value { font-size: 1.05rem; }
      `}</style>

      <Container style={{ maxWidth: 900 }}>
        <div className="profile-hero d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
          <div className="d-flex align-items-center gap-3">
            <div className="profile-avatar">{initials}</div>
            <div>
              <h3 className="mb-0 fw-bold">
                {userData?.firstname || 'User'} {userData?.lastname || ''}
              </h3>
              <div className="opacity-75">{user?.email}</div>
              <Badge bg="light" text="dark" className="mt-2" style={{ borderRadius: 8 }}>
                <FaUserShield className="me-1" /> {userData?.role || 'user'}
              </Badge>
            </div>
          </div>
          <div className="text-center">
            <div className="completion-ring">
              <div className="completion-ring-inner">{profileCompletionPercentage}%</div>
            </div>
            <div className="small mt-1 opacity-75">Profile complete</div>
          </div>
        </div>

        <div className="profile-card">
          {userData ? (
            <Tabs defaultActiveKey="info" id="profile-tabs" className="mb-4">
              <Tab eventKey="info" title="Personal Info">
                <Row className="g-3 mb-4">
                  <Col md={6}>
                    <div className="info-tile">
                      <div className="info-tile-label"><FaUser className="me-1" /> First Name</div>
                      <div className="info-tile-value">{userData.firstname || '—'}</div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="info-tile">
                      <div className="info-tile-label"><FaUser className="me-1" /> Last Name</div>
                      <div className="info-tile-value">{userData.lastname || '—'}</div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="info-tile">
                      <div className="info-tile-label"><FaEnvelope className="me-1" /> Email</div>
                      <div className="info-tile-value">{user.email}</div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="info-tile">
                      <div className="info-tile-label"><FaPhone className="me-1" /> Phone</div>
                      <div className="info-tile-value">{userData.phone || '—'}</div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="info-tile">
                      <div className="info-tile-label"><FaHome className="me-1" /> Address</div>
                      <div className="info-tile-value">{userData.address || '—'}</div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="info-tile">
                      <div className="info-tile-label"><FaBirthdayCake className="me-1" /> Age</div>
                      <div className="info-tile-value">{userData.age || '—'}</div>
                    </div>
                  </Col>
                </Row>
                <Button variant="primary" style={{ borderRadius: 8 }} onClick={() => setShowEditModal(true)}>
                  Edit Profile
                </Button>
              </Tab>

              <Tab eventKey="security" title="Security">
                <div className="info-tile mb-3" style={{ maxWidth: 320 }}>
                  <div className="info-tile-label">Password</div>
                  <div className="info-tile-value">••••••••••</div>
                </div>
                <Button variant="warning" style={{ borderRadius: 8 }}>
                  <a
                    href={requestRoleChangeHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none text-dark"
                  >
                    Request to Change Role
                  </a>
                </Button>
              </Tab>
            </Tabs>
          ) : (
            <p className="text-center">User data not found.</p>
          )}

          <hr className="my-4" />

          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
            <div>
              <Badge bg="success" className="me-2" style={{ borderRadius: 8 }}>Verified User</Badge>
            </div>
            <Button variant="outline-danger" style={{ borderRadius: 8 }} onClick={handleLogout}>
              <FaSignOutAlt className="me-1" /> Logout
            </Button>
          </div>
        </div>
      </Container>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" defaultValue={userData?.firstname || ''} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" defaultValue={userData?.lastname || ''} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Close</Button>
          <Button variant="primary" onClick={() => setShowEditModal(false)}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProfilePage;
