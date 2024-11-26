import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { useUserAuth } from "./context/UserAuthContext"; // Import the UserAuth context

function OffcanvasExample() {
  const { user, role, logOut } = useUserAuth(); // Destructure user and role from context
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleLogout = async () => {
    try {
      await logOut(); // Log the user out
      navigate("/"); // Redirect to homepage after logout
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      {["md"].map((expand) => (
        <Navbar
          key={expand}
          expand={expand}
          className="bg-body-tertiary mb-3"
          style={{
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            zIndex: "1000",
            backgroundColor: "#ffffff",
          }}
        >
          <Container fluid>
            {/* Logo */}
            <Navbar.Brand as={Link} to="/" className="text-primary fw-bold d-flex align-items-center">
              OTAGO Room Rental 🏠
            </Navbar.Brand>

            {/* Toggle button for smaller screens */}
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  {/* Always visible links */}
                  <Nav.Link as={Link} to="/" className="nav-link">
                    Home
                  </Nav.Link>
                  {!user && (
                    <Nav.Link as={Link} to="/Register" className="nav-link">
                      Register
                    </Nav.Link>
                  )}

                  {/* Role-based dropdown links */}
                  {user && (
                    <NavDropdown
                      title="Dashboard"
                      id={`offcanvasNavbarDropdown-expand-${expand}`}
                    >
                      {/* Admin-only links */}
                      {role === "admin" && (
                        <>
                          <NavDropdown.Item as={Link} to="/admindashboard">
                            Admin Dashboard
                          </NavDropdown.Item>
                        </>
                      )}

                      {/* Host-only links (including admins) */}
                      {(role === "admin" || role === "host") && (
                        <>
                          <NavDropdown.Item as={Link} to="/ProfilePage">
                            Profile Page
                          </NavDropdown.Item>
                          <NavDropdown.Item as={Link} to="/AddListings">
                            Add Listings
                          </NavDropdown.Item>
                          <NavDropdown.Item as={Link} to="/listings">
                            Listings
                          </NavDropdown.Item>
                         
                          <NavDropdown.Item as={Link} to="/Hostdashboard">
                            Host Dashboard
                          </NavDropdown.Item>
                          <NavDropdown.Item as={Link} to="/CheckoutPage">
                            Checkout Page
                          </NavDropdown.Item>
                        </>
                      )}

                      {/* User links (including admins) */}
                      {(role === "user") && (
                        <>
                          <NavDropdown.Item as={Link} to="/ProfilePage">
                            Profile Page
                          </NavDropdown.Item>
                          <NavDropdown.Item as={Link} to="/listings">
                            Listings
                          </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to='/userdashboard'>User Dashboard</NavDropdown.Item>
                          
                        </>
                      )}

                      {/* Guest links */}
                      {role === "guest" && (
                        <>
                          <NavDropdown.Item as={Link} to="/">
                            Home
                          </NavDropdown.Item>
                        </>
                      )}
                    </NavDropdown>
                  )}

                  {/* Show login or logout based on user status */}
                  {!user ? (
                    <Button variant="primary">
                      <Link
                        to="/Login"
                        style={{ color: "white", textDecoration: "none" }}
                      >
                        Login
                      </Link>
                    </Button>
                  ) : (
                    <Button variant="danger" onClick={handleLogout}>
                      Logout
                    </Button>
                  )}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default OffcanvasExample;
