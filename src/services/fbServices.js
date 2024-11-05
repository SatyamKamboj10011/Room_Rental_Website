import { db } from "../firebase";  // Adjust path as needed
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const collectionName = "feedback";
const collectionRef = collection(db, collectionName);

class FBDataService {
  addData = (newData) => {
    return addDoc(collectionRef, newData);
  };

  updateData = (id, newData) => {
    const oldData = doc(db, collectionName, id);
    return updateDoc(oldData, newData);
  };

  deleteData = (id) => {
    const data = doc(db, collectionName, id);
    return deleteDoc(data);
  };

  getData = (id) => {
    const data = doc(db, collectionName, id);
    return getDoc(data);
  };

  getAllData = () => {
    return getDocs(collectionRef);
  };
}

export default FBDataService;