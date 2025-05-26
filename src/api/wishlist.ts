import api from './axios';

export const getWishlist = async () => {
  const response = await api.get('/wishlist');
  return response.data;
};

export const addToWishlist = async (productId: number) => {
  const response = await api.post('/wishlist', { productId });
  return response.data;
};

export const removeFromWishlist = async (productId: number) => {
  const response = await api.delete(`/wishlist/${productId}`);
  return response.data;
};

export const checkWishlistItem = async (productId: number) => {
  const response = await api.get(`/wishlist/check/${productId}`);
  return response.data;
};