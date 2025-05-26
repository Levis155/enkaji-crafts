import api from './axios';

interface OrderItem {
  productId: number;
  variationId?: number;
  quantity: number;
  price: number;
}

interface CreateOrderData {
  items: OrderItem[];
  shippingFee: number;
}

export const createOrder = async (orderData: CreateOrderData) => {
  const response = await api.post('/orders', orderData);
  return response.data;
};

export const getUserOrders = async () => {
  const response = await api.get('/orders');
  return response.data;
};

export const getOrderById = async (id: number) => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};

// Admin function
export const updateOrderStatus = async (id: number, status: string) => {
  const response = await api.put(`/orders/${id}/status`, { status });
  return response.data;
};