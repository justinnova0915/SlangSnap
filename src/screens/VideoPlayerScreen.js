import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { fonts } from '../styles/typography';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

const VideoPlayerScreen = ({ navigation }) => {
  const mode = useSelector(state => state.settings.mode);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [progress, setProgress] = useState(45); // Mock progress percentage

  const mockClips = [
    { id: 1, title: 'On the ball', category: 'Business Communication', isPlaying: true },
    { id: 2, title: 'Break the ice', category: 'Social Situations' },
    { id: 3, title: 'Hit the ground running', category: 'Business Success' },
    { id: 4, title: 'Think outside the box', category: 'Creative Thinking' },
    { id: 5, title: 'Back to square one', category: 'Problem Solving' },
  ];

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
        <Ionicons name="arrow-back" size={24} color="#4B5563" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Idiom Video</Text>
      <View style={styles.headerRight}>
        <Text style={styles.progressText}>3/10</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="ellipsis-vertical" size={24} color="#4B5563" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderVideoPlayer = () => (
    <View style={styles.videoContainer}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c' }}
        style={styles.videoPreview}
      />
      <View style={styles.videoOverlay}>
        <TouchableOpacity 
          style={styles.playButton}
          onPress={() => setIsPlaying(!isPlaying)}
        >
          <FontAwesome5 
            name={isPlaying ? "pause" : "play"} 
            size={24} 
            color="white" 
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.videoControls}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <View style={styles.timeStamps}>
          <Text style={styles.timeText}>0:07</Text>
          <Text style={styles.timeText}>0:15</Text>
        </View>
        <View style={styles.controlButtons}>
          <TouchableOpacity style={styles.controlButton}>
            <FontAwesome5 name="backward" size={16} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.controlButton, styles.playPauseButton]}>
            <FontAwesome5 name={isPlaying ? "pause" : "play"} size={16} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton}>
            <FontAwesome5 name="forward" size={16} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.subtitleToggle}
        onPress={() => setShowSubtitles(!showSubtitles)}
      >
        <FontAwesome5 
          name="closed-captioning" 
          size={14} 
          color={showSubtitles ? "#2563EB" : "#6B7280"} 
        />
        <Text style={styles.subtitleToggleText}>
          CC {showSubtitles ? 'ON' : 'OFF'}
        </Text>
      </TouchableOpacity>

      {showSubtitles && (
        <View style={styles.subtitlesContainer}>
          <Text style={styles.subtitlesText}>
            Sarah has always been on the ball with her deadlines!
          </Text>
        </View>
      )}
    </View>
  );

  const renderPlaylist = () => (
    <View style={styles.playlistContainer}>
      <Text style={styles.playlistTitle}>Up Next</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carousel}>
        {mockClips.map((clip) => (
          <View key={clip.id} style={styles.carouselItem}>
            <View style={styles.thumbnailContainer}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c' }}
                style={styles.thumbnail}
              />
              {clip.isPlaying && (
                <View style={styles.nowPlayingBadge}>
                  <Text style={styles.nowPlayingText}>Now Playing</Text>
                </View>
              )}
            </View>
            <View style={styles.clipInfo}>
              <Text style={styles.clipTitle}>{clip.title}</Text>
              <Text style={styles.clipCategory}>{clip.category}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  const renderIdiomCard = () => (
    <View style={styles.idiomCard}>
      <View style={styles.idiomHeader}>
        <Text style={styles.idiomTitle}>on the ball</Text>
        <View style={styles.idiomActions}>
          <TouchableOpacity style={styles.idiomActionButton}>
            <FontAwesome5 name="bookmark" size={16} color="#6B7280" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.idiomActionButton}>
            <FontAwesome5 name="share-alt" size={16} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.idiomDescription}>
        Alert, attentive, and efficient. Someone who is "on the ball" is responsive and aware of what is happening.
      </Text>
      <View style={styles.exampleContainer}>
        <Text style={styles.exampleLabel}>Example:</Text>
        <Text style={styles.exampleText}>
          "Sarah is always <Text style={styles.highlightedText}>on the ball</Text> with her project deadlines."
        </Text>
      </View>
      <View style={styles.tagContainer}>
        <View style={styles.tag}><Text style={styles.tagText}>Business</Text></View>
        <View style={styles.tag}><Text style={styles.tagText}>Work</Text></View>
      </View>
    </View>
  );

  const renderActionButtons = () => (
    <View style={styles.actionButtonsContainer}>
      <TouchableOpacity style={styles.actionButton}>
        <View style={[styles.actionButtonIcon, styles.actionButtonBlue]}>
          <FontAwesome5 name="check" size={20} color="#2563EB" />
        </View>
        <Text style={styles.actionButtonText}>Got it</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton}>
        <View style={[styles.actionButtonIcon, styles.actionButtonBlue]}>
          <FontAwesome5 name="microphone" size={20} color="#2563EB" />
        </View>
        <Text style={styles.actionButtonText}>Record</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton}>
        <View style={[styles.actionButtonIcon, styles.actionButtonBlue]}>
          <FontAwesome5 name="redo" size={20} color="#2563EB" />
        </View>
        <Text style={styles.actionButtonText}>Replay</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton}>
        <View style={[styles.actionButtonIcon, styles.actionButtonPrimary]}>
          <FontAwesome5 name="forward" size={20} color="white" />
        </View>
        <Text style={styles.actionButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {renderHeader()}
      {renderVideoPlayer()}
      {renderPlaylist()}
      {renderIdiomCard()}
      {renderActionButtons()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  contentContainer: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: fonts.georgia,
    color: '#1F2937',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressText: {
    color: '#2563EB',
    fontSize: 14,
    marginRight: 8,
  },
  videoContainer: {
    height: Dimensions.get('window').height * 0.6,
    backgroundColor: '#000',
    position: 'relative',
  },
  videoPreview: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  videoOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 64,
    height: 64,
    backgroundColor: '#2563EB',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2563EB',
    borderRadius: 2,
  },
  timeStamps: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  timeText: {
    color: 'white',
    fontSize: 12,
  },
  controlButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
  },
  controlButton: {
    width: 32,
    height: 32,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playPauseButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  subtitleToggle: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  subtitleToggleText: {
    color: '#374151',
    fontSize: 12,
  },
  subtitlesContainer: {
    position: 'absolute',
    bottom: 100,
    left: 16,
    right: 16,
    alignItems: 'center',
  },
  subtitlesText: {
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 8,
    borderRadius: 8,
    fontSize: 14,
    textAlign: 'center',
  },
  playlistContainer: {
    backgroundColor: '#F9FAFB',
    padding: 16,
  },
  playlistTitle: {
    fontSize: 16,
    fontFamily: fonts.georgia,
    color: '#1F2937',
    marginBottom: 12,
  },
  carousel: {
    flexDirection: 'row',
  },
  carouselItem: {
    width: 192,
    marginRight: 12,
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  thumbnailContainer: {
    height: 96,
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  nowPlayingBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#2563EB',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  nowPlayingText: {
    color: 'white',
    fontSize: 12,
  },
  clipInfo: {
    padding: 8,
  },
  clipTitle: {
    fontSize: 14,
    fontFamily: fonts.georgia,
    color: '#1F2937',
  },
  clipCategory: {
    fontSize: 12,
    color: '#6B7280',
  },
  idiomCard: {
    margin: 16,
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  idiomHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  idiomTitle: {
    fontSize: 20,
    fontFamily: fonts.georgia,
    color: '#1F2937',
  },
  idiomActions: {
    flexDirection: 'row',
    gap: 8,
  },
  idiomActionButton: {
    width: 32,
    height: 32,
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  idiomDescription: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 12,
  },
  exampleContainer: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 12,
  },
  exampleLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  exampleText: {
    fontSize: 14,
    color: '#4B5563',
    fontStyle: 'italic',
  },
  highlightedText: {
    color: '#2563EB',
    fontWeight: 'bold',
  },
  tagContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  tag: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    color: '#2563EB',
    fontSize: 12,
  },
  actionButtonsContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  actionButton: {
    alignItems: 'center',
  },
  actionButtonIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  actionButtonBlue: {
    backgroundColor: '#EFF6FF',
  },
  actionButtonPrimary: {
    backgroundColor: '#2563EB',
  },
  actionButtonText: {
    fontSize: 12,
    color: '#4B5563',
  },
});

export default VideoPlayerScreen;