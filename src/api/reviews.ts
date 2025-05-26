import api from './axios';

interface CreateReviewData {
  productId: number;
  title: string;
  text: string;
  rating: number;
}

export const getProductReviews = async (productId: number) => {
  const response = await api.get(`/reviews/product/${productId}`);
  return response.data;
};

export const createReview = async (reviewData: CreateReviewData) => {
  const response = await api.post('/reviews', reviewData);
  return response.data;
};

export const updateReview = async (id: number, reviewData: Partial<CreateReviewData>) => {
  const response = await api.put(`/reviews/${id}`, reviewData);
  return response.data;
};

export const deleteReview = async (id: number) => {
  const response = await api.delete(`/reviews/${id}`);
  return response.data;
};

export const getPendingReviews = async () => {
  const response = await api.get('/reviews/pending');
  return response.data;
};