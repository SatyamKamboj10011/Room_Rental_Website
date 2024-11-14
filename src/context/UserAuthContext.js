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
  const [user, setUser] = useState(null); // Default to null for clarity
  const [role, setRole] = useState("guest"); // Default to 'guest' to ensure role is set

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

        if (currentUser && currentUser.uid) {
          setUser(currentUser); // Set user in context

          try {
            const userDoc = await UserDataService.getUser(currentUser.uid); // Fetch user data from Firestore
            if (userDoc.exists()) {
              const userRole = userDoc.data().role || "guest"; // Set 'guest' as fallback role
              console.log("User role (UserAuthContext):", userRole);
              setRole(userRole); // Set role to context
            } else {
              // If user document doesn't exist, reset user and role
              console.log("User document not found in Firestore.");
              setRole("guest");
              setUser(null);
            }
          } catch (error) {
            console.error("Error fetching user data from Firestore:", error);
            setRole("guest"); // Default role if fetching fails
            setUser(null);
          }
        } else {
          console.log("Current user is undefined or does not have a valid UID");
          setRole("guest");
          setUser(null);
        }
      } else {
        // If no user is logged in, reset the context
        setRole("guest"); // Default to guest when logged out
        setUser(null);
      }
    });

    return () => {
      // Clean up the listener when component unmounts
      unsubscribe();
    };
  }, []); // Empty dependency array ensures it runs once on mount

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
