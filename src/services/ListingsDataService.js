import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';  // Adjust the path as necessary to your Firebase config

const collectionName = 'listings';
const listingsCollectionRef = collection(db, collectionName);

class ListingsDataService {
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
}

export default new ListingsDataService();
