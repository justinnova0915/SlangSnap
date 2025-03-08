import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fonts } from '../../styles/typography';

const DayIndicator = ({ day, isCompleted, isToday }) => {
  return (
    <View style={[
      styles.dayIndicator,
      isCompleted && styles.dayCompleted,
      isToday && styles.dayToday
    ]}>
      <Ionicons
        name={isCompleted ? "checkmark" : "calendar-outline"}
        size={16}
        color={isCompleted ? "#2563EB" : "#9CA3AF"}
        style={styles.dayIcon}
      />
      <Text style={[
        styles.dayText,
        isCompleted && styles.dayTextCompleted,
        isToday && styles.dayTextToday
      ]}>
        {day}
      </Text>
    </View>
  );
};

const WeeklyGoals = ({
  completedDays = 7,
  totalDays = 10,
  daysLeft = 3,
  weekNumber = 24,
}) => {
  const progress = (completedDays / totalDays) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Weekly Goals</Text>
        <Text style={styles.weekNumber}>Week {weekNumber}</Text>
      </View>

      <View style={styles.card}>
        {/* Progress Header */}
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Progress</Text>
          <Text style={styles.progressCount}>{completedDays}/{totalDays} days</Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
        </View>

        {/* Progress Stats */}
        <View style={styles.progressStats}>
          <Text style={styles.progressPercentage}>{progress}% complete</Text>
          <Text style={styles.daysLeft}>{daysLeft} days left</Text>
        </View>

        {/* Day Indicators */}
        <View style={styles.daysContainer}>
          <DayIndicator day="Mon" isCompleted={true} />
          <DayIndicator day="Tue" isCompleted={true} />
          <DayIndicator day="Wed" isCompleted={true} />
          <DayIndicator day="Thu" isToday={true} />
        </View>
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
  weekNumber: {
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
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  progressCount: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '500',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginBottom: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#2563EB',
    borderRadius: 4,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  progressPercentage: {
    fontSize: 12,
    color: '#6B7280',
  },
  daysLeft: {
    fontSize: 12,
    color: '#6B7280',
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayIndicator: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginHorizontal: 4,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dayCompleted: {
    backgroundColor: '#EFF6FF',
  },
  dayToday: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  dayIcon: {
    marginRight: 4,
  },
  dayText: {
    fontSize: 14,
    color: '#6B7280',
  },
  dayTextCompleted: {
    color: '#2563EB',
  },
  dayTextToday: {
    color: '#374151',
  },
});

export default WeeklyGoals;