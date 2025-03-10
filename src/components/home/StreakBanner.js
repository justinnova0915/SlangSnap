import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fonts } from '../../styles/typography';

const StreakBanner = ({ streak = 68, pointsToday = 15, mode = 'classic' }) => {
  const isZoomer = mode === 'zoomer';
  const days = [
    { id: 'mon', label: 'M' },
    { id: 'tue', label: 'T' },
    { id: 'wed', label: 'W' },
    { id: 'thu', label: 'T' },
    { id: 'fri', label: 'F' }
  ];
  const completedDays = 3; // Mock data - should come from props
  const daysUntilBadge = 4; // Mock data - should come from props

  const containerStyle = [
    styles.container,
    isZoomer && styles.zoomerContainer
  ];

  const bannerStyle = [
    styles.banner,
    isZoomer && styles.zoomerBanner
  ];

  return (
    <View style={containerStyle}>
      <View style={bannerStyle}>
        {/* Streak Info */}
        <View style={styles.streakInfo}>
          <View style={[styles.iconContainer, isZoomer && styles.zoomerIconContainer]}>
            <Ionicons
              name={isZoomer ? "flame" : "calendar"}
              size={24}
              color={isZoomer ? "#FFFFFF" : "#2563EB"}
            />
          </View>
          <View>
            <Text style={[styles.streakText, isZoomer && styles.zoomerText]}>
              {streak}-Day Streak{isZoomer ? '!' : ''}
            </Text>
            {isZoomer ? (
              <View style={styles.badgeProgress}>
                <Text style={styles.zoomerSubtitle}>Only </Text>
                <Text style={styles.daysLeft}>{daysUntilBadge} days</Text>
                <Text style={styles.zoomerSubtitle}> until new badge</Text>
              </View>
            ) : (
              <Text style={styles.subtitle}>You're making great progress</Text>
            )}
          </View>
        </View>

        {/* Points Badge */}
        <View style={[styles.pointsBadge, isZoomer && styles.zoomerPointsBadge]}>
          <Text style={[styles.pointsText, isZoomer && styles.zoomerPointsText]}>
            +{pointsToday} today
          </Text>
        </View>
      </View>

      {/* Daily Progress (Zoomer Mode Only) */}
      {isZoomer && (
        <View style={styles.progressSection}>
          <View style={styles.daysContainer}>
            {days.map((day, index) => (
              <View
                key={day.id}
                style={[
                  styles.dayBox,
                  index < completedDays && styles.completedDay,
                  index === completedDays && styles.currentDay
                ]}
              >
                <Text style={[
                  styles.dayText,
                  index >= completedDays && styles.upcomingDayText
                ]}>
                  {day.label}
                </Text>
                {index === completedDays && (
                  <View style={styles.currentDayIndicator} />
                )}
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DBEAFE',
    overflow: 'hidden',
  },
  zoomerContainer: {
    backgroundColor: '#1A1A1A',
    borderColor: '#2A2A2A',
    borderRadius: 16,
  },
  banner: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  zoomerBanner: {
    padding: 20,
  },
  streakInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#DBEAFE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  zoomerIconContainer: {
    backgroundColor: '#FF3366',
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 16,
  },
  streakText: {
    fontFamily: fonts.georgia,
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },
  zoomerText: {
    fontFamily: fonts.righteous,
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  zoomerSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    fontFamily: fonts.righteous,
  },
  badgeProgress: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  daysLeft: {
    color: '#FF3366',
    fontSize: 14,
    fontFamily: fonts.righteous,
    fontWeight: 'bold',
  },
  pointsBadge: {
    backgroundColor: '#2563EB',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  zoomerPointsBadge: {
    backgroundColor: '#FF3366',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  pointsText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  zoomerPointsText: {
    fontSize: 14,
    fontFamily: fonts.righteous,
  },
  progressSection: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  dayBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  completedDay: {
    backgroundColor: '#FF3366',
  },
  currentDay: {
    backgroundColor: '#2A2A2A',
    borderWidth: 2,
    borderColor: '#FF3366',
  },
  dayText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: fonts.righteous,
  },
  upcomingDayText: {
    color: '#9CA3AF',
  },
  currentDayIndicator: {
    position: 'absolute',
    bottom: -4,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FF3366',
  }
});

export default StreakBanner;