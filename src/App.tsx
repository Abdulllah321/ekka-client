import React, { Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./store";
import Loader from "./components/common/Loader";
import axios from "axios";
import { fetchCart, getCartCount } from "./slices/cartSlice";
import { checkUser } from "./slices/authSlice";
import ProtectedRoute from "./pages/ProtectedRoute";
import { fetchUserDetails } from "./slices/userSlice";
import { fetchWishlist } from "./slices/wishlistslice";
import io from "socket.io-client";
import NotFoundPage from "./pages/404";
import ProtectedVendorRoute from "./pages/ProtectedVendor";

const HomePage = React.lazy(() => import("./pages/HomePage"));
const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const RegisterPage = React.lazy(() => import("./pages/RegisterPage"));
const AboutPage = React.lazy(() => import("./pages/AboutPage"));
const ContactPage = React.lazy(() => import("./pages/ContactPage"));
const FaqPage = React.lazy(() => import("./pages/FaqPage"));
const TermPage = React.lazy(() => import("./pages/TermsPage"));
const PrivacyPolicyPage = React.lazy(() => import("./pages/PrivacyPolicyPage"));
const CustomerServicePage = React.lazy(
  () => import("./pages/CustomerServicePage"),
);
const DeliveryReturnPage = React.lazy(
  () => import("./pages/DeliveryReturnPage"),
);
const ShopPage = React.lazy(() => import("./pages/ShopPage"));
const CartPage = React.lazy(() => import("./pages/CartPage"));
const CheckoutPage = React.lazy(() => import("./pages/CheckoutPage"));
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"));
const WishListPage = React.lazy(() => import("./pages/WishListPage"));
const OrderSuccessPage = React.lazy(() => import("./pages/OrderSuccessPage"));
const TrackOrderPage = React.lazy(() => import("./pages/TrackOrderPage"));
const LogoutPage = React.lazy(() => import("./pages/LogoutPage"));
const ProfilePage = React.lazy(() => import("./pages/ProfilePage"));
const OrdersPage = React.lazy(() => import("./pages/OrdersPage"));
const InvoicePage = React.lazy(() => import("./pages/InvoicePage"));
const VendorVerificationPage = React.lazy(
  () => import("./pages/VendorVerificationPage"),
);
const VendorRegisterPage = React.lazy(
  () => import("./pages/VendorRegisterPage"),
);
const ChangePasswordPage = React.lazy(
  () => import("./pages/ChangePasswordPage"),
);
const ForgotPasswordPage = React.lazy(
  () => import("./pages/ForgotPasswordPage"),
);
const VerifyOtpPage = React.lazy(() => import("./pages/VerifyOtpPage"));
const ChangePasswordWithOTPPage = React.lazy(
  () => import("./pages/ChangePasswordWithOTPPage"),
);
const VendorDashboardPage = React.lazy(
  () => import("./pages/vendor/VendorDashboardPage"),
);
const StoreSetupWizardPage = React.lazy(
  () => import("./pages/vendor/StoreSetupWizardPage"),
);
const VendorProductListPage = React.lazy(
  () => import("./pages/vendor/VendorProductListPage"),
);
const VendorOrdersPage = React.lazy(() => import("./pages/vendor/OrdersPage"));
const VendorProfilePage = React.lazy(
  () => import("./pages/vendor/ProfilePage"),
);
const ProductFormPage = React.lazy(() => import("./pages/ProductFormPage"));
const VendorPoliciesPage = React.lazy(
  () => import("./pages/vendor/PoliciesPage"),
);
const VendorCouponsPage = React.lazy(
  () => import("./pages/vendor/CouponsPage"),
);

export const socket = io(import.meta.env.VITE_SERVER);

function App() {
  const dispatch = useAppDispatch();
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
          <Route path="/vendor-register" element={<VendorRegisterPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/terms" element={<TermPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/customer-service" element={<CustomerServicePage />} />
          <Route path="/returns" element={<DeliveryReturnPage />} />
          <Route path="/product-detail/:slug" element={<ProductDetail />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/verify-otp/:email" element={<VerifyOtpPage />} />
          <Route
            path="/change-password/:email/:otp"
            element={<ChangePasswordWithOTPPage />}
          />
          <Route path="*" element={<NotFoundPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/cart" element={<CartPage />} />
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="/wishlist" element={<WishListPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/order-success/:id" element={<OrderSuccessPage />} />
            <Route path="/order/:id" element={<TrackOrderPage />} />
            <Route path="/invoice/:id" element={<InvoicePage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/change-password" element={<ChangePasswordPage />} />
            <Route
              path="/upgrade-to-vendor"
              element={<VendorVerificationPage />}
            />
          </Route>
          {/* Vendor Protected */}
          <Route element={<ProtectedVendorRoute />}>
            <Route path="/vendor/dashboard" element={<VendorDashboardPage />} />
            <Route
              path="/vendor/products"
              element={<VendorProductListPage />}
            />
            <Route path="/vendor/orders" element={<VendorOrdersPage />} />
            <Route path="/vendor/profile" element={<VendorProfilePage />} />
            <Route path="/vendor/policies" element={<VendorPoliciesPage />} />
            <Route path="/vendor/coupons" element={<VendorCouponsPage />} />
            <Route path="/setup-store" element={<StoreSetupWizardPage />} />
            <Route path="/product-form" element={<ProductFormPage />} />
            <Route path="/product-form/:slug" element={<ProductFormPage />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
