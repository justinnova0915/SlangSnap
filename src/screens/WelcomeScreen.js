import React, { useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Platform, ScrollView, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { GlitchText } from '../components/shared/GlitchText';
import { fonts } from '../styles/typography';

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

export default function WelcomeScreen({ navigation }) {
  // Bouncing animation for dartboard
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const bounce = Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -20,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    );

    bounce.start();

    return () => bounce.stop();
  }, [bounceAnim]);

  const features = [
    {
      icon: '🎮',
      title: 'Gamified Learning',
      gradient: ['#EC4899', '#8B5CF6']
    },
    {
      icon: '🎯',
      title: 'Contextual Examples',
      gradient: ['#3B82F6', '#4F46E5']
    },
    {
      icon: '🎤',
      title: 'Voice Practice',
      gradient: ['#10B981', '#059669']
    },
    {
      icon: '👤',
      title: 'Pick Your Style',
      gradient: ['#F59E0B', '#D97706']
    },
    // Additional features
    {
      icon: '🌍',
      title: 'Global Slang',
      gradient: ['#6366F1', '#A855F7'] // Indigo to Purple
    },
    {
      icon: '🔥',
      title: 'Trending Now',
      gradient: ['#F43F5E', '#BE185D'] // Rose to Pink
    },
    {
      icon: '🤝',
      title: 'Community Driven',
      gradient: ['#2DD4BF', '#0F766E'] // Teal to Emerald
    },
    {
      icon: '💡',
      title: 'Daily Updates',
      gradient: ['#FACC15', '#EAB308'] // Yellow to Amber
    }
  ];

  const renderFeatureCards = () => {
    const slides = [];
    for (let i = 0; i < features.length; i += 4) {
      slides.push(
        <View key={i} style={styles.featureSlide}>
          <View style={styles.featureRow}>
            {features.slice(i, i + 2).map((feature, index) => (
              <View key={index} style={styles.featureCard}>
                <LinearGradient
                  colors={feature.gradient}
                  style={styles.featureIconContainer}
                >
                  <Text style={styles.featureIcon}>{feature.icon}</Text>
                </LinearGradient>
                <Text style={styles.featureTitle}>{feature.title}</Text>
              </View>
            ))}
          </View>
          <View style={styles.featureRow}>
            {features.slice(i + 2, i + 4).map((feature, index) => (
              <View key={index} style={styles.featureCard}>
                <LinearGradient
                  colors={feature.gradient}
                  style={styles.featureIconContainer}
                >
                  <Text style={styles.featureIcon}>{feature.icon}</Text>
                </LinearGradient>
                <Text style={styles.featureTitle}>{feature.title}</Text>
              </View>
            ))}
          </View>
        </View>
      );
    }
    return slides;
  };

  return (
    <View style={styles.container}>
      {/* iOS Status Bar */}
      <View style={styles.statusBar}>
        <Text style={styles.statusText}>9:41</Text>
      </View>

      {/* Logo Area */}
      <View style={styles.logoContainer}>
        <View style={styles.logoWrapper}>
          <GlitchText 
            text="Slang"
            style={styles.logoTextSlang}
          />
          <GradientText
            text="Snap"
            colors={['#EC4899', '#3B82F6']}
            style={[styles.snapTextBase, styles.snapText]}
          />
        </View>
        <Text style={styles.subtitle}>
          Master idioms & slang in style
        </Text>
      </View>

      {/* Illustration */}
      <Animated.View 
        style={[
          styles.illustrationContainer,
          { transform: [{ translateY: bounceAnim }] }
        ]}
      >
        <LinearGradient
          colors={['#9333EA', '#EC4899']}
          style={styles.illustrationCircle}
        >
          <View style={styles.darkOverlay} />
          <Text style={styles.emoji}>🎯</Text>
        </LinearGradient>
      </Animated.View>

      {/* Features Carousel */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.featuresCarousel}
      >
        {renderFeatureCards()}
      </ScrollView>

      {/* Slide Dots */}
      <View style={styles.dotsContainer}>
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>

      {/* Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          style={styles.buttonWrapper}
        >
          <LinearGradient
            colors={['#EC4899', '#3B82F6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </LinearGradient>
        </TouchableOpacity>
        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>
            Already have an account?{' '}
            <Text
              style={styles.signInLink}
              onPress={() => navigation.navigate('Login')}
            >
              Sign In
            </Text>
          </Text>
        </View>
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
  logoContainer: {
    paddingTop: 40,
    paddingBottom: 24,
    alignItems: 'center',
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
  subtitle: {
    fontSize: 16,
    color: '#D1D5DB',
    marginTop: 4,
  },
  illustrationContainer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    alignItems: 'center',
  },
  illustrationCircle: {
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  emoji: {
    fontSize: 64,
  },
  featuresCarousel: {
    flexGrow: 0,
    marginBottom: 32,
  },
  featureSlide: {
    width,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  featureRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',  // Reduced gap between columns
    marginBottom: 12,
  },
  featureCard: {
    width: (width - 72) / 2,  // Adjusted width to fit 2 cards per row with reduced gap
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  featureIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureIcon: {
    fontSize: 24,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 32,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  activeDot: {
    width: 20,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  buttonContainer: {
    paddingHorizontal: 32,
    paddingBottom: 40,
  },
  buttonWrapper: {
    width: '100%',
    marginBottom: 12,
  },
  button: {
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  signInContainer: {
    alignItems: 'center',
  },
  signInText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  signInLink: {
    color: '#fff',
    fontWeight: '600',
  },
});