import React, { Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch,  useAppSelector } from "./store";
import Loader from "./components/common/Loader";
import axios from "axios";
import { fetchCart, getCartCount } from "./slices/cartSlice";
import { checkUser } from "./slices/authSlice";
import ProtectedRoute from "./pages/ProtectedRoute";
import { fetchUserDetails } from "./slices/userSlice";
import { fetchWishlist } from "./slices/wishlistslice";

// Dynamically import pages using React.lazy
const HomePage = React.lazy(() => import("./pages/HomePage"));
const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const RegisterPage = React.lazy(() => import("./pages/RegisterPage"));
const ShopPage = React.lazy(() => import("./pages/ShopPage"));
const CartPage = React.lazy(() => import("./pages/CartPage"));
const CheckoutPage = React.lazy(() => import("./pages/CheckoutPage"));
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"));
const WishListPage = React.lazy(() => import("./pages/WishListPage"));
const OrderSuccessPage = React.lazy(() => import("./pages/OrderSuccessPage"));
const TrackOrderPage = React.lazy(() => import("./pages/TrackOrderPage"));

function App() {
  const dispatch: AppDispatch = useDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkUser());
    if (isAuthenticated) {
      dispatch(fetchUserDetails());
      dispatch(fetchCart());
      dispatch(fetchWishlist());
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
          <Route path="/product-detail/:slug" element={<ProductDetail />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishListPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-success/:id" element={<OrderSuccessPage />} />
            <Route path="/order/:id" element={<TrackOrderPage />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
