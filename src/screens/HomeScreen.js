import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, StatusBar, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { fonts } from '../styles/typography';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import mockAssets from '../assets/mock';

// Import components
import StreakBanner from '../components/home/StreakBanner';
import TodayLesson from '../components/home/TodayLesson';
import DailyPlaylist from '../components/home/DailyPlaylist';
import Categories from '../components/home/Categories';
import WeeklyGoals from '../components/home/WeeklyGoals';
import VoiceStudioPromo from '../components/home/VoiceStudioPromo';
import TodayTip from '../components/home/TodayTip';

const HomeScreen = () => {
  const navigation = useNavigation();
  const mode = useSelector(state => state.settings.mode);
  const preferences = useSelector(state => state.settings.preferences);

  // Mock data - replace with real data later
  const mockClips = [
    {
      id: '1',
      title: 'On the ball',
      category: 'Business Communication',
      duration: '0:15',
      isPlaying: true,
      thumbnail: mockAssets.clip1,
    },
    {
      id: '2',
      title: 'Break the ice',
      category: 'Social Situations',
      duration: '0:15',
      thumbnail: mockAssets.clip2,
    },
    {
      id: '3',
      title: 'Hit the ground running',
      category: 'Business Success',
      duration: '0:15',
      thumbnail: mockAssets.clip3,
    },
  ];

  // Handlers
  const handleContinueLearning = () => {
    navigation.navigate('Learn');
  };

  const handlePlaylistItemPress = (clip) => {
    navigation.navigate('VideoPlayer', { clipId: clip.id });
  };

  const handleCategoryPress = (category) => {
    navigation.navigate('Category', { categoryId: category.id });
  };

  const handleVoiceStudioPress = () => {
    navigation.navigate('Voice');
  };

  const handleViewMoreTips = () => {
    navigation.navigate('Tips');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Welcome, User</Text>
          <Text style={styles.headerDate}>{format(new Date(), 'EEEE, MMMM d')}</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <View style={styles.notificationDot} />
            <Ionicons name="notifications-outline" size={24} color="#4B5563" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => navigation.navigate('Settings')}
          >
            <Ionicons name="settings-outline" size={24} color="#4B5563" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Streak Banner */}
        <View style={styles.section}>
          <StreakBanner
            streak={68}
            pointsToday={15}
          />
        </View>

        {/* Today's Lesson */}
        <View style={styles.section}>
          <TodayLesson
            completed={3}
            total={5}
            title="Business Idioms"
            subtitle="Professional Communication"
            progress={60}
            onContinue={handleContinueLearning}
          />
        </View>

        {/* Daily Playlist */}
        <View style={styles.section}>
          <DailyPlaylist
            clips={mockClips}
            onPlaylistItemPress={handlePlaylistItemPress}
          />
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Categories
            onCategoryPress={handleCategoryPress}
          />
        </View>

        {/* Weekly Goals */}
        <View style={styles.section}>
          <WeeklyGoals
            completedDays={7}
            totalDays={10}
            daysLeft={3}
            weekNumber={24}
          />
        </View>

        {/* Voice Studio Promo */}
        <View style={styles.section}>
          <VoiceStudioPromo
            onPress={handleVoiceStudioPress}
          />
        </View>

        {/* Today's Tip */}
        <View style={styles.section}>
          <TodayTip
            tipNumber={42}
            tipText="Practice using idioms in context rather than memorizing them in isolation to better understand their nuances."
            onViewMorePress={handleViewMoreTips}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontFamily: fonts.georgia,
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 4,
  },
  headerDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 16,
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    right: -2,
    top: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    zIndex: 1,
  },
  content: {
    flex: 1,
  },
  section: {
    marginTop: 16,
  },
});

export default HomeScreen;