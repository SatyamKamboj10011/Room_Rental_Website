import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC4wa6nje43y901oRuBC3-KyobtGTlcHTI",
  authDomain: "reactauthproject-fa437.firebaseapp.com",
  projectId: "reactauthproject-fa437",
  storageBucket: "reactauthproject-fa437.firebasestorage.app",
  messagingSenderId: "336443479632",
  appId: "1:336443479632:web:ee1dba9f517d64487be355"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export {db,auth,storage};
