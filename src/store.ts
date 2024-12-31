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
import authProtectionMiddleware from "./middleware";
import { useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    auth: authReducer,
    category: mainCategoryReducer,
    subcategories: subCategoryReducer,
    coupons: couponReducer,
    user: userReducer,
    wishlist: wishlistReducer,
    order:orderReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authProtectionMiddleware),
});


export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector = useSelector.withTypes<RootState>();
export type AppDispatch = typeof store.dispatch;
