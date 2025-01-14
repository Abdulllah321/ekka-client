import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Coupon } from "../utils/types";

interface CouponState {
  coupons: Coupon[]; // List of coupons
  coupon: Coupon | null; // Single coupon for detailed view
  loading: boolean;
  error: string | null;
}

const initialState: CouponState = {
  coupons: [],
  coupon: null,
  loading: false,
  error: null,
};

// Fetch coupons by store ID
export const fetchCouponsByStore = createAsyncThunk<
  Coupon[],
  string,
  { rejectValue: string }
>("coupons/fetchCouponsByStore", async (storeId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/coupons/store/${storeId}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.error || "Failed to fetch coupons for the store"
    );
  }
});

// Fetch a single coupon by code
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

// Delete a coupon by ID
export const deleteCoupon = createAsyncThunk<
  void, // No data is returned
  string, // The ID of the coupon to delete
  { rejectValue: string }
>("coupons/deleteCoupon", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`/coupons/${id}`);
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.error || "Failed to delete the coupon"
    );
  }
});

// Create a new coupon
export const createCoupon = createAsyncThunk<
  Coupon, // The created coupon is returned
  Partial<Coupon>, // The input for creating a coupon
  { rejectValue: string }
>("coupons/createCoupon", async (couponData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`/coupons`, couponData);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.error || "Failed to create the coupon"
    );
  }
});

// Update a coupon by ID
export const updateCoupon = createAsyncThunk<
  Coupon, // The updated coupon is returned
  { id: string; updatedData: Partial<Coupon> }, // Input: coupon ID and data to update
  { rejectValue: string }
>("coupons/updateCoupon", async ({ id, updatedData }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`/coupons/${id}`, updatedData);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.error || "Failed to update the coupon"
    );
  }
});

const couponSlice = createSlice({
  name: "coupons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch coupons by store
      .addCase(fetchCouponsByStore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCouponsByStore.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = action.payload;
      })
      .addCase(fetchCouponsByStore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch coupons for the store";
      })

      // Fetch coupon by code
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
        console.log(action.payload)
      })
      // Create coupon
      .addCase(createCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons.push(action.payload);
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create the coupon";
      })
      // Update coupon

      .addCase(updateCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCoupon.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.coupons.findIndex(
          (coupon) => coupon.id === action.payload.id
        );
        if (index !== -1) {
          state.coupons[index] = action.payload; // Update the coupon in the list
        }
      })
      .addCase(updateCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update the coupon";
      })
      // Delete coupon
      .addCase(deleteCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = state.coupons.filter(
          (coupon) => coupon.id !== action.meta.arg
        );
      })
      .addCase(deleteCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete the coupon";
      });
  },
});

export default couponSlice.reducer;
