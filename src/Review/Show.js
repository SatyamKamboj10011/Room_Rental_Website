import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';
import FBDataService from '../services/fbServices';

function Show() {
  const [feedback, setFeedback] = useState({});
  const { listingId, feedbackId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getFeedback();
  }, [listingId, feedbackId]);

  const getFeedback = async () => {
    try {
      const docSnap = await FBDataService.getFeedbackById(listingId, feedbackId);
      if (docSnap.exists()) {
        setFeedback(docSnap.data());
      } else {
        console.log("No such feedback!");
      }
    } catch (err) {
      console.error("Error fetching feedback:", err);
    }
  };

  const deleteFeedback = async () => {
    await FBDataService.deleteFeedback(listingId, feedbackId);
    navigate(`/listings/${listingId}`);
  };

  return (
    <div>
      <h3>Feedback Details</h3>
      {feedback ? (
        <dl>
          <dt>date</dt>
          <dd>{feedback.date}</dd>
          <dt>feedback</dt>
          <dd>{feedback.feedback}</dd>
          <dt>Name</dt>
          <dd>{feedback.name}</dd>
        </dl>
      ) : (
        <p>No feedback found.</p>
      )}
      <button onClick={deleteFeedback}>Delete Feedback</button>
    </div>
  );
}

export default Show;
