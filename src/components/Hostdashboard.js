import { useEffect, useState } from "react";
import { Card, Button, Row, Col, Spinner, Form, InputGroup, Badge, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ListingsDataService from "../services/ListingsDataService";
import { useUserAuth } from "../context/UserAuthContext";
import { FaSearch, FaEdit, FaTrashAlt, FaEye, FaMoneyBillWave, FaMapMarkerAlt } from "react-icons/fa";
import BookingDataService from "../services/BookingDataService";

function HostDashboard() {
  const { user, role } = useUserAuth();
  const [listings, setListings] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && (role === "host" || role === "admin")) {
      fetchHostListings();
    }
  }, [user, role]);

  const HostEarnings = async (hostListings) => {
    let total = 0;
    for (let listing of hostListings) {
      const earnings = await BookingDataService.getEarningsForListing(listing.id);
      total += earnings - (earnings * 0.05);
    }
    setTotalEarnings(total);
  };

  const fetchHostListings = async () => {
    setLoading(true);
    try {
      const hostListings = await ListingsDataService.getHostListings(user.uid);
      setListings(hostListings);
      await HostEarnings(hostListings);
    } catch (error) {
      console.error("Error fetching host listings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (listingId) => {
    try {
      await ListingsDataService.deleteListing(listingId);
      setListings((prev) => prev.filter((listing) => listing.id !== listingId));
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };

  const handleEdit = (listingId) => {
    navigate(`/add-listing/${listingId}`);
  };

  const handleViewBookingDetails = (listingId) => {
    navigate(`/view-booking/${listingId}`);
  };

  const filteredListings = listings.filter((listing) =>
    listing.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div className="host-dashboard" style={{
      minHeight: "100vh",
      background: "linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url('https://cdn.pixabay.com/photo/2017/01/07/17/48/interior-1961070_1280.jpg')",
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
      padding: "2rem 0"
    }}>
      <Container>
        {/* Header Section */}
        <div className="text-center mb-5">
          <h1 style={{
            color: "#2c3e50",
            fontWeight: "700",
            fontSize: "2.5rem",
            marginBottom: "1rem"
          }}>
            Your Host Dashboard
          </h1>
          <p className="text-muted" style={{ fontSize: "1.1rem" }}>
            Manage your properties and track your earnings
          </p>
        </div>

        {/* Earnings and Search Section */}
        <Card className="shadow-sm mb-4 border-0" style={{ borderRadius: "12px" }}>
          <Card.Body className="p-4">
            <Row className="align-items-center">
              <Col md={6}>
                <div className="d-flex align-items-center">
                  <div className="bg-primary rounded-circle p-3 me-3">
                    <FaMoneyBillWave size={24} color="white" />
                  </div>
                  <div>
                    <h6 className="mb-0 text-muted">Total Earnings</h6>
                    <h3 className="mb-0 text-success" style={{ fontWeight: "700" }}>
                      ${totalEarnings.toFixed(2)}
                    </h3>
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <InputGroup>
                  <InputGroup.Text style={{ background: "white" }}>
                    <FaSearch />
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Search your listings..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ borderLeft: "none" }}
                  />
                  {search && (
                    <Button 
                      variant="outline-secondary" 
                      onClick={() => setSearch("")}
                    >
                      Clear
                    </Button>
                  )}
                </InputGroup>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Listings Grid */}
        {listings.length > 0 ? (
          <Row xs={1} sm={2} lg={3} className="g-4">
            {filteredListings.map((listing) => (
              <Col key={listing.id}>
                <Card className="h-100 border-0 shadow-sm" style={{
                  borderRadius: "12px",
                  transition: "all 0.3s ease",
                  overflow: "hidden"
                }}>
                  <div style={{
                    height: "200px",
                    overflow: "hidden",
                    position: "relative"
                  }}>
                    <Card.Img
                      variant="top"
                      src={listing.image || "https://via.placeholder.com/400x300?text=No+Image"}
                      style={{
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.5s ease"
                      }}
                      className="hover-zoom"
                    />
                    <Badge 
                      bg={listing.available ? "success" : "danger"}
                      className="position-absolute top-0 end-0 m-2"
                    >
                      {listing.available ? "Available" : "Booked"}
                    </Badge>
                  </div>
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="mb-2" style={{
                      fontSize: "1.25rem",
                      fontWeight: "600",
                      color: "#2c3e50"
                    }}>
                      {listing.title}
                    </Card.Title>
                    <Card.Text className="text-muted mb-3" style={{ fontSize: "0.9rem" }}>
                      {listing.description.length > 100
                        ? `${listing.description.substring(0, 100)}...`
                        : listing.description}
                    </Card.Text>
                    <div className="mt-auto">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                          <span className="h5 text-primary">${listing.price}</span>
                          <span className="text-muted small"> / night</span>
                        </div>
                        <div className="text-muted small">
                          <FaMapMarkerAlt className="me-1" />
                          {listing.location}
                        </div>
                      </div>
                      <div className="d-flex gap-2">
                        <Button 
                          variant="outline-primary" 
                          size="sm"
                          onClick={() => handleEdit(listing.id)}
                          className="flex-grow-1 d-flex align-items-center justify-content-center"
                        >
                          <FaEdit className="me-2" /> Edit
                        </Button>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => handleDelete(listing.id)}
                          className="flex-grow-1 d-flex align-items-center justify-content-center"
                        >
                          <FaTrashAlt className="me-2" /> Delete
                        </Button>
                        <Button 
                          variant="primary" 
                          size="sm"
                          onClick={() => handleViewBookingDetails(listing.id)}
                          className="flex-grow-1 d-flex align-items-center justify-content-center"
                        >
                          <FaEye className="me-2" /> Bookings
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Card className="text-center border-0 shadow-sm py-5">
            <Card.Body>
              <h4 className="text-muted mb-3">No listings found</h4>
              <Button 
                variant="primary" 
                onClick={() => navigate("/add-listing")}
                className="px-4"
              >
                Create Your First Listing
              </Button>
            </Card.Body>
          </Card>
        )}
      </Container>

      <style>{`
        .hover-zoom:hover {
          transform: scale(1.05);
        }
        .host-dashboard {
          font-family: 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
        }
      `}</style>
    </div>
  );
}

export default HostDashboard;