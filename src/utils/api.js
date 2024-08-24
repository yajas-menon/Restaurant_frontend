// src/utils/api.js
import axios from 'axios';
// https://restaurant-backend-khaki.vercel.app
const api = axios.create({
  baseURL: 'https://restaurant-backend-khaki.vercel.app', // Adjust the baseURL as needed
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
