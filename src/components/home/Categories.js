import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { fonts } from '../../styles/typography';

const getDefaultCategories = (mode) => {
  if (mode === 'zoomer') {
    return [
      {
        id: 'social',
        emoji: '📱',
        title: 'Social Media',
        count: 28,
        gradient: ['#EC4899', '#9333EA'],
      },
      {
        id: 'gaming',
        emoji: '🎮',
        title: 'Gaming',
        count: 35,
        gradient: ['#3B82F6', '#1D4ED8'],
      },
      {
        id: 'music',
        emoji: '🎵',
        title: 'Music',
        count: 42,
        gradient: ['#10B981', '#059669'],
      },
      {
        id: 'school',
        emoji: '🏫',
        title: 'School',
        count: 24,
        gradient: ['#F59E0B', '#D97706'],
      },
    ];
  }
  return [
    {
      id: 'business',
      emoji: '💼',
      title: 'Business',
      count: 42,
      backgroundColor: '#DBEAFE',
    },
    {
      id: 'networking',
      emoji: '🤝',
      title: 'Networking',
      count: 36,
      backgroundColor: '#DCFCE7',
    },
    {
      id: 'academic',
      emoji: '🎓',
      title: 'Academic',
      count: 29,
      backgroundColor: '#FEF3C7',
    },
    {
      id: 'social',
      emoji: '💬',
      title: 'Social',
      count: 31,
      backgroundColor: '#FEE2E2',
    },
  ];
};

const CategoryCard = ({ emoji, title, count, backgroundColor, gradient, mode, onPress }) => {
  const isZoomer = mode === 'zoomer';

  return (
    <TouchableOpacity 
      style={[styles.categoryCard, isZoomer && styles.zoomerCategoryCard]}
      onPress={onPress}
    >
      {isZoomer ? (
        <LinearGradient
          colors={gradient}
          style={styles.zoomerEmojiContainer}
        >
          <Text style={styles.emoji}>{emoji}</Text>
        </LinearGradient>
      ) : (
        <View style={[styles.emojiContainer, { backgroundColor }]}>
          <Text style={styles.emoji}>{emoji}</Text>
        </View>
      )}
      <Text style={[styles.categoryTitle, isZoomer && styles.zoomerCategoryTitle]}>
        {title}
      </Text>
      <Text style={[styles.categoryCount, isZoomer && styles.zoomerCategoryCount]}>
        {count} {isZoomer ? 'terms' : 'idioms'}
      </Text>
    </TouchableOpacity>
  );
};

const Categories = ({ categories = [], onCategoryPress, mode = 'classic' }) => {
  const isZoomer = mode === 'zoomer';
  const defaultCategories = getDefaultCategories(mode);
  const displayCategories = categories.length > 0 ? categories : defaultCategories;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.sectionTitle, isZoomer && styles.zoomerSectionTitle]}>
          Categories
        </Text>
        <TouchableOpacity>
          <Text style={[styles.seeAllText, isZoomer && styles.zoomerSeeAllText]}>
            {isZoomer ? 'View All' : 'See All'}
          </Text>
        </TouchableOpacity>
      </View>

      {isZoomer ? (
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {displayCategories.map((category) => (
            <CategoryCard
              key={category.id}
              emoji={category.emoji}
              title={category.title}
              count={category.count}
              gradient={category.gradient}
              mode={mode}
              onPress={() => onCategoryPress(category)}
            />
          ))}
        </ScrollView>
      ) : (
        <View style={styles.grid}>
          {displayCategories.map((category) => (
            <CategoryCard
              key={category.id}
              emoji={category.emoji}
              title={category.title}
              count={category.count}
              backgroundColor={category.backgroundColor}
              mode={mode}
              onPress={() => onCategoryPress(category)}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 16,
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
  seeAllText: {
    fontSize: 14,
    color: '#2563EB',
  },
  zoomerSeeAllText: {
    fontSize: 14,
    color: '#EC4899',
    fontFamily: fonts.righteous,
  },
  scrollContent: {
    paddingLeft: 16,
    paddingRight: 4,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  categoryCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  zoomerCategoryCard: {
    width: 128,
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 12,
    marginRight: 12,
    borderWidth: 0,
    alignItems: 'center',
  },
  emojiContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  zoomerEmojiContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  emoji: {
    fontSize: 24,
  },
  categoryTitle: {
    fontFamily: fonts.georgia,
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },
  zoomerCategoryTitle: {
    fontFamily: fonts.righteous,
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 4,
    textAlign: 'center',
  },
  categoryCount: {
    fontSize: 12,
    color: '#6B7280',
  },
  zoomerCategoryCount: {
    fontSize: 12,
    color: '#9CA3AF',
    fontFamily: fonts.righteous,
  },
});

export default Categories;