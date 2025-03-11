import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import settingsReducer, { savePreferences } from './settingsSlice';
import authReducer from './authSlice';

// Simple middleware that saves preferences when action indicates it
const savingMiddleware = store => next => action => {
  const result = next(action);
  if (action.meta?.save) {
    store.dispatch(savePreferences());
  }
  return result;
};


const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['settings', 'auth']
};

const rootReducer = combineReducers({
  settings: settingsReducer,
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(savingMiddleware),
});

export const persistor = persistStore(store);
