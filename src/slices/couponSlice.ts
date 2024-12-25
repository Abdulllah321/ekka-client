import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Coupon } from "../utils/types";

// Enum for Discount Type

interface CouponState {
  coupon: Coupon | null;
  loading: boolean;
  error: string | null;
}

const initialState: CouponState = {
  coupon: null,
  loading: false,
  error: null,
};

// Fetch a single coupon by ID
export const fetchCouponByCode = createAsyncThunk<
  Coupon,
  string,
  { rejectValue: string }
>("coupons/fetchCouponByCode", async (code, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/coupons/code/${code}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.error || "Failed to fetch the coupon"
    );
  }
});

const couponSlice = createSlice({
  name: "coupons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch coupon by Code
      .addCase(fetchCouponByCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCouponByCode.fulfilled, (state, action) => {
        state.loading = false;
        state.coupon = action.payload;
      })
      .addCase(fetchCouponByCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch the coupon";
      });
  },
});

export default couponSlice.reducer;
