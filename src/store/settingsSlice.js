import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'zoomer', // Default mode
  notifications: true,
  soundEnabled: true,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    toggleNotifications: (state) => {
      state.notifications = !state.notifications;
    },
    toggleSound: (state) => {
      state.soundEnabled = !state.soundEnabled;
    },
  },
});

export const { setMode, toggleNotifications, toggleSound } = settingsSlice.actions;
export const selectMode = (state) => state.settings.mode;
export const selectNotifications = (state) => state.settings.notifications;
export const selectSound = (state) => state.settings.soundEnabled;

export default settingsSlice.reducer;
