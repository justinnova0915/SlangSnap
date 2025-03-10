import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import { fonts } from '../../styles/typography';

const VoiceStudioPromo = ({ onPress, mode = 'classic' }) => {
  const isZoomer = mode === 'zoomer';

  const Content = () => (
    <View style={styles.content}>
      <Text style={[styles.title, isZoomer && styles.zoomerTitle]}>
        {isZoomer ? 'Voice Snaps 🎤' : 'Voice Snap Studio'}
      </Text>
      <Text style={[styles.description, isZoomer && styles.zoomerDescription]}>
        {isZoomer
          ? "Drop some fire voice snaps and level up your slang game!"
          : "Practice pronunciation and build confidence with your voice recordings."}
      </Text>
      <TouchableOpacity
        style={[styles.button, isZoomer && styles.zoomerButton]}
        onPress={onPress}
      >
        <Text style={[styles.buttonText, isZoomer && styles.zoomerButtonText]}>
          {isZoomer ? "Let's Go! 🚀" : "Open Voice Studio"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const Icon = () => (
    <View style={[styles.iconContainer, isZoomer && styles.zoomerIconContainer]}>
      {isZoomer ? (
        <LinearGradient
          colors={['#EC4899', '#8B5CF6']}
          style={styles.iconGradient}
        >
          <FontAwesome5 name="microphone-alt" size={24} color="white" />
        </LinearGradient>
      ) : (
        <FontAwesome5 name="microphone" size={24} color="#2563EB" />
      )}
    </View>
  );

  if (isZoomer) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#1F2937', '#111827']}
          style={[styles.promoCard, styles.zoomerPromoCard]}
        >
          <Content />
          <Icon />
        </LinearGradient>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.promoCard}>
        <Content />
        <Icon />
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
  zoomerPromoCard: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 20,
    borderWidth: 0,
    borderColor: 'rgba(255,255,255,0.1)',
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
  zoomerTitle: {
    fontFamily: fonts.righteous,
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 12,
    lineHeight: 20,
  },
  zoomerDescription: {
    fontSize: 16,
    color: '#9CA3AF',
    marginBottom: 16,
    lineHeight: 24,
    fontFamily: fonts.righteous,
  },
  button: {
    backgroundColor: '#2563EB',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  zoomerButton: {
    backgroundColor: '#EC4899',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    shadowColor: '#EC4899',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: fonts.georgia,
  },
  zoomerButtonText: {
    fontSize: 16,
    fontFamily: fonts.righteous,
    letterSpacing: 0.5,
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
  zoomerIconContainer: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: 'transparent',
    marginLeft: 16,
  },
  iconGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default VoiceStudioPromo;