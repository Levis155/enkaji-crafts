import api from './axios';

interface ProductFilter {
  category?: string;
  search?: string;
  sort?: string;
}

export const getProducts = async (filters: ProductFilter = {}) => {
  const response = await api.get('/products', { params: filters });
  return response.data;
};

export const getProductById = async (id: number) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const getRelatedProducts = async (id: number, limit: number = 4) => {
  const response = await api.get(`/products/${id}/related`, {
    params: { limit }
  });
  return response.data;
};

export const getCategories = async () => {
  const response = await api.get('/products/categories');
  return response.data;
};

// Admin functions (would normally be in a separate admin API file)
export const createProduct = async (productData: any) => {
  const response = await api.post('/products', productData);
  return response.data;
};

export const updateProduct = async (id: number, productData: any) => {
  const response = await api.put(`/products/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id: number) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};