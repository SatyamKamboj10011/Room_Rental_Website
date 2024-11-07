import React, { useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate

function CarouselHomePage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    setLoading(true);
    // Simulate loading (remove this after you implement actual loading logic)
    setTimeout(() => {
      navigate(path);
      setLoading(false); // Reset loading state after navigating
    }, 1000); // Simulating a 1 second loading time
  };

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <div className="row text-light text-center">
        {/* Left Column for Search Section */}
        <div
          className="col-md-6 bg-primary d-flex flex-column justify-content-center align-items-center"
          style={{ borderRadius: '10px', padding: '40px', marginBottom: '20px' }}
        >
          <h2 className="fw-bold mb-4" style={{ fontSize: '2.5rem' }}>
            Unlock the Door to Your Perfect Space
          </h2>
          <p className="mb-4" style={{ fontSize: '1.2rem' }}>
            Your Next Room is Waiting – Start Searching Today
          </p>
          <Card style={{ width: '100%', borderRadius: '10px', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1" style={{ backgroundColor: '#007bff', color: '#fff' }}>🗺️</InputGroup.Text>
              <Form.Control
                placeholder="Location"
                aria-label="Location"
                aria-describedby="basic-addon2"
                style={{ borderRadius: '10px' }}
              />
              <FloatingLabel controlId="floatingSelectGrid" label="💵" style={{ flex: 1 }}>
                <Form.Select aria-label="Floating label select example" style={{ borderRadius: '10px' }}>
                  <option>Price Range</option>
                  <option value="1">$200-$400</option>
                  <option value="2">$400-$600</option>
                  <option value="3">$600-$1000</option>
                  <option value="4">$1000-Above</option>
                </Form.Select>
              </FloatingLabel>
              <Button variant="primary" className="ms-2" style={{ borderRadius: '10px' }}>
                Search ➡️
              </Button>
            </InputGroup>
          </Card>
        </div>

        {/* Right Column for Carousel */}
        <div className="col-md-6">
          <Carousel fade style={{ borderRadius: '10px' }}>
            <Carousel.Item>
              <img
                src="https://media.karousell.com/media/photos/products/2022/5/18/rent_big_common_room_bishan_st_1652846989_cb2bc9f3.jpg"
                alt="First slide"
                className="d-block w-100"
                style={{ height: '512px', objectFit: 'cover', borderRadius: '10px' }}
              />
              <Carousel.Caption>
                <h3 style={{ fontSize: '2rem' }}>Find Your Dream Home</h3>
                <p>Explore the best spaces available for rent.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                src="https://i.pinimg.com/originals/3d/0f/86/3d0f862d1f7d07f1005e615e0d934b83.png"
                alt="Second slide"
                className="d-block w-100"
                style={{ height: '512px', objectFit: 'cover', borderRadius: '10px' }}
              />
              <Carousel.Caption>
                <h3 style={{ fontSize: '2rem' }}>Affordable Prices</h3>
                <p>Discover listings that fit your budget.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                src="https://www.offcampuspads.com/wp-content/uploads/2018/10/rooms-for-rent-south-boston.jpg"
                alt="Third slide"
                className="d-block w-100"
                style={{ height: '512px', objectFit: 'cover', borderRadius: '10px' }}
              />
              <Carousel.Caption>
                <h3 style={{ fontSize: '2rem' }}>Convenient Locations</h3>
                <p>Find spaces near you with easy access to amenities.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>

      {/* Additional Elements Section */}
      <div className="row mt-5">
        <div className="col-12 text-center">
          <h2 className="mb-4">Featured Listings</h2>
          <p className="mb-5" style={{ fontSize: '1.2rem' }}>Explore some of our best offers below:</p>
        </div>
        {/* Featured Listings Cards */}
        <div className="col-md-4 mb-4">
          <Card style={{ borderRadius: '10px' }}>
            <Card.Img variant="top" src="https://example.com/listing1.jpg" style={{ height: '200px', objectFit: 'cover', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }} />
            <Card.Body>
              <Card.Title>Cozy Apartment in City Center</Card.Title>
              <Card.Text>
                $1,200/month<br />
                2 Beds • 1 Bath
              </Card.Text>
              <Button variant="primary" style={{ borderRadius: '10px' }} onClick={() => handleNavigation('/listings')}>
                View Details
              </Button>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-4 mb-4">
          <Card style={{ borderRadius: '10px' }}>
            <Card.Img variant="top" src="https://example.com/listing2.jpg" style={{ height: '200px', objectFit: 'cover', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }} />
            <Card.Body>
              <Card.Title>Modern Studio Apartment</Card.Title>
              <Card.Text>
                $800/month<br />
                1 Bed • 1 Bath
              </Card.Text>
              <Button variant="primary" style={{ borderRadius: '10px' }} onClick={() => handleNavigation('/listings')}>
                View Details
              </Button>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-4 mb-4">
          <Card style={{ borderRadius: '10px' }}>
            <Card.Img variant="top" src="https://example.com/listing3.jpg" style={{ height: '200px', objectFit: 'cover', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }} />
            <Card.Body>
              <Card.Title>Luxury Condo with Ocean View</Card.Title>
              <Card.Text>
                $2,500/month<br />
                3 Beds • 2 Baths
              </Card.Text>
              <Button variant="primary" style={{ borderRadius: '10px' }} onClick={() => handleNavigation('/listings')}>
                View Details
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <Spinner animation="grow" variant="primary" />
      <Spinner animation="grow" variant="secondary" />
      <Spinner animation="grow" variant="success" />
      <Spinner animation="grow" variant="danger" />
      <Spinner animation="grow" variant="warning" />
      <Spinner animation="grow" variant="info" />
      <Spinner animation="grow" variant="light" />
      <Spinner animation="grow" variant="dark" />
        </div>
      )}
    </div>
  );
}

export default CarouselHomePage;
