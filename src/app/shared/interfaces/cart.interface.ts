import { Product } from './product.interface';

export interface CartItem {
  product: Product;
  quantity: number;
  color?: string;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
} 