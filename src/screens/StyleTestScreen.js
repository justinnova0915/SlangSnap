import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { typography } from '../styles/typography';
import { gradients } from '../styles/gradients';

export const StyleTestScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Test Zoomer Typography */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Zoomer Typography</Text>
        
        <Text style={typography.zoomer.logo.main}>Logo Main</Text>
        <Text style={typography.zoomer.logo.snap}>Logo Snap</Text>
        
        <Text style={typography.zoomer.heading.large}>Large Heading</Text>
        <Text style={typography.zoomer.heading.medium}>Medium Heading</Text>
        <Text style={typography.zoomer.heading.small}>Small Heading</Text>
        
        <Text style={typography.zoomer.body.large}>Large Body Text</Text>
        <Text style={typography.zoomer.body.regular}>Regular Body Text</Text>
        <Text style={typography.zoomer.body.small}>Small Body Text</Text>
      </View>

      {/* Test Classic Typography */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Classic Typography</Text>
        
        <Text style={typography.classic.logo.main}>Logo Main</Text>
        <Text style={typography.classic.logo.snap}>Logo Snap</Text>
        
        <Text style={typography.classic.heading.large}>Large Heading</Text>
        <Text style={typography.classic.heading.medium}>Medium Heading</Text>
        <Text style={typography.classic.heading.small}>Small Heading</Text>
        
        <Text style={typography.classic.body.large}>Large Body Text</Text>
        <Text style={typography.classic.body.regular}>Regular Body Text</Text>
        <Text style={typography.classic.body.small}>Small Body Text</Text>
      </View>

      {/* Test Gradients */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Zoomer Gradients</Text>
        
        <View style={styles.gradientContainer}>
          <LinearGradient
            colors={gradients.zoomer.primary}
            style={styles.gradientBox}
          >
            <Text style={styles.gradientText}>Primary</Text>
          </LinearGradient>

          <LinearGradient
            colors={gradients.zoomer.secondary}
            style={styles.gradientBox}
          >
            <Text style={styles.gradientText}>Secondary</Text>
          </LinearGradient>
        </View>

        <Text style={styles.subsectionTitle}>Feature Gradients</Text>
        <View style={styles.gradientContainer}>
          {Object.entries(gradients.zoomer.feature).map(([key, colors]) => (
            <LinearGradient
              key={key}
              colors={colors}
              style={styles.gradientBox}
            >
              <Text style={styles.gradientText}>{key}</Text>
            </LinearGradient>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Classic Gradients</Text>
        
        <View style={styles.gradientContainer}>
          <LinearGradient
            colors={gradients.classic.primary}
            style={styles.gradientBox}
          >
            <Text style={styles.gradientText}>Primary</Text>
          </LinearGradient>

          <LinearGradient
            colors={gradients.classic.secondary}
            style={styles.gradientBox}
          >
            <Text style={styles.gradientText}>Secondary</Text>
          </LinearGradient>
        </View>

        <Text style={styles.subsectionTitle}>Feature Gradients</Text>
        <View style={styles.gradientContainer}>
          {Object.entries(gradients.classic.feature).map(([key, colors]) => (
            <LinearGradient
              key={key}
              colors={colors}
              style={styles.gradientBox}
            >
              <Text style={styles.gradientText}>{key}</Text>
            </LinearGradient>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  subsectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginTop: 20,
    marginBottom: 10,
  },
  gradientContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  gradientBox: {
    width: 150,
    height: 80,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});