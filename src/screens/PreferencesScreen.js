import React, { useState } from 'react';
import { StyleSheet, Text, View, Switch, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fonts, typography } from '../styles/typography';
import { logout } from '../store/authSlice';
import { setMode, selectMode } from '../store/settingsSlice';
import { LinearGradient } from 'expo-linear-gradient';
import { gradients } from '../styles/gradients';

const ModeButton = ({ mode, title, gradientColors, description, isSelected, onPress }) => (
  <TouchableOpacity style={styles.modeButton} onPress={onPress}>
    <LinearGradient
      colors={isSelected ? gradientColors : ['#1F2937', '#1F2937']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.modeGradient}
    >
      <Text style={[typography[mode].heading.medium, styles.modeButtonTitle]}>{title}</Text>
      <Text style={[typography[mode].body.small, styles.modeButtonDescription]}>{description}</Text>
    </LinearGradient>
  </TouchableOpacity>
);

const PreferencesScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const currentMode = useSelector(selectMode);
  const [notificationSettings, setNotificationSettings] = useState({
    daily: false,
    streaks: false,
    community: false,
  });
  const [soundEffects, setSoundEffects] = useState(false);

  const handleModeChange = (mode) => {
    dispatch(setMode(mode));
  };

  const handleNotificationToggle = (type) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const modes = [
    {
      mode: 'zoomer',
      title: 'Zoomer Mode',
      gradientColors: gradients.zoomer.secondary,
      description: 'Modern slang, vibrant design',
    },
    {
      mode: 'classic',
      title: 'Classic Mode',
      gradientColors: gradients.classic.primary,
      description: 'Professional idioms, clean design',
    },
  ];

  const currentTypography = typography[currentMode || 'classic'];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={[currentTypography.heading.large, styles.title]}>Preferences</Text>

      <Text style={[currentTypography.heading.small, styles.sectionTitle]}>App Mode</Text>
      <View style={styles.modesContainer}>
        {modes.map((modeData) => (
          <ModeButton
            key={modeData.mode}
            {...modeData}
            isSelected={currentMode === modeData.mode}
            onPress={() => handleModeChange(modeData.mode)}
          />
        ))}
      </View>

      <Text style={[currentTypography.heading.small, styles.sectionTitle]}>Notification Settings</Text>
      <View style={styles.settingsContainer}>
        <View style={styles.switchContainer}>
          <Text style={[currentTypography.body.regular, styles.switchLabel]}>Daily Notifications</Text>
          <Switch
            value={notificationSettings.daily}
            onValueChange={() => handleNotificationToggle('daily')}
          />
        </View>
        <View style={styles.switchContainer}>
          <Text style={[currentTypography.body.regular, styles.switchLabel]}>Streak Reminders</Text>
          <Switch
            value={notificationSettings.streaks}
            onValueChange={() => handleNotificationToggle('streaks')}
          />
        </View>
        <View style={styles.switchContainer}>
          <Text style={[currentTypography.body.regular, styles.switchLabel]}>Community Updates</Text>
          <Switch
            value={notificationSettings.community}
            onValueChange={() => handleNotificationToggle('community')}
          />
        </View>
      </View>

      <Text style={[currentTypography.heading.small, styles.sectionTitle]}>Sound Effects</Text>
      <View style={styles.settingsContainer}>
        <View style={styles.switchContainer}>
          <Text style={[currentTypography.body.regular, styles.switchLabel]}>Enable Sound Effects</Text>
          <Switch
            value={soundEffects}
            onValueChange={() => setSoundEffects((prev) => !prev)}
          />
        </View>
      </View>

      {route.params?.fromOnboarding && (
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.navigate('FirstSnap')}
        >
          <Text style={[currentTypography.button.large, styles.continueButtonText]}>Continue</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={[styles.continueButton, styles.logoutButton]}
        onPress={() => {
          dispatch(logout());
          navigation.reset({
            index: 0,
            routes: [{ name: 'Auth' }],
          });
        }}
      >
        <Text style={[currentTypography.button.large, styles.continueButtonText]}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#111827',
    padding: 24,
  },
  title: {
    color: '#fff',
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#fff',
    marginBottom: 12,
  },
  modesContainer: {
    width: '100%',
    marginBottom: 24,
  },
  modeButton: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  modeGradient: {
    padding: 16,
    borderRadius: 12,
  },
  modeButtonTitle: {
    color: '#fff',
    marginBottom: 4,
  },
  modeButtonDescription: {
    color: '#D1D5DB',
  },
  settingsContainer: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  switchLabel: {
    color: '#D1D5DB',
  },
  continueButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  continueButtonText: {
    color: '#fff',
  },
  logoutButton: {
    backgroundColor: '#DC2626',
    marginTop: 12,
  },
});

export default PreferencesScreen;