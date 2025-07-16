import React from "react";
import { Button, Container, Nav, Navbar, NavDropdown, Offcanvas } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { 
  FaHome, 
  FaUserCircle, 
  FaPlusCircle, 
  FaList, 
  FaSignInAlt, 
  FaSignOutAlt, 
  FaCrown,
  FaSearch,
  FaMapMarkerAlt,
  FaBell
} from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";

function OtagoNavbar() {
  const { user, role, logOut } = useUserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Navbar expand="lg" className="bg-white shadow-sm py-2 sticky-top">
      <Container>
        {/* Brand Logo with Location */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <div className="d-flex align-items-center">
            <div className="bg-primary text-white rounded p-2 me-2 d-flex align-items-center justify-content-center">
              <FaMapMarkerAlt size={20} />
            </div>
            <div>
              <span className="fw-bold fs-4 text-dark">Otago</span>
              <span className="fw-bold fs-4 text-primary">Rentals</span>
              <div className="text-muted small">Find your perfect room</div>
            </div>
          </div>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarCollapse" className="border-0">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>

        <Navbar.Collapse id="navbarCollapse">
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/" className="mx-2 fw-medium d-flex align-items-center">
              <FaHome className="me-1" /> Home
            </Nav.Link>
            <Nav.Link as={Link} to="/listings" className="mx-2 fw-medium d-flex align-items-center">
              <FaSearch className="me-1" /> Browse
            </Nav.Link>
            
            {user && (
              <NavDropdown
                title={
                  <span className="fw-medium d-flex align-items-center">
                    <FaUserCircle className="me-1" /> My Account
                  </span>
                }
                id="accountDropdown"
                className="mx-2"
              >
                {/* Admin Links */}
                {role === "admin" && (
                  <>
                    <NavDropdown.Item as={Link} to="/admindashboard" className="d-flex align-items-center">
                      <FaCrown className="me-2 text-warning" /> Admin Dashboard
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                  </>
                )}

                {/* Host Links */}
                {(role === "host" || role === "admin") && (
                  <>
                    <NavDropdown.Item as={Link} to="/ProfilePage" className="d-flex align-items-center">
                      <FaUserCircle className="me-2" /> Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/AddListings" className="d-flex align-items-center">
                      <FaPlusCircle className="me-2" /> Add Listing
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/listings" className="d-flex align-items-center">
                      <FaList className="me-2" /> My Listings
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/Hostdashboard" className="d-flex align-items-center">
                      <FaHome className="me-2" /> Host Dashboard
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                  </>
                )}

                {/* User Links */}
                {role === "user" && (
                  <>
                    <NavDropdown.Item as={Link} to="/ProfilePage" className="d-flex align-items-center">
                      <FaUserCircle className="me-2" /> Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/listings" className="d-flex align-items-center">
                      <FaList className="me-2" /> Find Rooms
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/userdashboard" className="d-flex align-items-center">
                      <FaHome className="me-2" /> Dashboard
                    </NavDropdown.Item>
                  </>
                )}
              </NavDropdown>
            )}
          </Nav>

          <div className="d-flex align-items-center">
            {user && (
              <Button variant="link" className="text-dark me-2 position-relative">
                <IoMdNotificationsOutline size={20} />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  3
                </span>
              </Button>
            )}

            {!user ? (
              <>
                <Button 
                  as={Link}
                  to="/Login"
                  variant="outline-primary"
                  className="me-2 px-3 rounded-pill"
                >
                  <FaSignInAlt className="me-1" /> Login
                </Button>
                <Button 
                  as={Link}
                  to="/Register"
                  variant="primary"
                  className="px-3 rounded-pill"
                >
                  Sign Up
                </Button>
              </>
            ) : (
              <Button 
                variant="outline-danger"
                className="px-3 rounded-pill"
                onClick={handleLogout}
              >
                <FaSignOutAlt className="me-1" /> Logout
              </Button>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default OtagoNavbar;