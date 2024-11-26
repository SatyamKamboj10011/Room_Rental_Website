import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import FBDataService from '../services/fbServices';

function CreateReviewPage() {
  const [feedback, setFeedback] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [rating, setRating] = useState(0);
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
      height: '100vh',
      background: 'url(https://i.pinimg.com/originals/77/6a/d8/776ad81e48f5fdab91d0436af12f02c4.gif)',
      backgroundSize: 'cover',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      position: 'relative',
    }}
  >
    {/* Form Container */}
    <div
      style={{
        maxWidth: '600px',
        width: '100%',
        padding: '2rem',
        background: 'rgba(255, 255, 255, 0.85)', // Slightly transparent white
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
        textAlign: 'center',
        zIndex: 1, // Form in front of background
      }}
    >
      <h2
        style={{
          fontWeight: 'bold',
          color: '#007bff',
          marginBottom: '1.5rem',
          textTransform: 'uppercase',
          letterSpacing: '1px',
        }}
      >
        Add Your Review
      </h2>

      {/* Star Rating */}
      <div style={{ marginBottom: '1.5rem' }}>
        <p style={{ fontWeight: '500', color: '#555', marginBottom: '0.5rem' }}>Rate This Listing</p>
        <div>
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              size={24}
              style={{
                marginRight: '5px',
                cursor: 'pointer',
              }}
              color={star <= rating ? '#007bff' : '#ccc'}
              onClick={() => setRating(star)}
            />
          ))}
        </div>
      </div>

      <Form onSubmit={handleSubmit}>
        {/* Feedback Field */}
        <Form.Group controlId="feedback" style={{ marginBottom: '1.5rem' }}>
          <Form.Label
            style={{
              fontWeight: '500',
              color: '#555',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span style={{ marginRight: '10px', color: '#007bff' }}>💬</span> Feedback
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Write your feedback here..."
            style={{
              borderRadius: '8px',
              border: '1px solid #007bff',
              padding: '10px',
              fontSize: '14px',
            }}
            required
          />
        </Form.Group>

        {/* Name Field */}
        <Form.Group controlId="name" style={{ marginBottom: '1.5rem' }}>
          <Form.Label
            style={{
              fontWeight: '500',
              color: '#555',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span style={{ marginRight: '10px', color: '#007bff' }}>👤</span> Name
          </Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            style={{
              borderRadius: '8px',
              border: '1px solid #007bff',
              padding: '10px',
              fontSize: '14px',
            }}
            required
          />
        </Form.Group>

        {/* Date Field */}
        <Form.Group controlId="date" style={{ marginBottom: '1.5rem' }}>
          <Form.Label
            style={{
              fontWeight: '500',
              color: '#555',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span style={{ marginRight: '10px', color: '#007bff' }}>📅</span> Date
          </Form.Label>
          <Form.Control
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{
              borderRadius: '8px',
              border: '1px solid #007bff',
              padding: '10px',
              fontSize: '14px',
            }}
          />
        </Form.Group>

        {/* Submit Button */}
        <Button
          type="submit"
          style={{
            background: '#007bff',
            border: 'none',
            padding: '10px 20px',
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#fff',
            borderRadius: '8px',
            cursor: 'pointer',
            width: '100%',
            transition: '0.3s ease',
          }}
          onMouseEnter={(e) => (e.target.style.background = '#0056b3')}
          onMouseLeave={(e) => (e.target.style.background = '#007bff')}
        >
          Submit Review
        </Button>
      </Form>
    </div>
  </div>
  );
}

export default CreateReviewPage;
