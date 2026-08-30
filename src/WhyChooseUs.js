import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function HeaderAndFooterExample() {
  const features = [
    {
  
      title: 'Verified Listings',
      text: 'All our listings are verified and trusted by thousands of renters.',
    },
    {
      title: '24/7 Support',
      text: 'Our support team is available 24/7 to help you with any questions or concerns.',
    },
    {
      
      title: 'Diverse Options',
      text: 'Explore a variety of properties that suit your needs and preferences.',
    },
  ];

  return (
    <div className='container bg-light py-5'>
      <h2 className="text-center mb-4">Why Choose Us?</h2>
      <Row className="text-center">
        {features.map((feature, index) => (
          <Col xs={12} sm={6} md={4} key={index} className="mb-4">
            <Card className="h-100">
              <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                {feature.icon}
                <Card.Title className="mt-3">{feature.title}</Card.Title>
                <Card.Text>{feature.text}</Card.Text>
                <Button variant="primary" style={{ marginTop: '10px' }}>Learn More</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default HeaderAndFooterExample;
