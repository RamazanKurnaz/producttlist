import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductState } from '../types/product';

const initialState: ProductState = {
  items: [],
  selectedProduct: null,
  status: 'idle',
  error: null,
  updateStatus: 'idle',
  updateError: null,
  lastFetch: null
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    return data.products;
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id: number) => {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    const data = await response.json();
    return data;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    updateProduct: (state, action: PayloadAction<Product>) => {
      const updatedProduct = action.payload;
      
      // Update in items array
      const index = state.items.findIndex(item => item.id === updatedProduct.id);
      if (index !== -1) {
        // Preserve other fields and only update title and description
        state.items[index] = {
          ...state.items[index],
          title: updatedProduct.title,
          description: updatedProduct.description
        };
      }
      
      // Update selected product if it's the same product
      if (state.selectedProduct?.id === updatedProduct.id) {
        state.selectedProduct = {
          ...state.selectedProduct,
          title: updatedProduct.title,
          description: updatedProduct.description
        };
      }
      
      // Update status
      state.updateStatus = 'succeeded';
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
    setUpdateStatus: (state, action: PayloadAction<'idle' | 'loading' | 'succeeded' | 'failed'>) => {
      state.updateStatus = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        // Only show loading state if we don't have cached data
        if (state.items.length === 0) {
          state.status = 'loading';
        }
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = 'succeeded';
        // Only update items if we don't have cached data or if it's been more than 5 minutes
        if (state.items.length === 0 || !state.lastFetch || Date.now() - state.lastFetch > 300000) {
          state.items = action.payload;
          state.lastFetch = Date.now();
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      })
      .addCase(fetchProductById.pending, (state) => {
        if (!state.selectedProduct) {
          state.status = 'loading';
        }
      })
      .addCase(fetchProductById.fulfilled, (state, action: PayloadAction<Product>) => {
        state.status = 'succeeded';
        // Update both selectedProduct and the corresponding item in items array
        state.selectedProduct = action.payload;
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch product';
      });
  }
});

export const { updateProduct, clearSelectedProduct, setUpdateStatus } = productSlice.actions;
export default productSlice.reducer;
