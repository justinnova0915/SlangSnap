import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Dimensions, Animated } from 'react-native';
import { useSelector } from 'react-redux';
import { Video } from 'expo-av';
import { videoAPI } from '../services/api';
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

const VideoPlayerScreen = ({ navigation, route }) => {
  const { termId } = route.params || { termId: "placeholder" };
  const mode = useSelector(state => state.settings.mode || 'classic');
  const isZoomer = mode === 'zoomer';
  const styles = useStyles(mode);
  
  // Video state and ref
  const videoRef = React.useRef(null);
  const fadeAnim = React.useRef(new Animated.Value(1)).current;
  const controlsTimeoutRef = React.useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  
  const showControls = useCallback(() => {
    // Clear any existing timeout
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }

    // Show controls
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();

    // Set timeout to hide controls after 3 seconds if video is playing
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }, 3000);
    }
  }, [fadeAnim, isPlaying]);

  // Show controls when playback state changes
  useEffect(() => {
    showControls();
  }, [isPlaying, showControls]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  const togglePlayback = async () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      await videoRef.current.pauseAsync();
    } else {
      await videoRef.current.playAsync();
    }
  };
  
  // Term data state
  const [currentTerm, setCurrentTerm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [video, setVideo] = useState(null);

  // Helper functions
  const formatTime = (millis) => {
    if (!millis) return '0:00';
    const totalSeconds = Math.floor(millis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handlePlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setIsPlaying(status.isPlaying);
      setDuration(status.durationMillis || 0);
      setPosition(status.positionMillis || 0);
      if (status.durationMillis) {
        setProgress((status.positionMillis / status.durationMillis) * 100);
      }
    }
  };

  // Fetch terms for playlist
  const [terms, setTerms] = useState([]);
  useEffect(() => {
    const loadTerms = async () => {
      try {
        const data = await videoAPI.getTerms();
        setTerms(data);
      } catch (err) {
        console.error('Error loading terms:', err);
      }
    };
    loadTerms();
  }, []);

  // Fetch current term data
  useEffect(() => {
    const loadTerm = async () => {
      try {
        setIsLoading(true);
        const data = await videoAPI.getVideo(termId);
        setCurrentTerm(data);
        setVideo(data.videoUrl);
        setIsLoading(false);
      } catch (err) {
        console.error('Error loading term:', err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    loadTerm();
  }, [termId]);

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
    <TouchableOpacity
      activeOpacity={1}
      style={styles.videoContainer}
      onPress={showControls}
    >
      {video ? (
        <Video
          ref={videoRef}
          source={{ uri: video }}
          style={styles.videoPreview}
          useNativeControls={false}
          resizeMode="contain"
          isLooping={false}
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        />
      ) : (
        <View style={[styles.videoPreview, { backgroundColor: '#000' }]} />
      )}
      <Animated.View style={[styles.videoOverlay, { opacity: fadeAnim }]}>
        <TouchableOpacity
          style={styles.playButton}
          onPress={togglePlayback}
        >
          <FontAwesome5
            name={isPlaying ? "pause" : "play"}
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </Animated.View>
      
      <Animated.View style={[styles.videoControls, { opacity: fadeAnim }]}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <View style={styles.timeStamps}>
          <Text style={styles.timeText}>{formatTime(position)}</Text>
          <Text style={styles.timeText}>{formatTime(duration)}</Text>
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
      </Animated.View>

      <Animated.View style={[styles.subtitleToggle, { opacity: fadeAnim }]}>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
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
      </Animated.View>

      {showSubtitles && currentTerm && (
        <View style={styles.subtitlesContainer}>
          <Text style={styles.subtitlesText}>
            {currentTerm.examples?.[0] || currentTerm.text}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderPlaylist = () => (
    <View style={styles.playlistContainer}>
      <Text style={styles.playlistTitle}>Up Next</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carousel}>
        {terms.map((term) => (
          <TouchableOpacity
            key={term.term_id}
            style={styles.carouselItem}
            onPress={() => navigation.replace('VideoPlayer', { termId: term.term_id })}
          >
            <View style={styles.thumbnailContainer}>
              <View style={[styles.thumbnail, { backgroundColor: '#1A1A1A' }]} />
              {term.term_id === termId && (
                <View style={styles.nowPlayingBadge}>
                  <Text style={styles.nowPlayingText}>Now Playing</Text>
                </View>
              )}
            </View>
            <View style={styles.clipInfo}>
              <Text style={styles.clipTitle}>{term.text}</Text>
              <Text style={styles.clipCategory}>{term.category}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderIdiomCard = () => (
    <View style={styles.idiomCard}>
      {isLoading ? (
        <Text style={styles.idiomDescription}>Loading...</Text>
      ) : error ? (
        <Text style={styles.idiomDescription}>Error: {error}</Text>
      ) : currentTerm ? (
        <>
          <View style={styles.idiomHeader}>
            <Text style={styles.idiomTitle}>{currentTerm.text}</Text>
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
          <Text style={styles.idiomDescription}>{currentTerm.definition}</Text>
          {currentTerm.examples?.map((example, index) => (
            <View key={index} style={styles.exampleContainer}>
              <Text style={styles.exampleLabel}>Example {index + 1}:</Text>
              <Text style={styles.exampleText}>{example}</Text>
            </View>
          ))}
          <View style={styles.tagContainer}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{currentTerm.category}</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{currentTerm.difficulty}</Text>
            </View>
          </View>
        </>
      ) : null}
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