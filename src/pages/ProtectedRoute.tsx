import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useSelector(
    (state: RootState) => state.auth
  );
  // While loading, show nothing or a loading spinner
  if (isLoading) {
    return null;
  }

  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
