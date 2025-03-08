import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { fonts } from '../../styles/typography';

const TodayLesson = ({ 
  completed = 3, 
  total = 5,
  emoji = "💼",
  title = "Business Idioms",
  subtitle = "Professional Communication",
  progress = 60,
  onContinue
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Today's Lesson</Text>
        <Text style={styles.progress}>{completed}/{total} completed</Text>
      </View>

      <View style={styles.card}>
        {/* Lesson Info */}
        <View style={styles.lessonInfo}>
          <View style={styles.iconContainer}>
            <Text style={styles.emoji}>{emoji}</Text>
          </View>
          <View>
            <Text style={styles.lessonTitle}>{title}</Text>
            <Text style={styles.lessonSubtitle}>{subtitle}</Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
        </View>

        {/* Continue Button */}
        <TouchableOpacity 
          style={styles.continueButton}
          onPress={onContinue}
        >
          <Text style={styles.buttonText}>Continue Learning</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: fonts.georgia,
    fontSize: 16,
    color: '#1F2937',
  },
  progress: {
    fontSize: 14,
    color: '#2563EB',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  lessonInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#DBEAFE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  emoji: {
    fontSize: 20,
  },
  lessonTitle: {
    fontFamily: fonts.georgia,
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 2,
  },
  lessonSubtitle: {
    fontSize: 12,
    color: '#6B7280',
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    marginBottom: 12,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#2563EB',
    borderRadius: 3,
  },
  continueButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: fonts.georgia,
  },
});

export default TodayLesson;