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
import Form from 'react-bootstrap/Form';
import Pagination from 'react-bootstrap/Pagination';
import CategoryButtons from './ButtonGroup'; // Import the CategoryButtons

function Listings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
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

  const filteredListings = listings.filter(listing =>
    listing.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastListing = currentPage * listingsPerPage;
  const indexOfFirstListing = indexOfLastListing - listingsPerPage;
  const currentListings = filteredListings.slice(indexOfFirstListing, indexOfLastListing);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container
      style={{
        maxWidth: '1400px',
        margin: 'auto',
        padding: '40px',
        backgroundColor: '#e9ecef',
        borderRadius: '10px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h2 style={{ textAlign: 'center', color: '#343a40', marginBottom: '40px', fontSize: '2.5rem' }}>
        Available Listings
      </h2>

      {/* Render the CategoryButtons at the top */}
      <CategoryButtons />

      {/* Search Bar */}
      <Form style={{ marginBottom: '20px' }}>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Search listings..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ maxWidth: '400px', margin: 'auto' }}
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
                <Card
                  className="listing-card"
                  style={{
                    borderRadius: '10px',
                    margin: '10px 0',
                    transition: 'box-shadow 0.3s',
                    backgroundColor: '#fff',
                    height: '100%',
                    boxShadow: '0 2px 15px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={listing.image || "https://via.placeholder.com/300"}
                    alt={listing.title}
                    style={{
                      height: '200px',
                      objectFit: 'cover',
                      borderTopLeftRadius: '10px',
                      borderTopRightRadius: '10px',
                    }}
                  />
                  <Card.Body
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      height: '100%',
                    }}
                  >
                    <Card.Title style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      color: '#343a40',
                    }}>
                      {listing.title}
                    </Card.Title>
                    <Card.Text>
                      <strong style={{ color: '#6c757d' }}>Price:</strong> ${listing.price}<br />
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        margin: '5px 0',
                        color: '#555',
                      }}>
                        <FaMapMarkerAlt style={{
                          marginRight: '5px',
                          color: '#007bff',
                        }} />
                        <span>{listing.location}</span>
                      </div>
                      <p style={{
                        color: '#6c757d',
                        lineHeight: '1.5',
                      }}>
                        {listing.description.length > 100 ? `${listing.description.substring(0, 97)}...` : listing.description}
                      </p>
                    </Card.Text>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                      <Link to={`/DescriptionPage/${listing.id}`}>
                        <Button variant="primary" style={{
                          backgroundColor: '#007bff',
                          borderColor: '#007bff',
                          padding: '10px 20px',
                          fontSize: '1rem',
                          borderRadius: '5px',
                          transition: 'background-color 0.3s, transform 0.3s',
                        }}>View Details</Button>
                      </Link>
                      <small className="text-muted" style={{ fontSize: '0.8rem' }}>
                        Last updated: {listing.lastUpdated || "N/A"}
                      </small>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          {/* Pagination */}
          <Pagination style={{ justifyContent: 'center', marginTop: '20px' }}>
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
  );
}

export default Listings;
