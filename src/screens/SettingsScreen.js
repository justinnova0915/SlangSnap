import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { fonts } from '../styles/typography';
import { FontAwesome5 } from '@expo/vector-icons';

export default function SettingsScreen() {
  const navigation = useNavigation();
  const mode = useSelector(state => state.settings.mode);
  
  const achievements = [
    { icon: 'calendar-check', label: '30-Day Streak', unlocked: true },
    { icon: 'microphone', label: 'Voice Pro', unlocked: true },
    { icon: 'graduation-cap', label: 'Quiz Expert', unlocked: true },
    { icon: 'lock', label: 'Locked', unlocked: false },
  ];

  const rewards = [
    { emoji: '🏆', title: 'Gold Badge', points: 300 },
    { emoji: '📚', title: 'Dictionary', points: 500 },
    { emoji: '👨‍🎓', title: 'Scholar', points: 700 },
  ];

  const activities = [
    {
      icon: 'check',
      title: 'Daily Quiz Complete',
      time: 'Today, 9:32 AM',
      points: 25,
    },
    {
      icon: 'microphone',
      title: 'Voice Recording Shared',
      time: 'Yesterday, 3:45 PM',
      points: 10,
    },
    {
      icon: 'star',
      title: 'Earned Voice Pro Badge',
      time: 'Jul 14, 5:20 PM',
      points: 50,
    },
  ];

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>My Profile</Text>
      <TouchableOpacity style={styles.iconButton}>
        <FontAwesome5 name="cog" size={20} color="#4B5563" />
      </TouchableOpacity>
    </View>
  );

  const renderProfileSummary = () => (
    <View style={styles.profileSummary}>
      <View style={styles.avatarContainer}>
        <Text style={styles.avatarEmoji}>👨‍💼</Text>
      </View>
      <View>
        <Text style={styles.profileName}>Robert Johnson</Text>
        <View style={styles.levelContainer}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Idiom Expert</Text>
          </View>
          <Text style={styles.levelText}>Level 10</Text>
        </View>
      </View>
    </View>
  );

  const renderStats = () => (
    <View style={styles.statsContainer}>
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>68</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>412</Text>
          <Text style={styles.statLabel}>Idioms Learned</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>27</Text>
          <Text style={styles.statLabel}>Voice Recordings</Text>
        </View>
      </View>
    </View>
  );

  const renderAchievements = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllLink}>View All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.achievementsGrid}>
        {achievements.map((achievement, index) => (
          <View key={index} style={styles.achievementItem}>
            <View style={[
              styles.achievementIcon,
              !achievement.unlocked && styles.achievementLocked
            ]}>
              <FontAwesome5
                name={achievement.icon}
                size={20}
                color={achievement.unlocked ? "#2563EB" : "#9CA3AF"}
              />
            </View>
            <Text style={[
              styles.achievementLabel,
              !achievement.unlocked && styles.achievementLockedText
            ]}>
              {achievement.label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderLearningPoints = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Learning Points</Text>
        <View style={styles.pointsBadge}>
          <FontAwesome5 name="star" size={14} color="#F59E0B" style={styles.starIcon} />
          <Text style={styles.pointsText}>950</Text>
        </View>
      </View>

      <View style={styles.rewardsCard}>
        <Text style={styles.rewardsTitle}>Available Rewards</Text>
        <View style={styles.rewardsGrid}>
          {rewards.map((reward, index) => (
            <View key={index} style={styles.rewardItem}>
              <View style={styles.rewardIcon}>
                <Text style={styles.rewardEmoji}>{reward.emoji}</Text>
              </View>
              <Text style={styles.rewardTitle}>{reward.title}</Text>
              <Text style={styles.rewardPoints}>{reward.points} pts</Text>
              <TouchableOpacity style={styles.redeemButton}>
                <Text style={styles.redeemButtonText}>Redeem</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <TouchableOpacity style={styles.browseButton}>
          <Text style={styles.browseButtonText}>Browse Rewards</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderWeeklyProgress = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Weekly Progress</Text>
        <Text style={styles.weekText}>Week 24</Text>
      </View>

      <View style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>This Week's Goal</Text>
          <Text style={styles.progressPercentage}>70%</Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: '70%' }]} />
        </View>
        <Text style={styles.progressText}>7 out of 10 daily sessions completed</Text>
      </View>
    </View>
  );

  const renderRecentActivity = () => (
    <View style={[styles.section, styles.lastSection]}>
      <Text style={styles.sectionTitle}>Recent Activity</Text>
      <View style={styles.activityList}>
        {activities.map((activity, index) => (
          <View key={index} style={styles.activityItem}>
            <View style={styles.activityLeft}>
              <View style={styles.activityIcon}>
                <FontAwesome5 name={activity.icon} size={14} color="#2563EB" />
              </View>
              <View>
                <Text style={styles.activityTitle}>{activity.title}</Text>
                <Text style={styles.activityTime}>{activity.time}</Text>
              </View>
            </View>
            <Text style={styles.activityPoints}>+{activity.points} pts</Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {renderProfileSummary()}
        {renderStats()}
        {renderAchievements()}
        {renderLearningPoints()}
        {renderWeeklyProgress()}
        {renderRecentActivity()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: fonts.righteous,
    color: '#1F2937',
  },
  iconButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  profileSummary: {
    backgroundColor: 'white',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarEmoji: {
    fontSize: 28,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  levelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 9999,
    marginRight: 8,
  },
  badgeText: {
    color: '#2563EB',
    fontSize: 12,
    fontWeight: '500',
  },
  levelText: {
    color: '#6B7280',
    fontSize: 14,
  },
  statsContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563EB',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  lastSection: {
    borderBottomWidth: 0,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  viewAllLink: {
    color: '#2563EB',
    fontSize: 14,
  },
  achievementsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  achievementItem: {
    alignItems: 'center',
  },
  achievementIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#EFF6FF',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  achievementLocked: {
    backgroundColor: '#F3F4F6',
  },
  achievementLabel: {
    fontSize: 12,
    color: '#4B5563',
    textAlign: 'center',
  },
  achievementLockedText: {
    color: '#9CA3AF',
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  starIcon: {
    marginRight: 8,
  },
  pointsText: {
    color: '#2563EB',
    fontWeight: '500',
  },
  rewardsCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  rewardsTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 12,
  },
  rewardsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  rewardItem: {
    flex: 1,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  rewardIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#EFF6FF',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  rewardEmoji: {
    fontSize: 20,
  },
  rewardTitle: {
    fontSize: 12,
    color: '#4B5563',
    marginBottom: 4,
  },
  rewardPoints: {
    fontSize: 12,
    color: '#2563EB',
    marginBottom: 8,
  },
  redeemButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
  },
  redeemButtonText: {
    color: 'white',
    fontSize: 12,
  },
  browseButton: {
    backgroundColor: '#2563EB',
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  browseButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  weekText: {
    color: '#2563EB',
    fontSize: 14,
  },
  progressCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
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
    color: '#4B5563',
  },
  progressPercentage: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '500',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#2563EB',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#6B7280',
  },
  activityList: {
    gap: 8,
  },
  activityItem: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#EFF6FF',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityTitle: {
    fontSize: 14,
    color: '#1F2937',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  activityPoints: {
    fontSize: 14,
    color: '#059669',
    fontWeight: '500',
  },
});