export interface User {
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
  county: string;
  town: string;
  shippingCharge: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  inStock: boolean;
  averageRating?: number;
  category?: string;
  description?: string;
  specifications?: string;
  packageContent?: string;
  reviews?: Review[];
}

export interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  inStock: boolean;
  averageRating?: number;
  numberOfReviews?: number;
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
export interface WishlistItem {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  inStock?: boolean;
}

export interface ProductVariation {
  id: number;
  name: string;
  image: string;
}

export interface Review {
  id?: string;
  productId: number;
  reviewAuthor: string;
  reviewTitle: string;
  reviewBody: string;
  rating: number;
  createdAt?: string;
}

export interface Order {
  id?: string;
  orderNumber?: number;
  userId?: string;
  totalPrice: number;
  town: string;
  county: string;
  phoneNumber: string;
  status?: "pending" | "failed" | "processed" | "shipped" | "delivered";
  deliveredAt?: string;
  isPaid?: boolean;
  paidAt?: string;
  checkoutRequestId?: string;
  merchantRequestId?: string;
  resultDesc?: string;
  createdAt?: string;
  user?: User;
  orderItems: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    isReviewed?: boolean;
  }[];
}
