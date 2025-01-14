import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import authReducer from "./slices/authSlice";
import couponReducer from "./slices/couponSlice";
import userReducer from "./slices/userSlice";
import {
  mainCategoryReducer,
  subCategoryReducer,
} from "./slices/categorySlice";
import wishlistReducer from "./slices/wishlistslice";
import orderReducer from "./slices/orderSlice";
import reviewsReducer from "./slices/reviewSlice";
import vendorReducer from "./slices/vendorSlice";
import storeReducer from "./slices/storeSlice";
import authProtectionMiddleware from "./middleware";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    auth: authReducer,
    categories: mainCategoryReducer,
    subcategories: subCategoryReducer,
    coupons: couponReducer,
    user: userReducer,
    wishlist: wishlistReducer,
    order: orderReducer,
    review: reviewsReducer,
    vendor: vendorReducer,
    store: storeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authProtectionMiddleware),
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hooks for useSelector and useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
