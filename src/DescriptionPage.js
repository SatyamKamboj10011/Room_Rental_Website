import React, { useEffect, useState } from 'react';
import { Col, Container, Image, Row, Button, Card, ListGroup, Badge, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ListingsDataService from './services/ListingsDataService';
import { FaStar, FaMapMarkerAlt } from 'react-icons/fa';
import Spinner from 'react-bootstrap/Spinner';
import FBDataService from './services/fbServices';
import { Carousel } from 'react-bootstrap'; // Importing the Carousel component

function DescriptionPage() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
 
  useEffect(() => {
    getListingById(id);
    getFeedbackData(id);
  }, [id]);

  const getFeedbackData = async () => {
    try {
      const feedbackData = await FBDataService.getAllData();
      if (!feedbackData || feedbackData.length === 0) {
        setFeedback([]); // No feedback found
        return;
      }
      const feedbackList = feedbackData.map(doc => ({ ...doc, id: doc.id }));
      setFeedback(feedbackList);
    } catch (error) {
      console.error("Error fetching feedback data:", error);
    }
  };

  const getListingById = async (listingId) => {
    try {
      const data = await ListingsDataService.getListingById(listingId);
      if (!data) {
        setListing(null);
        navigate('/listings');
        return;
      }
      setListing(data);
    } catch (error) {
      setListing(null);
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = () => {
    navigate(`/booking/${listing.id}`);
  };

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" variant="info" />
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="text-center">
        <p>Listing not found.</p>
        <Link to="/listings" className="btn btn-outline-danger">Go back to listings</Link>
      </div>
    );
  }

  return (
    <Container style={containerStyle}>
      {/* Title and Price */}
      <Row className="mb-4 text-center">
        <Col>
          <h1 style={titleStyle}>{listing.title}</h1>
          <p style={priceStyle}>Price: <span style={{ color: '#f39c12' }}>${listing.price}</span> / night</p>
          <div style={ratingContainerStyle}>
            <Badge bg="warning" style={badgeStyle}>
              {listing.rating} <FaStar />
            </Badge>
            <span>{listing.reviewCount} reviews</span>
          </div>
        </Col>
      </Row>

      {/* Carousel for Images */}
      <Row className="mb-5">
        <Col md={8} className="d-flex justify-content-center">
          <Carousel fade>
            <Carousel.Item>
              <Image
                src={listing.image}
                alt="Room Main"
                style={carouselImageStyle}
                fluid
                rounded
              />
            </Carousel.Item>
            <Carousel.Item>
              <Image
                src={listing.image2}
                alt="Room Thumbnail 1"
                style={carouselImageStyle}
                fluid
                rounded
              />
            </Carousel.Item>
            <Carousel.Item>
              <Image
                src={listing.image3}
                alt="Room Thumbnail 2"
                style={carouselImageStyle}
                fluid
                rounded
              />
            </Carousel.Item>
          </Carousel>
        </Col>
        <Col md={4}>
          <Card className="mb-3" style={{ background: '#f4f4f9', borderRadius: '10px' }}>
            <Card.Header className="text-center" style={cardHeaderStyle}>More Information</Card.Header>
            <Card.Body>
              <Image
                src={listing.image2}
                alt="Room Thumbnail 1"
                style={thumbnailImageStyle}
                thumbnail
                className="img-fluid mb-3"
              />
              <Image
                src={listing.image3}
                alt="Room Thumbnail 2"
                style={thumbnailImageStyle}
                thumbnail
                className="img-fluid"
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Room Description and Nearby Attractions */}
      <Row className="mb-4">
        <Col md={8}>
          <h3 style={sectionTitleStyle}>Room Description</h3>
          <p style={descriptionTextStyle}>{listing.description}</p>
        </Col>
        <Col md={4}>
          <h3 style={sectionTitleStyle}>Nearby Attractions</h3>
          <Card style={attractionCardStyle}>
            <Card.Body>
              <ListGroup>
                {listing.attractions && listing.attractions.map((attraction, index) => (
                  <ListGroup.Item key={index} style={attractionItemStyle}>
                    <FaMapMarkerAlt /> {attraction}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Reviews Section */}
      <Row className="mb-4">
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">Feedback</h3>
            </div>
            <div className="panel-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Feedback</th>
                    <th>Name</th>
                  </tr>
                </thead>
                <tbody>
                  {feedback.length > 0 ? (
                    feedback.map((fb) => (
                      <tr key={fb.id}>
                        <td>{fb.date}</td>
                        <td>{fb.feedback}</td>
                        <td>{fb.name}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3">No feedback available yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Add Review Button */}
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>Add your review for this listing</Tooltip>}
        >
          <Button
            style={addReviewButtonStyle}
            variant="info"
          >
            <Link to={`/feedback`} style={{ color: 'white', textDecoration: 'none' }}>
              Add Review
            </Link>
          </Button>
        </OverlayTrigger>
      </Row>

      {/* Action Buttons */}
      <Row>
        <Col className="d-flex justify-content-between">
          <Link to={`/listings`} className="btn btn-outline-danger">Back to Listings</Link>
          <Button variant="success" size="lg" onClick={handleBookNow}>Book Now</Button>
        </Col>
      </Row>
    </Container>
  );
}

// Inline styles for the page
const containerStyle = {
  background: '#fff',
  padding: '2rem',
  borderRadius: '10px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
};

const titleStyle = {
  fontSize: '2.5rem',
  fontWeight: 'bold',
  color: '#2c3e50',
};

const priceStyle = {
  fontSize: '1.5rem',
  color: '#e67e22',
};

const ratingContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '10px 0',
};

const badgeStyle = {
  marginRight: '10px',
};

const carouselImageStyle = {
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const thumbnailImageStyle = {
  width: '100%',
  borderRadius: '10px',
};

const cardHeaderStyle = {
  backgroundColor: '#ecf0f1',
  fontWeight: 'bold',
};

const sectionTitleStyle = {
  fontSize: '1.8rem',
  color: '#34495e',
  marginBottom: '1rem',
};

const descriptionTextStyle = {
  fontSize: '1.1rem',
  color: '#555',
  lineHeight: '1.6',
};

const attractionCardStyle = {
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const attractionItemStyle = {
  backgroundColor: '#f9f9f9',
  color: '#333',
  padding: '10px',
  borderRadius: '5px',
  marginBottom: '0.5rem',
};

const addReviewButtonStyle = {
  width: '150px',
  height: '45px',
  borderRadius: '10px',
  marginTop: '20px',
  backgroundColor: '#007bff',
  border: 'none',
};

export default DescriptionPage;
