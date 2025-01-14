import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define types for the state
interface VendorState {
  email: string;
  otpCode: string;
  otpExpiry: string;
  verificationStatus: string;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: VendorState = {
  email: "",
  otpCode: "",
  otpExpiry: "",
  verificationStatus: "unverified",
  loading: false,
  error: null,
};

// Async thunk to send OTP
export const sendOtp = createAsyncThunk(
  "vendor/sendOtp",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await axios.post("/vendor/send-otp", { email });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Error sending OTP"
      );
    }
  }
);

// Async thunk to verify OTP
export const verifyOtp = createAsyncThunk(
  "vendor/verifyOtp",
  async (payload: { email: string; otpCode: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/vendor/verify-otp", payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Error verifying OTP"
      );
    }
  }
);

// Vendor slice
const vendorSlice = createSlice({
  name: "vendor",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Send OTP
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOtp.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Verify OTP
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.loading = false;
        state.verificationStatus = "verified";
        state.error = null;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Actions
export const { setEmail, resetError } = vendorSlice.actions;

// Reducer
export default vendorSlice.reducer;
