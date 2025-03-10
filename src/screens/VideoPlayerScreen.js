import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { fonts } from '../styles/typography';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

const useStyles = (mode) => {
  const isZoomer = mode === 'zoomer';
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isZoomer ? '#141414' : '#F3F4F6',
    },
    contentContainer: {
      paddingBottom: isZoomer ? 24 : 20,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: isZoomer ? '#1A1A1A' : 'white',
      paddingHorizontal: isZoomer ? 20 : 16,
      paddingVertical: isZoomer ? 16 : 12,
      borderBottomWidth: 1,
      borderBottomColor: isZoomer ? '#2A2A2A' : '#E5E7EB',
    },
    headerButton: {
      width: isZoomer ? 40 : 32,
      height: isZoomer ? 40 : 32,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isZoomer ? '#2A2A2A' : 'transparent',
      borderRadius: isZoomer ? 20 : 0,
    },
    headerTitle: {
      fontSize: isZoomer ? 20 : 16,
      fontFamily: isZoomer ? fonts.righteous : fonts.georgia,
      color: isZoomer ? '#FFFFFF' : '#1F2937',
      letterSpacing: isZoomer ? 0.5 : 0,
    },
    headerRight: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    progressText: {
      color: isZoomer ? '#FF3366' : '#2563EB',
      fontSize: isZoomer ? 16 : 14,
      marginRight: 8,
      fontFamily: isZoomer ? fonts.righteous : 'System',
    },
    videoContainer: {
      height: Dimensions.get('window').height * (isZoomer ? 0.65 : 0.6),
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
      backgroundColor: isZoomer ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.3)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    playButton: {
      width: isZoomer ? 80 : 64,
      height: isZoomer ? 80 : 64,
      backgroundColor: isZoomer ? '#FF3366' : '#2563EB',
      borderRadius: isZoomer ? 40 : 32,
      justifyContent: 'center',
      alignItems: 'center',
    },
    videoControls: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: isZoomer ? 20 : 16,
      backgroundColor: isZoomer ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.5)',
    },
    progressBar: {
      height: isZoomer ? 6 : 4,
      backgroundColor: isZoomer ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.3)',
      borderRadius: isZoomer ? 3 : 2,
      marginBottom: isZoomer ? 12 : 8,
    },
    progressFill: {
      height: '100%',
      backgroundColor: isZoomer ? '#FF3366' : '#2563EB',
      borderRadius: isZoomer ? 3 : 2,
    },
    timeStamps: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: isZoomer ? 20 : 16,
    },
    timeText: {
      color: 'white',
      fontSize: isZoomer ? 14 : 12,
      fontFamily: isZoomer ? fonts.righteous : 'System',
    },
    controlButtons: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: isZoomer ? 32 : 24,
    },
    controlButton: {
      width: isZoomer ? 40 : 32,
      height: isZoomer ? 40 : 32,
      backgroundColor: isZoomer ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.3)',
      borderRadius: isZoomer ? 20 : 16,
      justifyContent: 'center',
      alignItems: 'center',
    },
    playPauseButton: {
      width: isZoomer ? 48 : 40,
      height: isZoomer ? 48 : 40,
      borderRadius: isZoomer ? 24 : 20,
      backgroundColor: isZoomer ? '#FF3366' : 'rgba(255,255,255,0.3)',
    },
    subtitleToggle: {
      position: 'absolute',
      top: isZoomer ? 20 : 16,
      right: isZoomer ? 20 : 16,
      backgroundColor: isZoomer ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.8)',
      borderRadius: isZoomer ? 20 : 4,
      paddingHorizontal: isZoomer ? 12 : 8,
      paddingVertical: isZoomer ? 6 : 4,
      flexDirection: 'row',
      alignItems: 'center',
      gap: isZoomer ? 6 : 4,
    },
    subtitleToggleText: {
      color: isZoomer ? '#FFFFFF' : '#374151',
      fontSize: isZoomer ? 14 : 12,
      fontFamily: isZoomer ? fonts.righteous : 'System',
    },
    subtitlesContainer: {
      position: 'absolute',
      bottom: isZoomer ? 120 : 100,
      left: isZoomer ? 20 : 16,
      right: isZoomer ? 20 : 16,
      alignItems: 'center',
    },
    subtitlesText: {
      color: 'white',
      backgroundColor: isZoomer ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.7)',
      padding: isZoomer ? 12 : 8,
      borderRadius: isZoomer ? 12 : 8,
      fontSize: isZoomer ? 16 : 14,
      fontFamily: isZoomer ? fonts.righteous : 'System',
      textAlign: 'center',
    },
    playlistContainer: {
      backgroundColor: isZoomer ? '#1A1A1A' : '#F9FAFB',
      padding: isZoomer ? 20 : 16,
    },
    playlistTitle: {
      fontSize: isZoomer ? 24 : 16,
      fontFamily: isZoomer ? fonts.righteous : fonts.georgia,
      color: isZoomer ? '#FFFFFF' : '#1F2937',
      marginBottom: isZoomer ? 16 : 12,
      letterSpacing: isZoomer ? 0.5 : 0,
    },
    carousel: {
      flexGrow: 0,
    },
    carouselItem: {
      width: isZoomer ? 220 : 192,
      marginRight: isZoomer ? 16 : 12,
      backgroundColor: isZoomer ? '#2A2A2A' : 'white',
      borderRadius: isZoomer ? 16 : 8,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: isZoomer ? '#3A3A3A' : '#E5E7EB',
    },
    thumbnailContainer: {
      position: 'relative',
      height: isZoomer ? 120 : 96,
    },
    thumbnail: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    nowPlayingBadge: {
      position: 'absolute',
      top: isZoomer ? 12 : 8,
      right: isZoomer ? 12 : 8,
      backgroundColor: isZoomer ? '#FF3366' : '#2563EB',
      paddingHorizontal: isZoomer ? 12 : 8,
      paddingVertical: isZoomer ? 6 : 4,
      borderRadius: isZoomer ? 12 : 4,
    },
    nowPlayingText: {
      color: 'white',
      fontSize: isZoomer ? 14 : 12,
      fontFamily: isZoomer ? fonts.righteous : 'System',
    },
    idiomCard: {
      margin: isZoomer ? 20 : 16,
      padding: isZoomer ? 20 : 16,
      backgroundColor: isZoomer ? '#1A1A1A' : '#F9FAFB',
      borderRadius: isZoomer ? 16 : 8,
      borderWidth: 1,
      borderColor: isZoomer ? '#2A2A2A' : '#E5E7EB',
    },
    idiomTitle: {
      fontSize: isZoomer ? 28 : 20,
      fontFamily: isZoomer ? fonts.righteous : fonts.georgia,
      color: isZoomer ? '#FFFFFF' : '#1F2937',
      letterSpacing: isZoomer ? 0.5 : 0,
    },
    idiomActionButton: {
      width: isZoomer ? 40 : 32,
      height: isZoomer ? 40 : 32,
      backgroundColor: isZoomer ? '#2A2A2A' : '#F3F4F6',
      borderRadius: isZoomer ? 20 : 16,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: isZoomer ? '#3A3A3A' : '#E5E7EB',
    },
    idiomDescription: {
      fontSize: isZoomer ? 16 : 14,
      color: isZoomer ? '#9CA3AF' : '#4B5563',
      marginBottom: isZoomer ? 16 : 12,
      fontFamily: isZoomer ? fonts.righteous : 'System',
    },
    exampleContainer: {
      backgroundColor: isZoomer ? '#2A2A2A' : 'white',
      padding: isZoomer ? 16 : 12,
      borderRadius: isZoomer ? 12 : 8,
      borderWidth: 1,
      borderColor: isZoomer ? '#3A3A3A' : '#E5E7EB',
      marginBottom: isZoomer ? 16 : 12,
    },
    exampleLabel: {
      fontSize: isZoomer ? 14 : 12,
      color: isZoomer ? '#9CA3AF' : '#6B7280',
      marginBottom: isZoomer ? 6 : 4,
      fontFamily: isZoomer ? fonts.righteous : 'System',
    },
    exampleText: {
      fontSize: isZoomer ? 16 : 14,
      color: isZoomer ? '#FFFFFF' : '#4B5563',
      fontStyle: 'italic',
      fontFamily: isZoomer ? fonts.righteous : 'System',
    },
    highlightedText: {
      color: isZoomer ? '#FF3366' : '#2563EB',
      fontWeight: 'bold',
    },
    tag: {
      backgroundColor: isZoomer ? '#2A2A2A' : '#EFF6FF',
      paddingHorizontal: isZoomer ? 12 : 8,
      paddingVertical: isZoomer ? 6 : 4,
      borderRadius: isZoomer ? 16 : 12,
      borderWidth: isZoomer ? 1 : 0,
      borderColor: isZoomer ? '#FF3366' : 'transparent',
    },
    tagText: {
      color: isZoomer ? '#FF3366' : '#2563EB',
      fontSize: isZoomer ? 14 : 12,
      fontFamily: isZoomer ? fonts.righteous : 'System',
    },
    actionButtonsContainer: {
      backgroundColor: isZoomer ? '#1A1A1A' : 'white',
      paddingHorizontal: isZoomer ? 20 : 16,
      paddingVertical: isZoomer ? 16 : 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderTopWidth: 1,
      borderTopColor: isZoomer ? '#2A2A2A' : '#E5E7EB',
    },
    actionButtonIcon: {
      width: isZoomer ? 48 : 40,
      height: isZoomer ? 48 : 40,
      borderRadius: isZoomer ? 24 : 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: isZoomer ? 6 : 4,
    },
    actionButtonBlue: {
      backgroundColor: isZoomer ? '#2A2A2A' : '#EFF6FF',
    },
    actionButtonPrimary: {
      backgroundColor: isZoomer ? '#FF3366' : '#2563EB',
    },
    actionButtonText: {
      fontSize: isZoomer ? 14 : 12,
      color: isZoomer ? '#FFFFFF' : '#4B5563',
      fontFamily: isZoomer ? fonts.righteous : 'System',
    },
    clipInfo: {
      padding: isZoomer ? 12 : 8,
    },
    clipTitle: {
      fontSize: isZoomer ? 16 : 14,
      fontFamily: isZoomer ? fonts.righteous : fonts.georgia,
      color: isZoomer ? '#FFFFFF' : '#1F2937',
      marginBottom: isZoomer ? 4 : 2,
    },
    clipCategory: {
      fontSize: isZoomer ? 14 : 12,
      color: isZoomer ? '#9CA3AF' : '#6B7280',
      fontFamily: isZoomer ? fonts.righteous : 'System',
    }
  });
};

const VideoPlayerScreen = ({ navigation }) => {
  const mode = useSelector(state => state.settings.mode || 'classic');
  const [isPlaying, setIsPlaying] = useState(false);
  const isZoomer = mode === 'zoomer';
  const styles = useStyles(mode);
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
      <Text style={styles.headerTitle}>Idiom Video</Text>
      <View style={styles.headerRight}>
        <Text style={styles.progressText}>3/10</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons
            name="ellipsis-vertical"
            size={isZoomer ? 28 : 24}
            color={isZoomer ? "#FFFFFF" : "#4B5563"}
          />
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
            <FontAwesome5
              name="bookmark"
              size={isZoomer ? 20 : 16}
              color={isZoomer ? "#FFFFFF" : "#6B7280"}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.idiomActionButton}>
            <FontAwesome5
              name="share-alt"
              size={isZoomer ? 20 : 16}
              color={isZoomer ? "#FFFFFF" : "#6B7280"}
            />
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
          <FontAwesome5
            name="check"
            size={isZoomer ? 24 : 20}
            color={isZoomer ? "#FF3366" : "#2563EB"}
          />
        </View>
        <Text style={styles.actionButtonText}>Got it</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton}>
        <View style={[styles.actionButtonIcon, styles.actionButtonBlue]}>
          <FontAwesome5
            name="microphone"
            size={isZoomer ? 24 : 20}
            color={isZoomer ? "#FF3366" : "#2563EB"}
          />
        </View>
        <Text style={styles.actionButtonText}>Record</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton}>
        <View style={[styles.actionButtonIcon, styles.actionButtonBlue]}>
          <FontAwesome5
            name="redo"
            size={isZoomer ? 24 : 20}
            color={isZoomer ? "#FF3366" : "#2563EB"}
          />
        </View>
        <Text style={styles.actionButtonText}>Replay</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton}>
        <View style={[styles.actionButtonIcon, styles.actionButtonPrimary]}>
          <FontAwesome5
            name="forward"
            size={isZoomer ? 24 : 20}
            color="white"
          />
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

export default VideoPlayerScreen;