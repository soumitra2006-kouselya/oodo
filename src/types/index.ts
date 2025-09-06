export interface User {
  id: string;
  email: string;
  username: string;
  fullName?: string;
  phone?: string;
  address?: string;
  bio?: string;
  avatar?: string;
  createdAt: Date;
}

export interface Product {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: Category;
  price: number;
  images: string[];
  condition: 'new' | 'like-new' | 'good' | 'fair';
  location?: string;
  createdAt: Date;
  updatedAt: Date;
  isSold: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  addedAt: Date;
}

export interface Purchase {
  id: string;
  userId: string;
  products: Product[];
  totalAmount: number;
  purchaseDate: Date;
  status: 'pending' | 'completed' | 'cancelled';
}

export type Category = 
  | 'electronics'
  | 'clothing'
  | 'home-garden'
  | 'books'
  | 'toys-games'
  | 'sports'
  | 'beauty'
  | 'furniture'
  | 'handmade'
  | 'other';

export const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'electronics', label: 'Electronics' },
  { value: 'clothing', label: 'Clothing & Accessories' },
  { value: 'home-garden', label: 'Home & Garden' },
  { value: 'books', label: 'Books & Media' },
  { value: 'toys-games', label: 'Toys & Games' },
  { value: 'sports', label: 'Sports & Outdoors' },
  { value: 'beauty', label: 'Beauty & Health' },
  { value: 'furniture', label: 'Furniture' },
  { value: 'handmade', label: 'Handmade & Crafts' },
  { value: 'other', label: 'Other' },
];
