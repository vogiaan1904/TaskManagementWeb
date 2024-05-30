import axios, { AxiosInstance, InternalAxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';
const API_URL = 'http://localhost:5200/api'; // Your backend URL

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    (config.headers as RawAxiosRequestHeaders).Authorization = `Bearer ${token}`; // Cast to RawAxiosRequestHeaders
  }
  return config;
});

export default api;