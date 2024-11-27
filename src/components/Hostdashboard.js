import { useEffect, useState } from "react";
import { Card, Button, Row, Col, Spinner, Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ListingsDataService from "../services/ListingsDataService";
import { useUserAuth } from "../context/UserAuthContext";
import { FaSearch } from "react-icons/fa";
import BookingDataService from "../services/BookingDataService"; // Import the service

function HostDashboard() {
  const { user, role } = useUserAuth();
  const [listings, setListings] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [totalEarnings, setTotalEarnings] = useState(0); // State for total earnings
  const navigate = useNavigate();

  useEffect(() => {
    if (user && role === "host"|| "admin") {
      fetchHostListings();
    }
  }, [user, role]);

  // Fetch the total earnings for the host
 
  const HostEarnings = async (hostListings) => {
    let total = 0;
    for (let listing of hostListings) {
      const earnings = await BookingDataService.getEarningsForListing(listing.id);
      total += earnings - (earnings * 0.05);
    }
    setTotalEarnings(total);
  };
  

  // Fetch listings for the host
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
      <div className="text-center">
        <Spinner animation="border" variant="primary" />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      backgroundImage: `url('https://cdn.pixabay.com/photo/2017/01/07/17/48/interior-1961070_1280.jpg')`,
    }}>
      <div style={{
        background: '#ffffff99',
        padding: "20px",
        borderRadius: "10px",
      }}>
        <h1 className="text-center mb-4" style={{
          fontFamily: "Roboto, sans-serif",
          color: "#1a73e8",
          fontWeight: "700",
        }}>
          Host Dashboard
        </h1>
        <Row className="mb-4">
         <Col md={6}>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Search Listings"
              aria-label="Search Listings"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button variant="outline-secondary" onClick={() => setSearch("")}>
              <FaSearch />
            </Button>
          </InputGroup>
        </Col>
        <Card className="shadow-sm mb-4 p-2" style={{
          position:'relative',
          height:'40px',
          width:'600px'
         }}>
           <h6 className="text-success" style={{ fontWeight: "600" }}>
            Total Earnings:${totalEarnings.toFixed(2)}</h6>
         </Card>
        </Row>
        {listings.length > 0 ? (
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {filteredListings.map((listing) => (
              <Col key={listing.id}>
                <Card className="shadow-lg border-0 rounded-lg"
                  style={{
                    transition: "transform 0.5s, box-shadow 0.3s",
                    borderRadius: "15px",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
                  <Card.Img
                    variant="top"
                    src={listing.image || "default-image-url.jpg"}
                    style={{
                      borderTopLeftRadius: "15px",
                      borderTopRightRadius: "15px",
                      height: "220px",
                      objectFit: "cover",
                      transition: "transform 0.3s",
                    }}
                  />
                  <Card.Body>
                    <Card.Title style={{
                      fontSize: "1.4rem",
                      fontWeight: "600",
                      color: "#333",
                    }}>
                      {listing.title}
                    </Card.Title>
                    <Card.Text style={{
                      color: "#6c757d",
                      fontSize: "1rem",
                    }}>
                      {listing.description.length > 120
                        ? listing.description.slice(0, 120) + "..."
                        : listing.description}
                    </Card.Text>
                    <Card.Text>
                      <strong style={{ color: "#007bff" }}>Price:</strong> ${listing.price} <br />
                      <strong style={{ color: "#007bff" }}>Location:</strong> {listing.location}
                    </Card.Text>
                    <div className="d-flex justify-content-between" style={{ gap: "10px" }}>
                      <Button variant="btn btn-outline-info" size="sm" onClick={() => handleEdit(listing.id)}
                        style={{
                          borderRadius: "50px",
                          fontSize: "0.9rem",
                          width: "100%",
                        }}>
                        Edit
                      </Button>
                      <Button variant="btn btn-outline-danger" size="sm" onClick={() => handleDelete(listing.id)}
                        style={{
                          borderRadius: "50px",
                          fontSize: "0.9rem",
                          width: "100%",
                        }}>
                        Delete
                      </Button>
                      <Button variant="btn btn-outline-primary" size="sm" onClick={() => handleViewBookingDetails(listing.id)}
                        style={{
                          borderRadius: "50px",
                          fontSize: "0.9rem",
                          width: "100%",
                        }}>
                        View Bookings
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <div className="text-center" style={{
            fontFamily: "Roboto, sans-serif",
            fontSize: "1.2rem",
            color: "#495057",
          }}>
            <h4>No listings found</h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default HostDashboard;
