// Inside src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB_mv0r3unqaB5zxKkXXXt_94rNjdJns_Y",
  authDomain: "reactauthprj-f1e55.firebaseapp.com",
  projectId: "reactauthprj-f1e55",
  storageBucket: "reactauthprj-f1e55.firebasestorage.app",
  messagingSenderId: "542610678294",
  appId: "1:542610678294:web:fb66facad7ee50832e8b37"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
export default app;
