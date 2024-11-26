// src/Listings.js
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { FaMapMarkerAlt } from 'react-icons/fa';
import ListingsDataService from './services/ListingsDataService';
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import CategoryButtons from './ButtonGroup';
import { Form, Pagination, Badge } from 'react-bootstrap';

function Listings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedType, setSelectedType] = useState('');
  const listingsPerPage = 8;

  useEffect(() => {
    getListings();
  }, []);

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

  return (
    <Container
      style={{
        maxWidth: '1400px',
        margin: 'auto',
        padding: '40px',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: '15px',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(8px)',
        position: 'relative',
        zIndex: '2',
      }}
    >
      <style>{`
        body {
          background-image: url('https://cdn.pixabay.com/photo/2020/06/27/16/40/apartment-5346460_1280.jpg');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          font-family: 'Arial', sans-serif;
          margin: 0;
          padding: 0;
        }

        .page-title {
          text-align: center;
          color: #333;
          margin-bottom: 30px;
          font-size: 2.5rem;
          font-weight: bold;
        }

        .search-form {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }

        .search-bar {
          max-width: 500px;
          width: 100%;
          padding: 12px;
          font-size: 1rem;
          border-radius: 25px;
          border: 2px solid #007bff;
          background-color: #f8f9fa;
        }

        .search-bar:focus {
          outline: none;
          border-color: #0056b3;
        }

        .listing-card {
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          height: 100%;
        }

        .listing-card:hover {
          transform: scale(1.03);
          box-shadow: 0 6px 30px rgba(0, 0, 0, 0.2);
        }

        .listing-image {
          height: 200px;
          object-fit: cover;
        }

        .listing-card-body {
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .listing-title {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 10px;
          color: #333;
        }

        .badge-available {
          background-color: #28a745;
          color: white;
          padding: 5px 10px;
          border-radius: 20px;
        }

        .badge-unavailable {
          background-color: #dc3545;
          color: white;
          padding: 5px 10px;
          border-radius: 20px;
        }

        .price-label {
          color: #007bff;
          font-weight: bold;
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

      <h2 className="page-title">Available Listings</h2>

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
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {currentListings.map((listing) => (
              <Col key={listing.id}>
                <Card className="listing-card">
                  <Card.Img
                    variant="top"
                    src={listing.image || 'https://via.placeholder.com/300'}
                    alt={listing.title}
                    className="listing-image"
                  />
                  <Card.Body className="listing-card-body">
                    <Card.Title className="listing-title">{listing.title}</Card.Title>
                    <Card.Text>
                      <strong className="price-label">Price:</strong> ${listing.price}
                      <div className="location mt-2">
                        <FaMapMarkerAlt />
                        <span className="ms-2">{listing.location}</span>
                      </div>
                      <div className="mt-2">
                        <Badge
                          className={
                            listing.available ? 'badge-available' : 'badge-unavailable'
                          }
                        >
                          {listing.available ? 'Available' : 'Unavailable'}
                        </Badge>
                      </div>
                    </Card.Text>
                    <div className="mt-3 d-flex justify-content-between align-items-center">
                      <Link to={`/DescriptionPage/${listing.id}`}>
                        <Button className="view-details-btn">View Details</Button>
                      </Link>
                      <small className="text-muted">
                        Last updated: {listing.lastUpdated || 'N/A'}
                      </small>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Pagination */}
          <Pagination className="pagination">
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
          </Pagination>
        </>
      )}
    </Container>
  );
}

export default Listings;
