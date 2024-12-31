import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { WishlistItem } from "../utils/types";

// Define the type for wishlist items

// Define the initial state
interface WishlistState {
  items: WishlistItem[];
  loading: boolean;
  error: string | null;
}

const initialState: WishlistState = {
  items: [],
  loading: false,
  error: null,
};

// Async thunk to fetch wishlist items
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/wishlist");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch wishlist"
      );
    }
  }
);

// Async thunk to add an item to the wishlist
export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (itemId: string, { rejectWithValue }) => {
    try {
      const response = await axios.post("/wishlist", { itemId });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add item to wishlist"
      );
    }
  }
);

// Async thunk to remove an item from the wishlist
export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async (itemId: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete("/wishlist", {
        data: { itemId },
      });
      return { itemId, message: response.data.message };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove item from wishlist"
      );
    }
  }
);

// Create the wishlist slice
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch wishlist
    builder.addCase(fetchWishlist.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchWishlist.fulfilled,
      (state, action: PayloadAction<WishlistItem[]>) => {
        state.loading = false;
        state.items = action.payload;
      }
    );
    builder.addCase(
      fetchWishlist.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      }
    );

    // Add to wishlist
    builder.addCase(addToWishlist.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      addToWishlist.fulfilled,
      (state, action: PayloadAction<WishlistItem[]>) => {
        state.loading = false;
        state.items = action.payload;
      }
    );
    builder.addCase(
      addToWishlist.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      }
    );

    // Remove from wishlist
    builder.addCase(removeFromWishlist.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      removeFromWishlist.fulfilled,
      (state, action: PayloadAction<{ itemId: string }>) => {
        state.loading = false;
        state.items = state.items.filter(
          (item) => item.productId !== action.payload.itemId
        );
      }
    );
    builder.addCase(
      removeFromWishlist.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
  },
});

export default wishlistSlice.reducer;
