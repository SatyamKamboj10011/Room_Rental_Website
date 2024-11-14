import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import FBDataService from '../services/fbServices';
 
function CreateReviewPage() {
  const [feedback, setFeedback] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();
 
  const handleSubmit = async (event) => {
    event.preventDefault();
 
    const newReview = {
      feedback,
      name,
      date: date || new Date().toLocaleDateString(),
    };
 
    try {
      const docRef = await FBDataService.adddata(newReview);
      console.log("Document written with ID: ", docRef.id);
      navigate(-1);
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };
 
 
  return (
    <div style={containerStyle}>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="feedback">
          <Form.Label>Feedback</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="date">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit Review
        </Button>
      </Form>
    </div>
  );
}
 
const containerStyle = {
  padding: '2rem',
  background: '#fff',
  borderRadius: '10px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
};
 
export default CreateReviewPage;