import React from 'react';
import { StyleSheet, View } from 'react-native';
import { fonts } from '../styles/typography';
import PreferencesContent from './PreferencesContent';

const PreferencesScreen = ({ route }) => {
  const fromOnboarding = route.params?.fromOnboarding || false;

  return (
    <View style={styles.container}>
      <PreferencesContent fromOnboarding={fromOnboarding} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
});

export default PreferencesScreen;