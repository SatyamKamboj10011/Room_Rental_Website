import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';
import FBDataService from '../services/fbServices';

function Show() {
  const [feedback, setFeedback] = useState(null);  // Initialize feedback to null
  const { listingId } = useParams();  // Get listingId from URL params
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Listing ID:", listingId);  // Check if listingId is correct
    getFeedback();
  }, [listingId]);

  const getFeedback = async () => {
    try {
      const docSnap = await FBDataService.getDataById(listingId);
      if (docSnap) {
        setFeedback(docSnap);
      } else {
        console.log("No such feedback found!");
      }
    } catch (err) {
      console.error("Error fetching feedback:", err);
    }
  };
  const handleDelete = async () => {
    try {
      await FBDataService.deleteFeedback(listingId); // Delete feedback by ID
      console.log('Feedback deleted');
      navigate(-1); // Navigate to listings page after deletion
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  };

  return (
    <div class="container">
      <h3>Feedback Details</h3>
      {feedback ? (
        <dl>
          <dt>Feedback</dt>
          <dd>{feedback.feedback}</dd>
          <dt>Date</dt>
          <dd>{feedback.date}</dd>
          <dt>Name</dt>
          <dd>{feedback.name}</dd>
        </dl>
      ) : (
        <p>No feedback found.</p>
      )}
      <button onClick={handleDelete} className="btn btn-outline-danger">Delete Feedback</button>
      
    </div>
  );
}

export default Show;
