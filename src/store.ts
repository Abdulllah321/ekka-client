// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import authReducer from "./slices/authSlice";
import couponReducer from "./slices/couponSlice";
import {
  mainCategoryReducer,
  subCategoryReducer,
} from "./slices/categorySlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    auth: authReducer,
    category: mainCategoryReducer,
    subcategories: subCategoryReducer,
    coupons: couponReducer,
  },
});

// Define RootState type based on the store's state
export type RootState = ReturnType<typeof store.getState>;

// Define AppDispatch type based on the store's dispatch function
export type AppDispatch = typeof store.dispatch;
