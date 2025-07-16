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
  Badge,
  Modal,
  ProgressBar
} from "react-bootstrap";
import {
  FaSearch,
  FaDollarSign,
  FaTrashAlt,
  FaEdit,
  FaChartLine,
  FaUsers,
  FaHome,
  FaCalendarAlt,
  FaUserShield,
  FaFilter
} from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";
import { useUserAuth } from "../context/UserAuthContext";
import UserDataService from "../services/UserDataService";
import ListingsDataService from "../services/ListingsDataService";
import BookingDataService from '../services/BookingDataService';
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
    users: { current: 1, perPage: 5 },
    listings: { current: 1, perPage: 5 },
    bookings: { current: 1, perPage: 5 }
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
        const price = parseFloat(booking.price) || 0;
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

  return (
    <Container fluid className="admin-dashboard px-0">
      <style>{`
        :root {
          --primary-color: #4e73df;
          --secondary-color: #1cc88a;
          --accent-color: #f6c23e;
          --dark-color: #5a5c69;
          --light-color: #f8f9fc;
        }
        
        body {
          font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          background-color: #f8f9fc;
        }
        
        .admin-dashboard {
          display: flex;
          min-height: 100vh;
        }
        
        .sidebar {
          width: 250px;
          background: linear-gradient(180deg, var(--primary-color) 10%, #224abe 100%);
          color: white;
          padding: 20px 0;
          box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15);
          transition: all 0.3s;
          position: fixed;
          height: 100vh;
          z-index: 1000;
        }
        
        .sidebar-brand {
          height: 4.375rem;
          text-decoration: none;
          font-size: 1.2rem;
          font-weight: 800;
          padding: 1.5rem 1rem;
          text-align: center;
          letter-spacing: 0.05rem;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .sidebar-brand-icon {
          font-size: 1.5rem;
          margin-right: 0.5rem;
        }
        
        .sidebar-divider {
          border-top: 1px solid rgba(255, 255, 255, 0.15);
          margin: 1rem 0;
        }
        
        .nav-item {
          position: relative;
        }
        
        .nav-link {
          color: rgba(255, 255, 255, 0.8);
          padding: 1rem;
          font-weight: 600;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.05rem;
          display: flex;
          align-items: center;
          transition: all 0.3s;
        }
        
        .nav-link:hover, .nav-link.active {
          color: white;
          background: rgba(255, 255, 255, 0.1);
        }
        
        .nav-link i {
          margin-right: 0.5rem;
          font-size: 0.85rem;
        }
        
        .main-content {
          margin-left: 250px;
          width: calc(100% - 250px);
          padding: 20px;
          background-color: #f8f9fc;
        }
        
        .topbar {
          height: 4.375rem;
          box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15);
          background-color: white;
          padding: 0 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          border-radius: 0.35rem;
        }
        
        .topbar-welcome {
          font-weight: 600;
          color: var(--dark-color);
        }
        
        .card {
          border: none;
          border-radius: 0.35rem;
          box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.1);
          margin-bottom: 20px;
          transition: all 0.3s;
        }
        
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 0.5rem 1.5rem 0 rgba(58, 59, 69, 0.2);
        }
        
        .card-header {
          background-color: #f8f9fc;
          border-bottom: 1px solid #e3e6f0;
          padding: 1rem 1.35rem;
          font-weight: 600;
          color: var(--dark-color);
          border-radius: 0.35rem 0.35rem 0 0 !important;
        }
        
        .stat-card {
          border-left: 0.25rem solid;
          padding: 1rem;
        }
        
        .stat-card.primary {
          border-left-color: var(--primary-color);
        }
        
        .stat-card.success {
          border-left-color: var(--secondary-color);
        }
        
        .stat-card.warning {
          border-left-color: var(--accent-color);
        }
        
        .stat-card.dark {
          border-left-color: var(--dark-color);
        }
        
        .stat-card-title {
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          color: var(--dark-color);
          margin-bottom: 0.25rem;
        }
        
        .stat-card-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: #5a5c69;
        }
        
        .stat-card-icon {
          font-size: 2rem;
          color: #dddfeb;
          position: absolute;
          right: 1rem;
          top: 1rem;
        }
        
        .table-responsive {
          overflow-x: auto;
        }
        
        .table {
          width: 100%;
          margin-bottom: 1rem;
          color: #858796;
        }
        
        .table th {
          font-weight: 600;
          text-transform: uppercase;
          font-size: 0.7rem;
          letter-spacing: 0.05rem;
          color: var(--dark-color);
          background-color: #f8f9fc;
          border-bottom: 2px solid #e3e6f0;
          padding: 1rem;
        }
        
        .table td {
          padding: 1rem;
          vertical-align: middle;
          border-top: 1px solid #e3e6f0;
        }
        
        .badge {
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.35em 0.65em;
        }
        
        .badge-primary {
          background-color: var(--primary-color);
        }
        
        .badge-success {
          background-color: var(--secondary-color);
        }
        
        .badge-warning {
          background-color: var(--accent-color);
        }
        
        .badge-danger {
          background-color: #e74a3b;
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
          border-radius: 0.35rem;
          border: 1px solid #d1d3e2;
        }
        
        .search-box i {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #b7b9cc;
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
        
        @media (max-width: 992px) {
          .sidebar {
            width: 100%;
            height: auto;
            position: relative;
            margin-bottom: 20px;
          }
          
          .main-content {
            margin-left: 0;
            width: 100%;
          }
        }
      `}</style>

      {/* Sidebar Navigation */}
      <div className="sidebar">
        <div className="sidebar-brand">
          <i className="sidebar-brand-icon"><FaUserShield /></i>
          <span>Admin Panel</span>
        </div>
        
        <div className="sidebar-divider"></div>
        
        <nav className="nav flex-column">
          <button
            className={`nav-link ${activeTab === "dashboard" ? "active" : ""}`}
            onClick={() => setActiveTab("dashboard")}
          >
            <i><FaChartLine /></i>
            Dashboard
          </button>
          
          <button
            className={`nav-link ${activeTab === "users" ? "active" : ""}`}
            onClick={() => setActiveTab("users")}
          >
            <i><FaUsers /></i>
            Users
          </button>
          
          <button
            className={`nav-link ${activeTab === "listings" ? "active" : ""}`}
            onClick={() => setActiveTab("listings")}
          >
            <i><FaHome /></i>
            Listings
          </button>
          
          <button
            className={`nav-link ${activeTab === "bookings" ? "active" : ""}`}
            onClick={() => setActiveTab("bookings")}
          >
            <i><FaCalendarAlt /></i>
            Bookings
          </button>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        {/* Top Bar */}
        <div className="topbar">
          <h4 className="topbar-welcome">
            Welcome back, {adminUser?.email || "Admin"}
          </h4>
          <button className="btn-refresh" onClick={fetchAllData}>
            <FiRefreshCw size={20} />
          </button>
        </div>

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
                            <th>Action</th>
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
                              <td>
                                <Button
                                  variant="link"
                                  size="sm"
                                  onClick={() => {
                                    setActiveTab("users");
                                    document.getElementById('users-section').scrollIntoView();
                                  }}
                                >
                                  View
                                </Button>
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
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {listings.slice(0, 5).map(listing => (
                            <tr key={listing.id}>
                              <td>{listing.title}</td>
                              <td>${listing.price}</td>
                              <td>
                                <Button
                                  variant="link"
                                  size="sm"
                                  onClick={() => {
                                    setActiveTab("listings");
                                    document.getElementById('listings-section').scrollIntoView();
                                  }}
                                >
                                  View
                                </Button>
                              </td>
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
                    {Array.from({ length: Math.ceil(filterData(users, "user").length / pagination.users.perPage) }, (_, i) => (
                      <Pagination.Item
                        key={i + 1}
                        active={i + 1 === pagination.users.current}
                        onClick={() => handlePageChange("users", i + 1)}
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
                              <Badge bg={listing.status === 'active' ? 'success' : 'warning'}>
                                {listing.status || 'inactive'}
                              </Badge>
                            </td>
                            <td>
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
                    {Array.from({ length: Math.ceil(filterData(listings, "listing").length / pagination.listings.perPage) }, (_, i) => (
                      <Pagination.Item
                        key={i + 1}
                        active={i + 1 === pagination.listings.current}
                        onClick={() => handlePageChange("listings", i + 1)}
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
                            <td>${booking.price}</td>
                            <td>
                              <Badge bg={
                                booking.status === 'confirmed' ? 'success' :
                                booking.status === 'pending' ? 'warning' : 'danger'
                              }>
                                {booking.status}
                              </Badge>
                            </td>
                            <td>${(booking.price * 0.05).toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                  
                  <Pagination className="justify-content-center mt-3">
                    {Array.from({ length: Math.ceil(filterData(bookings, "booking").length / pagination.bookings.perPage) }, (_, i) => (
                      <Pagination.Item
                        key={i + 1}
                        active={i + 1 === pagination.bookings.current}
                        onClick={() => handlePageChange("bookings", i + 1)}
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
      </div>

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
    </Container>
  );
};

export default AdminDashboard;