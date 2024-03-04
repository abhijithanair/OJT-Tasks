import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api', // Assuming your API endpoints start with /api
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Retrieve token from local storage
    const token = localStorage.getItem('token');
    
    // If token exists, set it in the request header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
