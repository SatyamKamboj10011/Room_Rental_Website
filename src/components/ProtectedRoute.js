import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";

// Protected Route for general users
const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuth();

  console.log("Check user in ProtectedRoute: ", user);
  if (!user) {
    return <Navigate to="/home" />;  // Redirect to home if user is not logged in
  }
  return children;  // Allow access to children components if user exists
};

// Admin Route
export const AdminRoute = ({ children }) => {
  const { user, role } = useUserAuth();

  console.log("Check user in AdminRoute: ", user);
  if (!user) {
    return <Navigate to="/home" />;  // Redirect if no user is logged in
  } else if (role === "admin") {
    return children;  // Allow access if the user is an admin
  } else {
    return <Navigate to="/unauthorized" />;  // Redirect or show unauthorized page
  }
};

// Host Route
export const HostRoute = ({ children }) => {
  const { user, role } = useUserAuth();

  console.log("Check user in HostRoute: ", user);
  if (!user) {
    return <Navigate to="/home" />;  // Redirect if no user is logged in
  } else if (role === "host" || role === "admin") {
    return children;  // Allow access if the user is a host or admin
  } else {
    return <Navigate to="/unauthorized" />;  // Redirect or show unauthorized page
  }
};

// Guest Route
export const GuestRoute = ({ children }) => {
  const { user, role } = useUserAuth();

  console.log("Check user in GuestRoute: ", user);
  if (!user) {
    return <Navigate to="/home" />;  // Redirect if no user is logged in
  } else if (role === "guest" || role === "host" || role === "admin") {
    return children;  // Allow access if the user is a guest, host, or admin
  } else {
    return <Navigate to="/unauthorized" />;  // Redirect or show unauthorized page
  }
};

export default ProtectedRoute;
