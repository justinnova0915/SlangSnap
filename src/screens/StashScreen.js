import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { fonts } from '../styles/typography';

const StashScreen = ({ navigation, route }) => {
  const { mode } = route.params || { mode: 'classic' };
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
      <Text style={styles.headerTitle}>Idiom Library</Text>
      <View style={styles.headerRight}>
        <TouchableOpacity style={styles.iconButton}>
          <FontAwesome5 name="search" size={18} color="#4B5563" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <FontAwesome5 name="ellipsis-v" size={18} color="#4B5563" />
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
        {categories.map((category) => (
          <TouchableOpacity key={category.title} style={styles.categoryCard}>
            <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
              <Text style={styles.emoji}>{category.icon}</Text>
            </View>
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
            <View style={[styles.idiomIcon, { backgroundColor: item.bgColor }]}>
              <Text style={styles.emoji}>{item.emoji}</Text>
            </View>
            <View style={styles.idiomInfo}>
              <View style={styles.idiomHeader}>
                <Text style={styles.idiomTitle}>{item.title}</Text>
                <View style={styles.progressContainer}>
                  <FontAwesome5 
                    name="bookmark" 
                    solid={item.bookmarked}
                    size={14} 
                    color={item.bookmarked ? "#2563EB" : "#9CA3AF"} 
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
            <View style={[styles.idiomIcon, { backgroundColor: '#FEE2E2' }]}>
              <Text style={styles.emoji}>{item.emoji}</Text>
            </View>
            <View style={styles.idiomInfo}>
              <View style={styles.idiomHeader}>
                <Text style={styles.idiomTitle}>{item.title}</Text>
                <View style={styles.progressContainer}>
                  <FontAwesome5 
                    name="bookmark" 
                    solid={item.bookmarked}
                    size={14} 
                    color={item.bookmarked ? "#2563EB" : "#9CA3AF"}
                    style={styles.bookmarkIcon} 
                  />
                  <Text style={styles.progressText}>{item.progress}%</Text>
                </View>
              </View>
              <Text style={styles.idiomDescription}>{item.description}</Text>
            </View>
            <TouchableOpacity style={styles.playButton}>
              <FontAwesome5 name="play" size={12} color="white" />
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
  headerRight: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filtersContainer: {
    backgroundColor: 'white',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  filters: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 6,
  },
  activeFilter: {
    backgroundColor: '#2563EB',
  },
  filterText: {
    fontSize: 14,
    color: '#4B5563',
    fontWeight: '500',
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
    padding: 16,
    backgroundColor: '#EFF6FF',
    borderBottomWidth: 1,
    borderBottomColor: '#DBEAFE',
  },
  statsCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  statsGrid: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
  },
  lastStatItem: {
    borderRightWidth: 0,
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
  reviewButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  reviewButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  categoriesSection: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  viewAllLink: {
    color: '#2563EB',
    fontSize: 14,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  emoji: {
    fontSize: 20,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  categoryCount: {
    fontSize: 12,
    color: '#6B7280',
  },
  recentSection: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  recentList: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  idiomItem: {
    backgroundColor: 'white',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  idiomIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
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
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookmarkIcon: {
    marginRight: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#6B7280',
  },
  idiomDescription: {
    fontSize: 12,
    color: '#6B7280',
  },
  practiceSection: {
    paddingHorizontal: 16,
  },
  practiceList: {
    gap: 12,
  },
  practiceItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  playButton: {
    width: 32,
    height: 32,
    backgroundColor: '#2563EB',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
});

export default StashScreen;