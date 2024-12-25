import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define types for MainCategory and SubCategory
interface MainCategory {
  id?: string;
  name: string;
  slug?: string;
  shortDesc?: string;
  fullDesc?: string;
  imageUrl?: string | null;
  subCategories: SubCategory[];
  error?: string;
  _count?: { products: number };
  status: "active" | "inactive";
}

interface SubCategory {
  id?: string;
  name?: string;
  slug?: string;
  status?: "active" | "inactive";
  createdAt?: Date;
  updatedAt?: Date;
  mainCategoryId?: string;
  mainCategory: MainCategory;
  imageUrl?: string;
}

// Define types for the state
interface MainCategoryState {
  mainCategories: MainCategory[];
  loading: boolean;
  error: string | null;
}

interface SubCategoryState {
  subCategories: SubCategory[];
  loading: boolean;
  error: string | null;
}

// Async Thunks for MainCategory
export const fetchMainCategories = createAsyncThunk<
  MainCategory[],
  void,
  { rejectValue: string }
>("mainCategory/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/categories`
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data || "Failed to fetch main categories"
    );
  }
});

// Async Thunks for SubCategory
export const fetchSubCategories = createAsyncThunk<
  SubCategory[],
  void,
  { rejectValue: string }
>("subCategory/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("/subcategories");
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data || "Failed to fetch sub categories"
    );
  }
});

// MainCategory Slice
const mainCategorySlice = createSlice({
  name: "mainCategory",
  initialState: {
    mainCategories: [] as MainCategory[],
    loading: false,
    error: null as string | null,
  } as MainCategoryState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetching main categories
    builder
      .addCase(fetchMainCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchMainCategories.fulfilled,
        (state, action: PayloadAction<MainCategory[]>) => {
          state.loading = false;
          state.mainCategories = action.payload;
        }
      )
      .addCase(fetchMainCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      }); 

  },
});

// SubCategory Slice
const subCategorySlice = createSlice({
  name: "subCategory",
  initialState: {
    subCategories: [] as SubCategory[],
    loading: false,
    error: null as string | null,
  } as SubCategoryState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSubCategories.fulfilled,
        (state, action: PayloadAction<SubCategory[]>) => {
          state.loading = false;
          state.subCategories = action.payload;
        }
      )
      .addCase(fetchSubCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const mainCategoryReducer = mainCategorySlice.reducer;
export const subCategoryReducer = subCategorySlice.reducer;
