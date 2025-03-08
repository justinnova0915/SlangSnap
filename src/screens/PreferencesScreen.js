import React, { useState } from 'react';
import { StyleSheet, Text, View, Switch, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { fonts } from '../styles/typography';

const PreferencesScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const [interests, setInterests] = useState([]);
  const [notificationSettings, setNotificationSettings] = useState({
    daily: false,
    streaks: false,
    community: false,
  });
  const [soundEffects, setSoundEffects] = useState(false);

  const handleInterestToggle = (interest) => {
    setInterests((prevInterests) =>
      prevInterests.includes(interest)
        ? prevInterests.filter((i) => i !== interest)
        : [...prevInterests, interest]
    );
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Preferences</Text>

      <Text style={styles.sectionTitle}>Interests</Text>
      <View style={styles.interestsContainer}>
        {['Gaming', 'Music', 'Movies', 'Books', 'Travel'].map((interest) => (
          <TouchableOpacity
            key={interest}
            style={[
              styles.interestButton,
              interests.includes(interest) && styles.interestButtonSelected,
            ]}
            onPress={() => handleInterestToggle(interest)}
          >
            <Text
              style={[
                styles.interestButtonText,
                interests.includes(interest) && styles.interestButtonTextSelected,
              ]}
            >
              {interest}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

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

      <TouchableOpacity
        style={styles.continueButton}
        onPress={handleContinue}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
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
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  interestButton: {
    backgroundColor: '#1F2937',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  interestButtonSelected: {
    backgroundColor: '#3B82F6',
  },
  interestButtonText: {
    fontFamily: fonts.righteous,
    fontSize: 16,
    color: '#D1D5DB',
  },
  interestButtonTextSelected: {
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
});

export default PreferencesScreen;