import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import UserDataService from "../services/UserDataService";

// Create the context
const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState(null); // Default is null for better checks
  const [role, setRole] = useState(""); // Default role can be empty string or 'Guest'

  // Log in function
  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Sign up function
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // Log out function
  function logOut() {
    return signOut(auth);
  }

  // Google sign-in function
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  // Fetch user data (role) from Firestore
  const fetchUserRole = async (uid) => {
    try {
      const userDoc = await UserDataService.getUser(uid); // Fetch user document
      if (userDoc.exists()) {
        const { role } = userDoc.data();
        console.log("Fetched role from Firestore:", role);
        return role || "User"; // Fallback to 'User' if role is undefined
      } else {
        console.warn("No user document found for UID:", uid);
        return "User"; // Fallback role
      }
    } catch (error) {
      console.error("Error fetching user role from Firestore:", error);
      return "Guest"; // Return 'Guest' in case of an error
    }
  };

  // This useEffect listens for auth state changes (user log in, log out)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser && currentUser.uid) {
        console.log("Authenticated user:", currentUser);
        setUser(currentUser);

        // Fetch and set the role from Firestore
        const userRole = await fetchUserRole(currentUser.uid);
        setRole(userRole);
      } else {
        console.log("User is logged out or undefined.");
        setUser(null);
        setRole(""); // Reset role when logged out
      }
    });

    return () => {
      // Clean up the listener when the component unmounts
      unsubscribe();
    };
  }, []); // Run only on mount

  return (
    <userAuthContext.Provider
      value={{ user, role, logIn, signUp, logOut, googleSignIn }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

// Custom hook to access the context
export function useUserAuth() {
  return useContext(userAuthContext);
}
