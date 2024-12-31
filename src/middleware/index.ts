import { Middleware } from "redux";
import { RootState } from "../store";

const authProtectionMiddleware: Middleware = (store) => (next) => (action) => {
  const state: RootState = store.getState();
  const protectedActions = [
    "cart/addItem",
    "cart/removeItem",
    "wishlist/addToWishlist",
    "wishlist/removeFromWishlist",
    "coupons/applyCoupon",
    "user/fetchUserDetails",
  ]; // Add all action types that require authentication

  //   @ts-ignore
  if (protectedActions.includes(action.type) && !state.auth.isAuthenticated) {
    console.error("Unauthorized: User is not authenticated.");
    return; // Block the action
  }

  return next(action);
};

export default authProtectionMiddleware;
