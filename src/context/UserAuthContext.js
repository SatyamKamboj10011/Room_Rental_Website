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
  const [user, setUser] = useState({}); // Default to null, safer than {}
  const [role, setRole] = useState(""); // Default to null for better handling of undefined roles

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

  // This useEffect listens for auth state changes (user log in, log out)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // If user is logged in, set user and fetch role from Firestore
        console.log("Auth user:", currentUser);

        // Ensure currentUser is valid before proceeding
        if (currentUser && currentUser.uid) {
          setUser(currentUser);

          try {
            const userDoc = await UserDataService.getUser(currentUser.uid); // Fetch user data from Firestore
            if (userDoc.exists()) {
              const userRole = userDoc.data().role;
              console.log("User role (UserAuthContext):", userRole);
              setRole(userRole); // Set role to context
            } else {
              // If user document does not exist in Firestore, reset user and role
              console.log("User document not found in Firestore.");
              setRole(null);
              setUser(null);
            }
          } catch (error) {
            console.error("Error fetching user data from Firestore:", error);
            setRole(null);
            setUser(null);
          }
        } else {
          console.log("Current user is undefined or does not have a valid UID");
          setRole(null);
          setUser(null);
        }
      } else {
        // If no user is logged in, reset the context
        setRole(null);
        setUser(null);
      }
    });

    return () => {
      // Clean up the listener when component unmounts
      unsubscribe();
    };
  }, []); // Empty dependency array means it runs once on mount

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
