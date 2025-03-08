import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, StatusBar, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { fonts, typography } from '../styles/typography';
import { gradients } from '../styles/gradients';
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
const useTheme = () => {
  const mode = useSelector(state => state.settings.mode || 'classic'); // Default to classic if not set
  return {
    mode,
    typography: typography[mode],
    gradients: gradients[mode],
    isZoomer: mode === 'zoomer'
  };
};

const HomeScreen = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const { preferences } = useSelector(state => state.settings);

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

  const styles = getStyles(theme);
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={theme.isZoomer ? "light-content" : "dark-content"}
        backgroundColor={theme.isZoomer ? '#141414' : '#F9FAFB'}
      />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Welcome, User</Text>
          <Text style={styles.headerDate}>{format(new Date(), 'EEEE, MMMM d')}</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <View style={styles.notificationDot} />
            <Ionicons
              name="notifications-outline"
              size={theme.isZoomer ? 28 : 24}
              color={theme.isZoomer ? '#FFFFFF' : '#4B5563'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('Settings')}
          >
            <Ionicons
              name="settings-outline"
              size={theme.isZoomer ? 28 : 24}
              color={theme.isZoomer ? '#FFFFFF' : '#4B5563'}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={theme.isZoomer ? { paddingBottom: 24 } : undefined}
      >
        {/* Streak Banner */}
        <View style={styles.section}>
          <StreakBanner
            streak={68}
            pointsToday={15}
            mode={theme.mode}
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
            mode={theme.mode}
          />
        </View>

        {/* Daily Playlist */}
        <View style={styles.section}>
          <DailyPlaylist
            clips={mockClips}
            onPlaylistItemPress={handlePlaylistItemPress}
            mode={theme.mode}
          />
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Categories
            onCategoryPress={handleCategoryPress}
            mode={theme.mode}
          />
        </View>

        {/* Weekly Goals */}
        <View style={styles.section}>
          <WeeklyGoals
            completedDays={7}
            totalDays={10}
            daysLeft={3}
            weekNumber={24}
            mode={theme.mode}
          />
        </View>

        {/* Voice Studio Promo */}
        <View style={styles.section}>
          <VoiceStudioPromo
            onPress={handleVoiceStudioPress}
            mode={theme.mode}
          />
        </View>

        {/* Today's Tip */}
        <View style={styles.section}>
          <TodayTip
            tipNumber={42}
            tipText="Practice using idioms in context rather than memorizing them in isolation to better understand their nuances."
            onViewMorePress={handleViewMoreTips}
            mode={theme.mode}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.isZoomer ? '#141414' : '#F9FAFB',
  },
  header: {
    backgroundColor: theme.isZoomer ? '#1E1E1E' : '#FFFFFF',
    padding: theme.isZoomer ? 20 : 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.isZoomer ? '#2A2A2A' : '#E5E7EB',
  },
  headerTitle: {
    fontFamily: theme.isZoomer ? fonts.righteous : fonts.georgia,
    fontSize: theme.isZoomer ? 24 : 18,
    color: theme.isZoomer ? '#FFFFFF' : '#1F2937',
    marginBottom: 4,
  },
  headerDate: {
    fontSize: theme.isZoomer ? 14 : 12,
    color: theme.isZoomer ? '#9CA3AF' : '#6B7280',
    fontFamily: theme.isZoomer ? fonts.righteous : 'System',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 16,
    position: 'relative',
    padding: theme.isZoomer ? 8 : 0,
  },
  notificationDot: {
    position: 'absolute',
    right: theme.isZoomer ? 4 : -2,
    top: theme.isZoomer ? 4 : -2,
    width: theme.isZoomer ? 10 : 8,
    height: theme.isZoomer ? 10 : 8,
    borderRadius: theme.isZoomer ? 5 : 4,
    backgroundColor: theme.isZoomer ? '#FF3366' : '#EF4444',
    zIndex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.isZoomer ? 12 : 0,
  },
  section: {
    marginTop: theme.isZoomer ? 20 : 16,
  },
});

export default HomeScreen;