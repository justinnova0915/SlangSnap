import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { fonts } from '../styles/typography';

const zoomerGradients = [
  ['#EC4899', '#8B5CF6'], // Pink to Purple
  ['#EF4444', '#F59E0B'], // Red to Orange
  ['#10B981', '#065F46'], // Emerald to Green
  ['#3B82F6', '#6366F1'], // Blue to Indigo
  ['#8B5CF6', '#D946EF'], // Purple to Fuchsia
];

const getRandomGradient = (index) => {
  const i = index % zoomerGradients.length;
  return zoomerGradients[i];
}

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
      backgroundColor: isZoomer ? '#111827' : 'transparent',
      padding: isZoomer ? 16 : 0,
      borderBottomWidth: isZoomer ? 1 : 0,
      borderBottomColor: isZoomer ? '#1F2937' : 'transparent',
    },
    headerTitle: {
      fontSize: isZoomer ? 28 : 16,
      fontFamily: fonts.righteous,
      color: isZoomer ? '#FFFFFF' : '#1F2937',
      letterSpacing: isZoomer ? 0.5 : 0,
    },
    headerRight: {
      flexDirection: 'row',
      gap: isZoomer ? 16 : 8,
    },
    iconButton: {
      width: isZoomer ? 44 : 32,
      height: isZoomer ? 44 : 32,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isZoomer ? 'rgba(255, 0, 0, 0.1)' : 'transparent',
      borderRadius: isZoomer ? 22 : 16,
      borderWidth: isZoomer ? 1 : 0,
      borderColor: 'rgba(255,255,255,0.1)',
    },
    filtersContainer: {
      backgroundColor: isZoomer ? '#111827' : 'white',
      padding: isZoomer ? 16 : 12,
      borderBottomWidth: 1,
      borderBottomColor: isZoomer ? '#1F2937' : '#E5E7EB',
    },
    filters: {
      flexDirection: 'row',
      gap: isZoomer ? 12 : 8,
    },
    filterButton: {
      paddingHorizontal: isZoomer ? 24 : 16,
      paddingVertical: isZoomer ? 12 : 6,
      backgroundColor: isZoomer ? 'rgba(255,255,255,0.1)' : '#F3F4F6',
      borderRadius: isZoomer ? 999 : 6,
      borderWidth: isZoomer ? 1 : 0,
      borderColor: 'rgba(255,255,255,0.1)',
    },
    activeFilter: {
      backgroundColor: isZoomer ? 'transparent' : '#2563EB',
      backgroundImage: isZoomer ? 'linear-gradient(to right, #EC4899, #8B5CF6)' : 'none',
      borderWidth: 0,
      shadowColor: isZoomer ? '#EC4899' : 'transparent',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 6,
    },
    filterText: {
      fontSize: isZoomer ? 16 : 14,
      color: isZoomer ? 'rgba(255,255,255,0.7)' : '#4B5563',
      fontFamily: isZoomer ? fonts.righteous : 'System',
      fontWeight: '500',
      letterSpacing: isZoomer ? 0.5 : 0,
    },
    activeFilterText: {
      color: 'white',
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: 20,
    },
    statsSection: {
      padding: isZoomer ? 20 : 16,
      backgroundColor: isZoomer ? '#111827' : '#EFF6FF',
      borderBottomWidth: isZoomer ? 0 : 1,
      borderBottomColor: isZoomer ? 'transparent' : '#DBEAFE',
    },
    statsCard: {
      backgroundColor: isZoomer ? 'transparent' : 'white',
      borderRadius: isZoomer ? 16 : 8,
      padding: isZoomer ? 20 : 16,
      borderWidth: isZoomer ? 0 : 1,
      borderColor: '#E5E7EB',
      backgroundImage: isZoomer ? 'linear-gradient(to right, #7E22CE, #EC4899)' : 'none',
      overflow: 'hidden',
    },
    statsGrid: {
      flexDirection: 'row',
      marginBottom: 16,
    },
    statItem: {
      flex: 1,
      alignItems: 'center',
      borderRightWidth: 1,
      borderRightColor: isZoomer ? 'rgba(255,255,255,0.1)' : '#E5E7EB',
      backgroundColor: isZoomer ? 'rgba(255,255,255,0.1)' : 'transparent',
      borderRadius: isZoomer ? 12 : 0,
      padding: isZoomer ? 12 : 0,
      margin: isZoomer ? 4 : 0,
    },
    lastStatItem: {
      borderRightWidth: 0,
    },
    statNumber: {
      fontSize: isZoomer ? 28 : 20,
      fontFamily: isZoomer ? fonts.righteous : 'System',
      fontWeight: 'bold',
      color: isZoomer ? '#FFFFFF' : '#2563EB',
      marginBottom: isZoomer ? 8 : 4,
      textShadow: isZoomer ? '0 0 20px rgba(236,72,153,0.5)' : 'none',
    },
    statLabel: {
      fontSize: isZoomer ? 14 : 12,
      color: isZoomer ? 'rgba(255,255,255,0.8)' : '#6B7280',
      fontFamily: isZoomer ? fonts.righteous : 'System',
    },
    reviewButton: {
      backgroundColor: isZoomer ? 'rgba(255,255,255,0.2)' : '#2563EB',
      paddingVertical: isZoomer ? 16 : 8,
      borderRadius: isZoomer ? 12 : 6,
      alignItems: 'center',
      marginTop: isZoomer ? 16 : 12,
      borderWidth: isZoomer ? 1 : 0,
      borderColor: 'rgba(255,255,255,0.1)',
    },
    reviewButtonText: {
      color: 'white',
      fontSize: isZoomer ? 16 : 14,
      fontWeight: '500',
      fontFamily: isZoomer ? fonts.righteous : 'System',
    },
    categoriesSection: {
      padding: isZoomer ? 16 : 16,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: isZoomer ? 16 : 12,
    },
    sectionTitle: {
      fontSize: isZoomer ? 28 : 18,
      fontWeight: '600',
      color: isZoomer ? '#FFFFFF' : '#1F2937',
      fontFamily: isZoomer ? fonts.righteous : 'System',
      letterSpacing: isZoomer ? 0.5 : 0,
      marginBottom: isZoomer ? 4 : 0,
    },
    viewAllLink: {
      color: isZoomer ? '#EC4899' : '#2563EB',
      fontSize: isZoomer ? 16 : 14,
      fontFamily: isZoomer ? fonts.righteous : 'System',
      letterSpacing: isZoomer ? 0.5 : 0,
    },
    categoriesGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: isZoomer ? 12 : 12,
    },
    categoryCard: {
      width: '48%',
      backgroundColor: isZoomer ? 'transparent' : 'white',
      borderRadius: isZoomer ? 16 : 8,
      padding: isZoomer ? 16 : 12,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: isZoomer ? 0 : 1,
      borderColor: '#E5E7EB',
      backgroundImage: isZoomer ? 'linear-gradient(135deg, #EC4899, #8B5CF6)' : 'none',
      overflow: 'hidden',
    },
    categoryIcon: {
      width: isZoomer ? 48 : 40,
      height: isZoomer ? 48 : 40,
      borderRadius: isZoomer ? 24 : 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: isZoomer ? 16 : 12,
      backgroundColor: isZoomer ? 'rgba(255,255,255,0.15)' : props => props.color,
      borderWidth: isZoomer ? 1 : 0,
      borderColor: 'rgba(255,255,255,0.1)',
    },
    emoji: {
      fontSize: isZoomer ? 24 : 20,
    },
    categoryTitle: {
      fontSize: isZoomer ? 16 : 14,
      fontWeight: '500',
      color: isZoomer ? '#FFFFFF' : '#1F2937',
      fontFamily: isZoomer ? fonts.righteous : 'System',
    },
    categoryCount: {
      fontSize: isZoomer ? 12 : 12,
      color: isZoomer ? 'rgba(255,255,255,0.8)' : '#6B7280',
      fontFamily: isZoomer ? fonts.righteous : 'System',
    },
    recentSection: {
      marginBottom: isZoomer ? 24 : 24,
      paddingHorizontal: 16,
    },
    recentList: {
      backgroundColor: isZoomer ? 'transparent' : 'white',
      borderRadius: isZoomer ? 12 : 8,
      borderWidth: isZoomer ? 0 : 1,
      borderColor: '#E5E7EB',
      overflow: 'hidden',
    },
    idiomItem: {
      backgroundColor: isZoomer ? '#1F2937' : 'white',
      padding: isZoomer ? 20 : 16,
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: isZoomer ? 16 : 0,
      marginBottom: isZoomer ? 12 : 0,
      borderWidth: isZoomer ? 1 : 0,
      borderColor: 'rgba(255,255,255,0.1)',
    },
    borderTop: {
      borderTopWidth: isZoomer ? 0 : 1,
      borderTopColor: '#E5E7EB',
    },
    idiomIcon: {
      width: isZoomer ? 48 : 40,
      height: isZoomer ? 48 : 40,
      borderRadius: isZoomer ? 12 : 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: isZoomer ? 16 : 12,
      backgroundColor: props => isZoomer ? 'transparent' : props.bgColor,
      backgroundImage: isZoomer ? 'linear-gradient(to bottom right, #EC4899, #8B5CF6)' : 'none',
    },
    idiomInfo: {
      flex: 1,
    },
    idiomHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    idiomTitle: {
      fontSize: isZoomer ? 16 : 14,
      fontWeight: '500',
      color: isZoomer ? '#FFFFFF' : '#1F2937',
      fontFamily: isZoomer ? fonts.righteous : 'System',
    },
    progressContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    bookmarkIcon: {
      marginRight: 4,
      color: isZoomer ? '#EC4899' : '#2563EB',
    },
    progressText: {
      fontSize: isZoomer ? 14 : 12,
      color: isZoomer ? 'rgba(255,255,255,0.6)' : '#6B7280',
      fontFamily: isZoomer ? fonts.righteous : 'System',
    },
    idiomDescription: {
      fontSize: isZoomer ? 14 : 12,
      color: isZoomer ? 'rgba(255,255,255,0.8)' : '#6B7280',
      fontFamily: isZoomer ? fonts.righteous : 'System',
    },
    practiceSection: {
      paddingHorizontal: 16,
    },
    practiceList: {
      gap: isZoomer ? 12 : 12,
    },
    practiceItem: {
      backgroundColor: isZoomer ? 'transparent' : 'white',
      borderRadius: isZoomer ? 16 : 8,
      padding: isZoomer ? 16 : 12,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: isZoomer ? 0 : 1,
      borderColor: '#E5E7EB',
      backgroundImage: isZoomer ? 'linear-gradient(to bottom right, #EC4899, #8B5CF6)' : 'none',
    },
    playButton: {
      width: isZoomer ? 40 : 32,
      height: isZoomer ? 40 : 32,
      backgroundColor: isZoomer ? '#EC4899' : '#2563EB',
      borderRadius: isZoomer ? 20 : 16,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: isZoomer ? 12 : 8,
    }
  });
};

const StashScreen = ({ navigation }) => {
  const mode = useSelector(state => state.settings.mode || 'classic');
  const isZoomer = mode === 'zoomer';
  const styles = useStyles(mode);
  const [activeFilter, setActiveFilter] = useState('All Idioms');

  const filters = ['All Idioms', 'Favorites', 'Recently Learned', 'Need Review'];

  const categories = [
    { icon: '💼', title: 'Business', count: 42, color: '#EFF6FF' },
    { icon: '🏠', title: 'Daily Life', count: 38, color: '#ECFDF5' },
    { icon: '🎓', title: 'Academic', count: 25, color: '#FEF3C7' },
    { icon: '💬', title: 'Social', count: 31, color: '#FEE2E2' },
  ];

  const recentlyLearned = [
    {
      emoji: '🎯',
      title: 'on the ball',
      description: 'Alert, attentive, and efficient',
      progress: 100,
      bookmarked: true,
      bgColor: '#EFF6FF',
    },
    {
      emoji: '🧠',
      title: 'food for thought',
      description: 'Something worth thinking about',
      progress: 95,
      bookmarked: true,
      bgColor: '#ECFDF5',
    },
    {
      emoji: '🔍',
      title: 'read between the lines',
      description: 'Understand what is implied',
      progress: 85,
      bookmarked: false,
      bgColor: '#FEF3C7',
    },
  ];

  const needsPractice = [
    {
      emoji: '🔄',
      title: 'hit the nail on the head',
      description: 'To describe exactly what is causing a situation',
      progress: 55,
      bookmarked: false,
    },
    {
      emoji: '🔄',
      title: 'a piece of cake',
      description: 'Something very easy to do',
      progress: 60,
      bookmarked: false,
    },
  ];

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>
        {isZoomer ? "Slang Stash" : "Idiom Library"}
      </Text>
      <View style={styles.headerRight}>
        <TouchableOpacity style={styles.iconButton}>
          <FontAwesome5
            name="search"
            size={isZoomer ? 24 : 18}
            color={isZoomer ? "#FFFFFF" : "#4B5563"}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <FontAwesome5
            name="ellipsis-v"
            size={isZoomer ? 24 : 18}
            color={isZoomer ? "#FFFFFF" : "#4B5563"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderFilters = () => (
    <View style={styles.filtersContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.filters}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                activeFilter === filter && styles.activeFilter,
              ]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text style={[
                styles.filterText,
                activeFilter === filter && styles.activeFilterText,
              ]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );

  const renderStats = () => (
    <View style={styles.statsSection}>
      {isZoomer ? (
        <LinearGradient
          colors={['#7E22CE', '#EC4899']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.statsCard}
        >
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>412</Text>
              <Text style={styles.statLabel}>Total Idioms</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>82%</Text>
              <Text style={styles.statLabel}>Mastery Level</Text>
            </View>
            <View style={[styles.statItem, styles.lastStatItem]}>
              <Text style={styles.statNumber}>35</Text>
              <Text style={styles.statLabel}>Bookmarked</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.reviewButton}>
            <Text style={styles.reviewButtonText}>Review Needs Practice</Text>
          </TouchableOpacity>
        </LinearGradient>
      ) : (
        <View style={styles.statsCard}>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>412</Text>
              <Text style={styles.statLabel}>Total Idioms</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>82%</Text>
              <Text style={styles.statLabel}>Mastery Level</Text>
            </View>
            <View style={[styles.statItem, styles.lastStatItem]}>
              <Text style={styles.statNumber}>35</Text>
              <Text style={styles.statLabel}>Bookmarked</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.reviewButton}>
            <Text style={styles.reviewButtonText}>Review Needs Practice</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const renderCategories = () => (
    <View style={styles.categoriesSection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllLink}>View All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.categoriesGrid}>
        {categories.map((category, index) => (
          <TouchableOpacity key={category.title} style={styles.categoryCard}>
            {isZoomer ? (
              <LinearGradient
                colors={getRandomGradient(index)}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[styles.categoryIcon, {backgroundColor: 'transparent'}]}
              >
                <Text style={styles.emoji}>{category.icon}</Text>
              </LinearGradient>
            ) : (
              <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
                <Text style={styles.emoji}>{category.icon}</Text>
              </View>
            )}
            <View>
              <Text style={styles.categoryTitle}>{category.title}</Text>
              <Text style={styles.categoryCount}>{category.count} idioms</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderRecentlyLearned = () => (
    <View style={styles.recentSection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recently Learned</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllLink}>View All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.recentList}>
        {recentlyLearned.map((item, index) => (
          <View key={item.title} style={[styles.idiomItem, index > 0 && styles.borderTop]}>
            {isZoomer ? (
              <LinearGradient
                colors={getRandomGradient(index)}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[styles.idiomIcon, {backgroundColor: 'transparent'}]}
              >
                <Text style={styles.emoji}>{item.emoji}</Text>
              </LinearGradient>
            ) : (
              <View style={[styles.idiomIcon, { backgroundColor: item.bgColor }]}>
                <Text style={styles.emoji}>{item.emoji}</Text>
              </View>
            )}
            <View style={styles.idiomInfo}>
              <View style={styles.idiomHeader}>
                <Text style={styles.idiomTitle}>{item.title}</Text>
                <View style={styles.progressContainer}>
                  <FontAwesome5
                    name="bookmark"
                    solid={item.bookmarked}
                    size={isZoomer ? 18 : 14}
                    color={item.bookmarked ? (isZoomer ? "#EC4899" : "#2563EB") : (isZoomer ? "rgba(255,255,255,0.4)" : "#9CA3AF")}
                    style={styles.bookmarkIcon}
                  />
                  <Text style={styles.progressText}>{item.progress}%</Text>
                </View>
              </View>
              <Text style={styles.idiomDescription}>{item.description}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderNeedsPractice = () => (
    <View style={styles.practiceSection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Needs Practice</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllLink}>View All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.practiceList}>
        {needsPractice.map((item, index) => (
          <View key={item.title} style={styles.practiceItem}>
            {isZoomer ? (
              <LinearGradient
                colors={['#ff0000', '#000000']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[styles.idiomIcon, {backgroundColor: 'transparent'}]}
              >
                <Text style={styles.emoji}>{item.emoji}</Text>
              </LinearGradient>
            ) : (
              <View style={[styles.idiomIcon, { backgroundColor: item.bgColor }]}>
                <Text style={styles.emoji}>{item.emoji}</Text>
              </View>
            )}
            <View style={styles.idiomInfo}>
              <View style={styles.idiomHeader}>
                <Text style={styles.idiomTitle}>{item.title}</Text>
                <View style={styles.progressContainer}>
                  <FontAwesome5
                    name="bookmark"
                    solid={item.bookmarked}
                    size={isZoomer ? 18 : 14}
                    color={item.bookmarked ? (isZoomer ? "#EC4899" : "#2563EB") : (isZoomer ? "rgba(255,255,255,0.4)" : "#9CA3AF")}
                    style={styles.bookmarkIcon}
                  />
                  <Text style={styles.progressText}>{item.progress}%</Text>
                </View>
              </View>
              <Text style={styles.idiomDescription}>{item.description}</Text>
            </View>
            <TouchableOpacity style={styles.playButton}>
              <FontAwesome5
                name="play"
                size={isZoomer ? 16 : 12}
                color="white"
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderFilters()}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {renderStats()}
        {renderCategories()}
        {renderRecentlyLearned()}
        {renderNeedsPractice()}
      </ScrollView>
    </View>
  );
};


export default StashScreen;
