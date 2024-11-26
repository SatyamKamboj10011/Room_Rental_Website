import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import FBDataService from '../services/fbServices';

function CreateReviewPage() {
  const [feedback, setFeedback] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newReview = {
      feedback,
      name,
      date: date || new Date().toLocaleDateString(),
      listingId: id, // Add listingId to associate feedback with the current listing
    };

    try {
      const docRef = await FBDataService.adddata(newReview);
      console.log('Document written with ID: ', docRef.id);
      navigate(-1);
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  return (
    <div
    style={{
      maxWidth: '600px',
      margin: '3rem auto',
      padding: '2rem',
      background: isHovered ? '#f0f8ff' : '#f9f9f9', 
      borderRadius: '12px',
      boxShadow: isHovered
        ? '0 12px 25px rgba(0, 0, 0, 0.3)' 
        : '0 8px 20px rgba(0, 0, 0, 0.15)',
      transition: '0.3s ease-in-out',
    }}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    >
      <h2
        style={{
          textAlign: 'center',
          marginBottom: '1.5rem',
          color: '#333',
          fontWeight: 'bold',
        }}
      >
        Add Your Review
      </h2>
      <Form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Form.Group
          controlId="feedback"
          style={{
            marginBottom: '1.5rem',
          }}
        >
          <Form.Label
            style={{
              marginBottom: '0.5rem',
              fontWeight: '500',
              color: '#555',
            }}
          >
            Feedback
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Write your feedback here..."
            style={{
              borderRadius: '8px',
              border: '1px solid #ccc',
              padding: '10px',
              fontSize: '14px',
            }}
            required
          />
        </Form.Group>
        <Form.Group
          controlId="name"
          style={{
            marginBottom: '1.5rem',
          }}
        >
          <Form.Label
            style={{
              marginBottom: '0.5rem',
              fontWeight: '500',
              color: '#555',
            }}
          >
            Name
          </Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            style={{
              borderRadius: '8px',
              border: '1px solid #ccc',
              padding: '10px',
              fontSize: '14px',
            }}
            required
          />
        </Form.Group>
        <Form.Group
          controlId="date"
          style={{
            marginBottom: '1.5rem',
          }}
        >
          <Form.Label
            style={{
              marginBottom: '0.5rem',
              fontWeight: '500',
              color: '#555',
            }}
          >
            Date
          </Form.Label>
          <Form.Control
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{
              borderRadius: '8px',
              border: '1px solid #ccc',
              padding: '10px',
              fontSize: '14px',
            }}
          />
        </Form.Group>
        <div
          style={{
            textAlign: 'center',
          }}
        >
          <Button
            type="submit"
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#fff',
              borderRadius: '8px',
            }}
            >
            Submit Review
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CreateReviewPage;
