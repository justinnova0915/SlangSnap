import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { store } from '../store/store';
import { logout } from '../store/authSlice';

// For debugging
const logError = (error) => {
  console.error('API Error:', {
    message: error.message,
    response: error.response?.data,
    status: error.response?.status,
    url: error.config?.url,
    method: error.config?.method
  });
  return error;
};

const api = axios.create({
  baseURL: 'http://192.168.2.159:5000/api',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000 // 10 second timeout
});

// Add a request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

export const preferencesAPI = {
  getPreferences: async () => {
    try {
      console.log('Fetching preferences...');
      const response = await api.get('/user/preferences');
      console.log('Preferences response:', response.data);
      return response.data;
    } catch (error) {
      logError(error);
      throw error.response?.data?.message || 'Failed to get preferences';
    }
  },
  
  updatePreferences: async (preferences) => {
    try {
      console.log('Updating preferences with:', preferences);
      const response = await api.put('/user/preferences', preferences);
      console.log('Update preferences response:', response.data);
      return response.data;
    } catch (error) {
      logError(error);
      throw error.response?.data?.message || 'Failed to update preferences';
    }
  }
};

export const authAPI = {
  testConnection: async () => {
    try {
      const response = await api.get('/auth/test');
      return true;
    } catch (error) {
      throw new Error('Cannot connect to the server');
    }
  },
  register: async (username, email, password) => {
    try {
      console.log('Attempting registration:', { username, email });
      const response = await api.post('/auth/register', {
        username,
        email,
        password
      });
      console.log('Registration successful:', response.data);
      return response.data;
    } catch (error) {
      logError(error);
      throw error.response?.data?.message || 'Registration failed. Please check your connection and try again.';
    }
  },

  login: async (email, password) => {
    try {
      console.log('Attempting login:', { email });
      const response = await api.post('/auth/login', {
        email,
        password
      });
      console.log('Login successful:', response.data);
      return response.data;
    } catch (error) {
      logError(error);
      throw error.response?.data?.message || 'Login failed. Please check your credentials and try again.';
    }
  },

  getProfile: async () => {
    try {
      const response = await api.get('/user/profile');
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to get profile';
    }
  }
};

export const videoAPI = {
  getTerms: async () => {
    try {
      console.log('Fetching available terms...');
      const response = await api.get('/terms');
      console.log('Terms response:', response.data);
      return response.data;
    } catch (error) {
      logError(error);
      throw error.response?.data?.message || 'Failed to get terms';
    }
  },

  getVideo: async (termId) => {
    try {
      console.log('Fetching video for term:', termId);
      const response = await api.get(`/videos/${termId}`);
      console.log('Video response:', response.data);
      return response.data;
    } catch (error) {
      logError(error);
      throw error.response?.data?.message || 'Failed to get video';
    }
  }
};

export default api;