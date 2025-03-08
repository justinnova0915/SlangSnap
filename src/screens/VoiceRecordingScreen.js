import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { fonts } from '../styles/typography';

const VoiceRecordingScreen = () => {
  const mode = useSelector(state => state.settings.mode); // Properly define the selector

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {mode === 'zoomer' ? 'Voice Snap Studio 🎤' : 'Voice Recording Studio'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111827',
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontFamily: fonts.righteous,
  },
});

export default VoiceRecordingScreen;