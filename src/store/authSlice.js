import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
  styleSelected: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
      // Store token in AsyncStorage
      AsyncStorage.setItem('token', action.payload.token);
      AsyncStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    registerStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
      // Store token in AsyncStorage
      AsyncStorage.setItem('token', action.payload.token);
      AsyncStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    registerFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      state.styleSelected = false;
      // Remove all auth-related data
      Promise.all([
        AsyncStorage.removeItem('token'),
        AsyncStorage.removeItem('user')
      ]).then(() => {
        console.log('[Auth] Cleared all auth data');
      }).catch(error => {
        console.error('[Auth] Error clearing data:', error);
      });
    },
    clearError: (state) => {
      state.error = null;
    },
    stylePickerComplete: (state) => {
      state.styleSelected = true;
    },
    resetStyle: (state) => {
      state.styleSelected = false;
    }
  }
});

export const { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  registerStart, 
  registerSuccess, 
  registerFailure,
  logout,
  clearError,
  stylePickerComplete,
  resetStyle
} = authSlice.actions;

export default authSlice.reducer;