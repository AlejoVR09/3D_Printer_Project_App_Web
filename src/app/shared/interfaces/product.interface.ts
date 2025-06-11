export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  dimensions?: {
    height: number;
    width: number;
    depth: number;
  };
  material?: string;
  careInstructions?: string;
  rating?: number;
  inStock: boolean;
} 