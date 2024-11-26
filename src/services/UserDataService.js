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
  getFirestore,
  serverTimestamp
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

  addLoginLog = async (userId, loginLog) => {
    try {
      const loginLogsCollection = collection(db, 'usersdetails', userId, 'loginLogs');
      await addDoc(loginLogsCollection, {
        ...loginLog,
        timestamp: serverTimestamp(), // Automatically add the timestamp
      });
      console.log("Login log added successfully");
    } catch (error) {
      console.error("Error adding login log:", error);
      throw error; // Rethrow to handle in the component
    }
  };

  verifyUser = async (id)=>{
    try{
      const userDoc = doc(db, collectionName, id);
      return await updateDoc(userDoc, {verified: true});
    } catch (error){
      console.error("Error verifying user:", error);
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
   deleteUser = async (userId) => {
    const db = getFirestore();
    const userRef = doc(db, "usersdetails", userId);
  
    try {
      await deleteDoc(userRef);
      console.log("User deleted:", userId);
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
