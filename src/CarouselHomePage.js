import React, { useState, useEffect } from 'react';
import {
  Button,
  Spinner,
  Modal,
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  Badge
} from 'react-bootstrap';

import {
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaHome,
  FaInfoCircle,
  FaSearch,
  FaStar,
  FaBed,
  FaBath,
  FaWifi,
  FaParking,
  FaUtensils,
  FaHeart,
  FaUser,
  FaCalendarAlt,
  FaShieldAlt,
  FaArrowRight,
  FaCheck
} from 'react-icons/fa';

import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


function HomePage() {

  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredListings, setFeaturedListings] = useState([]);
  const [showNewsletterModal, setShowNewsletterModal] = useState(false);
  const [email, setEmail] = useState('');

  const navigate = useNavigate();


  // ---------------------------------------------------------
  // LOAD FEATURED LISTINGS
  // ---------------------------------------------------------

  useEffect(() => {

    const fetchListings = () => {

      setLoading(true);

      setTimeout(() => {

        setFeaturedListings([
          {
            id: 1,
            title: "Luxury Downtown Apartment",
            price: 120,
            location: "New York, NY",
            beds: 2,
            baths: 1,
            image:
              "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            amenities: ['wifi', 'parking', 'kitchen'],
            rating: 4.8,
            reviews: 124
          },
          {
            id: 2,
            title: "Cozy Studio Near Campus",
            price: 85,
            location: "Boston, MA",
            beds: 1,
            baths: 1,
            image:
              "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            amenities: ['wifi', 'kitchen'],
            rating: 4.5,
            reviews: 89
          },
          {
            id: 3,
            title: "Modern Loft with City View",
            price: 150,
            location: "Chicago, IL",
            beds: 3,
            baths: 2,
            image:
              "https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1355&q=80",
            amenities: ['wifi', 'parking', 'kitchen'],
            rating: 4.9,
            reviews: 156
          }
        ]);

        setLoading(false);

      }, 700);
    };


    fetchListings();

    // Newsletter popup
    const timer = setTimeout(() => {
      setShowNewsletterModal(true);
    }, 5000);

    return () => clearTimeout(timer);

  }, []);


  // ---------------------------------------------------------
  // NAVIGATION
  // ---------------------------------------------------------

  const handleNavigation = (path) => {

    if (!isAuthenticated) {

      setShowAuthModal(true);

    } else {

      setLoading(true);

      setTimeout(() => {
        navigate(path);
        setLoading(false);
      }, 600);

    }

  };


  // ---------------------------------------------------------
  // LOGIN
  // ---------------------------------------------------------

  const handleLogin = () => {
    setShowAuthModal(false);
  };


  // ---------------------------------------------------------
  // SEARCH
  // ---------------------------------------------------------

  const handleSearch = (e) => {

    e.preventDefault();

    navigate(`/listings?search=${searchQuery}`);

  };


  // ---------------------------------------------------------
  // NEWSLETTER
  // ---------------------------------------------------------

  const handleNewsletterSubmit = (e) => {

    e.preventDefault();

    alert(`Thank you for subscribing with ${email}!`);

    setEmail('');
    setShowNewsletterModal(false);

  };


  return (

    <div className="otago-home">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="hero">

        <Container>

          <Row className="align-items-center">

            {/* LEFT */}

            <Col lg={6}>

              <div className="hero-content">

                <div className="hero-eyebrow">
                  <span className="eyebrow-dot"></span>
                  FIND YOUR NEXT PLACE
                </div>


                <h1>
                  Find a place
                  <br />
                  <span>you'll love</span>
                  <br />
                  to live in.
                </h1>


                <p className="hero-description">

                  Discover rooms, apartments and homes
                  that fit your lifestyle, budget and
                  location.

                </p>


                {/* SEARCH */}

                <Form
                  onSubmit={handleSearch}
                  className="hero-search"
                >

                  <div className="search-icon">
                    <FaSearch />
                  </div>

                  <Form.Control
                    type="text"
                    placeholder="Search location, property or amenity..."
                    value={searchQuery}
                    onChange={(e) =>
                      setSearchQuery(e.target.value)
                    }
                  />

                  <Button type="submit">
                    Search
                  </Button>

                </Form>


                {/* QUICK SEARCH */}

                <div className="quick-search">

                  <span>Popular:</span>

                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("Dunedin");
                    }}
                  >
                    Dunedin
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("Auckland");
                    }}
                  >
                    Auckland
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("Student accommodation");
                    }}
                  >
                    Student accommodation
                  </button>

                </div>


                {/* HERO STATS */}

                <div className="hero-stats">

                  <div>
                    <strong>16+</strong>
                    <span>Properties</span>
                  </div>

                  <div className="stat-divider"></div>

                  <div>
                    <strong>4.8</strong>
                    <span>Average rating</span>
                  </div>

                  <div className="stat-divider"></div>

                  <div>
                    <strong>24/7</strong>
                    <span>Support</span>
                  </div>

                </div>

              </div>

            </Col>


            {/* RIGHT */}

            <Col lg={6}>

              <div className="hero-visual">

                <div className="hero-image-wrapper">

                  <img
                    src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=85"
                    alt="Modern rental property"
                    className="hero-image"
                  />

                  <div className="hero-image-overlay"></div>


                  {/* IMAGE LABEL */}

                  <div className="image-label">

                    <span className="verified">
                      <FaCheck />
                      Verified listing
                    </span>

                    <h3>
                      Your next chapter
                      starts here.
                    </h3>

                    <p>
                      Quality spaces in great locations.
                    </p>

                  </div>

                </div>


                {/* FLOATING CARD */}

                <div className="floating-property-card">

                  <div className="floating-icon">
                    <FaHome />
                  </div>

                  <div>
                    <span>Featured property</span>
                    <strong>Cozy Studio Near Campus</strong>
                  </div>

                  <div className="floating-rating">
                    <FaStar />
                    4.8
                  </div>

                </div>

              </div>

            </Col>

          </Row>

        </Container>

      </section>



      {/* =====================================================
          FEATURED LISTINGS
      ===================================================== */}

      <section className="featured-section">

        <Container>


          {/* SECTION HEADER */}

          <div className="section-header">

            <div>

              <div className="section-eyebrow">
                EXPLORE
              </div>

              <h2>
                Featured properties
              </h2>

              <p>
                Spaces people are loving right now.
              </p>

            </div>


            <Link
              to="/listings"
              className="view-all"
            >
              View all listings
              <FaArrowRight />
            </Link>

          </div>


          {/* LISTINGS */}

          {loading ? (

            <div className="loading-container">

              <Spinner animation="border" />

            </div>

          ) : (

            <Row className="g-4">

              {featuredListings.map((listing) => (

                <Col
                  key={listing.id}
                  lg={4}
                  md={6}
                >

                  <div className="property-card">


                    {/* IMAGE */}

                    <div className="property-image">

                      <img
                        src={listing.image}
                        alt={listing.title}
                      />


                      {/* SAVE */}

                      <button
                        type="button"
                        className="save-button"
                        aria-label="Save property"
                      >
                        <FaHeart />
                      </button>


                      {/* RATING */}

                      <div className="rating-badge">

                        <FaStar />

                        {listing.rating}

                      </div>

                    </div>


                    {/* CONTENT */}

                    <div className="property-content">


                      <div className="property-top">

                        <div>

                          <h3>
                            {listing.title}
                          </h3>

                          <p className="location">

                            <FaMapMarkerAlt />

                            {listing.location}

                          </p>

                        </div>


                        <div className="property-price">

                          <strong>
                            ${listing.price}
                          </strong>

                          <span>
                            /night
                          </span>

                        </div>

                      </div>


                      {/* DETAILS */}

                      <div className="property-details">

                        <span>
                          <FaBed />
                          {listing.beds} beds
                        </span>

                        <span>
                          <FaBath />
                          {listing.baths} bath
                        </span>

                      </div>


                      {/* AMENITIES */}

                      <div className="amenities">

                        {listing.amenities.includes('wifi') && (

                          <span>
                            <FaWifi />
                            WiFi
                          </span>

                        )}

                        {listing.amenities.includes('parking') && (

                          <span>
                            <FaParking />
                            Parking
                          </span>

                        )}

                        {listing.amenities.includes('kitchen') && (

                          <span>
                            <FaUtensils />
                            Kitchen
                          </span>

                        )}

                      </div>


                      {/* BUTTON */}

                      <button
                        type="button"
                        className="details-button"
                        onClick={() =>
                          handleNavigation(
                            `/listing/${listing.id}`
                          )
                        }
                      >

                        View property

                        <FaArrowRight />

                      </button>

                    </div>

                  </div>

                </Col>

              ))}

            </Row>

          )}

        </Container>

      </section>



      {/* =====================================================
          HOW IT WORKS
      ===================================================== */}

      <section className="how-section">

        <Container>


          <div className="section-center">

            <div className="section-eyebrow">
              SIMPLE PROCESS
            </div>

            <h2>
              Finding a home shouldn't
              be complicated.
            </h2>

            <p>
              From discovery to booking,
              everything is designed to be simple.
            </p>

          </div>


          <div className="steps">


            {/* STEP 1 */}

            <div className="step">

              <div className="step-number">
                01
              </div>

              <div className="step-icon">
                <FaSearch />
              </div>

              <h3>
                Search
              </h3>

              <p>
                Find properties based on
                location, price and amenities.
              </p>

            </div>


            <div className="step-line"></div>


            {/* STEP 2 */}

            <div className="step">

              <div className="step-number">
                02
              </div>

              <div className="step-icon">
                <FaCalendarAlt />
              </div>

              <h3>
                Explore
              </h3>

              <p>
                Compare your favourite spaces
                and arrange a viewing.
              </p>

            </div>


            <div className="step-line"></div>


            {/* STEP 3 */}

            <div className="step">

              <div className="step-number">
                03
              </div>

              <div className="step-icon">
                <FaHome />
              </div>

              <h3>
                Move in
              </h3>

              <p>
                Choose your place and make
                your next move with confidence.
              </p>

            </div>

          </div>

        </Container>

      </section>



      {/* =====================================================
          WHY OTAGO RENTALS
      ===================================================== */}

      <section className="why-section">

        <Container>

          <Row className="align-items-center">


            {/* IMAGE */}

            <Col
              lg={6}
              className="mb-5 mb-lg-0"
            >

              <div className="why-image">

                <img
                  src="https://images.unsplash.com/photo-1560185008-b033106af5c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=85"
                  alt="Modern home interior"
                />

                <div className="experience-card">

                  <strong>
                    4.8/5
                  </strong>

                  <div>

                    <div className="stars">
                      ★★★★★
                    </div>

                    <span>
                      Average property rating
                    </span>

                  </div>

                </div>

              </div>

            </Col>


            {/* CONTENT */}

            <Col lg={6}>

              <div className="why-content">

                <div className="section-eyebrow">
                  WHY OTAGORENTALS
                </div>

                <h2>
                  Built to make
                  <span> renting easier.</span>
                </h2>

                <p className="why-description">
                  Everything you need to discover
                  and manage your next rental,
                  brought together in one place.
                </p>


                {/* FEATURE 1 */}

                <div className="why-feature">

                  <div className="feature-icon blue">
                    <FaUser />
                  </div>

                  <div>

                    <h4>
                      Simple discovery
                    </h4>

                    <p>
                      Search and compare properties
                      without jumping between platforms.
                    </p>

                  </div>

                </div>


                {/* FEATURE 2 */}

                <div className="why-feature">

                  <div className="feature-icon orange">
                    <FaCalendarAlt />
                  </div>

                  <div>

                    <h4>
                      Flexible viewings
                    </h4>

                    <p>
                      Find a suitable time to explore
                      the property you're interested in.
                    </p>

                  </div>

                </div>


                {/* FEATURE 3 */}

                <div className="why-feature">

                  <div className="feature-icon green">
                    <FaShieldAlt />
                  </div>

                  <div>

                    <h4>
                      Secure experience
                    </h4>

                    <p>
                      Your account and personal
                      information stay protected.
                    </p>

                  </div>

                </div>


              </div>

            </Col>

          </Row>

        </Container>

      </section>



      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="cta-section">

        <Container>

          <div className="cta-inner">

            <div>

              <div className="cta-eyebrow">
                YOUR NEXT HOME IS OUT THERE
              </div>

              <h2>
                Ready to find
                your place?
              </h2>

              <p>
                Start exploring available properties
                and discover somewhere that feels right.
              </p>

            </div>


            <Link
              to="/register"
              className="cta-button"
            >
              Get started
              <FaArrowRight />
            </Link>

          </div>

        </Container>

      </section>



      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="otago-footer">

        <Container>

          <Row>

            <Col
              lg={5}
              className="mb-5 mb-lg-0"
            >

              <Link
                to="/"
                className="footer-brand"
              >

                <div className="brand-icon">
                  <FaHome />
                </div>

                <span>
                  Otago<span>Rentals</span>
                </span>

              </Link>


              <p className="footer-description">

                A simple way to discover rooms,
                apartments and homes that fit
                your lifestyle.

              </p>


              <div className="social-links">

                <button type="button">
                  <FaFacebook />
                </button>

                <button type="button">
                  <FaTwitter />
                </button>

                <button type="button">
                  <FaInstagram />
                </button>

              </div>

            </Col>


            <Col
              xs={6}
              md={3}
              lg={2}
            >

              <h5>
                Explore
              </h5>

              <Link to="/">
                Home
              </Link>

              <Link to="/listings">
                Listings
              </Link>

              <Link to="/Aboutus">
                About us
              </Link>

            </Col>


            <Col
              xs={6}
              md={3}
              lg={2}
            >

              <h5>
                Resources
              </h5>

              <Link to="/faq">
                FAQ
              </Link>

              <Link to="/guides">
                Guides
              </Link>

              <Link to="/terms">
                Terms
              </Link>

            </Col>


            <Col
              md={6}
              lg={3}
              className="mt-5 mt-lg-0"
            >

              <h5>
                Stay in the loop
              </h5>

              <p className="newsletter-text">
                Get updates when new properties
                become available.
              </p>


              <Form
                onSubmit={handleNewsletterSubmit}
                className="footer-newsletter"
              >

                <Form.Control
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                />

                <Button type="submit">
                  →
                </Button>

              </Form>

            </Col>

          </Row>


          <div className="footer-bottom">

            <span>
              © {new Date().getFullYear()} OtagoRentals
            </span>

            <span>
              Built by Satyam Kamboj
            </span>

          </div>

        </Container>

      </footer>



      {/* =====================================================
          AUTH MODAL
      ===================================================== */}

      <Modal
        show={showAuthModal}
        onHide={() => setShowAuthModal(false)}
        centered
        className="otago-modal"
      >

        <Modal.Header closeButton>

          <Modal.Title>
            Welcome to OtagoRentals
          </Modal.Title>

        </Modal.Header>


        <Modal.Body>

          <div className="modal-icon">
            <FaHome />
          </div>

          <h3>
            Find your next place.
          </h3>

          <p>
            Sign in or create an account
            to access property details,
            bookings and more.
          </p>


          <div className="modal-actions">

            <Button
              variant="primary"
              as={Link}
              to="/login"
              onClick={handleLogin}
            >
              Sign in
            </Button>

            <Button
              variant="outline-primary"
              as={Link}
              to="/register"
            >
              Create account
            </Button>

          </div>

        </Modal.Body>

      </Modal>



      {/* =====================================================
          NEWSLETTER MODAL
      ===================================================== */}

      <Modal
        show={showNewsletterModal}
        onHide={() => setShowNewsletterModal(false)}
        centered
        className="otago-modal"
      >

        <Modal.Header closeButton>

          <Modal.Title>
            Stay updated
          </Modal.Title>

        </Modal.Header>


        <Modal.Body>

          <div className="modal-icon">
            <FaHome />
          </div>

          <h3>
            New places, first.
          </h3>

          <p>
            Get notified about new listings
            and updates from OtagoRentals.
          </p>


          <Form onSubmit={handleNewsletterSubmit}>

            <Form.Group className="mb-3">

              <Form.Label>
                Email address
              </Form.Label>

              <Form.Control
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />

            </Form.Group>


            <Button
              type="submit"
              className="w-100"
            >
              Subscribe
            </Button>

          </Form>

        </Modal.Body>

      </Modal>



      {/* =====================================================
          LOADING
      ===================================================== */}

      {loading && (

        <div className="loading-overlay">

          <Spinner animation="border" />

        </div>

      )}



      {/* =====================================================
          PAGE CSS
      ===================================================== */}

      <style>{`

        /* =====================================================
           VARIABLES
        ===================================================== */

        .otago-home {

          --blue: #C1622D;
          --blue-dark: #a04f24;
          --blue-soft: #fbf1ea;

          --dark: #1E3A2E;
          --text: #334155;
          --muted: #64748b;

          --background: #F7F3EC;
          --white: #ffffff;

          --border: #e2e8f0;

          --green: #2f6849;
          --orange: #f97316;

          font-family:
            Inter,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;

          color: var(--dark);

          background: var(--white);

          overflow-x: hidden;

        }


        * {
          box-sizing: border-box;
        }


        .brand,
        .footer-brand {

          display: flex;

          align-items: center;

          gap: 11px;

          color: var(--dark);

          text-decoration: none;

          font-size: 25px;

          font-weight: 800;

          letter-spacing: -0.6px;

        }


        .brand span span,
        .footer-brand span span {

          color: var(--blue);

        }


        .brand-icon {

          width: 38px;
          height: 38px;

          border-radius: 11px;

          background: var(--blue);

          color: white;

          display: flex;

          align-items: center;

          justify-content: center;

          font-size: 20px;

          box-shadow:
            0 5px 14px rgba(193, 98, 45,0.22);

        }


        /* =====================================================
           HERO
        ===================================================== */

        .hero {

          background: #f7f9fc;

          padding: 78px 0 90px;

          border-bottom: 1px solid #edf0f4;

        }


        .hero-content {

          padding-right: 45px;

        }


        .hero-eyebrow,
        .section-eyebrow,
        .cta-eyebrow {

          display: flex;

          align-items: center;

          gap: 8px;

          color: var(--blue);

          font-size: 14px;

          font-weight: 800;

          letter-spacing: 1.5px;

          margin-bottom: 18px;

        }


        .eyebrow-dot {

          width: 7px;
          height: 7px;

          border-radius: 50%;

          background: var(--blue);

        }


        .hero h1 {

          font-size: clamp(57px, 5vw, 83px);

          line-height: 0.98;

          letter-spacing: -3.5px;

          font-weight: 800;

          margin: 0 0 28px;

          color: var(--dark);

        }


        .hero h1 span {

          color: var(--blue);

        }


        .hero-description {

          max-width: 540px;

          color: var(--muted);

          font-size: 20px;

          line-height: 1.7;

          margin-bottom: 30px;

        }


        /* SEARCH */

        .hero-search {

          max-width: 610px;

          height: 62px;

          background: white;

          border: 1px solid var(--border);

          border-radius: 12px;

          display: flex;

          align-items: center;

          padding: 5px;

          box-shadow:
            0 10px 30px rgba(15,23,42,0.06);

        }


        .search-icon {

          width: 50px;

          display: flex;

          justify-content: center;

          color: var(--muted);

        }


        .hero-search .form-control {

          border: 0;

          box-shadow: none;

          font-size: 17px;

          height: 50px;

        }


        .hero-search .form-control:focus {

          box-shadow: none;

        }


        .hero-search .btn {

          height: 50px;

          padding: 0 25px;

          border-radius: 8px;

          border: 0;

          background: var(--blue);

          font-weight: 700;

        }


        .hero-search .btn:hover {

          background: var(--blue-dark);

        }


        /* QUICK SEARCH */

        .quick-search {

          display: flex;

          align-items: center;

          flex-wrap: wrap;

          gap: 8px;

          margin-top: 14px;

          color: var(--muted);

          font-size: 16px;

        }


        .quick-search button {

          border: 0;

          background: transparent;

          color: var(--blue);

          font-weight: 600;

          padding: 0;

          cursor: pointer;

        }


        /* STATS */

        .hero-stats {

          display: flex;

          align-items: center;

          gap: 25px;

          margin-top: 38px;

        }


        .hero-stats div:not(.stat-divider) {

          display: flex;

          flex-direction: column;

          gap: 3px;

        }


        .hero-stats strong {

          font-size: 24px;

          letter-spacing: -0.5px;

        }


        .hero-stats span {

          font-size: 14px;

          color: var(--muted);

        }


        .stat-divider {

          width: 1px;

          height: 30px;

          background: var(--border);

        }


        /* HERO IMAGE */

        .hero-visual {

          position: relative;

          padding: 0 10px 35px 35px;

        }


        .hero-image-wrapper {

          height: 530px;

          border-radius: 22px;

          overflow: hidden;

          position: relative;

          box-shadow:
            0 25px 60px rgba(15,23,42,0.15);

        }


        .hero-image {

          width: 100%;

          height: 100%;

          object-fit: cover;

          display: block;

        }


        .hero-image-overlay {

          position: absolute;

          inset: 0;

          background:
            linear-gradient(
              to top,
              rgba(15,23,42,0.75),
              rgba(15,23,42,0) 55%
            );

        }


        .image-label {

          position: absolute;

          bottom: 32px;

          left: 32px;

          right: 32px;

          color: white;

        }


        .verified {

          display: inline-flex;

          align-items: center;

          gap: 6px;

          padding: 6px 10px;

          border-radius: 100px;

          background: rgba(255,255,255,0.15);

          backdrop-filter: blur(8px);

          font-size: 14px;

          font-weight: 700;

          margin-bottom: 12px;

        }


        .verified svg {

          color: #4e8363;

        }


        .image-label h3 {

          font-size: 34px;

          letter-spacing: -1px;

          margin: 0 0 5px;

          color: white;

        }


        .image-label p {

          margin: 0;

          color: rgba(255,255,255,0.75);

          font-size: 16px;

        }


        /* FLOATING CARD */

        .floating-property-card {

          position: absolute;

          left: 0;

          bottom: 0;

          background: white;

          border-radius: 14px;

          padding: 15px;

          display: flex;

          align-items: center;

          gap: 12px;

          box-shadow:
            0 15px 40px rgba(15,23,42,0.14);

          max-width: 340px;

        }


        .floating-icon {

          width: 42px;

          height: 42px;

          border-radius: 10px;

          background: var(--blue-soft);

          color: var(--blue);

          display: flex;

          align-items: center;

          justify-content: center;

          flex-shrink: 0;

        }


        .floating-property-card span {

          display: block;

          color: var(--muted);

          font-size: 13px;

          margin-bottom: 3px;

        }


        .floating-property-card strong {

          display: block;

          font-size: 16px;

          max-width: 170px;

        }


        .floating-rating {

          margin-left: auto;

          color: #f59e0b;

          font-size: 16px;

          font-weight: 700;

          white-space: nowrap;

        }


        .floating-rating svg {

          margin-right: 4px;

        }


        /* =====================================================
           FEATURED
        ===================================================== */

        .featured-section {

          padding: 100px 0;

          background: white;

        }


        .section-header {

          display: flex;

          align-items: flex-end;

          justify-content: space-between;

          margin-bottom: 40px;

        }


        .section-eyebrow {

          margin-bottom: 10px;

        }


        .section-header h2,
        .section-center h2 {

          font-size: 43px;

          letter-spacing: -1.8px;

          margin: 0 0 8px;

          font-weight: 800;

        }


        .section-header p,
        .section-center p {

          color: var(--muted);

          margin: 0;

          font-size: 18px;

        }


        .view-all {

          display: flex;

          align-items: center;

          gap: 8px;

          color: var(--dark);

          text-decoration: none;

          font-size: 16px;

          font-weight: 700;

        }


        .view-all svg {

          color: var(--blue);

        }


        /* PROPERTY CARD */

        .property-card {

          height: 100%;

          background: white;

          border: 1px solid var(--border);

          border-radius: 16px;

          overflow: hidden;

          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease;

        }


        .property-card:hover {

          transform: translateY(-5px);

          box-shadow:
            0 20px 45px rgba(15,23,42,0.09);

        }


        .property-image {

          height: 250px;

          position: relative;

          overflow: hidden;

        }


        .property-image img {

          width: 100%;

          height: 100%;

          object-fit: cover;

          transition: transform 0.5s ease;

        }


        .property-card:hover
        .property-image img {

          transform: scale(1.04);

        }


        .save-button {

          position: absolute;

          top: 15px;

          right: 15px;

          width: 38px;

          height: 38px;

          border: 0;

          border-radius: 50%;

          background: rgba(255,255,255,0.95);

          color: #475569;

          display: flex;

          align-items: center;

          justify-content: center;

          cursor: pointer;

          transition: 0.2s ease;

        }


        .save-button:hover {

          color: #ef4444;

          transform: scale(1.06);

        }


        .rating-badge {

          position: absolute;

          left: 15px;

          top: 15px;

          background: rgba(15,23,42,0.85);

          color: white;

          padding: 6px 9px;

          border-radius: 7px;

          font-size: 14px;

          font-weight: 700;

          backdrop-filter: blur(6px);

        }


        .rating-badge svg {

          color: #fbbf24;

          margin-right: 4px;

        }


        .property-content {

          padding: 21px;

        }


        .property-top {

          display: flex;

          justify-content: space-between;

          gap: 15px;

          margin-bottom: 15px;

        }


        .property-top h3 {

          font-size: 19px;

          line-height: 1.35;

          font-weight: 700;

          margin: 0 0 7px;

          letter-spacing: -0.3px;

        }


        .location {

          display: flex;

          align-items: center;

          gap: 5px;

          color: var(--muted);

          font-size: 16px;

          margin: 0;

        }


        .location svg {

          color: var(--blue);

        }


        .property-price {

          text-align: right;

          white-space: nowrap;

        }


        .property-price strong {

          color: var(--dark);

          font-size: 22px;

          font-weight: 800;

        }


        .property-price span {

          color: var(--muted);

          font-size: 13px;

        }


        .property-details {

          display: flex;

          gap: 18px;

          padding: 13px 0;

          border-top: 1px solid #eef1f5;

          border-bottom: 1px solid #eef1f5;

          color: #475569;

          font-size: 16px;

        }


        .property-details span {

          display: flex;

          align-items: center;

          gap: 6px;

        }


        .property-details svg {

          color: var(--muted);

        }


        .amenities {

          display: flex;

          gap: 6px;

          flex-wrap: wrap;

          padding: 14px 0 18px;

        }


        .amenities span {

          background: #F7F3EC;

          border: 1px solid #eef1f5;

          border-radius: 6px;

          padding: 5px 8px;

          font-size: 13px;

          color: #475569;

          display: flex;

          align-items: center;

          gap: 4px;

        }


        .details-button {

          width: 100%;

          height: 43px;

          border: 1px solid var(--blue);

          background: var(--blue);

          color: white;

          border-radius: 8px;

          font-size: 16px;

          font-weight: 700;

          display: flex;

          justify-content: center;

          align-items: center;

          gap: 8px;

          cursor: pointer;

          transition: 0.2s ease;

        }


        .details-button:hover {

          background: var(--blue-dark);

          border-color: var(--blue-dark);

        }


        .details-button svg {

          font-size: 13px;

        }


        /* =====================================================
           HOW IT WORKS
        ===================================================== */

        .how-section {

          background: #F7F3EC;

          padding: 100px 0;

          border-top: 1px solid #eef1f5;

          border-bottom: 1px solid #eef1f5;

        }


        .section-center {

          text-align: center;

          max-width: 650px;

          margin: 0 auto 60px;

        }


        .section-center .section-eyebrow {

          justify-content: center;

        }


        .section-center h2 {

          margin-bottom: 12px;

        }


        .steps {

          display: flex;

          align-items: flex-start;

          justify-content: center;

          max-width: 1050px;

          margin: 0 auto;

        }


        .step {

          flex: 1;

          text-align: center;

          position: relative;

        }


        .step-number {

          font-size: 14px;

          font-weight: 800;

          color: var(--blue);

          letter-spacing: 1px;

          margin-bottom: 14px;

        }


        .step-icon {

          width: 58px;

          height: 58px;

          border-radius: 15px;

          background: white;

          border: 1px solid var(--border);

          display: flex;

          align-items: center;

          justify-content: center;

          margin: 0 auto 18px;

          color: var(--blue);

          font-size: 23px;

          box-shadow:
            0 7px 20px rgba(15,23,42,0.04);

        }


        .step h3 {

          font-size: 20px;

          margin-bottom: 8px;

          font-weight: 750;

        }


        .step p {

          max-width: 230px;

          margin: auto;

          color: var(--muted);

          font-size: 16px;

          line-height: 1.6;

        }


        .step-line {

          width: 100px;

          height: 1px;

          background: var(--border);

          margin-top: 72px;

        }


        /* =====================================================
           WHY
        ===================================================== */

        .why-section {

          padding: 110px 0;

          background: white;

        }


        .why-image {

          height: 560px;

          border-radius: 20px;

          overflow: hidden;

          position: relative;

        }


        .why-image > img {

          width: 100%;

          height: 100%;

          object-fit: cover;

        }


        .experience-card {

          position: absolute;

          left: 25px;

          bottom: 25px;

          right: 25px;

          background: rgba(255,255,255,0.94);

          backdrop-filter: blur(12px);

          border-radius: 13px;

          padding: 16px 20px;

          display: flex;

          align-items: center;

          gap: 14px;

        }


        .experience-card strong {

          font-size: 32px;

          letter-spacing: -1px;

        }


        .stars {

          color: #f59e0b;

          font-size: 14px;

          letter-spacing: 2px;

        }


        .experience-card span {

          color: var(--muted);

          font-size: 13px;

        }


        .why-content {

          padding-left: 65px;

        }


        .why-content h2 {

          font-size: 50px;

          line-height: 1.05;

          letter-spacing: -2px;

          font-weight: 800;

          margin-bottom: 20px;

        }


        .why-content h2 span {

          color: var(--blue);

        }


        .why-description {

          color: var(--muted);

          font-size: 19px;

          line-height: 1.7;

          max-width: 500px;

          margin-bottom: 36px;

        }


        .why-feature {

          display: flex;

          gap: 17px;

          margin-bottom: 25px;

        }


        .feature-icon {

          width: 46px;

          height: 46px;

          border-radius: 11px;

          display: flex;

          align-items: center;

          justify-content: center;

          flex-shrink: 0;

        }


        .feature-icon.blue {

          background: #fbf1ea;

          color: #C1622D;

        }


        .feature-icon.orange {

          background: #fff7ed;

          color: #ea580c;

        }


        .feature-icon.green {

          background: #ecfdf5;

          color: #059669;

        }


        .why-feature h4 {

          font-size: 18px;

          margin: 0 0 5px;

          font-weight: 750;

        }


        .why-feature p {

          color: var(--muted);

          font-size: 16px;

          line-height: 1.55;

          margin: 0;

        }


        /* =====================================================
           CTA
        ===================================================== */

        .cta-section {

          padding: 0 0 100px;

          background: white;

        }


        .cta-inner {

          background: var(--dark);

          border-radius: 20px;

          padding: 55px 65px;

          color: white;

          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 30px;

        }


        .cta-eyebrow {

          color: #dd925a;

          margin-bottom: 10px;

        }


        .cta-inner h2 {

          font-size: 46px;

          letter-spacing: -1.5px;

          margin: 0 0 10px;

          font-weight: 800;

        }


        .cta-inner p {

          margin: 0;

          color: #94a3b8;

          font-size: 17px;

          max-width: 520px;

          line-height: 1.6;

        }


        .cta-button {

          display: flex;

          align-items: center;

          gap: 10px;

          background: white;

          color: var(--dark);

          text-decoration: none;

          padding: 15px 22px;

          border-radius: 9px;

          font-size: 16px;

          font-weight: 750;

          white-space: nowrap;

          transition: 0.2s ease;

        }


        .cta-button:hover {

          background: #fbf1ea;

          color: var(--blue);

          transform: translateY(-2px);

        }


        /* =====================================================
           FOOTER
        ===================================================== */

        .otago-footer {

          background: #12241c;

          color: white;

          padding: 75px 0 25px;

        }


        .footer-brand {

          color: white;

          margin-bottom: 20px;

        }


        .footer-brand span span {

          color: #dd925a;

        }


        .footer-description {

          color: #94a3b8;

          font-size: 16px;

          line-height: 1.7;

          max-width: 350px;

          margin-bottom: 20px;

        }


        .social-links {

          display: flex;

          gap: 8px;

        }


        .social-links button {

          width: 34px;

          height: 34px;

          border-radius: 8px;

          border: 1px solid #182f25;

          background: transparent;

          color: #94a3b8;

          display: flex;

          align-items: center;

          justify-content: center;

          cursor: pointer;

        }


        .social-links button:hover {

          color: white;

          border-color: #475569;

        }


        .otago-footer h5 {

          font-size: 16px;

          text-transform: uppercase;

          letter-spacing: 1px;

          margin-bottom: 18px;

          color: white;

        }


        .otago-footer a {

          display: block;

          color: #94a3b8;

          text-decoration: none;

          font-size: 16px;

          margin-bottom: 12px;

        }


        .otago-footer a:hover {

          color: white;

        }


        .newsletter-text {

          color: #94a3b8;

          font-size: 16px;

          line-height: 1.6;

        }


        .footer-newsletter {

          display: flex;

          background: white;

          border-radius: 8px;

          padding: 3px;

        }


        .footer-newsletter .form-control {

          border: 0;

          box-shadow: none;

          font-size: 16px;

        }


        .footer-newsletter .btn {

          border: 0;

          background: var(--blue);

          border-radius: 6px;

          color: white;

        }


        .footer-bottom {

          border-top: 1px solid #182f25;

          margin-top: 55px;

          padding-top: 20px;

          display: flex;

          justify-content: space-between;

          color: #64748b;

          font-size: 13px;

        }


        /* =====================================================
           MODALS
        ===================================================== */

        .otago-modal .modal-content {

          border: 0;

          border-radius: 16px;

          overflow: hidden;

        }


        .otago-modal .modal-header {

          border-bottom: 1px solid var(--border);

          padding: 20px 24px;

        }


        .otago-modal .modal-title {

          font-size: 20px;

          font-weight: 750;

        }


        .otago-modal .modal-body {

          padding: 30px;

        }


        .modal-icon {

          width: 52px;

          height: 52px;

          border-radius: 13px;

          background: var(--blue-soft);

          color: var(--blue);

          display: flex;

          align-items: center;

          justify-content: center;

          margin-bottom: 20px;

          font-size: 24px;

        }


        .otago-modal h3 {

          font-size: 28px;

          letter-spacing: -0.7px;

          font-weight: 800;

          margin-bottom: 8px;

        }


        .otago-modal p {

          color: var(--muted);

          font-size: 16px;

          line-height: 1.6;

        }


        .modal-actions {

          display: grid;

          gap: 10px;

          margin-top: 25px;

        }


        .modal-actions .btn,
        .otago-modal .form-control {

          min-height: 45px;

          border-radius: 8px;

        }


        .modal-actions .btn {

          font-weight: 700;

        }


        /* =====================================================
           LOADING
        ===================================================== */

        .loading-overlay {

          position: fixed;

          inset: 0;

          z-index: 9999;

          background: rgba(15,23,42,0.35);

          backdrop-filter: blur(4px);

          display: flex;

          align-items: center;

          justify-content: center;

        }


        .loading-overlay .spinner-border {

          color: white;

          width: 2.5rem;

          height: 2.5rem;

        }


        /* =====================================================
           RESPONSIVE
        ===================================================== */

        @media (max-width: 991px) {

          .hero {
            padding: 60px 0;
          }

          .hero-content {
            padding-right: 0;
            margin-bottom: 50px;
          }

          .hero-visual {
            padding: 0 10px 35px;
          }

          .why-content {
            padding-left: 0;
          }

          .steps {
            flex-direction: column;
            align-items: center;
            gap: 35px;
          }

          .step {
            max-width: 350px;
          }

          .step-line {
            width: 1px;
            height: 45px;
            margin: 0;
          }

          .cta-inner {
            padding: 45px 35px;
          }

        }


        @media (max-width: 767px) {

          .brand {
            font-size: 22px;
          }

          .brand-icon {
            width: 34px;
            height: 34px;
          }

          .hero {
            padding: 45px 0 60px;
          }

          .hero h1 {
            font-size: 58px;
            letter-spacing: -2.5px;
          }

          .hero-description {
            font-size: 18px;
          }

          .hero-search {
            height: auto;
            padding: 5px;
          }

          .hero-search .form-control {
            min-width: 0;
          }

          .hero-search .btn {
            padding: 0 16px;
          }

          .hero-stats {
            gap: 15px;
          }

          .hero-stats strong {
            font-size: 20px;
          }

          .hero-image-wrapper {
            height: 400px;
          }

          .floating-property-card {
            left: 15px;
            right: 15px;
            max-width: none;
          }

          .section-header {
            align-items: flex-start;
            flex-direction: column;
            gap: 20px;
          }

          .section-header h2,
          .section-center h2 {
            font-size: 36px;
          }

          .featured-section,
          .how-section,
          .why-section {
            padding: 70px 0;
          }

          .why-image {
            height: 400px;
          }

          .why-content h2 {
            font-size: 41px;
          }

          .cta-inner {
            flex-direction: column;
            align-items: flex-start;
            padding: 35px 25px;
          }

          .cta-inner h2 {
            font-size: 37px;
          }

          .footer-bottom {
            flex-direction: column;
            gap: 8px;
          }

        }

      `}</style>

    </div>
  );
}


export default HomePage;