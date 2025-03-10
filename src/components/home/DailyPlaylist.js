import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import { fonts } from '../../styles/typography';

const PlaylistItem = ({ 
  thumbnail, 
  title, 
  category, 
  duration, 
  isPlaying = false,
  mode = 'classic',
  onPress 
}) => {
  const isZoomer = mode === 'zoomer';

  return (
    <TouchableOpacity 
      style={[styles.playlistItem, isZoomer && styles.zoomerPlaylistItem]}
      onPress={onPress}
    >
      <View style={styles.thumbnailContainer}>
        <Image 
          source={thumbnail} 
          style={styles.thumbnail}
        />
        <LinearGradient
          colors={isZoomer ? ['transparent', 'rgba(0,0,0,0.7)'] : ['transparent', 'transparent']}
          style={StyleSheet.absoluteFill}
        />
        {isPlaying ? (
          isZoomer ? (
            <LinearGradient
              colors={['#EC4899', '#8B5CF6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.playingBadge, styles.zoomerPlayingBadge]}
            >
              <Text style={[styles.playingText, styles.zoomerPlayingText]}>Now Playing</Text>
            </LinearGradient>
          ) : (
            <View style={styles.playingBadge}>
              <Text style={styles.playingText}>Now Playing</Text>
            </View>
          )
        ) : (
          <View style={[styles.durationBadge, isZoomer && styles.zoomerDurationBadge]}>
            <Text style={[styles.durationText, isZoomer && styles.zoomerDurationText]}>{duration}</Text>
          </View>
        )}
      </View>
      <View style={[styles.itemContent, isZoomer && styles.zoomerItemContent]}>
        <Text style={[styles.itemTitle, isZoomer && styles.zoomerItemTitle]}>{title}</Text>
        <Text style={[styles.itemCategory, isZoomer && styles.zoomerItemCategory]}>{category}</Text>
      </View>
    </TouchableOpacity>
  );
};

const DailyPlaylist = ({ 
  clips = [], 
  onPlaylistItemPress,
  mode = 'classic'
}) => {
  const isZoomer = mode === 'zoomer';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.sectionTitle, isZoomer && styles.zoomerSectionTitle]}>
          Daily Playlist
        </Text>
        <View style={styles.countContainer}>
          {isZoomer && (
            <FontAwesome5 
              name="fire" 
              size={14} 
              color="#EC4899" 
              style={styles.fireIcon} 
            />
          )}
          <Text style={[styles.clipCount, isZoomer && styles.zoomerClipCount]}>
            {clips.length} clips
          </Text>
        </View>
      </View>

      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {clips.map((clip, index) => (
          <PlaylistItem
            key={clip.id || index}
            thumbnail={clip.thumbnail}
            title={clip.title}
            category={clip.category}
            duration={clip.duration}
            isPlaying={clip.isPlaying}
            mode={mode}
            onPress={() => onPlaylistItemPress(clip)}
          />
        ))}
      </ScrollView>
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
    paddingHorizontal: 16,
    marginBottom: 12,
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
  countContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fireIcon: {
    marginRight: 4,
  },
  clipCount: {
    fontSize: 14,
    color: '#2563EB',
  },
  zoomerClipCount: {
    fontSize: 14,
    color: '#9CA3AF',
    fontFamily: fonts.righteous,
  },
  scrollContent: {
    paddingLeft: 16,
    paddingRight: 4,
  },
  playlistItem: {
    width: 208,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  zoomerPlaylistItem: {
    backgroundColor: '#1F2937',
    borderWidth: 0,
    borderRadius: 16,
  },
  thumbnailContainer: {
    height: 112,
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  playingBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#2563EB',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  zoomerPlayingBadge: {
    borderRadius: 999,
  },
  playingText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  zoomerPlayingText: {
    fontFamily: fonts.righteous,
  },
  durationBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 2,
  },
  zoomerDurationBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  durationText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  zoomerDurationText: {
    fontFamily: fonts.righteous,
  },
  itemContent: {
    padding: 12,
  },
  zoomerItemContent: {
    padding: 16,
  },
  itemTitle: {
    fontFamily: fonts.georgia,
    fontSize: 14,
    color: '#1F2937',
    marginBottom: 2,
  },
  zoomerItemTitle: {
    fontFamily: fonts.righteous,
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  itemCategory: {
    fontSize: 12,
    color: '#6B7280',
  },
  zoomerItemCategory: {
    color: '#EC4899',
    fontFamily: fonts.righteous,
  },
});

export default DailyPlaylist;