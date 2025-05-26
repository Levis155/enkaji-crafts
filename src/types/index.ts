export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  inStock: boolean;
  rating: number;
  totalRatings: number;
  category: string;
  description: string;
  specifications: {
    [key: string]: string;
  };
  inPackage: string[];
  variations?: ProductVariation[];
}

export interface ProductVariation {
  id: number;
  name: string;
  image: string;
}

export interface Review {
  id: number;
  productId: number;
  userId: number;
  userName: string;
  title: string;
  text: string;
  rating: number;
  date: string;
  isVerified: boolean;
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
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  date: string;
  shippingAddress: {
    county: string;
    town: string;
  };
}