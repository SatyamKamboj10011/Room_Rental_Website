import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
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
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Host Dashboard</h1>
      {listings.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((listing, index) => (
              <tr key={listing.id}>
                <td>{index + 1}</td>
                <td>{listing.title}</td>
                <td>{listing.description}</td>
                <td>${listing.price}</td>
                <td>{listing.location}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleEdit(listing.id)}
                    className="me-2"
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
                    className="ms-2"
                  >
                    View Bookings
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p className="text-center">No listings added by you yet.</p>
      )}
    </div>
  );
}

export default HostDashboard;
