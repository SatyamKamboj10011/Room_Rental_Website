import React, { useEffect, useState } from 'react';
import { Col, Container, Image, Row, Button, Card, ListGroup, Badge } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ListingsDataService from './services/ListingsDataService';
import { FaStar } from 'react-icons/fa';
import Spinner from 'react-bootstrap/Spinner';
import FBDataService from './services/fbServices';
 
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
      const feedbackData = await FBDataService.getAllData();  // Fetch all reviews from Firestore
      if (!feedbackData || feedbackData.length === 0) {
        console.log("No feedback found");
        setFeedback([]); // No feedback found
        return;
      }
      const feedbackList = feedbackData.map(doc => ({ ...doc, id: doc.id })); // Ensure the data has the ID
      setFeedback(feedbackList);  // Update the state with the fetched feedback
    } catch (error) {
      console.error("Error fetching feedback data:", error); // Catch any errors during data fetching
    }
  };
  const getListingById = async (listingId) => {
    try {
      const data = await ListingsDataService.getListingById(listingId);
      if (!data) {
        console.log('Listing not found');
        setListing(null);
        navigate('/listings');
        return;
      }
      setListing(data);
    } catch (error) {
      console.error('Error fetching listing:', error);
      setListing(null);
    } finally {
      setLoading(false); // Set loading to false once data is fetched
    }
  };
 
  const handleBookNow = () => {
    console.log(listing.id);
    navigate(`/booking/${listing.id}`); // Passing the listing ID
  };
 
  if (loading) {
    // Show loading spinner while fetching data
    return (
      <div className="text-center">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }
 
  if (!listing) {
    // Show an error message if no listing is found
    return (
      <div className="text-center">
        <p>Listing not found.</p>
        <Link to="/listings">Go back to listings</Link>
      </div>
    );
  }
 
  return (
    <Container style={containerStyle}>
      {/* Title and Price */}
      <Row className="mb-4 text-center">
        <Col>
          <h1 style={titleStyle}>{listing.title}</h1>
          <p style={priceStyle}>Price: ${listing.price} / night</p>
          <div style={ratingContainerStyle}>
            <Badge bg="success" style={badgeStyle}>
              {listing.rating} <FaStar />
            </Badge>
            <span>{listing.reviewCount} reviews</span>
          </div>
        </Col>
      </Row>
 
      {/* Main Image */}
      <Row className="mb-5">
        <Col md={8} className="d-flex justify-content-center">
          <Image
            src={listing.image}
            alt="Room Main"
            style={mainImageStyle}
            fluid
            rounded
          />
        </Col>
        <Col md={4}>
          <Card className="mb-3">
            <Card.Header style={cardHeaderStyle} className="text-center">More Images</Card.Header>
            <Card.Body>
              <Image
                src={listing.image2}
                alt="Room Thumbnail 1"
                style={thumbnailImageStyle}
                thumbnail
              />
              <Image
                src={listing.image3}
                alt="Room Thumbnail 2"
                style={thumbnailImageStyle}
                thumbnail
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
          <Card>
            <Card.Body>
              <ListGroup>
                {listing.attractions && listing.attractions.map((attraction, index) => (
                  <ListGroup.Item key={index} style={attractionItemStyle}>
                    {attraction}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
 
        {/* Reviews Section */}
        // Reviews Section (Feedback)
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
                <tr key={fb.id}> {/* Use fb.id to ensure each row has a unique key */}
                  <td><Link to={`/show/${fb.id}`}>{fb.date}</Link>
                  </td> {/* Assuming fb.date is a string or formatted date */}
                  <td>{fb.feedback}</td> {/* Feedback message */}
                  <td>{fb.name}</td> {/* Reviewer's name */}
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
  <Button
    style={{
      width: '120px',
      height: '45px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      marginTop: '20px', // Add some margin on top
    }}
  >
    <Link to={`/feedback`} style={{ color: 'white', textDecoration: 'none' }}>
      Add Review
    </Link>
  </Button>
</Row>
 
      {/* Action Buttons */}
      <Row>
        <Col className="d-flex justify-content-between">
          <Link to={`/listings`} className="btn btn-secondary">Back to Listings</Link>
          <Button variant="primary" size="lg" onClick={handleBookNow}>Book Now</Button>
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
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Soft shadow for container
};
 
const titleStyle = {
  fontSize: '2.5rem',
  fontWeight: 'bold',
  color: '#333',
};
 
const priceStyle = {
  fontSize: '1.5rem',
  color: '#888',
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
 
const mainImageStyle = {
  maxWidth: '100%',
  height: 'auto',
  borderRadius: '10px',
  transition: 'transform 0.3s ease', // Adding transition for hover effect
};
 
const thumbnailImageStyle = {
  width: '100%',
  borderRadius: '10px',
};
 
const cardHeaderStyle = {
  backgroundColor: '#f7f7f7',
  fontWeight: 'bold',
};
 
const sectionTitleStyle = {
  fontSize: '1.8rem',
  color: '#444',
  marginBottom: '1rem',
};
 
const descriptionTextStyle = {
  fontSize: '1.1rem',
  color: '#555',
  lineHeight: '1.6',
};
 
const attractionItemStyle = {
  backgroundColor: '#f1f5f9',
  color: '#333',
  padding: '10px',
  borderRadius: '4px',
  marginBottom: '0.5rem',
};
 
const reviewCardStyle = {
  backgroundColor: '#fafafa',
  border: '1px solid #e1e1e1',
  borderRadius: '10px',
  marginBottom: '1rem',
};
 
const reviewAuthorStyle = {
  fontWeight: 'bold',
};
 
const reviewTextStyle = {
  color: '#666',
};
 
export default DescriptionPage;