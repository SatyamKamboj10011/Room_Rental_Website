import React, { useState, useEffect } from 'react';
import { 
  Container, Row, Col, Card, Spinner, Alert, 
  Badge, Tab, Tabs, Table, Button, Modal 
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { 
  FaCalendarAlt, FaUser, FaEnvelope, 
  FaMoneyBillWave, FaInfoCircle, FaTrashAlt 
} from 'react-icons/fa';
import BookingDataService from '../services/BookingDataService';
import BookingStatsCard from './BookingStats';
import { Link } from 'react-router-dom';
import RevenueChart from '../components/RevenueChart'; // New component

function ViewBookingsPage() {
  const { listingId } = useParams();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Stats calculation
  const totalBookings = bookings.length;
  const upcomingBookings = bookings.filter(b => new Date(b.checkInDate) > new Date()).length;
  const completedBookings = bookings.filter(b => new Date(b.checkOutDate) < new Date()).length;
  const totalRevenue = bookings.reduce((sum, booking) => sum + parseFloat(booking.price), 0);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const allBookingsSnapshot = await BookingDataService.getBookingsForListing(listingId);
        
        if (!allBookingsSnapshot.length) {
          setError("No bookings found for this listing.");
        }

        setBookings(allBookingsSnapshot);
      } catch (error) {
        setError("Error fetching bookings for this listing.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (listingId) {
      fetchBookings();
    } else {
      setError('Listing ID is missing.');
      setLoading(false);
    }
  }, [listingId]);

  const handleCancelBooking = (booking) => {
    setSelectedBooking(booking);
    setShowCancelModal(true);
  };

  const confirmCancelBooking = async () => {
    try {
      // Add your cancellation logic here
      // await BookingDataService.cancelBooking(selectedBooking.id);
      setShowCancelModal(false);
      // Refresh bookings or update state
    } catch (err) {
      console.error("Error cancelling booking:", err);
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const now = new Date();
    const checkIn = new Date(booking.checkInDate);
    const checkOut = new Date(booking.checkOutDate);
    
    if (activeTab === 'upcoming') return checkIn > now;
    if (activeTab === 'current') return checkIn <= now && checkOut >= now;
    if (activeTab === 'completed') return checkOut < now;
    return true;
  });

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <Container className="py-4">
      <style>{`
        body {
          background-image: url('https://cdn.pixabay.com/photo/2017/01/07/17/48/interior-1961070_1280.jpg');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          font-family: 'Arial', sans-serif;
        }

        .dashboard-container {
          background-color: rgba(255, 255, 255, 0.95);
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          padding: 30px;
          backdrop-filter: blur(8px);
        }

        .stats-container {
          background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 30px;
        }

        .booking-card {
          border-radius: 12px;
          border: none;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          margin-bottom: 20px;
        }

        .booking-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
        }

        .booking-card-header {
          background-color: #f8f9fa;
          border-bottom: none;
          border-radius: 12px 12px 0 0 !important;
          padding: 15px 20px;
        }

        .info-icon {
          margin-right: 8px;
          color: #6c757d;
        }

        .badge-upcoming {
          background-color: #17a2b8;
        }

        .badge-current {
          background-color: #28a745;
        }

        .badge-completed {
          background-color: #6c757d;
        }

        .badge-cancelled {
          background-color: #dc3545;
        }

        .nav-tabs .nav-link {
          border: none;
          color: #495057;
          font-weight: 500;
          padding: 12px 20px;
        }

        .nav-tabs .nav-link.active {
          color: #007bff;
          border-bottom: 3px solid #007bff;
          background-color: transparent;
        }

        .table th {
          border-top: none;
          font-weight: 600;
          color: #495057;
        }

        .action-btn {
          padding: 5px 10px;
          font-size: 0.875rem;
        }
      `}</style>

      <div className="dashboard-container">
        <h2 className="mb-4 text-center" style={{ fontWeight: '700', color: '#2c3e50' }}>
          Booking Management Dashboard
        </h2>

        {error && <Alert variant="danger" className="mb-4">{error}</Alert>}

        {/* Stats Overview */}
        <div className="stats-container">
          <Row>
            <Col md={3}>
              <BookingStatsCard 
                title="Total Bookings" 
                value={totalBookings} 
                icon={<FaCalendarAlt size={24} />}
                color="#007bff"
              />
            </Col>
            <Col md={3}>
              <BookingStatsCard 
                title="Upcoming" 
                value={upcomingBookings} 
                icon={<FaCalendarAlt size={24} />}
                color="#17a2b8"
              />
            </Col>
            <Col md={3}>
              <BookingStatsCard 
                title="Completed" 
                value={completedBookings} 
                icon={<FaCalendarAlt size={24} />}
                color="#28a745"
              />
            </Col>
            <Col md={3}>
              <BookingStatsCard 
                title="Total Revenue" 
                value={`$${totalRevenue.toFixed(2)}`} 
                icon={<FaMoneyBillWave size={24} />}
                color="#6f42c1"
              />
            </Col>
          </Row>
        </div>

        {/* Revenue Chart */}
        <Card className="mb-4 border-0 shadow-sm">
          <Card.Body>
            <Card.Title className="mb-3">Revenue Overview</Card.Title>
            <RevenueChart bookings={bookings} />
          </Card.Body>
        </Card>

        {/* Bookings Tabs */}
        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-4"
          id="bookings-tab"
        >
          <Tab eventKey="upcoming" title="Upcoming">
            <h5 className="my-3">Upcoming Bookings ({upcomingBookings})</h5>
          </Tab>
          <Tab eventKey="current" title="Current">
            <h5 className="my-3">Current Bookings</h5>
          </Tab>
          <Tab eventKey="completed" title="Completed">
            <h5 className="my-3">Completed Bookings ({completedBookings})</h5>
          </Tab>
          <Tab eventKey="all" title="All Bookings">
            <h5 className="my-3">All Bookings ({totalBookings})</h5>
          </Tab>
        </Tabs>

        {/* Bookings Table */}
        <div className="table-responsive">
          <Table hover className="mb-0">
            <thead>
              <tr>
                <th>Guest</th>
                <th>Dates</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length > 0 ? (
                filteredBookings.map(booking => {
                  const now = new Date();
                  const checkIn = new Date(booking.checkInDate);
                  const checkOut = new Date(booking.checkOutDate);
                  let status = 'upcoming';
                  let statusClass = 'badge-upcoming';
                  
                  if (checkIn <= now && checkOut >= now) {
                    status = 'current';
                    statusClass = 'badge-current';
                  } else if (checkOut < now) {
                    status = 'completed';
                    statusClass = 'badge-completed';
                  }

                  return (
                    <tr key={booking.id}>
                      <td>
                        <div><FaUser className="info-icon" /> {booking.guestName}</div>
                        <small className="text-muted"><FaEnvelope className="info-icon" /> {booking.guestEmail}</small>
                      </td>
                      <td>
                        <div><FaCalendarAlt className="info-icon" /> {booking.checkInDate}</div>
                        <div><FaCalendarAlt className="info-icon" /> {booking.checkOutDate}</div>
                      </td>
                      <td>
                        <Badge pill className={statusClass}>{status}</Badge>
                      </td>
                      <td>${booking.price}</td>
                      <td>
                        <Button 
                          variant="outline-primary" 
                          size="sm" 
                          className="action-btn me-2"
                          as={Link}
                          to={`/booking-details/${booking.id}`}
                        >
                          <FaInfoCircle /> Details
                        </Button>
                        {status === 'upcoming' && (
                          <Button 
                            variant="outline-danger" 
                            size="sm" 
                            className="action-btn"
                            onClick={() => handleCancelBooking(booking)}
                          >
                            <FaTrashAlt /> Cancel
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No bookings found for this category
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        {/* Alternative Card View (commented out but available) */}
        {/* {filteredBookings.length > 0 ? (
          filteredBookings.map(booking => (
            <Card key={booking.id} className="booking-card mb-3">
              <Card.Header className="booking-card-header d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-0">{booking.guestName}</h5>
                  <small className="text-muted">{booking.guestEmail}</small>
                </div>
                <Badge pill className="badge-upcoming">Upcoming</Badge>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <p className="mb-2"><FaCalendarAlt className="info-icon" /> <strong>Check-in:</strong> {booking.checkInDate}</p>
                    <p className="mb-2"><FaCalendarAlt className="info-icon" /> <strong>Check-out:</strong> {booking.checkOutDate}</p>
                  </Col>
                  <Col md={6}>
                    <p className="mb-2"><FaMoneyBillWave className="info-icon" /> <strong>Total:</strong> ${booking.price}</p>
                    <div className="d-flex mt-3">
                      <Button variant="outline-primary" size="sm" className="me-2">View Details</Button>
                      <Button variant="outline-danger" size="sm">Cancel Booking</Button>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))
        ) : (
          <Alert variant="info" className="text-center">
            No bookings found for this category
          </Alert>
        )} */}
      </div>

      {/* Cancel Booking Modal */}
      <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Cancellation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to cancel the booking for {selectedBooking?.guestName} from {selectedBooking?.checkInDate} to {selectedBooking?.checkOutDate}?
          <div className="alert alert-warning mt-3">
            <strong>Note:</strong> Cancellations may be subject to our cancellation policy.
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCancelModal(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={confirmCancelBooking}>
            Confirm Cancellation
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ViewBookingsPage;