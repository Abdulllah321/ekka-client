import { Navigate, Outlet } from "react-router-dom";
import {  useAppSelector } from "../store";

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAppSelector(
    (state) => state.auth
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
