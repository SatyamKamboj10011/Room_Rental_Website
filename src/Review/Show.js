import React, { useEffect, useState } from "react";
import {  useParams, useNavigate } from 'react-router-dom';
import { FaCommentDots, FaCalendarAlt, FaUser } from "react-icons/fa";
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
    <div
    style={{
      minHeight: "100vh",
      background: 'url(https://i.pinimg.com/originals/77/6a/d8/776ad81e48f5fdab91d0436af12f02c4.gif)',
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
  <div  style={{
          width: "100%",
          maxWidth: "600px",
          background: 'rgba(255, 255, 255, 0.85)',
          borderRadius: "12px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
          padding: "2rem",
          textAlign: "center",
        }}>
      <h3 style={{
            fontWeight: "bold",
            color: "#007bff",
          }}>Feedback Details</h3>
      {feedback ? (
          <div
          style={{
            background: "#f9f9f9",
            borderRadius: "8px",
            padding: "1.5rem",
            textAlign: "left",
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
            marginBottom: "1.5rem",
          }}
        >
        <dl>
          <dt><FaCommentDots style={{ marginRight: "10px", color: "#007bff" }} />Feedback:</dt>
             <dd>{feedback.feedback}</dd>
         
          <dt> <FaCalendarAlt style={{ marginRight: "10px", color: "#007bff" }} />Date:</dt>
             <dd>{feedback.date}</dd>
         
          <dt> <FaUser style={{ marginRight: "10px", color: "#007bff" }} />Name:</dt>
             <dd>{feedback.name}</dd>
        </dl>
      </div>
      ) : (
        <p>No feedback found.</p>
      )}
      <button onClick={handleDelete} className="btn btn-outline-danger">Delete Feedback</button>
      
    </div>
  </div>
  );
}

export default Show;
