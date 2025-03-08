import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { fonts } from '../styles/typography';

export default function SettingsScreen() {
  const navigation = useNavigation();
  const mode = useSelector(state => state.settings.mode);
  const preferences = useSelector(state => state.settings.preferences);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Current Mode</Text>
        <Text style={styles.modeText}>
          {mode === 'zoomer' ? '🔥 Zoomer Mode' : '📚 Classic Mode'}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.preferencesContainer}>
          {preferences?.interests?.map((interest, index) => (
            <View key={index} style={styles.interestTag}>
              <Text style={styles.interestText}>{interest}</Text>
            </View>
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Preferences')}
      >
        <Text style={styles.buttonText}>Edit Preferences</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    padding: 24,
  },
  title: {
    fontFamily: fonts.righteous,
    fontSize: 32,
    color: '#fff',
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: fonts.righteous,
    fontSize: 18,
    color: '#D1D5DB',
    marginBottom: 12,
  },
  modeText: {
    fontFamily: fonts.righteous,
    fontSize: 20,
    color: '#fff',
  },
  preferencesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  interestTag: {
    backgroundColor: '#3B82F6',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  interestText: {
    fontFamily: fonts.righteous,
    fontSize: 14,
    color: '#fff',
  },
  button: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    fontFamily: fonts.righteous,
    fontSize: 18,
    color: '#fff',
  },
});