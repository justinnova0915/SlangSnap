import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fonts } from '../../styles/typography';

const VoiceStudioPromo = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.promoCard}>
        <View style={styles.content}>
          <Text style={styles.title}>Voice Snap Studio</Text>
          <Text style={styles.description}>
            Practice pronunciation and build confidence with your voice recordings.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={onPress}
          >
            <Text style={styles.buttonText}>Open Voice Studio</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.iconContainer}>
          <Ionicons name="mic" size={32} color="#2563EB" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  promoCard: {
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  content: {
    flex: 1,
  },
  title: {
    fontFamily: fonts.georgia,
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 12,
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#2563EB',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: fonts.georgia,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#DBEAFE',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
});

export default VoiceStudioPromo;