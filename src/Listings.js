import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import {FaMapMarkerAlt } from 'react-icons/fa';
import ListingsDataService from './services/ListingsDataService';
import { Link } from 'react-router-dom';

function Listings() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    getListings();
  }, []);

  const getListings = async () => {
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
    }
  };

  return (
    <div className="listings-container">
      <style>{`
        .listings-container {
          max-width: 1200px;
          margin: auto;
          padding: 20px;
          background-color: #f4f7fa; /* Light grey background */
          font-family: Arial, sans-serif;
        }
        h2 {
          text-align: center;
          color: #333;
          margin-bottom: 30px;
        }
        .listing-card {
          border-radius: 10px;
          margin: 10px 0;
          transition: box-shadow 0.3s;
          background-color: #fff; /* White background for cards */
          height: 100%; /* Ensures cards take up equal height */
        }
        .listing-card:hover {
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2); /* Shadow on hover */
        }
        .listing-image {
          height: 200px;
          object-fit: cover;
        }
        .listing-title {
          font-size: 1.5rem;
          font-weight: bold;
          color: #333;
        }
        .feature {
          display: flex;
          align-items: center;
          margin: 5px 0;
          color: #555; /* Darker text for features */
        }
        .feature-icon {
          margin-right: 5px;
          color: #007bff; /* Blue color for icons */
        }
        .listing-description {
          color: #666; /* Lighter description color */
        }
        .card-body {
          display: flex;
          flex-direction: column; /* Align content vertically */
          justify-content: space-between; /* Space between elements */
          height: 100%; /* Fill the card body */
        }
      `}</style>
      <h2>Available Listings</h2>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {listings.map((listing) => (
          <Col key={listing.id}>
            <Card className="listing-card">
              <Card.Img
                variant="top"
                src={listing.image || "https://via.placeholder.com/300"}
                alt={listing.title}
                className="listing-image"
              />
              <Card.Body className="card-body">
                <Card.Title className="listing-title">{listing.title}</Card.Title>
                <Card.Text>
                  <strong>Price:</strong> ${listing.price}<br />
                  <div className="feature">
                    <FaMapMarkerAlt className="feature-icon" />
                    <span>{listing.location}</span>
                  </div>
                  <p className="listing-description">
                    {listing.description.length > 100 ? `${listing.description.substring(0, 97)}...` : listing.description}
                  </p>
                </Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                  {/* Direct Link for Navigation */}
                  <Link to={`/DescriptionPage/${listing.id}`}>
                    <Button variant="primary">View Details</Button>
                  </Link>
                  <small className="text-muted">Last updated: {listing.lastUpdated || "N/A"}</small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Listings;
