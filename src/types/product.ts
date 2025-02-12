export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  thumbnail: string;
  rating: number;
}

export interface ProductState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  selectedProduct: Product | null;
}

export interface RootState {
  products: ProductState;
}
