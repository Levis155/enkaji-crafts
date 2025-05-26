import api from './axios';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData extends LoginCredentials {
  fullName: string;
  phone?: string;
  county?: string;
  town?: string;
}

interface UpdateProfileData {
  fullName?: string;
  email?: string;
  phone?: string;
  county?: string;
  town?: string;
  password?: string;
}

export const loginUser = async (credentials: LoginCredentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const registerUser = async (userData: RegisterData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const getUserProfile = async () => {
  const response = await api.get('/auth/profile');
  return response.data;
};

export const updateUserProfile = async (userData: UpdateProfileData) => {
  const response = await api.put('/auth/profile', userData);
  return response.data;
};