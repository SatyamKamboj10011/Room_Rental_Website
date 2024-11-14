import { db } from "../firebase"; // Assuming your firebase.js file initializes the Firestore db

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const collectionName = "usersdetails"; // Collection name in Firestore
const userCollectionRef = collection(db, collectionName); // Reference to the users collection in Firestore

class UserDataService {
  // Method to add a new user with a generated ID (for example, using addDoc)
  addUser = (newUser) => {
    return addDoc(userCollectionRef, newUser);
  };

  // Method to set a user with a specific UID as the document ID
  setUser = (newUser) => {
    // Ensure you're using the UID from Firebase authentication (newUser.uid)
    return setDoc(doc(db, collectionName, newUser.uid), newUser);
  };

  // Method to update an existing user's data
  updateUser = (id, updateUser) => {
    const userDoc = doc(db, collectionName, id);
    return updateDoc(userDoc, updateUser);
  };

  // Method to delete a user by their UID
  deleteUser = (id) => {
    const userDoc = doc(db, collectionName, id);
    return deleteDoc(userDoc);
  };

  // Method to get all users
  getAllUser = () => {
    return getDocs(userCollectionRef);
  };

  // Method to get a single user by their UID
  getUser = (id) => {
    const userDoc = doc(db, collectionName, id);
    return getDoc(userDoc);
  };
}

export default new UserDataService();
