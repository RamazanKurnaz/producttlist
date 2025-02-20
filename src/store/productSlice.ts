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

// Tek bir fetch fonksiyonu bırakalım
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    return data.products;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    updateProduct: (state, action: PayloadAction<Product>) => {
      const updatedProduct = action.payload;
      
      // Hem items hem de selectedProduct'ı tam olarak güncelle
      const index = state.items.findIndex(item => item.id === updatedProduct.id);
      if (index !== -1) {
        state.items[index] = updatedProduct;
      }
      
      if (state.selectedProduct?.id === updatedProduct.id) {
        state.selectedProduct = updatedProduct;
      }
      
      state.updateStatus = 'succeeded';
    },
    
    setSelectedProduct: (state, action: PayloadAction<number>) => {
      const product = state.items.find(item => item.id === action.payload);
      if (product) {
        state.selectedProduct = product;
      }
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
        if (state.items.length === 0) {
          state.status = 'loading';
        }
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.lastFetch = Date.now();
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      });
  }
});

export const {
  updateProduct,
  clearSelectedProduct,
  setUpdateStatus,
  setSelectedProduct
} = productSlice.actions;

export default productSlice.reducer;