export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  rating: number;
  thumbnail: string;
  images: string[];
  stock: number;
  discountPercentage: number;
}

export interface ProductState {
  items: Product[];
  selectedProduct: Product | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  updateStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  updateError: string | null;
  lastFetch: number | null;
}

export interface RootState {
  products: ProductState;
}
