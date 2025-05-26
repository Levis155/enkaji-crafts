import api from './axios';

interface ShippingAddressData {
  county: string;
  town: string;
}

export const getCurrentUser = async () => {
  const response = await api.get('/users/me');
  return response.data;
};

export const updateShippingAddress = async (addressData: ShippingAddressData) => {
  const response = await api.put('/users/shipping-address', addressData);
  return response.data;
};