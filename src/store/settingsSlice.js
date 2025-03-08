import { createSlice } from '@reduxjs/toolkit';

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
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setMode(state, action) {
      state.mode = action.payload;
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
