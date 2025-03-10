import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import { fonts } from '../../styles/typography';

const getDefaultTip = (mode) => {
  if (mode === 'zoomer') {
    return {
      number: 42,
      text: "Pro tip: Record yourself using slang in different situations - it's like practicing your lines for a TikTok! 🎭",
      emoji: "💡"
    };
  }
  return {
    number: 42,
    text: "Practice using idioms in context rather than memorizing them in isolation to better understand their nuances.",
    emoji: "📝"
  };
};

const TodayTip = ({ 
  tipNumber,
  tipText,
  onViewMorePress,
  mode = 'classic'
}) => {
  const isZoomer = mode === 'zoomer';
  const defaultTip = getDefaultTip(mode);
  tipNumber = tipNumber || defaultTip.number;
  tipText = tipText || defaultTip.text;
  const emoji = defaultTip.emoji;

  if (isZoomer) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#1F2937', '#111827']}
          style={styles.zoomerTipCard}
        >
          <View style={styles.zoomerHeader}>
            <Text style={styles.zoomerTitle}>Quick Tip {emoji}</Text>
            <LinearGradient
              colors={['#EC4899', '#8B5CF6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.zoomerTipNumber}
            >
              <Text style={styles.zoomerTipNumberText}>#{tipNumber}</Text>
            </LinearGradient>
          </View>
          <Text style={styles.zoomerTipText}>{tipText}</Text>
          <TouchableOpacity 
            style={styles.zoomerViewMore}
            onPress={onViewMorePress}
          >
            <Text style={styles.zoomerViewMoreText}>More Tips</Text>
            <FontAwesome5 name="arrow-right" size={12} color="#EC4899" />
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.tipCard}>
        <Text style={styles.title}>Today's Tip {emoji}</Text>
        <Text style={styles.tipText}>{tipText}</Text>
        <View style={styles.footer}>
          <Text style={styles.tipNumber}>Tip #{tipNumber}</Text>
          <TouchableOpacity onPress={onViewMorePress}>
            <Text style={styles.viewMoreText}>View more tips</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  tipCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  title: {
    fontFamily: fonts.georgia,
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tipNumber: {
    fontSize: 12,
    color: '#6B7280',
  },
  viewMoreText: {
    fontSize: 12,
    color: '#2563EB',
  },
  // Zoomer Styles
  zoomerTipCard: {
    borderRadius: 16,
    padding: 20,
    backgroundColor: '#1F2937',
  },
  zoomerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  zoomerTitle: {
    fontFamily: fonts.righteous,
    fontSize: 24,
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  zoomerTipNumber: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
  },
  zoomerTipNumberText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: fonts.righteous,
  },
  zoomerTipText: {
    fontSize: 16,
    color: '#9CA3AF',
    lineHeight: 24,
    marginBottom: 16,
    fontFamily: fonts.righteous,
  },
  zoomerViewMore: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 8,
  },
  zoomerViewMoreText: {
    color: '#EC4899',
    fontSize: 14,
    fontFamily: fonts.righteous,
  },
});

export default TodayTip;