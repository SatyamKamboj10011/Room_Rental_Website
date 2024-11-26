import { collection, getDocs, doc, getDoc, addDoc, updateDoc,deleteDoc, query, where } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';  // For handling file uploads
import { db } from '../firebase';  // Adjust the path as necessary to your Firebase config
 
const collectionName = 'listings';
const listingsCollectionRef = collection(db, collectionName);
const storage = getStorage();  // Initialize Firebase Storage
 
class ListingsDataService {
 
  // Add a new listing to Firestore
  addListing = (newListings) => {
    return addDoc(listingsCollectionRef, newListings);
  }
 
  // Update an existing listing by its ID
  updateListing = async (listingId, updatedListing) => {
    if (!listingId || !updatedListing) {
      throw new Error('Invalid listing data or listing ID');
    }

    try {
      const listingDocRef = doc(db, "listings", listingId);
      await updateDoc(listingDocRef, updatedListing);
      console.log('Listing updated successfully');
    } catch (error) {
      console.error('Error updating listing:', error);
      throw new Error('Failed to update listing');
    }
  };
 
  // Fetch all listings with error handling
  async getAllListings() {
    try {
      const data = await getDocs(listingsCollectionRef);
 
      if (data.empty) {
        console.log('No listings found');
        return [];
      }
 
      return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    } catch (error) {
      console.error("Error fetching listings: ", error);
      throw new Error("Failed to fetch listings.");
    }
  }
 
  deleteListing = async (id) => {
    try {
      const listingRef = doc(db, collectionName, id); // Reference to the specific listing
      await deleteDoc(listingRef);
      console.log(`Listing ${id} deleted successfully from Firestore.`);
    } catch (error) {
      console.error("Error deleting listing from Firestore: ", error);
      throw error;
    }
  };
  // Fetch a single listing by ID
  async getListingById(id) {
    try {
      const listingDoc = doc(db, collectionName, id);  // Create a reference to the document
      const listingSnapshot = await getDoc(listingDoc); // Fetch the document
 
      if (listingSnapshot.exists()) {
        return { id: listingSnapshot.id, ...listingSnapshot.data() }; // Return listing data along with its ID
      } else {
        console.log('Listing not found');
        return null; // Return null if no document exists
      }
    } catch (error) {
      console.error('Error fetching listing:', error);
      throw new Error("Failed to fetch listing.");
    }
  }
// Fetch all listings for the logged-in host user
async getHostListings(hostId) {
  try {
    const q = query(listingsCollectionRef, where("hostId", "==", hostId)); // Query to fetch only listings where hostId matches the logged-in user
    const data = await getDocs(q);
 
    if (data.empty) {
      console.log('No listings found for this host');
      return [];
    }
 
    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
    console.error("Error fetching listings: ", error);
    throw new Error("Failed to fetch host listings.");
  }
}

updateListingAvailability = async (listingId, newStatus) => {
  if (!listingId || newStatus === undefined) {
    throw new Error('Listing ID and new status are required');
  }

  try {
    const listingDocRef = doc(db, 'listings', listingId);
    await updateDoc(listingDocRef, { available: newStatus });
    console.log(`Listing ${listingId} availability updated to ${newStatus}`);
  } catch (error) {
    console.error('Error updating listing availability:', error);
    throw new Error('Error updating availability');
  }
};
 
  // Upload image to Firebase Storage and return its download URL
  async uploadImage(listingId, file) {
    if (!file) return null;
 
    const storageRef = ref(storage, `listings/${listingId}/${file.name}`);
   
    try {
      // Upload the image to Firebase Storage
      await uploadBytes(storageRef, file);
 
      // Get the image's download URL after uploading
      const downloadUrl = await getDownloadURL(storageRef);
      return downloadUrl;
    } catch (error) {
      console.error("Error uploading image: ", error);
      throw new Error("Failed to upload image.");
    }
  }
 
  // Update the listing with image URLs
  async updateListingImages(listingId, imageUrls) {
    const listingRef = doc(db, 'listings', listingId);
    return updateDoc(listingRef, { images: imageUrls }); // Assuming the listing has an 'images' field
  }
}
 
export default new ListingsDataService();