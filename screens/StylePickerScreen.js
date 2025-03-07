import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { setMode } from '../src/store/settingsSlice';

export default function StylePickerScreen({ navigation }) {
  const dispatch = useDispatch();

  const handleModeSelection = (mode) => {
    dispatch(setMode(mode));
    navigation.navigate(mode === 'zoomer' ? 'HomeZoomer' : 'HomeClassic');
  };
  return (
    <View style={styles.container}>
      <View style={styles.statusBar}>
        <Text style={styles.statusText}>9:41</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Pick your vibe!</Text>
        <Text style={styles.subtitle}>Switch anytime</Text>
        <TouchableOpacity
          style={[styles.card, styles.zoomerCard]}
          onPress={() => handleModeSelection('zoomer')}
        >
          <Text style={styles.cardTitle}>Zoomer Mode</Text>
          <Text style={styles.cardSubtitle}>Modern slang, vibrant design</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.card, styles.classicCard]}
          onPress={() => handleModeSelection('classic')}
        >
          <Text style={styles.cardTitle}>Classic Mode</Text>
          <Text style={styles.cardSubtitle}>Professional idioms, clean design</Text>
        </TouchableOpacity>
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#9ca3af',
    marginBottom: 20,
  },
  card: {
    width: '100%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  zoomerCard: {
    backgroundColor: '#f02fc2', // Pink for Zoomer
  },
  classicCard: {
    backgroundColor: '#3b82f6', // Blue for Classic
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
});