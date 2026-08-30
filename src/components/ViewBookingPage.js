import React, { useState, useEffect } from 'react';
import {
  Spinner, Alert, Badge, Tab, Tabs, Table, Button, Modal, Row, Col
} from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FaCalendarAlt, FaUser, FaEnvelope,
  FaMoneyBillWave, FaTrashAlt, FaHome, FaListUl, FaPlusCircle
} from 'react-icons/fa';
import BookingDataService from '../services/BookingDataService';
import BookingStatsCard from './BookingStats';
import RevenueChart from '../components/RevenueChart';
import DashboardLayout from './dashboard/DashboardLayout';
import BookingCalendarPanel from './dashboard/BookingCalendarPanel';

function ViewBookingsPage() {
  const { listingId } = useParams();
  const navigate = useNavigate();
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
  const totalRevenue = bookings.reduce(
    (sum, booking) => sum + (parseFloat(booking.totalPrice ?? booking.price) || 0),
    0
  );

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const allBookingsSnapshot = await BookingDataService.getBookingsForListing(listingId);

      if (!allBookingsSnapshot.length) {
        setError("No bookings found for this listing.");
      } else {
        setError('');
      }

      setBookings(allBookingsSnapshot);
    } catch (error) {
      setError("Error fetching bookings for this listing.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (listingId) {
      fetchBookings();
    } else {
      setError('Listing ID is missing.');
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listingId]);

  const handleCancelBooking = (booking) => {
    setSelectedBooking(booking);
    setShowCancelModal(true);
  };

  const confirmCancelBooking = async () => {
    try {
      await BookingDataService.cancelBooking(selectedBooking.id);
      setBookings(prev =>
        prev.map(b => (b.id === selectedBooking.id ? { ...b, cancelled: true } : b))
      );
      setShowCancelModal(false);
    } catch (err) {
      console.error("Error cancelling booking:", err);
      setError("Failed to cancel booking. Please try again.");
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const now = new Date();
    const checkIn = new Date(booking.checkInDate);
    const checkOut = new Date(booking.checkOutDate);

    if (activeTab === 'cancelled') return booking.cancelled;
    if (booking.cancelled) return false;
    if (activeTab === 'upcoming') return checkIn > now;
    if (activeTab === 'current') return checkIn <= now && checkOut >= now;
    if (activeTab === 'completed') return checkOut < now;
    return true;
  });

  const navItems = [
    { key: "listings", icon: <FaListUl />, label: "Listings" },
    { key: "add", icon: <FaPlusCircle />, label: "Add listing" }
  ];

  const handleNavSelect = (key) => {
    if (key === "add") {
      navigate("/add-listing/new");
      return;
    }
    navigate("/hostdashboard");
  };

  const content = loading ? (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
      <Spinner animation="border" style={{ color: "#C1622D" }} />
    </div>
  ) : (
    <>
      <style>{`
        .vb-badge-upcoming { background-color: #C1622D; }
        .vb-badge-current { background-color: #2f6849; }
        .vb-badge-completed { background-color: #8a8078; }
        .vb-badge-cancelled { background-color: #b3261e; }

        .vb-nav-tabs .nav-link {
          border: none;
          color: #495057;
          font-weight: 500;
          padding: 12px 20px;
        }
        .vb-nav-tabs .nav-link.active {
          color: #C1622D;
          border-bottom: 3px solid #C1622D;
          background-color: transparent;
        }
        .vb-info-icon {
          margin-right: 8px;
          color: #8a8078;
        }
        .vb-action-btn {
          padding: 5px 10px;
          font-size: 0.875rem;
        }
      `}</style>

      {error && <Alert variant="danger" className="mb-4">{error}</Alert>}

      <Row className="g-4">
        <Col lg={8}>
          {/* Stats Overview */}
          <div className="dash-card p-3 p-md-4">
            <Row className="g-3">
              <Col md={3} sm={6}>
                <BookingStatsCard
                  title="Total Bookings"
                  value={totalBookings}
                  icon={<FaCalendarAlt size={24} />}
                  color="#C1622D"
                />
              </Col>
              <Col md={3} sm={6}>
                <BookingStatsCard
                  title="Upcoming"
                  value={upcomingBookings}
                  icon={<FaCalendarAlt size={24} />}
                  color="#d17936"
                />
              </Col>
              <Col md={3} sm={6}>
                <BookingStatsCard
                  title="Completed"
                  value={completedBookings}
                  icon={<FaCalendarAlt size={24} />}
                  color="#2f6849"
                />
              </Col>
              <Col md={3} sm={6}>
                <BookingStatsCard
                  title="Total Revenue"
                  value={`$${totalRevenue.toFixed(2)}`}
                  icon={<FaMoneyBillWave size={24} />}
                  color="#1E3A2E"
                />
              </Col>
            </Row>
          </div>

          {/* Revenue Chart */}
          <div className="dash-card p-3 p-md-4">
            <h6 className="mb-3" style={{ color: "#1E3A2E", fontWeight: 700 }}>Revenue overview</h6>
            <RevenueChart bookings={bookings} />
          </div>

          {/* Bookings Tabs + Table */}
          <div className="dash-card p-3 p-md-4">
            <Tabs
              activeKey={activeTab}
              onSelect={(k) => setActiveTab(k)}
              className="mb-3 vb-nav-tabs"
              id="bookings-tab"
            >
              <Tab eventKey="upcoming" title={`Upcoming (${upcomingBookings})`} />
              <Tab eventKey="current" title="Current" />
              <Tab eventKey="completed" title={`Completed (${completedBookings})`} />
              <Tab eventKey="all" title={`All (${totalBookings})`} />
              <Tab eventKey="cancelled" title="Cancelled" />
            </Tabs>

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
                      let statusClass = 'vb-badge-upcoming';

                      if (booking.cancelled) {
                        status = 'cancelled';
                        statusClass = 'vb-badge-cancelled';
                      } else if (checkIn <= now && checkOut >= now) {
                        status = 'current';
                        statusClass = 'vb-badge-current';
                      } else if (checkOut < now) {
                        status = 'completed';
                        statusClass = 'vb-badge-completed';
                      }

                      return (
                        <tr key={booking.id}>
                          <td>
                            <div><FaUser className="vb-info-icon" /> {booking.guestName}</div>
                            <small className="text-muted"><FaEnvelope className="vb-info-icon" /> {booking.guestEmail}</small>
                          </td>
                          <td>
                            <div><FaCalendarAlt className="vb-info-icon" /> {booking.checkInDate}</div>
                            <div><FaCalendarAlt className="vb-info-icon" /> {booking.checkOutDate}</div>
                          </td>
                          <td>
                            <Badge pill className={statusClass}>{status}</Badge>
                          </td>
                          <td>${booking.totalPrice ?? booking.price}</td>
                          <td>
                            {status === 'upcoming' && (
                              <Button
                                variant="outline-danger"
                                size="sm"
                                className="vb-action-btn"
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
          </div>
        </Col>

        <Col lg={4}>
          <BookingCalendarPanel bookings={bookings} />
        </Col>
      </Row>

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
    </>
  );

  return (
    <DashboardLayout
      brandIcon={<FaHome />}
      brandLabel="Host Panel"
      navItems={navItems}
      activeKey="listings"
      onNavSelect={handleNavSelect}
      topbarTitle="Booking management"
      topbarSubtitle="Track reservations for this listing"
      onRefresh={fetchBookings}
    >
      {content}
    </DashboardLayout>
  );
}

export default ViewBookingsPage;
