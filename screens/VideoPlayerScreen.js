import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Video } from 'expo-av';
import { useSelector } from 'react-redux';
import { selectMode } from '../src/store/settingsSlice';

export default function VideoPlayerScreen() {
  const mode = useSelector(selectMode);
  const bannerStyle = mode === 'zoomer' ? styles.bannerZoomer : styles.bannerClassic;
  const textStyle = mode === 'zoomer' ? styles.textZoomer : styles.textClassic;
  const [status, setStatus] = React.useState({});
  const [error, setError] = React.useState(null);

  const onPlaybackStatusUpdate = (status) => {
    setStatus(status);
    if (status.error) {
      setError(status.error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.statusBar}>
        <Text style={styles.statusText}>9:41</Text>
      </View>
      <View style={styles.content}>
        <View style={bannerStyle}>
          <Text style={textStyle}>
            {mode === 'zoomer' ? 'Slang Vid' : 'Idiom Lesson'}
          </Text>
        </View>
        {error ? (
          <Text style={styles.errorText}>Error loading video: {error}</Text>
        ) : (
          <Video
            source={{ uri: 'https://www.w3schools.com/html/mov_bbb.mp4' }}
            style={styles.video}
            shouldPlay
            useNativeControls
            resizeMode="contain"
            isLooping
            onPlaybackStatusUpdate={onPlaybackStatusUpdate}
          />
        )}
        {status.isLoading && <Text style={styles.loadingText}>Loading video...</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  statusBar: {
    height: 28,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerZoomer: {
    backgroundColor: '#f02fc2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  bannerClassic: {
    backgroundColor: '#3b82f6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  textZoomer: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  textClassic: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
  },
  video: {
    width: '100%',
    height: 300,
    marginTop: 20,
  },
  errorText: {
    color: '#ff4444',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  loadingText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
});