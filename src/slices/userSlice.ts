import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Address } from "../utils/types";



interface UserState {
  userDetails: Record<string, any> | null;
  addresses: Address[];
  loading: boolean;
  error: string | null;
}

const API_URL = "/users"; // Adjust the base URL as needed

// Async thunks
export const fetchUserDetails = createAsyncThunk(
  "user/fetchUserDetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUserDetails = createAsyncThunk(
  "user/updateUserDetails",
  async (userDetails: Record<string, any>, { rejectWithValue }) => {
    try {
      const response = await axios.put(API_URL, userDetails);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.delete(API_URL);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAddresses = createAsyncThunk(
  "user/fetchAddresses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/address`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addAddress = createAsyncThunk(
  "user/addAddress",
  async (address: Record<string, any>, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/address`, address);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateAddress = createAsyncThunk(
  "user/updateAddress",
  async (
    { addressId, address }: { addressId: string; address: Record<string, any> },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(`${API_URL}/address/${addressId}`, address);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "user/deleteAddress",
  async (addressId: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/address/${addressId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    userDetails: null,
    addresses: [],
    loading: false,
    error: null,
  } as UserState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch user details
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action: PayloadAction<Record<string, any>>) => {
        state.loading = false;
        state.userDetails = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update user details
      .addCase(updateUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserDetails.fulfilled, (state, action: PayloadAction<Record<string, any>>) => {
        state.loading = false;
        state.userDetails = action.payload;
      })
      .addCase(updateUserDetails.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete user
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.loading = false;
        state.userDetails = null;
        state.addresses = [];
      })
      .addCase(deleteUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch addresses
      .addCase(fetchAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddresses.fulfilled, (state, action: PayloadAction<Address[]>) => {
        state.loading = false;
        state.addresses = action.payload;
      })
      .addCase(fetchAddresses.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add address
      .addCase(addAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAddress.fulfilled, (state, action: PayloadAction<Address>) => {
        state.loading = false;
        state.addresses.push(action.payload);
      })
      .addCase(addAddress.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update address
      .addCase(updateAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAddress.fulfilled, (state, action: PayloadAction<Address>) => {
        state.loading = false;
        const index = state.addresses.findIndex(
          (addr) => addr.id === action.payload.id
        );
        if (index !== -1) {
          state.addresses[index] = action.payload;
        }
      })
      .addCase(updateAddress.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete address
      .addCase(deleteAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = state.addresses.filter(
          (addr) => addr.id !== action.meta.arg
        );
      })
      .addCase(deleteAddress.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
