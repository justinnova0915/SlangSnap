import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import { fonts } from '../styles/typography';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const useStyles = (mode) => {
  const isZoomer = mode === 'zoomer';
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isZoomer ? '#111827' : '#F3F4F6',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: isZoomer ? 16 : 12,
      paddingHorizontal: isZoomer ? 16 : 12,
      paddingBottom: isZoomer ? 24 : 12,
      backgroundColor: isZoomer ? 'transparent' : 'white',
      borderBottomWidth: isZoomer ? 0 : 1,
      borderBottomColor: '#E5E7EB',
    },
    headerTitle: {
      fontSize: isZoomer ? 28 : 16,
      fontFamily: fonts.righteous,
      color: isZoomer ? '#FFFFFF' : '#1F2937',
      letterSpacing: isZoomer ? 0.5 : 0,
    },
    iconButton: {
      width: isZoomer ? 40 : 32,
      height: isZoomer ? 40 : 32,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isZoomer ? 'rgba(255,255,255,0.2)' : 'transparent',
      borderRadius: isZoomer ? 20 : 16,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: 20,
    },
    profileSection: {
      paddingBottom: isZoomer ? 24 : 16,
      paddingHorizontal: 16,
    },
    profileInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: isZoomer ? 8 : 0,
    },
    avatarContainer: {
      width: isZoomer ? 80 : 64,
      height: isZoomer ? 80 : 64,
      borderRadius: isZoomer ? 40 : 32,
      backgroundColor: isZoomer ? 'transparent' : '#EFF6FF',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 16,
      overflow: 'hidden',
    },
    avatarEmoji: {
      fontSize: isZoomer ? 36 : 28,
    },
    profileName: {
      fontSize: isZoomer ? 24 : 18,
      fontWeight: 'bold',
      color: isZoomer ? '#FFFFFF' : '#1F2937',
      marginBottom: 4,
      fontFamily: isZoomer ? fonts.righteous : undefined,
    },
    levelContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    badge: {
      backgroundColor: isZoomer ? 'rgba(0,0,0,0.3)' : '#EFF6FF',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 9999,
      marginRight: 8,
    },
    badgeText: {
      color: isZoomer ? '#EC4899' : '#2563EB',
      fontSize: isZoomer ? 14 : 12,
      fontWeight: '500',
      fontFamily: isZoomer ? fonts.righteous : undefined,
    },
    levelText: {
      color: isZoomer ? 'rgba(255,255,255,0.8)' : '#6B7280',
      fontSize: 14,
      fontFamily: isZoomer ? fonts.righteous : undefined,
    },
    statsCard: {
      backgroundColor: isZoomer ? '#1F2937' : 'white',
      borderRadius: isZoomer ? 16 : 8,
      padding: isZoomer ? 16 : 12,
      marginTop: -16,
      marginHorizontal: 16,
      borderWidth: isZoomer ? 0 : 1,
      borderColor: '#E5E7EB',
      shadowColor: isZoomer ? '#EC4899' : '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: isZoomer ? 0.3 : 0.1,
      shadowRadius: 8,
      elevation: 6,
    },
    statsGrid: {
      flexDirection: 'row',
      gap: isZoomer ? 12 : 8,
    },
    statItem: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: isZoomer ? 'rgba(255,255,255,0.1)' : 'transparent',
      borderRadius: isZoomer ? 12 : 0,
      padding: isZoomer ? 12 : 8,
    },
    statNumber: {
      fontSize: isZoomer ? 28 : 20,
      fontWeight: 'bold',
      color: isZoomer ? '#EC4899' : '#2563EB',
      marginBottom: isZoomer ? 8 : 4,
      fontFamily: isZoomer ? fonts.righteous : undefined,
    },
    statLabel: {
      fontSize: isZoomer ? 14 : 12,
      color: isZoomer ? 'rgba(255,255,255,0.8)' : '#6B7280',
      fontFamily: isZoomer ? fonts.righteous : undefined,
    },
    section: {
      padding: 16,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: isZoomer ? 16 : 12,
    },
    sectionTitle: {
      fontSize: isZoomer ? 24 : 16,
      fontWeight: '600',
      color: isZoomer ? '#FFFFFF' : '#1F2937',
      fontFamily: isZoomer ? fonts.righteous : undefined,
    },
    viewAllLink: {
      color: isZoomer ? '#EC4899' : '#2563EB',
      fontSize: isZoomer ? 16 : 14,
      fontFamily: isZoomer ? fonts.righteous : undefined,
    },
    achievementsScroll: {
      flexDirection: 'row',
      paddingBottom: 8,
    },
    achievementItem: {
      width: isZoomer ? 64 : 56,
      alignItems: 'center',
      marginRight: 12,
    },
    achievementIcon: {
      width: isZoomer ? 56 : 48,
      height: isZoomer ? 56 : 48,
      borderRadius: isZoomer ? 28 : 24,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 4,
      backgroundColor: isZoomer ? 'transparent' : '#EFF6FF',
    },
    achievementLocked: {
      backgroundColor: isZoomer ? '#374151' : '#F3F4F6',
      opacity: 0.4,
    },
    achievementLabel: {
      fontSize: 12,
      color: isZoomer ? '#FFFFFF' : '#4B5563',
      textAlign: 'center',
      fontFamily: isZoomer ? fonts.righteous : undefined,
    },
    achievementLockedText: {
      color: isZoomer ? 'rgba(255,255,255,0.4)' : '#9CA3AF',
    },
    pointsBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isZoomer ? 'rgba(255,255,255,0.2)' : '#EFF6FF',
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 9999,
    },
    boltIcon: {
      marginRight: 8,
      color: '#F59E0B',
    },
    pointsText: {
      color: isZoomer ? '#FFFFFF' : '#2563EB',
      fontWeight: '500',
      fontFamily: isZoomer ? fonts.righteous : undefined,
    },
    shopCard: {
      backgroundColor: isZoomer ? '#1F2937' : '#F9FAFB',
      borderRadius: isZoomer ? 16 : 8,
      padding: 16,
      borderWidth: isZoomer ? 0 : 1,
      borderColor: '#E5E7EB',
    },
    shopTitle: {
      fontSize: isZoomer ? 18 : 14,
      fontWeight: '500',
      color: isZoomer ? '#FFFFFF' : '#1F2937',
      marginBottom: 12,
      fontFamily: isZoomer ? fonts.righteous : undefined,
    },
    shopGrid: {
      flexDirection: 'row',
      gap: isZoomer ? 12 : 8,
    },
    shopItem: {
      flex: 1,
      alignItems: 'center',
    },
    shopItemIcon: {
      width: isZoomer ? 64 : 48,
      height: isZoomer ? 64 : 48,
      backgroundColor: isZoomer ? 'rgba(255,255,255,0.1)' : 'white',
      borderRadius: isZoomer ? 16 : 8,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 8,
    },
    shopItemEmoji: {
      fontSize: isZoomer ? 32 : 24,
    },
    shopItemTitle: {
      fontSize: isZoomer ? 14 : 12,
      color: isZoomer ? '#FFFFFF' : '#4B5563',
      marginBottom: 4,
      fontFamily: isZoomer ? fonts.righteous : undefined,
      textAlign: 'center',
    },
    shopItemPoints: {
      fontSize: isZoomer ? 14 : 12,
      color: isZoomer ? '#F59E0B' : '#2563EB',
      marginBottom: 8,
      fontFamily: isZoomer ? fonts.righteous : undefined,
    },
    copButton: {
      backgroundColor: isZoomer ? '#EC4899' : '#2563EB',
      paddingHorizontal: isZoomer ? 16 : 12,
      paddingVertical: isZoomer ? 8 : 4,
      borderRadius: 9999,
    },
    copButtonText: {
      color: 'white',
      fontSize: isZoomer ? 14 : 12,
      fontFamily: isZoomer ? fonts.righteous : undefined,
    },
    viewAllButton: {
      backgroundColor: isZoomer ? 'rgba(255,255,255,0.1)' : '#2563EB',
      padding: isZoomer ? 12 : 8,
      borderRadius: isZoomer ? 12 : 6,
      alignItems: 'center',
      marginTop: 12,
    },
    viewAllButtonText: {
      color: 'white',
      fontSize: isZoomer ? 16 : 14,
      fontWeight: '500',
      fontFamily: isZoomer ? fonts.righteous : undefined,
    },
    activityList: {
      gap: isZoomer ? 12 : 8,
    },
    activityItem: {
      backgroundColor: isZoomer ? '#1F2937' : 'white',
      padding: isZoomer ? 16 : 12,
      borderRadius: isZoomer ? 12 : 8,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    activityLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    activityIconContainer: {
      width: isZoomer ? 40 : 32,
      height: isZoomer ? 40 : 32,
      borderRadius: isZoomer ? 12 : 8,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    activityIcon: {
      color: isZoomer ? '#EC4899' : '#2563EB',
    },
    activityInfo: {
      flex: 1,
    },
    activityTitle: {
      fontSize: isZoomer ? 16 : 14,
      color: isZoomer ? '#FFFFFF' : '#1F2937',
      marginBottom: 2,
      fontFamily: isZoomer ? fonts.righteous : undefined,
    },
    activityTime: {
      fontSize: isZoomer ? 14 : 12,
      color: isZoomer ? 'rgba(255,255,255,0.6)' : '#6B7280',
      fontFamily: isZoomer ? fonts.righteous : undefined,
    },
    activityPoints: {
      fontSize: isZoomer ? 16 : 14,
      color: '#10B981',
      fontWeight: '500',
      fontFamily: isZoomer ? fonts.righteous : undefined,
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
    weekText: {
      color: '#2563EB',
      fontSize: 14,
    },
  });
};

export default function SettingsScreen() {
  const navigation = useNavigation();
  const mode = useSelector(state => state.settings.mode || 'classic');
  const isZoomer = mode === 'zoomer';
  const styles = useStyles(mode);

  const achievements = isZoomer ? [
    {
      icon: 'fire',
      label: '7-day Streak',
      gradient: ['#EC4899', '#8B5CF6'],
      unlocked: true
    },
    {
      icon: 'microphone',
      label: 'Voice Star',
      gradient: ['#8B5CF6', '#3B82F6'],
      unlocked: true
    },
    {
      icon: 'check-double',
      label: 'Quiz Master',
      gradient: ['#3B82F6', '#10B981'],
      unlocked: true
    },
    { icon: 'lock', label: 'Locked', unlocked: false },
    { icon: 'lock', label: 'Locked', unlocked: false },
  ] : [
    { icon: 'calendar-check', label: '30-Day Streak', unlocked: true },
    { icon: 'microphone', label: 'Voice Pro', unlocked: true },
    { icon: 'graduation-cap', label: 'Quiz Expert', unlocked: true },
    { icon: 'lock', label: 'Locked', unlocked: false },
  ];

  const rewardItems = isZoomer ? [
    { emoji: '🕶️', title: 'LED Shades', points: 500 },
    { emoji: '🧢', title: 'Neon Cap', points: 350 },
    { emoji: '👕', title: 'Glow Jacket', points: 750 },
  ] : [
    { emoji: '🏆', title: 'Gold Badge', points: 300 },
    { emoji: '📚', title: 'Dictionary', points: 500 },
    { emoji: '👨‍🎓', title: 'Scholar', points: 700 },
  ];

  const activities = [
    {
      icon: 'check',
      title: 'Completed Daily Quiz',
      time: 'Today, 9:32 AM',
      points: 25,
      color: '#EC4899',
    },
    {
      icon: 'microphone',
      title: 'Voice Snap Uploaded',
      time: 'Yesterday, 4:15 PM',
      points: 10,
      color: '#8B5CF6',
    },
    {
      icon: 'trophy',
      title: 'Earned Voice Star Badge',
      time: 'Yesterday, 2:20 PM',
      points: 50,
      color: '#3B82F6',
    },
  ];

  const ProfileHeader = () => (
    <LinearGradient
      colors={isZoomer ? ['#7E22CE', '#EC4899'] : ['white', 'white']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.header}
    >
      <Text style={styles.headerTitle}>
        {isZoomer ? "Profile" : "My Profile"}
      </Text>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => navigation.navigate('Preferences', { fromOnboarding: false })}
      >
        <FontAwesome5
          name="cog"
          size={isZoomer ? 24 : 20}
          color={isZoomer ? "white" : "#4B5563"}
        />
      </TouchableOpacity>
    </LinearGradient>
  );

  const ProfileInfo = () => (
    <View style={styles.profileSection}>
      <View style={styles.profileInfo}>
        <LinearGradient
          colors={isZoomer ? ['#EC4899', '#F59E0B'] : ['#EFF6FF', '#EFF6FF']}
          style={styles.avatarContainer}
        >
          <Text style={styles.avatarEmoji}>😎</Text>
        </LinearGradient>
        <View>
          <Text style={styles.profileName}>
            {isZoomer ? "JessicaZ" : "Robert Johnson"}
          </Text>
          <View style={styles.levelContainer}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {isZoomer ? "Slang God" : "Idiom Expert"}
              </Text>
            </View>
            <Text style={styles.levelText}>
              {isZoomer ? "Lvl 12" : "Level 10"}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  const Stats = () => (
    <View style={styles.statsCard}>
      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>75</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>527</Text>
          <Text style={styles.statLabel}>Slang Learned</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>42</Text>
          <Text style={styles.statLabel}>Voice Snaps</Text>
        </View>
      </View>
    </View>
  );

  const Achievements = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllLink}>View All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.achievementsScroll}
      >
        {achievements.map((achievement, index) => (
          <View key={index} style={styles.achievementItem}>
            {achievement.unlocked && isZoomer ? (
              <LinearGradient
                colors={achievement.gradient}
                style={styles.achievementIcon}
              >
                <FontAwesome5
                  name={achievement.icon}
                  size={isZoomer ? 24 : 20}
                  color="white"
                />
              </LinearGradient>
            ) : (
              <View style={[
                styles.achievementIcon,
                !achievement.unlocked && styles.achievementLocked
              ]}>
                <FontAwesome5
                  name={achievement.icon}
                  size={isZoomer ? 24 : 20}
                  color={achievement.unlocked ? "#2563EB" : "#9CA3AF"}
                />
              </View>
            )}
            <Text style={[
              styles.achievementLabel,
              !achievement.unlocked && styles.achievementLockedText
            ]}>
              {achievement.label}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  const SnapPoints = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          {isZoomer ? "Snap Points" : "Learning Points"}
        </Text>
        <View style={styles.pointsBadge}>
          <FontAwesome5 
            name={isZoomer ? "bolt" : "star"} 
            size={14} 
            style={styles.boltIcon} 
          />
          <Text style={styles.pointsText}>1,250</Text>
        </View>
      </View>

      <View style={styles.shopCard}>
        <Text style={styles.shopTitle}>
          {isZoomer ? "Avatar Drip Shop" : "Available Rewards"}
        </Text>
        <View style={styles.shopGrid}>
          {rewardItems.map((item, index) => (
            <View key={index} style={styles.shopItem}>
              <View style={styles.shopItemIcon}>
                <Text style={styles.shopItemEmoji}>{item.emoji}</Text>
              </View>
              <Text style={styles.shopItemTitle}>{item.title}</Text>
              <Text style={styles.shopItemPoints}>{item.points} pts</Text>
              <TouchableOpacity style={styles.copButton}>
                <Text style={styles.copButtonText}>
                  {isZoomer ? "Cop It" : "Redeem"}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllButtonText}>
            {isZoomer ? "View All Items" : "Browse Rewards"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const WeeklyProgress = () => (
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

  const RecentActivity = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Recent Activity</Text>
      <View style={styles.activityList}>
        {activities.map((activity, index) => (
          <View key={index} style={styles.activityItem}>
            <View style={styles.activityLeft}>
              <LinearGradient
                colors={isZoomer ? [activity.color, `${activity.color}40`] : ['#EFF6FF', '#EFF6FF']}
                style={styles.activityIconContainer}
              >
                <FontAwesome5
                  name={activity.icon}
                  size={isZoomer ? 16 : 14}
                  style={styles.activityIcon}
                />
              </LinearGradient>
              <View style={styles.activityInfo}>
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
      <StatusBar barStyle={isZoomer ? "light-content" : "dark-content"} />
      <ProfileHeader />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <ProfileInfo />
        <Stats />
        <Achievements />
        <SnapPoints />
        {!isZoomer && <WeeklyProgress />}
        <RecentActivity />
      </ScrollView>
    </View>
  );
}