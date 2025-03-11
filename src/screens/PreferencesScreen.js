import React, { useState } from 'react';
import { StyleSheet, Text, View, Switch, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, } from '@react-navigation/native';
import { useDispatch, useSelector, } from 'react-redux';
import { fonts } from '../styles/typography';
import { logout } from '../store/authSlice';
import { setMode, selectMode } from '../store/settingsSlice';

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

  const handleContinue = () => {
    // Store preferences in Redux (to be implemented)
    // For now, just navigate to FirstSnap
    navigation.navigate('FirstSnap');
  };

  const renderPreferences = () => {
    if (currentMode === 'zoomer') {
      return (
        <>
          <Text style={styles.sectionTitle}>Quick Settings 🚀</Text>
          <View style={styles.switchContainer}>
            <Text style={[styles.switchLabel, styles.zoomerText]}>Notifications</Text>
            <Switch
              value={Object.values(notificationSettings).some(v => v)}
              onValueChange={(value) => {
                setNotificationSettings({
                  daily: value,
                  streaks: value,
                  community: value,
                });
              }}
            />
          </View>
          <View style={styles.switchContainer}>
            <Text style={[styles.switchLabel, styles.zoomerText]}>Sound FX</Text>
            <Switch
              value={soundEffects}
              onValueChange={() => setSoundEffects((prev) => !prev)}
            />
          </View>
        </>
      );
    }

    return (
      <>
        <Text style={styles.sectionTitle}>Notification Settings</Text>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Daily Notifications</Text>
          <Switch
            value={notificationSettings.daily}
            onValueChange={() => handleNotificationToggle('daily')}
          />
        </View>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Streak Reminders</Text>
          <Switch
            value={notificationSettings.streaks}
            onValueChange={() => handleNotificationToggle('streaks')}
          />
        </View>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Community Updates</Text>
          <Switch
            value={notificationSettings.community}
            onValueChange={() => handleNotificationToggle('community')}
          />
        </View>

        <Text style={styles.sectionTitle}>Sound Effects</Text>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Enable Sound Effects</Text>
          <Switch
            value={soundEffects}
            onValueChange={() => setSoundEffects((prev) => !prev)}
          />
        </View>
      </>
    );
  };

  return (
    <ScrollView contentContainerStyle={[
      styles.container,
      currentMode === 'zoomer' && styles.zoomerContainer
    ]}>
      <Text style={[styles.title, currentMode === 'zoomer' && styles.zoomerTitle]}>
        {currentMode === 'zoomer' ? 'Settings ⚡' : 'Preferences'}
      </Text>

      <Text style={styles.sectionTitle}>App Mode</Text>
      <View style={styles.modesContainer}>
        {['zoomer', 'classic'].map((mode) => (
          <TouchableOpacity
            key={mode}
            style={[
              styles.modeButton,
              currentMode === mode && styles.modeButtonSelected,
            ]}
            onPress={() => handleModeChange(mode)}
          >
            <Text
              style={[
                styles.modeButtonText,
                currentMode === mode && styles.modeButtonTextSelected,
              ]}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {renderPreferences()}

      {route.params?.fromOnboarding && (
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
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
        <Text style={styles.continueButtonText}>Logout</Text>
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
    fontFamily: fonts.righteous,
    fontSize: 32,
    color: '#fff',
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: fonts.righteous,
    fontSize: 20,
    color: '#fff',
    marginBottom: 12,
  },
  modesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  modeButton: {
    backgroundColor: '#1F2937',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
  },
  modeButtonSelected: {
    backgroundColor: '#3B82F6',
  },
  modeButtonText: {
    fontFamily: fonts.righteous,
    fontSize: 18,
    color: '#D1D5DB',
    textTransform: 'capitalize',
  },
  modeButtonTextSelected: {
    color: '#fff',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  switchLabel: {
    fontFamily: fonts.righteous,
    fontSize: 16,
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
    fontFamily: fonts.righteous,
    fontSize: 18,
    color: '#fff',
  },
  logoutButton: {
    backgroundColor: '#DC2626',  // Red color for warning
    marginTop: 12,
  },
});

export default PreferencesScreen;