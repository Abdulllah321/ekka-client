import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Cart, CartItem, Coupon } from "../utils/types";

// Define Slice State
interface CartState {
  cartItems: CartItem[];
  cart: Cart | null;
  cartCount: number;
  loading: boolean;
  coupon: Coupon | null;
  error: string | null;
}

const initialState: CartState = {
  cartItems: [],
  cart: null,
  cartCount: 0,
  loading: false,
  error: null,
  coupon: null,
};

// Fetch Cart Items
export const fetchCart = createAsyncThunk<
  CartItem[],
  void,
  { rejectValue: string }
>("cart/fetchCart", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("/cart/item");
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch cart items"
    );
  }
});

export const getCart = createAsyncThunk<Cart, void, { rejectValue: string }>(
  "cart/getCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/cart");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch cart items"
      );
    }
  }
);

export const getCartCount = createAsyncThunk<
  number,
  void,
  { rejectValue: string }
>("cart/getCartCount", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("/cart/count");
    return response.data.count;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch cart count"
    );
  }
});

// Add Item to Cart
export const addToCart = createAsyncThunk<
  CartItem,
  { productId: string | undefined; quantity: number },
  { rejectValue: string }
>("cart/addToCart", async (item, { rejectWithValue }) => {
  try {
    const response = await axios.post("/cart", item);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.error || "Failed to add item to cart"
    );
  }
});

export const updateQuantity = createAsyncThunk<
  CartItem,
  { productId: string; quantity: number },
  { rejectValue: string }
>(
  "cart/updateQuantity",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.put("/cart/quantity", {
        productId,
        quantity,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to update item quantity"
      );
    }
  }
);

// Remove Item from Cart
export const removeFromCart = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("cart/removeFromCart", async (productId, { rejectWithValue }) => {
  try {
    await axios.delete("/cart", { data: { productId } });
    return productId;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to remove item from cart"
    );
  }
});

// Clear Cart
export const clearCart = createAsyncThunk<void, void, { rejectValue: string }>(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      await axios.delete("/cart/clear");
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to clear cart"
      );
    }
  }
);

// Define the action creator for applying coupon
export const applyCoupon = (couponCode: Coupon) => ({
  type: "cart/applyCoupon",
  payload: couponCode,
});

// Cart Slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    applyCoupon: (state, action: PayloadAction<Coupon>) => {
      const coupon = action.payload;
      state.coupon = coupon;

      if (coupon.status === "active") {
        if (coupon.discountType === "percentage") {
          // Apply percentage discount
          const discount =
            (state.cart?.totalAmount || 0) * (coupon.discountAmount / 100);
          state.cart!.totalAmount -= discount;
        } else if (coupon.discountType === "fixedAmount") {
          state.cart!.totalAmount -= coupon.discountAmount;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCart.fulfilled,
        (state, action: PayloadAction<CartItem[]>) => {
          state.loading = false;
          state.cartItems = action.payload;
        }
      )
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch cart items";
      })

      // Get Cart
      .addCase(getCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCart.fulfilled, (state, action: PayloadAction<Cart>) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch cart items";
      })

      // Fetch Cart Count
      .addCase(getCartCount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getCartCount.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.loading = false;
          state.cartCount = action.payload;
        }
      )
      .addCase(getCartCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch cart count";
      })
      // Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addToCart.fulfilled,
        (state, action: PayloadAction<CartItem>) => {
          state.loading = false;
          state.cartItems.push(action.payload);
        }
      )
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add item to cart";
      })

      // Remove from Cart
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        removeFromCart.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.cartItems = state.cartItems.filter(
            (item) => item.productId !== action.payload
          );
        }
      )
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to remove item from cart";
      })

      // Clear Cart
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.loading = false;
        state.cartItems = [];
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to clear cart";
      })

      // Update Quantity
      .addCase(updateQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateQuantity.fulfilled,
        (state, action: PayloadAction<CartItem>) => {
          state.loading = false;
          const existingItem = state.cartItems.find(
            (item) => item.productId === action.payload.productId
          );
          if (existingItem) {
            existingItem.quantity = action.payload.quantity;
          }
        }
      )
      .addCase(updateQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update item quantity";
      });
  },
});

// Export the reducer
export default cartSlice.reducer;
