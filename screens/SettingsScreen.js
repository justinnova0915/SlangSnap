import React from 'react';
import { StyleSheet, Text, View, Switch, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  setMode,
  toggleNotifications,
  toggleSound,
  selectMode,
  selectNotifications,
  selectSound
} from '../src/store/settingsSlice';

export default function SettingsScreen({ navigation }) {
  const dispatch = useDispatch();
  const mode = useSelector(selectMode);
  const notificationsEnabled = useSelector(selectNotifications);
  const soundEffectsEnabled = useSelector(selectSound);

  const handleModeSwitch = () => {
    const newMode = mode === 'zoomer' ? 'classic' : 'zoomer';
    dispatch(setMode(newMode));
    navigation.replace(newMode === 'zoomer' ? 'HomeZoomer' : 'HomeClassic');
  };

  const handleNotificationsToggle = () => {
    dispatch(toggleNotifications());
  };

  const handleSoundToggle = () => {
    dispatch(toggleSound());
  };

  return (
    <View style={styles.container}>
      <View style={styles.statusBar}>
        <Text style={styles.statusText}>9:41</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.header}>Settings</Text>
        
        {/* Notifications Toggle */}
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={handleNotificationsToggle}
            trackColor={{ false: '#777', true: mode === 'zoomer' ? '#f02fc2' : '#3b82f6' }}
            thumbColor={notificationsEnabled ? '#fff' : '#ccc'}
          />
        </View>

        {/* Sound Effects Toggle */}
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Sound Effects</Text>
          <Switch
            value={soundEffectsEnabled}
            onValueChange={handleSoundToggle}
            trackColor={{ false: '#777', true: mode === 'zoomer' ? '#f02fc2' : '#3b82f6' }}
            thumbColor={soundEffectsEnabled ? '#fff' : '#ccc'}
          />
        </View>

        {/* Mode Switcher */}
        <View style={styles.modeSection}>
          <Text style={styles.modeLabel}>Current Vibe: {mode === 'zoomer' ? 'Zoomer' : 'Classic'}</Text>
          <TouchableOpacity
            style={[
              styles.modeButton,
              mode === 'zoomer' ? styles.buttonZoomer : styles.buttonClassic,
            ]}
            onPress={handleModeSwitch}
          >
            <Text style={styles.buttonText}>
              Switch to {mode === 'zoomer' ? 'Classic' : 'Zoomer'} Mode
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  statusBar: {
    height: 28,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  settingLabel: {
    fontSize: 18,
    color: '#fff',
  },
  modeSection: {
    marginTop: 40,
    alignItems: 'center',
  },
  modeLabel: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 15,
  },
  modeButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonZoomer: {
    backgroundColor: '#ec4899',
  },
  buttonClassic: {
    backgroundColor: '#1e40af',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});