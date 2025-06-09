export interface User {
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
  county: string;
  town: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  inStock: boolean;
  rating: number;
  totalRatings?: number;
  discount?: number;
  category?: string;
  description?: string;
  specifications?: string;
  packageContent?: string;
  reviews?: Review[];
}

export interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  inStock?: boolean;
  quantity: number;
}

export interface ProductVariation {
  id: number;
  name: string;
  image: string;
}

export interface Review {
  id: number;
  productId: number;
  userId: string;
  title: string;
  text: string;
  rating: number;
  createdAt: string;
  user: User;
}

export interface Order {
  id: number;
  userId: number;
  products: {
    id: number;
    name: string;
    price: number;
    quantity: number;
    variation?: string;
    image: string;
  }[];
  total: number;
  shippingFee: number;
  status: "pending" | "processing" | "shipped" | "delivered";
  date: string;
  shippingAddress: {
    county: string;
    town: string;
  };
}
