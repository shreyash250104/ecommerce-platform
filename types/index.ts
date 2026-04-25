export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  subcategory?: string;
  brand: string;
  rating: number;
  reviews: Review[];
  stock: number;
  colors?: string[];
  sizes?: string[];
  specifications: Record<string, string>;
  isNew?: boolean;
  isFeatured?: boolean;
  discount?: number;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'customer' | 'admin';
  orders?: Order[];
  wishlist?: string[];
  addresses?: Address[];
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed';
  shippingAddress: Address;
  createdAt: Date;
}

export interface CartItem {
  productId: string;
  quantity: number;
  variant?: string;
  product?: Product;
}

export interface Address {
  id: string;
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault?: boolean;
}

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  recentOrders: Order[];
  topProducts: Product[];
  revenueData: {
    labels: string[];
    values: number[];
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
  icon?: string;
}