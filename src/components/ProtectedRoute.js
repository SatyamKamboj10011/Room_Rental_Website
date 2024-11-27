import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";

// Common function to check if user is authenticated and has the correct role
const checkAccess = (user, role, requiredRole) => {
  if (!user) {
    return "login"; // Redirect to login if user is not authenticated
  }

  if (requiredRole && !role !== requiredRole) {
    return "unauthorized"; // Redirect to unauthorized if the role doesn't match
  }

  return null; // No redirect, access is allowed
};

// Protected Route for general users
export const ProtectedRoute = ({ children }) => {
  const { user, role } = useUserAuth();

  const redirectPath = checkAccess(user, role);
  if (redirectPath) {
    return <Navigate to={`/${redirectPath}`} />;
  }

  return children; // Allow access to children components if user exists
};

// Admin Route
export const AdminRoute = ({ children }) => {
  const { user, role } = useUserAuth();

  const redirectPath = checkAccess(user, role, "admin");
  if (redirectPath) {
    return <Navigate to={`/${redirectPath}`} />;
  }

  return children; // Allow access if the user is an admin
};

export const UserRoute = ({ children }) => {
  const { user, role } = useUserAuth();

  const redirectPath = checkAccess(user, role, "user");
  if (redirectPath) {
    return <Navigate to={`/${redirectPath}`} />;
  }

  return children; // Allow access if the user is a host or admin
};

// Host Route
export const HostRoute = ({ children }) => {
  const { user, role } = useUserAuth();

  const redirectPath = checkAccess(user, role, "host");
  if (redirectPath) {
    return <Navigate to={`/${redirectPath}`} />;
  }

  return children; // Allow access if the user is a host or admin
};

// Guest Route
export const GuestRoute = ({ children }) => {
  const { user, role } = useUserAuth();

  const redirectPath = checkAccess(user, role);
  if (redirectPath) {
    return <Navigate to={`/${redirectPath}`} />;
  }

  return children; // Allow access if the user is a guest, host, or admin
};

export default ProtectedRoute;
