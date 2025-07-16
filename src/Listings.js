import React, { useEffect, useState } from 'react';
import { 
  Card, Row, Col, Button, Container, 
  Form, Pagination, Badge, Spinner, Alert,
  InputGroup, Modal
} from 'react-bootstrap';
import { 
  FaSearch, FaStar, FaHeart, FaRegHeart, 
  FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined,
  FaFilter, FaSignInAlt
} from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useUserAuth } from './context/UserAuthContext';
import ListingsDataService from './services/ListingsDataService';
import CategoryButtons from './ButtonGroup';

function Listings() {
  const { user } = useUserAuth();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedType, setSelectedType] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const listingsPerPage = 8;

  useEffect(() => {
    if (user) {
      getListings();
      const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
      setFavorites(savedFavorites);
    }
  }, [user]);

  const getListings = async () => {
    setLoading(true);
    try {
      const data = await ListingsDataService.getAllListings();
      setListings(data || []);
    } catch (error) {
      console.error('Error fetching listings: ', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleCategoryClick = (Type) => {
    setSelectedType(Type);
    setCurrentPage(1);
  };

  const toggleFavorite = (id) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    const newFavorites = favorites.includes(id)
      ? favorites.filter(favId => favId !== id)
      : [...favorites, id];
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  // In your listing component
Navigate(`/booking/${listings.id}`, { 
  state: { 
    listingsData: listings,  // or at least: image: listing.image
    listingsId: listings.id 
  } 
});

  const filteredListings = listings.filter(
    (listing) =>
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedType ? listing.Type === selectedType : true)
  );

  const indexOfLastListing = currentPage * listingsPerPage;
  const indexOfFirstListing = indexOfLastListing - listingsPerPage;
  const currentListings = filteredListings.slice(
    indexOfFirstListing,
    indexOfLastListing
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (!user) {
    return (
      <Container className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
        <div className="text-center p-5 bg-white rounded-3 shadow-sm" style={{ maxWidth: '600px' }}>
          <h2 className="mb-4">Access Restricted</h2>
          <p className="lead mb-4">
            You need to be logged in to view property listings.
          </p>
          <div className="d-flex gap-3 justify-content-center">
            <Button variant="primary" as={Link} to="/login" className="px-4">
              <FaSignInAlt className="me-2" /> Login
            </Button>
            <Button variant="outline-primary" as={Link} to="/register" className="px-4">
              Register
            </Button>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <div className="listings-page">
      <style>{`
        .listings-page {
          background: linear-gradient(rgba(255,255,255,0.95), rgba(255,255,255,0.95)), 
                      url('https://cdn.pixabay.com/photo/2020/06/27/16/40/apartment-5346460_1280.jpg');
          background-size: cover;
          background-attachment: fixed;
          min-height: 100vh;
          padding: 2rem 0;
        }
        
        .listings-container {
          background-color: white;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          padding: 2.5rem;
          margin-bottom: 2rem;
        }
        
        .listing-card {
          border: none;
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s ease;
          height: 100%;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        }
        
        .listing-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        
        .card-image-container {
          position: relative;
          overflow: hidden;
          height: 200px;
        }
        
        .listing-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .listing-card:hover .listing-image {
          transform: scale(1.05);
        }
        
        .favorite-button {
          position: absolute;
          top: 15px;
          right: 15px;
          background: rgba(255, 255, 255, 0.9);
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #e74c3c;
          font-size: 1rem;
          cursor: pointer;
          z-index: 2;
          transition: all 0.3s ease;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        
        .favorite-button:hover {
          transform: scale(1.1);
        }
        
        .favorite-button.active {
          color: white;
          background: #e74c3c;
        }
        
        .quick-view {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
          opacity: 0;
          transition: all 0.3s ease;
        }
        
        .listing-card:hover .quick-view {
          opacity: 1;
          bottom: 30px;
        }
        
        .price {
          font-size: 1.25rem;
          font-weight: 700;
          color: #2c3e50;
        }
        
        .per-night {
          font-size: 0.8rem;
          color: #7f8c8d;
        }
        
        .rating {
          display: flex;
          align-items: center;
          color: #f39c12;
          font-weight: 600;
        }
        
        .amenity-badge {
          background-color: #f8f9fa;
          color: #495057;
          border-radius: 20px;
          padding: 5px 10px;
          font-size: 0.8rem;
          display: inline-flex;
          align-items: center;
          margin-right: 8px;
          margin-bottom: 8px;
        }
        
        .search-box {
          border-radius: 50px;
          border: 1px solid #e0e0e0;
          transition: all 0.3s ease;
        }
        
        .search-box:focus-within {
          border-color: #3498db;
          box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
        }
        
        @media (max-width: 768px) {
          .listings-container {
            padding: 1.5rem;
          }
        }
      `}</style>

      <Container className="listings-container">
        <h1 className="text-center mb-4" style={{ 
          color: '#2c3e50',
          fontWeight: '700',
          position: 'relative',
          paddingBottom: '15px'
        }}>
          Available Properties
          <div style={{
            position: 'absolute',
            bottom: '0',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80px',
            height: '4px',
            background: 'linear-gradient(90deg, #3498db, #9b59b6)',
            borderRadius: '2px'
          }}></div>
        </h1>

        {/* Search and Filter Section */}
        <div className="mb-4">
          <Row className="align-items-center">
            <Col md={8}>
              <InputGroup className="search-box mb-3 mb-md-0">
                <InputGroup.Text style={{ background: 'white', borderRight: 'none' }}>
                  <FaSearch />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search by location, amenities, or property type..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  style={{ borderLeft: 'none' }}
                />
                <InputGroup.Text style={{ background: 'white', borderLeft: 'none' }}>
                  <FaFilter />
                </InputGroup.Text>
              </InputGroup>
            </Col>
            <Col md={4}>
              <Form.Select className="w-100">
                <option>Sort by: Recommended</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating: Highest First</option>
              </Form.Select>
            </Col>
          </Row>
          <div className="mt-3">
            <CategoryButtons onCategoryClick={handleCategoryClick} />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Loading properties...</p>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <h5 className="text-muted">
                Showing {filteredListings.length} {selectedType ? selectedType + ' ' : ''}properties
              </h5>
            </div>

            <Row className="g-4">
              {currentListings.map((listing) => (
                <Col key={listing.id} xs={12} sm={6} lg={4} xl={3}>
                  <Card 
                    className="listing-card"
                    onMouseEnter={() => setHoveredCard(listing.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className="card-image-container">
                      <Card.Img
                        variant="top"
                        src={listing.image || 'https://via.placeholder.com/600x400?text=Property+Image'}
                        alt={listing.title}
                        className="listing-image"
                      />
                      <button 
                        className={`favorite-button ${favorites.includes(listing.id) ? 'active' : ''}`}
                        onClick={() => toggleFavorite(listing.id)}
                      >
                        {favorites.includes(listing.id) ? <FaHeart /> : <FaRegHeart />}
                      </button>
                      {hoveredCard === listing.id && (
                        <div className="quick-view">
                          <Button 
                            variant="primary" 
                            size="sm" 
                            as={Link} 
                            to={`/DescriptionPage/${listing.id}`}
                          >
                            Quick View <IoIosArrowForward />
                          </Button>
                        </div>
                      )}
                    </div>
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h5 className="mb-0" style={{ color: '#2c3e50' }}>{listing.title}</h5>
                        <div className="rating">
                          <FaStar className="me-1" /> {listing.rating || '4.8'}
                        </div>
                      </div>
                      <p className="text-muted mb-3">
                        <FaMapMarkerAlt className="me-1" /> {listing.location}
                      </p>
                      
                      <div className="d-flex flex-wrap mb-3">
                        <span className="amenity-badge">
                          <FaBed className="me-1" /> {listing.bedrooms || '2'} beds
                        </span>
                        <span className="amenity-badge">
                          <FaBath className="me-1" /> {listing.bathrooms || '1'} bath
                        </span>
                        <span className="amenity-badge">
                          <FaRulerCombined className="me-1" /> {listing.area || '850'} sqft
                        </span>
                      </div>
                      
                      <div className="d-flex justify-content-between align-items-center mt-auto">
                        <div>
                          <span className="price">${listing.price}</span>
                          <span className="per-night"> / night</span>
                        </div>
                        <Badge pill bg={listing.available ? 'success' : 'danger'}>
                          {listing.available ? 'Available' : 'Booked'}
                        </Badge>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            {filteredListings.length > listingsPerPage && (
              <div className="d-flex justify-content-center mt-5">
                <Pagination>
                  <Pagination.Prev 
                    onClick={() => paginate(Math.max(1, currentPage - 1))} 
                    disabled={currentPage === 1}
                  />
                  {Array.from(
                    { length: Math.ceil(filteredListings.length / listingsPerPage) },
                    (_, i) => (
                      <Pagination.Item
                        key={i + 1}
                        active={i + 1 === currentPage}
                        onClick={() => paginate(i + 1)}
                      >
                        {i + 1}
                      </Pagination.Item>
                    )
                  )}
                  <Pagination.Next 
                    onClick={() => paginate(Math.min(Math.ceil(filteredListings.length / listingsPerPage), currentPage + 1))} 
                    disabled={currentPage === Math.ceil(filteredListings.length / listingsPerPage)}
                  />
                </Pagination>
              </div>
            )}
          </>
        )}
      </Container>

      {/* Authentication Modal */}
      <Modal show={showAuthModal} onHide={() => setShowAuthModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Sign In Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You need to be signed in to save favorites. Please log in or create an account.</p>
          <div className="d-flex gap-3 justify-content-center mt-4">
            <Button variant="primary" as={Link} to="/login" onClick={() => setShowAuthModal(false)}>
              Login
            </Button>
            <Button variant="outline-primary" as={Link} to="/register" onClick={() => setShowAuthModal(false)}>
              Register
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Listings;