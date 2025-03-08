import React, { useEffect, useRef } from 'react';
import { Text, Animated, StyleSheet, View, Platform } from 'react-native';
import { fonts } from '../../styles/typography';

const AnimatedText = Animated.createAnimatedComponent(Text);

export const GlitchText = ({ text, style }) => {
  const redOffset = useRef(new Animated.Value(0)).current;
  const greenOffset = useRef(new Animated.Value(0)).current;
  const blueOffset = useRef(new Animated.Value(0)).current;
  const redVertical = useRef(new Animated.Value(0)).current;
  const greenVertical = useRef(new Animated.Value(0)).current;
  const blueVertical = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const glitchAnimation = () => {
      const glitchDuration = 40;  // Faster glitch
      const normalDuration = 450;  // Longer normal state

      const glitchSequence = Animated.parallel([
        // Red layer
        Animated.sequence([
          Animated.parallel([
            Animated.timing(redOffset, {
              toValue: 2.5,  // More pronounced offset
              duration: glitchDuration,
              useNativeDriver: true,
            }),
            Animated.timing(redVertical, {
              toValue: -1.25,
              duration: glitchDuration,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(redOffset, {
              toValue: -2.5,
              duration: glitchDuration,
              useNativeDriver: true,
            }),
            Animated.timing(redVertical, {
              toValue: 1.25,
              duration: glitchDuration,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(redOffset, {
              toValue: 0,
              duration: normalDuration,
              useNativeDriver: true,
            }),
            Animated.timing(redVertical, {
              toValue: 0,
              duration: normalDuration,
              useNativeDriver: true,
            }),
          ]),
        ]),
        // Green layer
        Animated.sequence([
          Animated.parallel([
            Animated.timing(greenOffset, {
              toValue: -2.5,
              duration: glitchDuration,
              useNativeDriver: true,
            }),
            Animated.timing(greenVertical, {
              toValue: 1.25,
              duration: glitchDuration,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(greenOffset, {
              toValue: 2.5,
              duration: glitchDuration,
              useNativeDriver: true,
            }),
            Animated.timing(greenVertical, {
              toValue: -1.25,
              duration: glitchDuration,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(greenOffset, {
              toValue: 0,
              duration: normalDuration,
              useNativeDriver: true,
            }),
            Animated.timing(greenVertical, {
              toValue: 0,
              duration: normalDuration,
              useNativeDriver: true,
            }),
          ]),
        ]),
        // Blue layer
        Animated.sequence([
          Animated.parallel([
            Animated.timing(blueOffset, {
              toValue: 1.5,
              duration: glitchDuration,
              useNativeDriver: true,
            }),
            Animated.timing(blueVertical, {
              toValue: -1.25,
              duration: glitchDuration,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(blueOffset, {
              toValue: -1.5,
              duration: glitchDuration,
              useNativeDriver: true,
            }),
            Animated.timing(blueVertical, {
              toValue: 1.25,
              duration: glitchDuration,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(blueOffset, {
              toValue: 0,
              duration: normalDuration,
              useNativeDriver: true,
            }),
            Animated.timing(blueVertical, {
              toValue: 0,
              duration: normalDuration,
              useNativeDriver: true,
            }),
          ]),
        ]),
      ]);

      Animated.loop(glitchSequence).start();
    };

    glitchAnimation();
  }, []);

  const textStyle = {
    ...style,
    fontFamily: fonts.righteous, // Use the correct font family
    fontWeight: Platform.select({ ios: '900', android: '700' }),
  };

  return (
    <View style={[styles.container, style]}>
      {/* Red layer */}
      <AnimatedText
        style={[
          textStyle,
          styles.glitchLayer,
          {
            transform: [
              { translateX: redOffset },
              { translateY: redVertical }
            ],
            opacity: 0.8,
            color: 'rgb(255,0,0)',
          },
        ]}
      >
        {text}
      </AnimatedText>

      {/* Green layer */}
      <AnimatedText
        style={[
          textStyle,
          styles.glitchLayer,
          {
            transform: [
              { translateX: greenOffset },
              { translateY: greenVertical }
            ],
            opacity: 0.8,
            color: 'rgb(0,255,0)',
          },
        ]}
      >
        {text}
      </AnimatedText>

      {/* Blue layer */}
      <AnimatedText
        style={[
          textStyle,
          styles.glitchLayer,
          {
            transform: [
              { translateX: blueOffset },
              { translateY: blueVertical }
            ],
            opacity: 0.8,
            color: 'rgb(0,0,255)',
          },
        ]}
      >
        {text}
      </AnimatedText>

      {/* Base layer */}
      <Text style={[textStyle, styles.baseText]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  glitchLayer: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  baseText: {
    opacity: 0.9,
  },
});