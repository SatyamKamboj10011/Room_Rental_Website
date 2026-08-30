// src/Listings.js
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { FaMapMarkerAlt } from 'react-icons/fa';
import ListingsDataService from '../services/ListingsDataService';
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import CategoryButtons from '../ButtonGroup'; // Assuming CategoryButtons is a reusable component
import { Form, Pagination } from 'react-bootstrap';
import { getFallbackImage } from '../utils/fallbackImage';


function Guestlistings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedType, setSelectedType] = useState(''); // Track selected type
  const listingsPerPage = 8;

  useEffect(() => {
    getListings();
  }, []);

  const getListings = async () => {
    setLoading(true);
    try {
      const data = await ListingsDataService.getAllListings();
      if (!data || data.length === 0) {
        console.log('No listings found');
        setListings([]);
        return;
      }
      setListings(data);
    } catch (error) {
      console.error("Error fetching listings: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleCategoryClick = (Type) => {
    setSelectedType(Type); // Set selected type when a category is clicked
    setCurrentPage(1); // Reset to first page when changing category
  };

  const filteredListings = listings.filter(listing =>
    listing.available !== false &&
    listing.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedType
      ? (listing.Type || listing.roomType || '').toLowerCase() === selectedType.toLowerCase()
      : true)
  );

  const indexOfLastListing = currentPage * listingsPerPage;
  const indexOfFirstListing = indexOfLastListing - listingsPerPage;
  const currentListings = filteredListings.slice(indexOfFirstListing, indexOfLastListing);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={{ background: '#F6F9FF', minHeight: '100vh', padding: '2rem 0' }}>
    <Container
      style={{
        maxWidth: '1400px',
        margin: 'auto',
        padding: '40px',
        backgroundColor: '#ffffff',
        borderRadius: '14px',
        boxShadow: '0 8px 30px rgba(61, 97, 221, 0.08)',
        position: 'relative',
        zIndex: '2',
      }}
    >
      <style>{`
        .page-title {
          text-align: center;
          color: #111827;
          margin-bottom: 40px;
          font-size: 2.5rem;
          font-weight: bold;
        }

        .search-form {
          display: flex;
          justify-content: center;
          margin-bottom: 30px;
        }

        .search-bar {
          max-width: 500px;
          width: 100%;
          padding: 12px;
          font-size: 1rem;
          border-radius: 25px;
          border: 2px solid #3D61DD;
          background-color: #f8f9fa;
        }

        .search-bar:focus {
          outline: none;
          border-color: #849BE5;
        }

        /* Ensuring all cards are the same height */
        .listing-card {
          border-radius: 12px;
          box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          transition: transform 0.3s, box-shadow 0.3s;
          height: 100%;
        }

        .listing-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 25px rgba(0, 0, 0, 0.2);
        }

        .listing-image {
          height: 220px;
          object-fit: cover;
          border-top-left-radius: 12px;
          border-top-right-radius: 12px;
        }

        .listing-card-body {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          padding: 20px;
        }

        .listing-title {
          font-size: 1.5rem;
          font-weight: bold;
          color: #333;
          margin-bottom: 15px;
        }

        .price-label {
          color: #3D61DD;
          font-weight: bold;
        }

        .location {
          display: flex;
          align-items: center;
          color: #555;
          margin-top: 10px;
        }

        .location svg {
          margin-right: 5px;
          color: #3D61DD;
        }

        .description {
          color: #777;
          font-size: 0.9rem;
          line-height: 1.6;
        }

        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 10px;
        }

        .view-details-btn {
          background-color: #3D61DD;
          border-color: #3D61DD;
          padding: 10px 20px;
          font-size: 1rem;
          border-radius: 5px;
          transition: background-color 0.3s, transform 0.3s;
        }

        .view-details-btn:hover {
          background-color: #849BE5;
          transform: scale(1.05);
        }

        .pagination {
          display: flex;
          justify-content: center;
          margin-top: 20px;
        }

        .pagination-item {
          font-size: 1.2rem;
        }
      `}</style>

      <h2 className="page-title">
        Available Listings
      </h2>

      {/* Category Buttons */}
      <CategoryButtons onCategoryClick={handleCategoryClick} /> 

      {/* Search Bar */}
      <Form className="search-form">
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Search listings..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-bar"
          />
        </Form.Group>
      </Form>

      {loading ? (
        <Spinner animation="border" style={{ display: 'block', margin: 'auto' }} />
      ) : (
        <>
          <Row xs={1} sm={2} md={2} lg={3} className="g-4">
            {currentListings.map((listing) => (
              <Col key={listing.id}>
                <Card className="listing-card">
                  <Card.Img
                    variant="top"
                    src={listing.image || listing.images?.[0] || getFallbackImage(listing.id)}
                    alt={listing.title}
                    className="listing-image"
                  />
                  <Card.Body className="listing-card-body">
                    <Card.Title className="listing-title">
                      {listing.title}
                    </Card.Title>
                    <Card.Text>
                      <strong className="price-label">Price:</strong> ${listing.price}
                      <div className="location">
                        <FaMapMarkerAlt />
                        <span>{listing.location}</span>
                      </div>
                      <p className="description">
                        {(listing.description || '').length > 100
                          ? `${listing.description.substring(0, 97)}...`
                          : listing.description || 'No description available.'}
                      </p>
                    </Card.Text>
                    <div className="card-footer">
                      <span style={{ color: listing.available !== false ? 'green' : 'red', fontWeight: 600 }}>
                        {listing.available !== false ? 'Available' : 'Unavailable'}
                      </span>
                      <Button
                        as={Link}
                        to={`/DescriptionPage/${listing.id}`}
                        className="view-details-btn"
                      >
                        View Details
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <Pagination className="pagination">
            {Array.from({ length: Math.ceil(filteredListings.length / listingsPerPage) }, (_, i) => (
              <Pagination.Item
                key={i + 1}
                active={i + 1 === currentPage}
                onClick={() => paginate(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </>
      )}
    </Container>
    </div>
  );
}

export default Guestlistings;
