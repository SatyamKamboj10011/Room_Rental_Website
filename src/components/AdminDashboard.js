import React, { useEffect, useState } from "react";
import {
  Table,
  Spinner,
  Card,
  Row,
  Col,
  Alert,
  Form,
  Button,
  Pagination,
  Badge,
  Modal
} from "react-bootstrap";
import {
  FaSearch,
  FaDollarSign,
  FaTrashAlt,
  FaChartLine,
  FaUsers,
  FaHome,
  FaCalendarAlt,
  FaUserShield
} from "react-icons/fa";
import { useUserAuth } from "../context/UserAuthContext";
import UserDataService from "../services/UserDataService";
import ListingsDataService from "../services/ListingsDataService";
import BookingDataService from '../services/BookingDataService';
import DashboardLayout from "./dashboard/DashboardLayout";
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AdminDashboard = () => {
  // State management
  const [users, setUsers] = useState([]);
  const [listings, setListings] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [loading, setLoading] = useState({
    users: true,
    listings: true,
    bookings: true,
    earnings: true
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [search, setSearch] = useState({
    user: "",
    listing: "",
    booking: ""
  });
  const [pagination, setPagination] = useState({
    user: { current: 1, perPage: 5 },
    listing: { current: 1, perPage: 5 },
    booking: { current: 1, perPage: 5 }
  });
  const [showDeleteModal, setShowDeleteModal] = useState({
    show: false,
    type: "",
    id: null
  });
  const [stats, setStats] = useState({
    userCount: 0,
    listingCount: 0,
    bookingCount: 0,
    activeListings: 0
  });
  const [activeTab, setActiveTab] = useState("dashboard");
  const { user: adminUser } = useUserAuth();

  // Fetch all data
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(prev => ({ ...prev, users: true, listings: true, bookings: true, earnings: true }));
      
      // Fetch users
      const usersData = await UserDataService.getAllUsers();
      const usersList = usersData.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setUsers(usersList);
      setStats(prev => ({ ...prev, userCount: usersList.length }));
      
      // Fetch listings
      const listingsData = await ListingsDataService.getAllListings();
      setListings(listingsData);
      setStats(prev => ({
        ...prev,
        listingCount: listingsData.length,
        activeListings: listingsData.filter(l => l.status === 'active').length
      }));
      
      // Fetch bookings
      const bookingsData = await BookingDataService.getBookings();
      setBookings(bookingsData || []);
      setStats(prev => ({ ...prev, bookingCount: bookingsData?.length || 0 }));
      
      // Calculate earnings
      const earnings = (bookingsData || []).reduce((total, booking) => {
        const price = parseFloat(booking.totalPrice ?? booking.price) || 0;
        return total + (price * 0.05);
      }, 0);
      setTotalEarnings(earnings);
      
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load dashboard data.");
    } finally {
      setLoading({
        users: false,
        listings: false,
        bookings: false,
        earnings: false
      });
    }
  };

  // Handle role change
  const handleRoleChange = async (userId, newRole) => {
    setError("");
    setSuccess("");
    try {
      await UserDataService.updateUserRole(userId, newRole);
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );
      setSuccess("User role updated successfully.");
    } catch (error) {
      console.error("Error updating user role:", error);
      setError("Failed to update user role.");
    }
  };

  // Handle hide/unhide listing
  const handleToggleListingVisibility = async (listingId, currentlyHidden) => {
    setError("");
    setSuccess("");
    try {
      await ListingsDataService.updateListingAvailability(listingId, !currentlyHidden ? false : true);
      setListings(prev =>
        prev.map(l => (l.id === listingId ? { ...l, available: currentlyHidden } : l))
      );
      setSuccess(`Listing ${currentlyHidden ? "unhidden" : "hidden"} successfully.`);
    } catch (error) {
      console.error("Error toggling listing visibility:", error);
      setError("Failed to update listing visibility.");
    }
  };

  // Handle delete confirmation
  const handleDeleteConfirmation = (type, id) => {
    setShowDeleteModal({ show: true, type, id });
  };

  // Handle delete
  const handleDelete = async () => {
    const { type, id } = showDeleteModal;
    setError("");
    setSuccess("");
    
    try {
      if (type === "user") {
        await UserDataService.deleteUser(id);
        setUsers(prev => prev.filter(user => user.id !== id));
        setStats(prev => ({ ...prev, userCount: prev.userCount - 1 }));
      } else if (type === "listing") {
        await ListingsDataService.deleteListing(id);
        setListings(prev => prev.filter(listing => listing.id !== id));
        setStats(prev => ({ ...prev, listingCount: prev.listingCount - 1 }));
      }
      setSuccess(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully.`);
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
      setError(`Failed to delete ${type}.`);
    } finally {
      setShowDeleteModal({ show: false, type: "", id: null });
    }
  };

  // Handle page change
  const handlePageChange = (type, pageNumber) => {
    setPagination(prev => ({
      ...prev,
      [type]: { ...prev[type], current: pageNumber }
    }));
  };

  // Filter data based on search
  const filterData = (data, type) => {
    const searchTerm = search[type].toLowerCase();
    if (!searchTerm) return data;
    
    return data.filter(item => {
      if (type === "user") {
        return (
          (item.firstname?.toLowerCase().includes(searchTerm)) ||
          (item.email?.toLowerCase().includes(searchTerm)) ||
          (item.role?.toLowerCase().includes(searchTerm))
        );
      } else if (type === "listing") {
        return (
          (item.title?.toLowerCase().includes(searchTerm)) ||
          (item.location?.toLowerCase().includes(searchTerm)) ||
          (item.price?.toString().includes(searchTerm))
        );
      } else if (type === "booking") {
        return (
          (item.userName?.toLowerCase().includes(searchTerm)) ||
          (item.listingTitle?.toLowerCase().includes(searchTerm)) ||
          (item.status?.toLowerCase().includes(searchTerm))
        );
      }
      return true;
    });
  };

  // Get paginated data
  const getPaginatedData = (data, type) => {
    const { current, perPage } = pagination[type];
    const filteredData = filterData(data, type);
    const startIndex = (current - 1) * perPage;
    return {
      data: filteredData.slice(startIndex, startIndex + perPage),
      total: filteredData.length
    };
  };

  // Chart data
  const userRoleData = {
    labels: ['Admins', 'Hosts', 'Users'],
    datasets: [
      {
        data: [
          users.filter(u => u.role === 'admin').length,
          users.filter(u => u.role === 'host').length,
          users.filter(u => u.role === 'user').length
        ],
        backgroundColor: [
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  const earningsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Earnings',
        data: [1200, 1900, 1500, 2000, 1800, 2200],
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  const navItems = [
    { key: "dashboard", icon: <FaChartLine />, label: "Dashboard" },
    { key: "users", icon: <FaUsers />, label: "Users" },
    { key: "listings", icon: <FaHome />, label: "Listings" },
    { key: "bookings", icon: <FaCalendarAlt />, label: "Bookings" }
  ];

  return (
    <DashboardLayout
      brandIcon={<FaUserShield />}
      brandLabel="Admin Panel"
      navItems={navItems}
      activeKey={activeTab}
      onNavSelect={setActiveTab}
      topbarTitle={`Welcome back, ${adminUser?.email || "Admin"}`}
      onRefresh={fetchAllData}
    >
      <style>{`
        :root {
          --primary-color: #C1622D;
          --primary-dark: #a04f24;
          --secondary-color: #2f6849;
          --accent-color: #C1622D;
          --dark-color: #1E3A2E;
          --light-color: #F7F3EC;
          --border-color: #e6ddcf;
        }

        .card {
          border: 1px solid var(--border-color);
          border-radius: 16px;
          box-shadow: 0 1px 2px rgba(30, 58, 46, 0.05);
          margin-bottom: 20px;
          transition: all 0.25s ease;
        }

        .card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(30, 58, 46, 0.1);
        }

        .card-header {
          background-color: white;
          border-bottom: 1px solid var(--border-color);
          padding: 1rem 1.35rem;
          font-weight: 700;
          color: var(--dark-color);
          border-radius: 16px 16px 0 0 !important;
        }

        .stat-card {
          padding: 1.35rem;
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .stat-card-icon { order: -1; }

        .stat-card.primary .stat-card-icon,
        .stat-card.success .stat-card-icon,
        .stat-card.warning .stat-card-icon,
        .stat-card.dark .stat-card-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          position: static;
          margin-bottom: 0.75rem;
        }

        .stat-card.primary .stat-card-icon { background: #fbf1ea; color: var(--primary-color); }
        .stat-card.success .stat-card-icon { background: #eef3f0; color: var(--secondary-color); }
        .stat-card.warning .stat-card-icon { background: #fbf1ea; color: var(--primary-color); }
        .stat-card.dark .stat-card-icon { background: #eef3f0; color: var(--dark-color); }

        .stat-card-title {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--dark-color);
          margin-bottom: 0.25rem;
        }

        .stat-card-value {
          font-size: 1.75rem;
          font-weight: 800;
          color: var(--dark-color);
        }

        .table-responsive {
          overflow-x: auto;
        }

        .table {
          width: 100%;
          margin-bottom: 1rem;
          color: var(--dark-color);
          font-size: 0.95rem;
        }

        .table th {
          font-weight: 700;
          text-transform: uppercase;
          font-size: 0.72rem;
          letter-spacing: 0.05rem;
          color: var(--dark-color);
          background-color: var(--light-color);
          border-bottom: 2px solid var(--border-color);
          padding: 1rem;
        }

        .table td {
          padding: 1rem;
          vertical-align: middle;
          border-top: 1px solid var(--border-color);
        }

        .badge {
          font-size: 0.78rem;
          font-weight: 600;
          padding: 0.4em 0.7em;
          border-radius: 100px;
        }

        .badge-primary {
          background-color: var(--primary-color) !important;
        }

        .badge-success {
          background-color: var(--secondary-color) !important;
        }

        .badge-warning {
          background-color: #d17936 !important;
        }

        .badge-danger {
          background-color: #b3261e !important;
        }

        .btn-refresh {
          background-color: transparent;
          border: none;
          color: var(--dark-color);
          cursor: pointer;
          transition: all 0.3s;
        }

        .btn-refresh:hover {
          color: var(--primary-color);
          transform: rotate(180deg);
        }

        .search-box {
          position: relative;
        }

        .search-box input {
          padding-left: 2.5rem;
          border-radius: 10px;
          border: 1px solid var(--border-color);
          background: var(--light-color);
        }

        .search-box input:focus {
          background: white;
          border-color: var(--primary-color);
          box-shadow: 0 0 0 3px rgba(193, 98, 45, 0.12);
        }

        .search-box i {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--muted, #8a8078);
        }

        .pagination {
          display: flex;
          justify-content: center;
          margin-top: 1rem;
        }

        .page-item.active .page-link {
          background-color: var(--primary-color);
          border-color: var(--primary-color);
        }
        
        .page-link {
          color: var(--primary-color);
        }
        
        .chart-container {
          position: relative;
          height: 300px;
          padding: 1rem;
        }
      `}</style>

      {/* Alerts */}
        {error && (
          <Alert variant="danger" onClose={() => setError("")} dismissible>
            {error}
          </Alert>
        )}
        {success && (
          <Alert variant="success" onClose={() => setSuccess("")} dismissible>
            {success}
          </Alert>
        )}

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <>
            {/* Stats Cards */}
            <Row>
              <Col xl={3} md={6} className="mb-4">
                <Card className="stat-card primary h-100">
                  <div className="stat-card-title">Total Users</div>
                  <div className="stat-card-value">{stats.userCount}</div>
                  <div className="stat-card-icon"><FaUsers /></div>
                </Card>
              </Col>
              
              <Col xl={3} md={6} className="mb-4">
                <Card className="stat-card success h-100">
                  <div className="stat-card-title">Total Listings</div>
                  <div className="stat-card-value">{stats.listingCount}</div>
                  <div className="stat-card-icon"><FaHome /></div>
                </Card>
              </Col>
              
              <Col xl={3} md={6} className="mb-4">
                <Card className="stat-card warning h-100">
                  <div className="stat-card-title">Active Listings</div>
                  <div className="stat-card-value">{stats.activeListings}</div>
                  <div className="stat-card-icon"><FaHome /></div>
                </Card>
              </Col>
              
              <Col xl={3} md={6} className="mb-4">
                <Card className="stat-card dark h-100">
                  <div className="stat-card-title">Total Earnings</div>
                  <div className="stat-card-value">${totalEarnings.toFixed(2)}</div>
                  <div className="stat-card-icon"><FaDollarSign /></div>
                </Card>
              </Col>
            </Row>

            {/* Charts Row */}
            <Row>
              <Col xl={8} className="mb-4">
                <Card>
                  <Card.Header>
                    <h6>Monthly Earnings</h6>
                  </Card.Header>
                  <Card.Body>
                    <div className="chart-container">
                      <Bar
                        data={earningsData}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              display: false
                            }
                          }
                        }}
                      />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              
              <Col xl={4} className="mb-4">
                <Card>
                  <Card.Header>
                    <h6>User Roles Distribution</h6>
                  </Card.Header>
                  <Card.Body>
                    <div className="chart-container">
                      <Pie
                        data={userRoleData}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false
                        }}
                      />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Recent Activity */}
            <Row>
              <Col md={6} className="mb-4">
                <Card>
                  <Card.Header>
                    <h6>Recent Users</h6>
                  </Card.Header>
                  <Card.Body>
                    {loading.users ? (
                      <div className="text-center">
                        <Spinner animation="border" />
                      </div>
                    ) : (
                      <Table hover>
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Role</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.slice(0, 5).map(user => (
                            <tr key={user.id}>
                              <td>{user.firstname || user.email}</td>
                              <td>
                                <Badge
                                  bg={
                                    user.role === 'admin' ? 'primary' :
                                    user.role === 'host' ? 'warning' : 'success'
                                  }
                                >
                                  {user.role}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    )}
                  </Card.Body>
                </Card>
              </Col>
              
              <Col md={6} className="mb-4">
                <Card>
                  <Card.Header>
                    <h6>Recent Listings</h6>
                  </Card.Header>
                  <Card.Body>
                    {loading.listings ? (
                      <div className="text-center">
                        <Spinner animation="border" />
                      </div>
                    ) : (
                      <Table hover>
                        <thead>
                          <tr>
                            <th>Title</th>
                            <th>Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {listings.slice(0, 5).map(listing => (
                            <tr key={listing.id}>
                              <td>{listing.title}</td>
                              <td>${listing.price}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <Card id="users-section">
            <Card.Header>
              <Row className="align-items-center">
                <Col md={6}>
                  <h5>User Management</h5>
                </Col>
                <Col md={6}>
                  <div className="search-box">
                    <i><FaSearch /></i>
                    <Form.Control
                      placeholder="Search users..."
                      value={search.user}
                      onChange={(e) => setSearch({ ...search, user: e.target.value })}
                    />
                  </div>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              {loading.users ? (
                <div className="text-center">
                  <Spinner animation="border" />
                  <p>Loading users...</p>
                </div>
              ) : (
                <>
                  <div className="table-responsive">
                    <Table hover>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Role</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getPaginatedData(users, "user").data.map(user => (
                          <tr key={user.id}>
                            <td>
                              <strong>{user.firstname || "N/A"}</strong>
                              <div className="text-muted small">{user.id}</div>
                            </td>
                            <td>{user.email}</td>
                            <td>
                              <Form.Select
                                value={user.role || "user"}
                                onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                size="sm"
                              >
                                <option value="admin">Admin</option>
                                <option value="host">Host</option>
                                <option value="user">User</option>
                              </Form.Select>
                            </td>
                            <td>
                              <Badge bg="success">Active</Badge>
                            </td>
                            <td>
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleDeleteConfirmation("user", user.id)}
                              >
                                <FaTrashAlt />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                  
                  <Pagination className="justify-content-center mt-3">
                    {Array.from({ length: Math.ceil(filterData(users, "user").length / pagination.user.perPage) }, (_, i) => (
                      <Pagination.Item
                        key={i + 1}
                        active={i + 1 === pagination.user.current}
                        onClick={() => handlePageChange("user", i + 1)}
                      >
                        {i + 1}
                      </Pagination.Item>
                    ))}
                  </Pagination>
                </>
              )}
            </Card.Body>
          </Card>
        )}

        {/* Listings Tab */}
        {activeTab === "listings" && (
          <Card id="listings-section">
            <Card.Header>
              <Row className="align-items-center">
                <Col md={6}>
                  <h5>Listing Management</h5>
                </Col>
                <Col md={6}>
                  <div className="search-box">
                    <i><FaSearch /></i>
                    <Form.Control
                      placeholder="Search listings..."
                      value={search.listing}
                      onChange={(e) => setSearch({ ...search, listing: e.target.value })}
                    />
                  </div>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              {loading.listings ? (
                <div className="text-center">
                  <Spinner animation="border" />
                  <p>Loading listings...</p>
                </div>
              ) : (
                <>
                  <div className="table-responsive">
                    <Table hover>
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Price</th>
                          <th>Location</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getPaginatedData(listings, "listing").data.map(listing => (
                          <tr key={listing.id}>
                            <td>
                              <strong>{listing.title}</strong>
                              <div className="text-muted small">{listing.id}</div>
                            </td>
                            <td>${listing.price}</td>
                            <td>{listing.location || "N/A"}</td>
                            <td>
                              <Badge bg={listing.available === false ? 'secondary' : 'success'}>
                                {listing.available === false ? 'hidden' : 'visible'}
                              </Badge>
                            </td>
                            <td>
                              <Button
                                variant={listing.available === false ? "outline-success" : "outline-secondary"}
                                size="sm"
                                className="me-2"
                                onClick={() => handleToggleListingVisibility(listing.id, listing.available === false)}
                              >
                                {listing.available === false ? "Unhide" : "Hide"}
                              </Button>
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleDeleteConfirmation("listing", listing.id)}
                              >
                                <FaTrashAlt />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                  
                  <Pagination className="justify-content-center mt-3">
                    {Array.from({ length: Math.ceil(filterData(listings, "listing").length / pagination.listing.perPage) }, (_, i) => (
                      <Pagination.Item
                        key={i + 1}
                        active={i + 1 === pagination.listing.current}
                        onClick={() => handlePageChange("listing", i + 1)}
                      >
                        {i + 1}
                      </Pagination.Item>
                    ))}
                  </Pagination>
                </>
              )}
            </Card.Body>
          </Card>
        )}

        {/* Bookings Tab */}
        {activeTab === "bookings" && (
          <Card id="bookings-section">
            <Card.Header>
              <Row className="align-items-center">
                <Col md={6}>
                  <h5>Booking Management</h5>
                </Col>
                <Col md={6}>
                  <div className="search-box">
                    <i><FaSearch /></i>
                    <Form.Control
                      placeholder="Search bookings..."
                      value={search.booking}
                      onChange={(e) => setSearch({ ...search, booking: e.target.value })}
                    />
                  </div>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              {loading.bookings ? (
                <div className="text-center">
                  <Spinner animation="border" />
                  <p>Loading bookings...</p>
                </div>
              ) : (
                <>
                  <div className="table-responsive">
                    <Table hover>
                      <thead>
                        <tr>
                          <th>User</th>
                          <th>Listing</th>
                          <th>Dates</th>
                          <th>Amount</th>
                          <th>Status</th>
                          <th>Earnings</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getPaginatedData(bookings, "booking").data.map(booking => (
                          <tr key={booking.id}>
                            <td>{booking.userName || booking.userId}</td>
                            <td>{booking.listingTitle || booking.listingId}</td>
                            <td>
                              {new Date(booking.startDate).toLocaleDateString()} - {' '}
                              {new Date(booking.endDate).toLocaleDateString()}
                            </td>
                            <td>${booking.totalPrice ?? booking.price}</td>
                            <td>
                              <Badge bg={
                                booking.status === 'confirmed' ? 'success' :
                                booking.status === 'pending' ? 'warning' : 'danger'
                              }>
                                {booking.status}
                              </Badge>
                            </td>
                            <td>${((parseFloat(booking.totalPrice ?? booking.price) || 0) * 0.05).toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                  
                  <Pagination className="justify-content-center mt-3">
                    {Array.from({ length: Math.ceil(filterData(bookings, "booking").length / pagination.booking.perPage) }, (_, i) => (
                      <Pagination.Item
                        key={i + 1}
                        active={i + 1 === pagination.booking.current}
                        onClick={() => handlePageChange("booking", i + 1)}
                      >
                        {i + 1}
                      </Pagination.Item>
                    ))}
                  </Pagination>
                </>
              )}
            </Card.Body>
          </Card>
        )}

      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteModal.show}
        onHide={() => setShowDeleteModal({ show: false, type: "", id: null })}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this {showDeleteModal.type}? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteModal({ show: false, type: "", id: null })}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </DashboardLayout>
  );
};

export default AdminDashboard;