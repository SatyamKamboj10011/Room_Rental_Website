import React from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
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
  FaBuilding,
  FaTachometerAlt,
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
    <>
      <style>{`

        /* =====================================================
           OTAGO RENTALS NAVBAR
        ===================================================== */

        .otago-navbar-wrap {
          position: sticky;
          top: 0;
          z-index: 1030;
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid #e9edf3;
        }


        .otago-navbar {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0.8rem 1.25rem !important;
          background: transparent;
        }


        /* =====================================================
           LOGO
        ===================================================== */

        .otago-brand {
          text-decoration: none !important;
          gap: 10px;
        }


        .otago-brand-icon {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;

          background:
            linear-gradient(
              135deg,
              #C1622D 0%,
              #d17936 100%
            );

          color: white;

          box-shadow:
            0 6px 18px rgba(193, 98, 45, 0.22);

          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }


        .otago-brand:hover .otago-brand-icon {
          transform: translateY(-1px);
          box-shadow:
            0 8px 22px rgba(193, 98, 45, 0.28);
        }


        .otago-brand-name {
          font-size: 22px;
          font-weight: 850;
          letter-spacing: -0.6px;
          line-height: 1;
          color: #172033;
        }


        .otago-brand-name span {
          color: #C1622D;
        }


        .otago-brand-subtitle {
          display: block;
          margin-top: 3px;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 1.1px;
          color: #94a3b8;
          text-transform: uppercase;
        }


        /* =====================================================
           NAVIGATION
        ===================================================== */

        .otago-main-nav {
          gap: 4px;
        }


        .otago-nav-link {
          display: flex !important;
          align-items: center;
          gap: 7px;

          padding:
            0.55rem
            0.85rem !important;

          border-radius: 9px;

          color: #475569 !important;

          font-size: 14px;
          font-weight: 700;

          transition:
            background 0.18s ease,
            color 0.18s ease,
            transform 0.18s ease;
        }


        .otago-nav-link:hover {
          background: #fbf1ea;
          color: #C1622D !important;
        }


        .otago-nav-link svg {
          font-size: 14px;
        }


        /* =====================================================
           ACCOUNT DROPDOWN
        ===================================================== */

        .otago-account-toggle {
          display: flex !important;
          align-items: center;
          gap: 7px;

          color: #475569 !important;

          font-size: 14px;
          font-weight: 700;

          padding:
            0.55rem
            0.85rem !important;

          border-radius: 9px;
        }


        .otago-account-toggle:hover {
          background: #fbf1ea;
          color: #C1622D !important;
        }


        .otago-dropdown-menu {
          border: 1px solid #e5eaf1 !important;
          border-radius: 13px !important;

          padding: 7px !important;

          margin-top: 10px !important;

          min-width: 215px;

          box-shadow:
            0 16px 40px rgba(15, 23, 42, 0.10) !important;
        }


        .otago-dropdown-menu .dropdown-item {
          border-radius: 8px;
          padding: 9px 11px;

          font-size: 13px;
          font-weight: 650;

          color: #475569;

          transition:
            background 0.15s ease,
            color 0.15s ease;
        }


        .otago-dropdown-menu .dropdown-item:hover {
          background: #fbf1ea;
          color: #C1622D;
        }


        .otago-dropdown-menu .dropdown-divider {
          border-color: #edf0f4;
          margin: 6px 4px;
        }


        /* =====================================================
           RIGHT SIDE
        ===================================================== */

        .otago-actions {
          gap: 8px;
        }


        /* Notification */

        .otago-notification {
          width: 38px;
          height: 38px;

          display: flex;
          align-items: center;
          justify-content: center;

          border: 1px solid #e5eaf1 !important;
          border-radius: 10px !important;

          background: white !important;

          color: #64748b !important;

          padding: 0 !important;

          position: relative;

          transition:
            background 0.18s ease,
            color 0.18s ease,
            border-color 0.18s ease;
        }


        .otago-notification:hover {
          background: #fbf1ea !important;
          border-color: #f4dbc8 !important;
          color: #C1622D !important;
        }


        .otago-notification-badge {
          position: absolute;

          top: -4px;
          right: -4px;

          min-width: 16px;
          height: 16px;

          padding: 0 4px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 20px;

          background: #ef4444;
          color: white;

          border: 2px solid white;

          font-size: 9px;
          font-weight: 800;
        }


        /* =====================================================
           LOGIN
        ===================================================== */

        .otago-login-btn {
          height: 38px;

          display: inline-flex;
          align-items: center;
          justify-content: center;

          border-radius: 9px !important;

          padding:
            0
            15px !important;

          border:
            1px solid #d8e0ee !important;

          background: white !important;

          color: #475569 !important;

          font-size: 13px !important;
          font-weight: 750 !important;

          transition:
            all 0.18s ease;
        }


        .otago-login-btn:hover {
          background: #f8faff !important;
          border-color: #bfcdf6 !important;
          color: #C1622D !important;
        }


        /* =====================================================
           SIGN UP
        ===================================================== */

        .otago-signup-btn {
          height: 38px;

          display: inline-flex;
          align-items: center;
          justify-content: center;

          border-radius: 9px !important;

          padding:
            0
            17px !important;

          border: none !important;

          background: #C1622D !important;

          color: white !important;

          font-size: 13px !important;
          font-weight: 800 !important;

          box-shadow:
            0 6px 16px rgba(193, 98, 45, 0.18);

          transition:
            transform 0.18s ease,
            box-shadow 0.18s ease;
        }


        .otago-signup-btn:hover {
          transform: translateY(-1px);

          box-shadow:
            0 8px 20px rgba(193, 98, 45, 0.25);
        }


        /* =====================================================
           LOGOUT
        ===================================================== */

        .otago-logout-btn {
          height: 38px;

          display: inline-flex;
          align-items: center;
          justify-content: center;

          border-radius: 9px !important;

          padding:
            0
            15px !important;

          font-size: 13px !important;
          font-weight: 750 !important;
        }


        /* =====================================================
           MOBILE
        ===================================================== */

        @media (max-width: 991px) {

          .otago-navbar {
            padding:
              0.7rem
              1rem !important;
          }


          .otago-main-nav {
            padding-top: 12px;
            margin-bottom: 12px !important;
          }


          .otago-nav-link,
          .otago-account-toggle {
            padding:
              10px 12px !important;
          }


          .otago-actions {
            padding-top: 12px;

            border-top:
              1px solid #edf0f4;
          }


          .otago-notification {
            margin-right: 3px;
          }

        }


        /* =====================================================
           SMALL MOBILE
        ===================================================== */

        @media (max-width: 480px) {

          .otago-brand-subtitle {
            display: none;
          }


          .otago-brand-name {
            font-size: 20px;
          }


          .otago-brand-icon {
            width: 37px;
            height: 37px;
          }

        }

      `}</style>


      <div className="otago-navbar-wrap">

        <Navbar
          expand="lg"
          className="otago-navbar"
        >

          <Container
            fluid
            className="px-0"
          >

            {/* =================================================
                BRAND
            ================================================= */}

            <Navbar.Brand
              as={Link}
              to="/"
              className="otago-brand d-flex align-items-center"
            >

              <div className="otago-brand-icon">
                <FaMapMarkerAlt size={17} />
              </div>


              <div>

                <div className="otago-brand-name">
                  Otago<span>Rentals</span>
                </div>

                <span className="otago-brand-subtitle">
                  Find your next home
                </span>

              </div>

            </Navbar.Brand>


            {/* =================================================
                MOBILE TOGGLE
            ================================================= */}

            <Navbar.Toggle
              aria-controls="navbarCollapse"
              className="border-0 shadow-none"
            />


            <Navbar.Collapse id="navbarCollapse">


              {/* =================================================
                  MAIN NAV
              ================================================= */}

              <Nav
                className="mx-auto my-2 my-lg-0 otago-main-nav"
              >

                {/* HOME */}

                <Nav.Link
                  as={Link}
                  to="/"
                  className="otago-nav-link"
                >
                  <FaHome />
                  Home
                </Nav.Link>


                {/* BROWSE */}

                <Nav.Link
                  as={Link}
                  to="/listings"
                  className="otago-nav-link"
                >
                  <FaSearch />
                  Browse Rooms
                </Nav.Link>


                {/* ACCOUNT */}

                {user && (

                  <NavDropdown
                    title={
                      <span className="otago-account-toggle">
                        <FaUserCircle />
                        My Account
                      </span>
                    }
                    id="accountDropdown"
                    className="otago-account-dropdown"
                    menuVariant="light"
                  >

                    <div className="otago-dropdown-menu">


                      {/* ADMIN */}

                      {role === "admin" && (
                        <>

                          <NavDropdown.Item
                            as={Link}
                            to="/admindashboard"
                            className="d-flex align-items-center"
                          >

                            <FaCrown
                              className="me-2"
                              style={{
                                color: "#f59e0b"
                              }}
                            />

                            Admin Dashboard

                          </NavDropdown.Item>


                          <NavDropdown.Divider />

                        </>
                      )}


                      {/* HOST */}

                      {(role === "host" || role === "admin") && (
                        <>

                          <NavDropdown.Item
                            as={Link}
                            to="/ProfilePage"
                            className="d-flex align-items-center"
                          >
                            <FaUserCircle className="me-2" />
                            Profile
                          </NavDropdown.Item>


                          <NavDropdown.Item
                            as={Link}
                            to="/AddListings"
                            className="d-flex align-items-center"
                          >
                            <FaPlusCircle className="me-2" />
                            Add Listing
                          </NavDropdown.Item>


                          <NavDropdown.Item
                            as={Link}
                            to="/listings"
                            className="d-flex align-items-center"
                          >
                            <FaList className="me-2" />
                            My Listings
                          </NavDropdown.Item>


                          <NavDropdown.Item
                            as={Link}
                            to="/Hostdashboard"
                            className="d-flex align-items-center"
                          >
                            <FaBuilding className="me-2" />
                            Host Dashboard
                          </NavDropdown.Item>


                          <NavDropdown.Divider />

                        </>
                      )}


                      {/* USER */}

                      {role === "user" && (
                        <>

                          <NavDropdown.Item
                            as={Link}
                            to="/ProfilePage"
                            className="d-flex align-items-center"
                          >
                            <FaUserCircle className="me-2" />
                            Profile
                          </NavDropdown.Item>


                          <NavDropdown.Item
                            as={Link}
                            to="/listings"
                            className="d-flex align-items-center"
                          >
                            <FaList className="me-2" />
                            Find Rooms
                          </NavDropdown.Item>


                          <NavDropdown.Item
                            as={Link}
                            to="/userdashboard"
                            className="d-flex align-items-center"
                          >
                            <FaTachometerAlt className="me-2" />
                            Dashboard
                          </NavDropdown.Item>

                        </>
                      )}

                    </div>

                  </NavDropdown>

                )}

              </Nav>


              {/* =================================================
                  RIGHT ACTIONS
              ================================================= */}

              <div
                className="d-flex align-items-center otago-actions"
              >

                {/* NOTIFICATIONS */}

                {user && (

                  <Button
                    variant="link"
                    className="otago-notification"
                    aria-label="Notifications"
                  >

                    <IoMdNotificationsOutline size={21} />

                    <span className="otago-notification-badge">
                      3
                    </span>

                  </Button>

                )}


                {/* LOGGED OUT */}

                {!user ? (
                  <>

                    <Button
                      as={Link}
                      to="/Login"
                      className="otago-login-btn"
                    >
                      <FaSignInAlt
                        className="me-2"
                        size={9}
                      />

                      Login
                    </Button>


                    <Button
                      as={Link}
                      to="/Register"
                      className="otago-signup-btn"
                    >
                      Sign Up
                    </Button>

                  </>

                ) : (

                  /* LOGGED IN */

                  <Button
                    className="otago-logout-btn"
                    variant="outline-danger"
                    onClick={handleLogout}
                  >

                    <FaSignOutAlt
                      className="me-2"
                      size={9}
                    />

                    Logout

                  </Button>

                )}

              </div>

            </Navbar.Collapse>

          </Container>

        </Navbar>

      </div>
    </>
  );
}

export default OtagoNavbar;