import { collection, getDocs, doc, getDoc, addDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Adjust the path as necessary to your Firebase config
 
const collectionName = 'feedback';
const collectionRef = collection(db, collectionName);
 
class FBDataService {
  // Add a new listing to Firestore
  adddata = (newData) => {
    return addDoc(collectionRef, newData);
 
  };
 
  // Update an existing listing by its ID
  updateData = (id, updatedData) => {
    const dataRef = doc(db, collectionName, id); // Reference to the specific listing document
    return updateDoc(dataRef, updatedData); // Update the document in Firestore
  };
 
  // Fetch all listings with error handling
  async getAllData() {
    try {
      const data = await getDocs(collectionRef);
 
      if (data.empty) {
        console.log('No feedback found');
        return [];
      }
 
      return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    } catch (error) {
      console.error("Error fetching data:", error);
      throw new Error("Failed to fetch data.");
    }
  }
 
  // Fetch a single listing by ID
  async getDataById(id) {
    try {
      const docRef = doc(db, collectionName, id); // Create a reference to the document
      const dataSnapshot = await getDoc(docRef); // Fetch the document
 
      if (dataSnapshot.exists()) {
        return { id: dataSnapshot.id, ...dataSnapshot.data() };
      } else {
        console.log('Data not found');
        return null;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      throw new Error("Failed to fetch data.");
    }
  }
}
 
export default new FBDataService();