import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Order } from "../utils/types";

interface OrdersState {
  orders: Order[];
  currentOrder: Order | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: OrdersState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
};

// Async thunks
export const createOrder = createAsyncThunk<
  Order,
  any,
  { rejectValue: string }
>("orders/createOrder", async (orderData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`/orders`, orderData, {
      withCredentials: true, // Include if your API requires cookies
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.error || "Failed to create order");
  }
});

export const getOrderById = createAsyncThunk<
  Order,
  string,
  { rejectValue: string }
>("orders/getOrderById", async (orderId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/orders/${orderId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.error || "Failed to fetch order");
  }
});

export const getAllOrders = createAsyncThunk<
  Order[],
  void,
  { rejectValue: string }
>("orders/getAllOrders", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/orders`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.error || "Failed to fetch orders");
  }
});

export const updateOrderStatus = createAsyncThunk<
  Order,
  { orderId: string; status: string },
  { rejectValue: string }
>(
  "orders/updateOrderStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `/orders/${orderId}`,
        { status },
        { withCredentials: true }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.error || "Failed to update order status"
      );
    }
  }
);

export const deleteOrder = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("orders/deleteOrder", async (orderId, { rejectWithValue }) => {
  try {
    await axios.delete(`/orders/${orderId}`, {
      withCredentials: true,
    });
    return orderId;
  } catch (error: any) {
    return rejectWithValue(error.response?.error || "Failed to delete order");
  }
});

export const fetchOrderByUser = createAsyncThunk(
  "orders/fetchOrderByUser",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/orders?userId=${userId}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.error || "Failed to fetch orders by user"
      );
    }
  }
);

// Slice
const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        state.loading = false;
        state.orders.push(action.payload);
      })
      .addCase(
        createOrder.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || null;
        }
      )
      // Get Order By ID
      .addCase(getOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getOrderById.fulfilled,
        (state, action: PayloadAction<Order>) => {
          state.loading = false;
          state.currentOrder = action.payload;
        }
      )
      .addCase(
        getOrderById.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || null;
        }
      )
      // Get All Orders
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllOrders.fulfilled,
        (state, action: PayloadAction<Order[]>) => {
          state.loading = false;
          state.orders = action.payload;
        }
      )
      .addCase(
        getAllOrders.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || null;
        }
      )
      // Update Order Status
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateOrderStatus.fulfilled,
        (state, action: PayloadAction<Order>) => {
          state.loading = false;
          const index = state.orders.findIndex(
            (order) => order.id === action.payload.id
          );
          if (index !== -1) {
            state.orders[index] = action.payload;
          }
        }
      )
      .addCase(
        updateOrderStatus.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || null;
        }
      )
      // Delete Order
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteOrder.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.orders = state.orders.filter(
            (order) => order.id !== action.payload
          );
        }
      )
      .addCase(
        deleteOrder.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || null;
        }
      )
      .addCase(fetchOrderByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrderByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = ordersSlice.actions;
export default ordersSlice.reducer;
