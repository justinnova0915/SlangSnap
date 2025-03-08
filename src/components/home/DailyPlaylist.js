import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { fonts } from '../../styles/typography';

const PlaylistItem = ({ 
  thumbnail, 
  title, 
  category, 
  duration, 
  isPlaying = false, 
  onPress 
}) => {
  return (
    <TouchableOpacity 
      style={styles.playlistItem}
      onPress={onPress}
    >
      <View style={styles.thumbnailContainer}>
        <Image 
          source={thumbnail} 
          style={styles.thumbnail}
        />
        {isPlaying ? (
          <View style={styles.playingBadge}>
            <Text style={styles.playingText}>Now Playing</Text>
          </View>
        ) : (
          <View style={styles.durationBadge}>
            <Text style={styles.durationText}>{duration}</Text>
          </View>
        )}
      </View>
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={styles.itemCategory}>{category}</Text>
      </View>
    </TouchableOpacity>
  );
};

const DailyPlaylist = ({ 
  clips = [], 
  onPlaylistItemPress 
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Daily Playlist</Text>
        <Text style={styles.clipCount}>{clips.length} clips</Text>
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
    fontFamily: fonts.righteous,
    fontSize: 16,
    color: '#1F2937',
  },
  clipCount: {
    fontSize: 14,
    color: '#2563EB',
  },
  scrollContent: {
    paddingLeft: 16,
    paddingRight: 4,
  },
  playlistItem: {
    width: 192,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  thumbnailContainer: {
    height: 96,
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
  playingText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
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
  durationText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  itemContent: {
    padding: 8,
  },
  itemTitle: {
    fontFamily: fonts.righteous,
    fontSize: 14,
    color: '#1F2937',
    marginBottom: 2,
  },
  itemCategory: {
    fontSize: 12,
    color: '#6B7280',
  },
});

export default DailyPlaylist;