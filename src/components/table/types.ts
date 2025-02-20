import { Product } from '../../types/product';

export interface Column {
  header: string | ((param: string) => string);
  field: keyof Product;
  color?: string;
  align?: 'left' | 'right' | 'center';
  render?: (value: any, row: Product) => React.ReactNode;
}

export interface ProductTableProps {
  products: Product[];
  onRowClick: (id: number) => void;
  columns: Column[];
}

export interface TableHeaderProps {
  columns: Column[];
}

export interface TableRowProps {
  product: Product;
  columns: Column[];
  onClick: (id: number) => void;
}