import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { fonts } from '../../styles/typography';

const CategoryCard = ({ emoji, title, count, backgroundColor, onPress }) => {
  return (
    <TouchableOpacity 
      style={[styles.categoryCard, { backgroundColor: '#FFFFFF' }]}
      onPress={onPress}
    >
      <View style={[styles.emojiContainer, { backgroundColor }]}>
        <Text style={styles.emoji}>{emoji}</Text>
      </View>
      <Text style={styles.categoryTitle}>{title}</Text>
      <Text style={styles.categoryCount}>{count} idioms</Text>
    </TouchableOpacity>
  );
};

const Categories = ({ categories = [], onCategoryPress }) => {
  const defaultCategories = [
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

  const displayCategories = categories.length > 0 ? categories : defaultCategories;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        {displayCategories.map((category) => (
          <CategoryCard
            key={category.id}
            emoji={category.emoji}
            title={category.title}
            count={category.count}
            backgroundColor={category.backgroundColor}
            onPress={() => onCategoryPress(category)}
          />
        ))}
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
    fontFamily: fonts.righteous,
    fontSize: 16,
    color: '#1F2937',
  },
  seeAllText: {
    fontSize: 14,
    color: '#2563EB',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
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
  emojiContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  emoji: {
    fontSize: 24,
  },
  categoryTitle: {
    fontFamily: fonts.righteous,
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 12,
    color: '#6B7280',
  },
});

export default Categories;