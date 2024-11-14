// src/components/HostDashboard.js

import React, { useEffect, useState } from "react";
import FBDataService from './services/fbServices'; // Firebase service file
import { useUserAuth } from './context/UserAuthContext'; // Import context for user auth

function HostDashboard() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUserAuth(); // Get current user

  useEffect(() => {
    const fetchListings = async () => {
      if (user && user.uid) {
        try {
          const listingsData = await FBDataService.getHostListings(user.uid); // Pass user.uid as hostId
          setListings(listingsData);
        } catch (error) {
          console.error("Error fetching listings:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchListings();
  }, [user]);

  const deleteListing = async (listingId) => {
    try {
      await FBDataService.deleteListing(listingId);
      setListings(listings.filter(listing => listing.id !== listingId));
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };

  if (loading) return <p>Loading Host Dashboard...</p>;

  return (
    <div>
      <h2>Host Dashboard</h2>
      <div>
        <h3>Your Listings</h3>
        {listings.length > 0 ? (
          listings.map(listing => (
            <div key={listing.id} className="listing-item">
              <h4>{listing.title}</h4>
              <p>{listing.description}</p>
              <button onClick={() => deleteListing(listing.id)}>Delete Listing</button>
            </div>
          ))
        ) : (
          <p>No listings available.</p>
        )}
      </div>
      {/* Additional sections for the host can be added here */}
    </div>
  );
}

export default HostDashboard;
