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
  onContinue,
  mode = 'classic'
}) => {
  const isZoomer = mode === 'zoomer';
  
  return (
    <View style={styles.container}>
      <View style={[styles.header, isZoomer && styles.zoomerHeader]}>
        <Text style={[styles.sectionTitle, isZoomer && styles.zoomerSectionTitle]}>
          {isZoomer ? "Up Next 🎯" : "Today's Lesson"}
        </Text>
        <Text style={[styles.progress, isZoomer && styles.zoomerProgress]}>
          {completed}/{total} completed
        </Text>
      </View>

      <View style={[styles.card, isZoomer && styles.zoomerCard]}>
        {/* Lesson Info */}
        <View style={styles.lessonInfo}>
          <View style={[styles.iconContainer, isZoomer && styles.zoomerIconContainer]}>
            <Text style={[styles.emoji, isZoomer && styles.zoomerEmoji]}>{emoji}</Text>
          </View>
          <View>
            <Text style={[styles.lessonTitle, isZoomer && styles.zoomerLessonTitle]}>
              {title}
            </Text>
            <Text style={[styles.lessonSubtitle, isZoomer && styles.zoomerLessonSubtitle]}>
              {subtitle}
            </Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={[styles.progressBarContainer, isZoomer && styles.zoomerProgressBarContainer]}>
          <View
            style={[
              styles.progressBar,
              isZoomer && styles.zoomerProgressBar,
              { width: `${progress}%` }
            ]}
          />
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={[styles.continueButton, isZoomer && styles.zoomerContinueButton]}
          onPress={onContinue}
        >
          <Text style={[styles.buttonText, isZoomer && styles.zoomerButtonText]}>
            {isZoomer ? "Let's Go! 🚀" : "Continue Learning"}
          </Text>
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
  zoomerHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: fonts.georgia,
    fontSize: 16,
    color: '#1F2937',
  },
  zoomerSectionTitle: {
    fontFamily: fonts.righteous,
    fontSize: 24,
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  progress: {
    fontSize: 14,
    color: '#2563EB',
  },
  zoomerProgress: {
    fontSize: 16,
    color: '#FF3366',
    fontFamily: fonts.righteous,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  zoomerCard: {
    backgroundColor: '#1A1A1A',
    borderColor: '#2A2A2A',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#FF3366',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
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
  zoomerIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FF3366',
    marginRight: 16,
  },
  emoji: {
    fontSize: 20,
  },
  zoomerEmoji: {
    fontSize: 24,
  },
  lessonTitle: {
    fontFamily: fonts.georgia,
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 2,
  },
  zoomerLessonTitle: {
    fontFamily: fonts.righteous,
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  lessonSubtitle: {
    fontSize: 12,
    color: '#6B7280',
  },
  zoomerLessonSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    fontFamily: fonts.righteous,
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    marginBottom: 12,
    overflow: 'hidden',
  },
  zoomerProgressBarContainer: {
    height: 8,
    backgroundColor: '#2A2A2A',
    borderRadius: 4,
    marginBottom: 16,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#2563EB',
    borderRadius: 3,
  },
  zoomerProgressBar: {
    backgroundColor: '#FF3366',
    borderRadius: 4,
  },
  continueButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  zoomerContinueButton: {
    backgroundColor: '#FF3366',
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#FF3366',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: fonts.georgia,
  },
  zoomerButtonText: {
    fontSize: 18,
    fontFamily: fonts.righteous,
    letterSpacing: 0.5,
  },
});

export default TodayLesson;