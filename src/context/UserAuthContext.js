import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../services/firebase";
import UserDataService from "../services/UserDataService";

// Create the context
const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState(null); // Default is null for better checks
  const [role, setRole] = useState("user"); // Default role can be empty string or 'user'
  const [authError, setAuthError] = useState(null);

  // Log in function
  async function logIn(email, password) {
    try{
      setAuthError(null);
     const userCredential = await signInWithEmailAndPassword(auth, email, password);
     return userCredential;
    } catch (error){
   setAuthError("Login failed. Please try again.");
   console.error(error);
  }
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
        return role || "user"; // Fallback to 'User' if role is undefined
      } else {
        console.warn("No user document found for UID:", uid);
        return "user"; // Fallback role
      }
    } catch (error) {
      console.error("Error fetching user role from Firestore:", error);
      return "guest"; // Return 'Guest' in case of an error
    }
  };

  async function refreshUserRole() {
    if(user?.uid){
      const updatedrole = await fetchUserRole(user.uid);
      setRole(updatedrole);
    }
  }
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
        setRole("guest"); // Reset role when logged out
      }
    });

    return () => {
      // Clean up the listener when the component unmounts
      unsubscribe();
    };
  }, []); // Run only on mount

  return (
    <userAuthContext.Provider
      value={{ user, role, logIn, signUp, logOut, googleSignIn,refreshUserRole,authError}}
    >
      {children}
    </userAuthContext.Provider>
  );
}

// Custom hook to access the context
export function useUserAuth() {
  return useContext(userAuthContext);
}
