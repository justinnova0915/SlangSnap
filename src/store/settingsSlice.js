import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { preferencesAPI } from '../services/api';
import { store } from './store';

export const loadPreferences = createAsyncThunk(
  'settings/loadPreferences',
  async () => {
    const preferences = await preferencesAPI.getPreferences();
    return preferences;
  }
);

export const savePreferences = createAsyncThunk(
  'settings/savePreferences',
  async (_, { getState }) => {
    const { settings } = getState();
    await preferencesAPI.updatePreferences(settings.preferences);
    return settings.preferences;
  }
);

const initialState = {
  mode: null, // 'zoomer' or 'classic'
  preferences: {
    interests: [],
    notifications: {
      daily: false,
      streaks: false,
      community: false,
    },
    soundEffects: false,
  },
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setMode(state, action) {
      console.log('Setting mode:', action.payload);
      state.mode = action.payload;
      state.preferences.mode = action.payload;
    },
    setPreferences(state, action) {
      state.preferences = {
        ...state.preferences,
        ...action.payload,
      };
    },
    setInterests(state, action) {
      state.preferences.interests = action.payload;
    },
    setNotificationSettings(state, action) {
      state.preferences.notifications = {
        ...state.preferences.notifications,
        ...action.payload,
      };
    },
    setSoundEffects(state, action) {
      state.preferences.soundEffects = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPreferences.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadPreferences.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.preferences = action.payload;
        if (action.payload.mode) {
          state.mode = action.payload.mode;
        }
      })
      .addCase(loadPreferences.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(savePreferences.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(savePreferences.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(savePreferences.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {
  setMode,
  setPreferences,
  setInterests,
  setNotificationSettings,
  setSoundEffects,
} = settingsSlice.actions;

// Selectors
export const selectMode = (state) => state.settings.mode;

export default settingsSlice.reducer;
