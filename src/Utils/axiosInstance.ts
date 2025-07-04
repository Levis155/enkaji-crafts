import axios from "axios";
import apiUrl from "./apiUrl";

const axiosInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: true, 
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        await axios.get(`${apiUrl}/auth/refresh`, {
          withCredentials: true,
        });

        return axiosInstance(originalRequest); 
      } catch (refreshError) {
        console.error("Refresh failed:", refreshError);
        window.location.href = "/login"; 
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
