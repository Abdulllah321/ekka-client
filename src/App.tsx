import React, { Suspense, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import Loader from "./components/common/Loader";
import axios from "axios";
import { fetchCart, getCartCount } from "./slices/cartSlice";
import { checkUser } from "./slices/authSlice";
import ProtectedRoute from "./pages/ProtectedRoute";

// Dynamically import pages using React.lazy
const HomePage = React.lazy(() => import("./pages/HomePage"));
const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const RegisterPage = React.lazy(() => import("./pages/RegisterPage"));
const ShopPage = React.lazy(() => import("./pages/ShopPage"));
const CartPage = React.lazy(() => import("./pages/CartPage"));
const CheckoutPage = React.lazy(() => import("./pages/CheckoutPage"));

function App() {
  const dispatch: AppDispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(checkUser());
    if (isAuthenticated) {
      dispatch(fetchCart());
      dispatch(getCartCount());
    }
  }, [dispatch, isAuthenticated]);

  // if (isLoading) return <Loader />;
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
      }}
    >
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Route>
        </Routes>
      </Suspense>{" "}
    </div>
  );
}

export default App;
