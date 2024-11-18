import { db } from "../firebase";
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

const collectionName = "usersdetails"; // Firestore collection
const userCollectionRef = collection(db, collectionName);

class UserDataService {
  // Add a new user (auto-generated ID)
  addUser = async (newUser) => {
    try {
      return await addDoc(userCollectionRef, newUser);
    } catch (error) {
      console.error("Error adding user:", error);
      throw error;
    }
  };

  // Set a user document by specific UID
  setUser = async (newUser) => {
    try {
      return await setDoc(doc(db, collectionName, newUser.uid), newUser);
    } catch (error) {
      console.error("Error setting user:", error);
      throw error;
    }
  };

  // Update user document by ID
  updateUser = async (id, updateUser) => {
    try {
      const userDoc = doc(db, collectionName, id);
      return await updateDoc(userDoc, updateUser);
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  };

  // Update user role specifically
  updateUserRole = async (id, updatedRole) => {
    try {
      const userDoc = doc(db, collectionName, id);
      return await updateDoc(userDoc, { role: updatedRole });
    } catch (error) {
      console.error("Error updating user role:", error);
      throw error;
    }
  };

  // Delete user by ID
  deleteUser = async (id) => {
    try {
      const userDoc = doc(db, collectionName, id);
      return await deleteDoc(userDoc);
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  };

  // Get all users
  getAllUsers = async () => {
    try {
      return await getDocs(userCollectionRef);
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  };

  // Get a single user by ID
  getUser = async (id) => {
    try {
      const userDoc = doc(db, collectionName, id);
      return await getDoc(userDoc);
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  };
}

export default new UserDataService();
