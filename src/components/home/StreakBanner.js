import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fonts } from '../../styles/typography';

const StreakBanner = ({ streak = 68, pointsToday = 15 }) => {
  return (
    <View style={[styles.container, { marginBottom: 0 }]}>
      <View style={styles.banner}>
        {/* Streak Info */}
        <View style={styles.streakInfo}>
          <View style={styles.iconContainer}>
            <Ionicons name="calendar" size={24} color="#2563EB" />
          </View>
          <View>
            <Text style={styles.streakText}>{streak} Day Streak</Text>
            <Text style={styles.subtitle}>You're making great progress</Text>
          </View>
        </View>

        {/* Points Badge */}
        <View style={styles.pointsBadge}>
          <Text style={styles.pointsText}>+{pointsToday} today</Text>
        </View>
      </View>
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
  banner: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  streakText: {
    fontFamily: fonts.georgia,
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  pointsBadge: {
    backgroundColor: '#2563EB',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  pointsText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  }
});

export default StreakBanner;