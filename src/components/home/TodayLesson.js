import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import { fonts } from '../../styles/typography';

const getDefaultContent = (mode) => {
  if (mode === 'zoomer') {
    return {
      title: "rent free",
      emoji: "🧠",
      tags: ["Social Media", "Expression"],
      definition: "When someone or something is constantly on your mind without paying 'rent' - you can't stop thinking about it.",
      example: "That song is living rent free in my head all week.",
      subtitle: "Trending Slang"
    };
  }
  return {
    title: "break the ice",
    emoji: "🧊",
    tags: ["Business", "Communication"],
    definition: "To do or say something to relieve tension or get a conversation started in a social situation.",
    example: "He told a joke to break the ice at the start of the meeting.",
    subtitle: "Business Communication"
  };
};

const TodayLesson = ({
  title,
  emoji,
  tags,
  definition,
  example,
  onContinue,
  onListen,
  mode = 'classic'
}) => {
  const defaultContent = getDefaultContent(mode);
  title = title || defaultContent.title;
  emoji = emoji || defaultContent.emoji;
  tags = tags || defaultContent.tags;
  definition = definition || defaultContent.definition;
  example = example || defaultContent.example;
  const subtitle = defaultContent.subtitle;
  const isZoomer = mode === 'zoomer';
  
  return (
    <View style={styles.container}>
      <View style={[styles.header, isZoomer && styles.zoomerHeader]}>
        <Text style={[styles.sectionTitle, isZoomer && styles.zoomerSectionTitle]}>
          {isZoomer ? "Today's Slang" : "Today's Lesson"}
        </Text>
        {isZoomer ? (
          <View style={styles.dateContainer}>
            <FontAwesome5 name="calendar-alt" size={14} color="#EC4899" style={styles.calendarIcon} />
            <Text style={styles.dateText}>Apr 15</Text>
          </View>
        ) : null}
      </View>

      <View style={[styles.card, isZoomer && styles.zoomerCard]}>
        {isZoomer ? (
          <LinearGradient
            colors={['#6366f1', '#8b5cf6', '#ec4899']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientHeader}
          >
            <View style={styles.lessonInfo}>
              <View style={[styles.iconContainer, isZoomer && styles.zoomerIconContainer]}>
                <Text style={styles.emoji}>{emoji}</Text>
              </View>
              <View>
                <Text style={[styles.lessonTitle, isZoomer && styles.zoomerLessonTitle]}>
                  {title}
                </Text>
                <View style={styles.tagsContainer}>
                  {tags.map((tag, index) => (
                    <View key={index} style={styles.tag}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
            <View style={styles.trendingBadge}>
              <Text style={styles.trendingText}>🔥 Trending</Text>
            </View>
          </LinearGradient>
        ) : (
          <View style={styles.lessonInfo}>
            <View style={styles.iconContainer}>
              <Text style={styles.emoji}>{emoji}</Text>
            </View>
            <View>
              <Text style={styles.lessonTitle}>{title}</Text>
              <Text style={styles.lessonSubtitle}>{subtitle}</Text>
            </View>
          </View>
        )}

        <View style={styles.content}>

          <View style={styles.section}>
            <Text style={[styles.sectionLabel, isZoomer && styles.zoomerSectionLabel]}>
              Definition:
            </Text>
            <Text style={[styles.definitionText, isZoomer && styles.zoomerDefinitionText]}>
              {definition}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionLabel, isZoomer && styles.zoomerSectionLabel]}>
              Example:
            </Text>
            <View style={[styles.exampleBox, isZoomer && styles.zoomerExampleBox]}>
              <FontAwesome5 name="quote-left" size={14} color={isZoomer ? "#EC4899" : "#2563EB"} style={styles.quoteIcon} />
              <Text style={[styles.exampleText, isZoomer && styles.zoomerExampleText]}>
                {example.split(title).map((part, i, arr) => (
                  i === arr.length - 1 ? part : <React.Fragment key={i}>
                    {part}<Text style={[styles.highlightText, isZoomer && styles.zoomerHighlightText]}>{title}</Text>
                  </React.Fragment>
                ))}
              </Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.listenButton, isZoomer && styles.zoomerListenButton]}
              onPress={onListen}
            >
              <FontAwesome5 name="volume-up" size={14} color={isZoomer ? "white" : "#2563EB"} />
              <Text style={[styles.listenButtonText, isZoomer && styles.zoomerListenButtonText]}>Listen</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.practiceButton, isZoomer && styles.zoomerPracticeButton]}
              onPress={onContinue}
            >
              <Text style={[styles.practiceButtonText, isZoomer && styles.zoomerPracticeButtonText]}>
                {isZoomer ? "Practice Now" : "Continue"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
  zoomerHeader: {
    marginBottom: 16,
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
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calendarIcon: {
    marginRight: 4,
  },
  dateText: {
    color: '#9CA3AF',
    fontSize: 14,
    fontFamily: fonts.righteous,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  zoomerCard: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    borderWidth: 0,
  },
  gradientHeader: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  lessonInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  zoomerIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginRight: 12,
  },
  emoji: {
    fontSize: 24,
  },
  lessonTitle: {
    fontSize: 16,
    fontFamily: fonts.georgia,
    color: '#1F2937',
    marginBottom: 4,
  },
  zoomerLessonTitle: {
    fontSize: 24,
    fontFamily: fonts.righteous,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  tag: {
    backgroundColor: 'rgba(236,72,153,0.2)',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: 'rgba(236,72,153,0.3)',
  },
  tagText: {
    color: '#F9A8D4',
    fontSize: 12,
    fontFamily: fonts.righteous,
  },
  trendingBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  trendingText: {
    color: 'white',
    fontSize: 12,
    fontFamily: fonts.righteous,
  },
  content: {
    padding: 16,
    position: 'relative',
  },
  swipeIndicator: {
    position: 'absolute',
    right: 16,
    top: -8,
  },
  swipeEmoji: {
    fontSize: 24,
    opacity: 0.7,
  },
  section: {
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  zoomerSectionLabel: {
    color: '#9CA3AF',
    fontFamily: fonts.righteous,
  },
  definitionText: {
    fontSize: 14,
    color: '#1F2937',
    lineHeight: 20,
  },
  zoomerDefinitionText: {
    color: 'white',
    fontFamily: fonts.righteous,
    fontSize: 16,
    lineHeight: 24,
  },
  exampleBox: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  zoomerExampleBox: {
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 16,
  },
  quoteIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  exampleText: {
    flex: 1,
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
  zoomerExampleText: {
    color: 'white',
    fontFamily: fonts.righteous,
    fontSize: 16,
    lineHeight: 24,
  },
  highlightText: {
    color: '#2563EB',
    fontWeight: '500',
  },
  zoomerHighlightText: {
    color: '#EC4899',
    fontWeight: 'normal',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  listenButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF6FF',
    paddingVertical: 8,
    borderRadius: 6,
    gap: 8,
  },
  zoomerListenButton: {
    backgroundColor: '#374151',
    paddingVertical: 12,
    borderRadius: 12,
  },
  listenButtonText: {
    color: '#2563EB',
    fontSize: 14,
    fontWeight: '500',
  },
  zoomerListenButtonText: {
    color: 'white',
    fontFamily: fonts.righteous,
    fontSize: 16,
  },
  practiceButton: {
    flex: 1,
    backgroundColor: '#2563EB',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  zoomerPracticeButton: {
    backgroundColor: '#EC4899',
    paddingVertical: 12,
    borderRadius: 12,
  },
  practiceButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  zoomerPracticeButtonText: {
    fontFamily: fonts.righteous,
    fontSize: 16,
  },
});

export default TodayLesson;
