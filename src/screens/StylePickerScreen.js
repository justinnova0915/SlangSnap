import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Platform, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useRef } from 'react';
import { Animated } from 'react-native';
import { fonts } from '../styles/typography';
import { GlitchText } from '../components/shared/GlitchText';
import MaskedView from '@react-native-masked-view/masked-view';
import { useDispatch } from 'react-redux';
import { setMode } from '../store/settingsSlice';

const { width } = Dimensions.get('window');

const GradientText = ({ text, colors, style }) => {
  return (
    <MaskedView
      maskElement={
        <Text style={[styles.snapText, style]}>
          {text}
        </Text>
      }
    >
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ flex: 1, padding: Platform.OS === 'ios' ? 4 : 0 }}
      >
        <Text style={[styles.snapText, style, { opacity: 0 }]}>
          {text}
        </Text>
      </LinearGradient>
    </MaskedView>
  );
};

const ModeCard = ({ mode, title, description, gradientColors, features, onPress, contentBgColor, textColor, featureBoxColor }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      style={styles.modeCardContainer}
    >
      <Animated.View style={[styles.modeCard, { transform: [{ scale: scaleAnim }] }]}>
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.modeCardGradient}
        >
          <Text style={styles.modeCardTitle}>{title}</Text>
          <Text style={styles.modeCardDescription}>{description}</Text>
        </LinearGradient>
        <View style={[styles.modeCardContent, { backgroundColor: contentBgColor }]}>
          <View style={styles.modeCardHeader}>
            <View style={styles.modeCardHeaderContent}>
              <View style={[styles.featureIconContainer, { backgroundColor: features[0].iconBgColor }]}>
                <Text style={styles.featureIcon}>{features[0].icon}</Text>
              </View>
              <View>
                <Text style={[styles.featureTitle, { color: textColor, fontWeight: 'bold', fontSize: 18 }]}>{features[0].title}</Text>
                <Text style={[styles.featureDescription, { color: textColor }]}>{features[0].description}</Text>
              </View>
            </View>
            <Text style={[styles.arrowIcon, { color: textColor }]}>→</Text>
          </View>
          <View style={styles.featureGrid}>
            {features.slice(1).map((feature, index) => (
              <View key={index} style={[styles.featureItem, { backgroundColor: featureBoxColor }]}>
                <View style={[styles.featureIconContainer, { backgroundColor: feature.iconBgColor }]}>
                  <Text style={styles.featureIcon}>{feature.icon}</Text>
                </View>
                <Text style={[styles.featureTitle, { color: textColor }]}>{feature.title}</Text>
              </View>
            ))}
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default function StylePickerScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleModeSelect = (mode) => {
    dispatch(setMode(mode));
    navigation.navigate('Preferences', { fromOnboarding: true });
  };

  const zoomerFeatures = [
    { icon: '🔥', title: 'Social Media Slang', description: 'For the chronically online', iconBgColor: 'rgba(236, 72, 153, 0.8)' },
    { icon: '🎮', title: 'Gaming Slang', iconBgColor: 'rgba(139, 92, 246, 0.8)' },
    { icon: '🎵', title: 'Music References', iconBgColor: 'rgba(236, 72, 153, 0.8)' },
    { icon: '📱', title: 'Internet Culture', iconBgColor: 'rgba(139, 92, 246, 0.8)' },
    { icon: '🔥', title: 'Trending Phrases', iconBgColor: 'rgba(236, 72, 153, 0.8)' },
  ];

  const classicFeatures = [
    { icon: '💼', title: 'Business Idioms', description: 'For professional settings', iconBgColor: 'rgba(59, 130, 246, 0.8)' },
    { icon: '🎓', title: 'Academic Idioms', iconBgColor: 'rgba(30, 64, 175, 0.8)' },
    { icon: '💬', title: 'Formal Expressions', iconBgColor: 'rgba(59, 130, 246, 0.8)' },
    { icon: '🤝', title: 'Business Etiquette', iconBgColor: 'rgba(30, 64, 175, 0.8)' },
    { icon: '💼', title: 'Professional Terms', iconBgColor: 'rgba(59, 130, 246, 0.8)' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logoWrapper}>
          <GlitchText 
            text="Slang"
            style={styles.logoTextSlang}
          />
          <GradientText
            text="Snap"
            colors={['#EC4899', '#3B82F6']}
            style={styles.snapTextBase}
          />
        </View>
        <Text style={styles.slogan}>Language learning with style</Text>
      </View>

      <Text style={styles.title}>Pick your vibe!</Text>
      <Text style={styles.subtitle}>Switch anytime</Text>
      <View style={styles.modeCardsContainer}>
        <ModeCard
          mode="zoomer"
          title="Zoomer Mode"
          description="Modern slang, vibrant design"
          gradientColors={['#EC4899', '#8B5CF6']}
          features={zoomerFeatures}
          onPress={() => handleModeSelect('zoomer')}
          contentBgColor="#1F2937"
          textColor="#fff"
          featureBoxColor="rgba(31, 41, 55, 0.8)"
        />
        <ModeCard
          mode="classic"
          title="Classic Mode"
          description="Professional idioms, clean design"
          gradientColors={['#3B82F6', '#1E40AF']}
          features={classicFeatures}
          onPress={() => handleModeSelect('classic')}
          contentBgColor="#FFFFFF"
          textColor="#1F2937"
          featureBoxColor="rgba(243, 244, 246, 0.8)"
        />
      </View>
      <View style={styles.signInContainer}>
        <Text style={styles.signInText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.signInLink}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    paddingHorizontal: 16,
    gap: Platform.OS === 'ios' ? 8 : 4,
  },
  logoTextSlang: {
    fontFamily: fonts.righteous,
    fontSize: 48,
    fontWeight: Platform.select({
      ios: '900',
      android: 'bold'
    }),
    color: '#fff',
    letterSpacing: -1,
  },
  snapText: {
    fontFamily: fonts.permanentMarker,
    fontSize: 48,
    fontWeight: Platform.select({
      ios: '800',
      android: 'bold'
    }),
    color: '#fff',
    textAlign: 'left',
    includeFontPadding: false,
    padding: 0,
    margin: 0,
  },
  snapTextBase: {
    marginTop: Platform.OS === 'ios' ? 6 : 0,
  },
  slogan: {
    fontFamily: fonts.righteous,
    fontSize: 16,
    color: '#D1D5DB',
    marginTop: 4,
  },
  title: {
    fontFamily: fonts.righteous,
    fontSize: 20,
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: fonts.righteous,
    fontSize: 14,
    color: '#D1D5DB',
    marginBottom: 24,
  },
  modeCardsContainer: {
    width: '100%',
    maxWidth: 400,
  },
  modeCardContainer: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  modeCard: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  modeCardGradient: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modeCardTitle: {
    fontFamily: fonts.permanentMarker,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  modeCardDescription: {
    fontFamily: fonts.righteous,
    fontSize: 14,
    color: '#D1D5DB',
    textAlign: 'center',
  },
  modeCardContent: {
    padding: 16,
  },
  modeCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  modeCardHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowIcon: {
    fontSize: 24,
    color: '#9CA3AF',
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    padding: 8,
    borderRadius: 8,
  },
  featureIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  featureIcon: {
    fontSize: 20,
    color: '#fff',
  },
  featureTitle: {
    fontFamily: fonts.righteous,
    fontSize: 14,
    flexShrink: 1,
    fontWeight: 'normal',
  },
  featureDescription: {
    fontFamily: fonts.righteous,
    fontSize: 12,
  },
  signInContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  signInText: {
    fontFamily: fonts.righteous,
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  signInLink: {
    fontFamily: fonts.righteous,
    fontSize: 14,
    color: '#3B82F6',
  },
});