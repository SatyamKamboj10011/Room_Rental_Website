import { useEffect, useState } from "react";
import { Card, Button, Row, Col, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ListingsDataService from "./services/ListingsDataService";
import { useUserAuth } from "./context/UserAuthContext";

function HostDashboard() {
  const { user, role } = useUserAuth();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && role === "host") {
      fetchHostListings();
    }
  }, [user, role]);

  const fetchHostListings = async () => {
    setLoading(true);
    try {
      const hostListings = await ListingsDataService.getHostListings(user.uid);
      setListings(hostListings);
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

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" variant="primary" />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Host Dashboard</h1>
      {listings.length > 0 ? (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {listings.map((listing, index) => (
            <Col key={listing.id}>
              <Card className="shadow-sm">
                <Card.Img variant="top" src={listing.image || "default-image-url.jpg"} />
                <Card.Body>
                  <Card.Title>{listing.title}</Card.Title>
                  <Card.Text>{listing.description}</Card.Text>
                  <Card.Text>
                    <strong>Price:</strong> ${listing.price} <br />
                    <strong>Location:</strong> {listing.location}
                  </Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleEdit(listing.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(listing.id)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="info"
                      size="sm"
                      onClick={() => handleViewBookingDetails(listing.id)}
                    >
                      View Bookings
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p className="text-center">No listings added by you yet.</p>
      )}
    </div>
  );
}

export default HostDashboard;
