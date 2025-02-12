import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductState } from '../types/product';

// Async thunk for fetching products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    return data.products;
  }
);

// Async thunk for fetching a single product
export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id: number) => {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    const data = await response.json();
    return data;
  }
);

const initialState: ProductState = {
  items: [],
  status: 'idle',
  error: null,
  selectedProduct: null
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
      if (state.selectedProduct?.id === action.payload.id) {
        state.selectedProduct = action.payload;
      }
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Products Cases
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      })
      // Fetch Single Product Cases
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductById.fulfilled, (state, action: PayloadAction<Product>) => {
        state.status = 'succeeded';
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  }
});

export const { updateProduct, clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
