import { useEffect, useState } from "react";
import { Button, Spinner, Form, InputGroup, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ListingsDataService from "../services/ListingsDataService";
import { useUserAuth } from "../context/UserAuthContext";
import {
  FaSearch,
  FaEdit,
  FaTrashAlt,
  FaEye,
  FaMoneyBillWave,
  FaMapMarkerAlt,
  FaHome,
  FaPlusCircle,
  FaListUl
} from "react-icons/fa";
import BookingDataService from "../services/BookingDataService";
import { getFallbackImage } from "../utils/fallbackImage";
import DashboardLayout from "./dashboard/DashboardLayout";

function HostDashboard() {
  const { user, role } = useUserAuth();
  const [listings, setListings] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [activeKey, setActiveKey] = useState("listings");
  const navigate = useNavigate();

  useEffect(() => {
    if (user && (role === "host" || role === "admin")) {
      fetchHostListings();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, role]);

  const HostEarnings = async (hostListings) => {
    let total = 0;
    for (let listing of hostListings) {
      const earnings = await BookingDataService.getEarningsForListing(listing.id);
      total += earnings - earnings * 0.05;
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

  const navItems = [
    { key: "listings", icon: <FaListUl />, label: "Listings" },
    { key: "add", icon: <FaPlusCircle />, label: "Add listing" }
  ];

  const handleNavSelect = (key) => {
    if (key === "add") {
      navigate("/add-listing/new");
      return;
    }
    setActiveKey(key);
  };

  if (loading) {
    return (
      <DashboardLayout
        brandIcon={<FaHome />}
        brandLabel="Host Panel"
        navItems={navItems}
        activeKey={activeKey}
        onNavSelect={handleNavSelect}
        topbarTitle="Your host dashboard"
      >
        <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
          <Spinner animation="border" style={{ color: "#C1622D" }} />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      brandIcon={<FaHome />}
      brandLabel="Host Panel"
      navItems={navItems}
      activeKey={activeKey}
      onNavSelect={handleNavSelect}
      topbarTitle="Your host dashboard"
      topbarSubtitle="Manage your properties and track your earnings"
      onRefresh={fetchHostListings}
    >
      <style>{`
        .host-earning-card {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .host-earning-icon {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background: #fbf1ea;
          color: #C1622D;
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 52px;
        }
        .host-earning-value {
          font-size: 1.6rem;
          font-weight: 800;
          color: #1E3A2E;
        }
        .host-listing-card {
          border-radius: 18px;
          overflow: hidden;
          background: white;
          border: 1px solid #e6ddcf;
          transition: all 0.25s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .host-listing-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(30, 58, 46, 0.12);
        }
        .host-listing-img-wrap {
          height: 180px;
          position: relative;
          overflow: hidden;
        }
        .host-listing-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .host-listing-card:hover .host-listing-img-wrap img {
          transform: scale(1.06);
        }
        .host-listing-body {
          padding: 1.1rem 1.2rem 1.3rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .host-listing-title {
          font-weight: 700;
          color: #1E3A2E;
          margin-bottom: 0.35rem;
        }
        .host-listing-desc {
          color: #6b6459;
          font-size: 0.85rem;
          margin-bottom: 0.9rem;
        }
        .host-perf-table th {
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.05rem;
          color: #1E3A2E;
          background: #F7F3EC;
          border-bottom: 2px solid #e6ddcf;
          padding: 0.85rem 1rem;
        }
        .host-perf-table td {
          padding: 0.85rem 1rem;
          vertical-align: middle;
          border-top: 1px solid #e6ddcf;
        }
        .host-perf-thumb {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          object-fit: cover;
        }
      `}</style>

      {/* Earnings + search bar */}
      <div className="dash-card p-3 p-md-4 mb-4">
        <div className="row align-items-center g-3">
          <div className="col-md-6">
            <div className="host-earning-card">
              <div className="host-earning-icon">
                <FaMoneyBillWave size={22} />
              </div>
              <div>
                <div className="text-muted small">Total earnings</div>
                <div className="host-earning-value">${totalEarnings.toFixed(2)}</div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <InputGroup className="dash-search-box">
              <InputGroup.Text style={{ background: "white", border: "1px solid #e6ddcf", borderRight: "none" }}>
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                placeholder="Search your listings..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ borderLeft: "none" }}
              />
              {search && (
                <Button variant="outline-secondary" onClick={() => setSearch("")}>
                  Clear
                </Button>
              )}
            </InputGroup>
          </div>
        </div>
      </div>

      {/* Listings grid */}
      {listings.length > 0 ? (
        <>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4 mb-4">
            {filteredListings.map((listing) => (
              <div key={listing.id} className="col">
                <div className="host-listing-card">
                  <div className="host-listing-img-wrap">
                    <img
                      src={listing.image || listing.images?.[0] || getFallbackImage(listing.id)}
                      alt={listing.title}
                    />
                    <Badge
                      bg={listing.available ? "success" : "danger"}
                      className="position-absolute top-0 end-0 m-2"
                    >
                      {listing.available ? "Available" : "Booked"}
                    </Badge>
                  </div>
                  <div className="host-listing-body">
                    <div className="host-listing-title">{listing.title}</div>
                    <div className="host-listing-desc">
                      {listing.description?.length > 90
                        ? `${listing.description.substring(0, 90)}...`
                        : listing.description}
                    </div>
                    <div className="mt-auto">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                          <span className="h5" style={{ color: "#C1622D" }}>
                            ${listing.price}
                          </span>
                          <span className="text-muted small"> / week</span>
                        </div>
                        <div className="text-muted small">
                          <FaMapMarkerAlt className="me-1" />
                          {listing.location}
                        </div>
                      </div>
                      <div className="d-flex gap-2">
                        <Button
                          variant="outline-secondary"
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
                          size="sm"
                          onClick={() => handleViewBookingDetails(listing.id)}
                          className="flex-grow-1 d-flex align-items-center justify-content-center"
                          style={{ background: "#C1622D", border: "none" }}
                        >
                          <FaEye className="me-2" /> Bookings
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Portfolio performance table */}
          <div className="dash-card p-3 p-md-4">
            <h6 className="mb-3" style={{ color: "#1E3A2E", fontWeight: 700 }}>
              Portfolio overview
            </h6>
            <div className="table-responsive">
              <table className="table host-perf-table mb-0">
                <thead>
                  <tr>
                    <th>Listing</th>
                    <th>Status</th>
                    <th>Rate</th>
                    <th>Location</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredListings.map((listing) => (
                    <tr key={listing.id}>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <img
                            className="host-perf-thumb"
                            src={listing.image || listing.images?.[0] || getFallbackImage(listing.id)}
                            alt={listing.title}
                          />
                          <span style={{ fontWeight: 600, color: "#1E3A2E" }}>{listing.title}</span>
                        </div>
                      </td>
                      <td>
                        <Badge bg={listing.available ? "success" : "danger"}>
                          {listing.available ? "Available" : "Booked"}
                        </Badge>
                      </td>
                      <td>${listing.price} / week</td>
                      <td>{listing.location || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="dash-card text-center py-5">
          <h4 className="text-muted mb-3">No listings found</h4>
          <Button
            onClick={() => navigate("/add-listing/new")}
            className="px-4"
            style={{ borderRadius: 980, background: "#C1622D", border: "none" }}
          >
            Create your first listing
          </Button>
        </div>
      )}
    </DashboardLayout>
  );
}

export default HostDashboard;
