import React, { useState } from 'react';
import { StyleSheet, Text, View, Switch, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fonts, typography } from '../styles/typography';
import { logout } from '../store/authSlice';
import { setMode, selectMode } from '../store/settingsSlice';
import { LinearGradient } from 'expo-linear-gradient';
import { gradients } from '../styles/gradients';

const ModeButton = ({ mode, title, gradientColors, description, isSelected, onPress, isZoomer }) => (
  <TouchableOpacity style={styles.modeButton} onPress={onPress}>
    <LinearGradient
      colors={isSelected ? gradientColors : [isZoomer ? '#1F2937' : '#F3F4F6', isZoomer ? '#374151' : '#F3F4F6']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.modeGradient}
    >
      <Text style={[
        typography[mode].heading.medium, 
        styles.modeButtonTitle,
        { color: isSelected ? isZoomer ? '#000000' : "#fff": isZoomer ? '#fff' : '#000000' }
      ]}>
        {title}
      </Text>
      <Text style={[
        typography[mode].body.small, 
        styles.modeButtonDescription,
        { color: isSelected ? "#D1D5DB": isZoomer ? '#D1D5DB' : '#6B7280' }
      ]}>
        {description}
      </Text>
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
      gradientColors: gradients.classic.secondary,
      description: 'Professional idioms, clean design',
    },
  ];

  const currentTypography = typography[currentMode || 'classic'];
  const isZoomer = currentMode === 'zoomer';

  // Dynamic styles based on mode
  const containerStyle = {
    backgroundColor: isZoomer ? '#111827' : '#FFFFFF',
  };

  const settingsContainerStyle = {
    backgroundColor: isZoomer ? '#1F2937' : '#F3F4F6',
  };

  const textColorStyle = {
    color: isZoomer ? '#FFFFFF' : '#1F2937',
  };

  const subtleTextColorStyle = {
    color: isZoomer ? '#D1D5DB' : '#6B7280',
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, containerStyle]}>
      <Text style={[currentTypography.heading.large, styles.title, textColorStyle]}>
        Preferences
      </Text>

      <Text style={[currentTypography.heading.small, styles.sectionTitle, textColorStyle]}>
        App Mode
      </Text>
      <View style={styles.modesContainer}>
        {modes.map((modeData) => (
          <ModeButton
            key={modeData.mode}
            {...modeData}
            isSelected={currentMode === modeData.mode}
            onPress={() => handleModeChange(modeData.mode)}
            isZoomer={isZoomer}
          />
        ))}
      </View>

      <Text style={[currentTypography.heading.small, styles.sectionTitle, textColorStyle]}>
        Notification Settings
      </Text>
      <View style={[styles.settingsContainer, settingsContainerStyle]}>
        <View style={styles.switchContainer}>
          <Text style={[currentTypography.body.regular, styles.switchLabel, subtleTextColorStyle]}>
            Daily Notifications
          </Text>
          <Switch
            value={notificationSettings.daily}
            onValueChange={() => handleNotificationToggle('daily')}
            trackColor={{
              false: isZoomer ? '#374151' : '#D1D5DB',
              true: isZoomer ? '#3B82F6' : '#2563EB',
            }}
            thumbColor={isZoomer ? '#FFFFFF' : '#FFFFFF'}
          />
        </View>
        <View style={styles.switchContainer}>
          <Text style={[currentTypography.body.regular, styles.switchLabel, subtleTextColorStyle]}>
            Streak Reminders
          </Text>
          <Switch
            value={notificationSettings.streaks}
            onValueChange={() => handleNotificationToggle('streaks')}
            trackColor={{
              false: isZoomer ? '#374151' : '#D1D5DB',
              true: isZoomer ? '#3B82F6' : '#2563EB',
            }}
            thumbColor={isZoomer ? '#FFFFFF' : '#FFFFFF'}
          />
        </View>
        <View style={styles.switchContainer}>
          <Text style={[currentTypography.body.regular, styles.switchLabel, subtleTextColorStyle]}>
            Community Updates
          </Text>
          <Switch
            value={notificationSettings.community}
            onValueChange={() => handleNotificationToggle('community')}
            trackColor={{
              false: isZoomer ? '#374151' : '#D1D5DB',
              true: isZoomer ? '#3B82F6' : '#2563EB',
            }}
            thumbColor={isZoomer ? '#FFFFFF' : '#FFFFFF'}
          />
        </View>
      </View>

      <Text style={[currentTypography.heading.small, styles.sectionTitle, textColorStyle]}>
        Sound Effects
      </Text>
      <View style={[styles.settingsContainer, settingsContainerStyle]}>
        <View style={styles.switchContainer}>
          <Text style={[currentTypography.body.regular, styles.switchLabel, subtleTextColorStyle]}>
            Enable Sound Effects
          </Text>
          <Switch
            value={soundEffects}
            onValueChange={() => setSoundEffects((prev) => !prev)}
            trackColor={{
              false: isZoomer ? '#374151' : '#D1D5DB',
              true: isZoomer ? '#3B82F6' : '#2563EB',
            }}
            thumbColor={isZoomer ? '#FFFFFF' : '#FFFFFF'}
          />
        </View>
      </View>

      {route.params?.fromOnboarding && (
        <TouchableOpacity
          style={[
            styles.continueButton,
            {
              backgroundColor: isZoomer ? '#3B82F6' : '#2563EB',
            },
          ]}
          onPress={() => navigation.navigate('FirstSnap')}
        >
          <Text style={[currentTypography.button.large, styles.buttonText]}>Continue</Text>
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
        <Text style={[currentTypography.button.large, styles.buttonText]}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
  },
  title: {
    marginBottom: 24,
  },
  sectionTitle: {
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
    marginBottom: 4,
  },
  modeButtonDescription: {
    color: '#D1D5DB',
  },
  settingsContainer: {
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
  continueButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#FFFFFF',
  },
  logoutButton: {
    backgroundColor: '#DC2626',
    marginTop: 12,
  },
});

export default PreferencesScreen;