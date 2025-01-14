import { Navigate, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import NotFoundPage from "./404";
import { useEffect } from "react";
import {  fetchUserStores } from "../slices/storeSlice";

const ProtectedVendorRoute = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, isLoading, user } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserStores());
    }
  }, [dispatch, isAuthenticated]);

  // While loading, show nothing or a loading spinner
  if (isLoading) {
    return null;
  }

  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If user is authenticated and is a vendor, render the outlet (protected content)
  if (user?.role === "vendor") {
    return <Outlet />;
  }

  // If user is authenticated but not a vendor, show the NotFoundPage
  return <NotFoundPage />;
};

export default ProtectedVendorRoute;
