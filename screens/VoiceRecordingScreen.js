import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import { Audio } from 'expo-av';
import { useSelector } from 'react-redux';
import { selectMode } from '../src/store/settingsSlice';

export default function VoiceRecordingScreen() {
  const mode = useSelector(selectMode);
  const [recording, setRecording] = useState(null);
  const [sound, setSound] = useState(null);
  const [recordingUri, setRecordingUri] = useState(null);
  const [recordingStatus, setRecordingStatus] = useState('Idle');
  const bannerStyle = mode === 'zoomer' ? styles.bannerZoomer : styles.bannerClassic;
  const buttonStyle = mode === 'zoomer' ? styles.buttonZoomer : styles.buttonClassic;

  // Animation setup for waveform
  const [waveformAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    // Request audio recording permissions and set initial audio mode on mount
    async function setupAudio() {
      try {
        const { status } = await Audio.requestPermissionsAsync();
        if (status !== 'granted') {
          alert('Permission to access microphone is required!');
          return;
        }

        // Set minimal initial audio mode
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
          staysActiveInBackground: true
        });
        console.log('Audio mode set successfully for recording');
      } catch (err) {
        console.error('Failed to set up audio:', err);
        setRecordingStatus('Error');
      }
    }
    setupAudio();

    // Animate waveform when recording or playing
    waveformAnimation.setValue(0);
    
    if (recordingStatus === 'Recording' || recordingStatus === 'Playing') {
      Animated.loop(
        Animated.sequence([
          Animated.timing(waveformAnimation, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
            isInteraction: false,
          }),
          Animated.timing(waveformAnimation, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
            isInteraction: false,
          }),
        ]),
        { iterations: -1 }
      ).start();
    }

    // Cleanup sound and recording when component unmounts
    return () => {
      const cleanup = async () => {
        try {
          if (recording) {
            try {
              const status = await recording.getStatusAsync();
              if (status.isLoaded) {
                await recording.stopAndUnloadAsync();
              }
            } catch (err) {
              console.log('Recording cleanup:', err);
            }
          }
          if (sound) {
            try {
              const status = await sound.getStatusAsync();
              if (status.isLoaded) {
                await sound.unloadAsync();
              }
            } catch (err) {
              console.log('Sound cleanup:', err);
            }
          }
        } catch (err) {
          console.log('General cleanup error:', err);
        }
      };
      cleanup();
    };
  }, [recordingStatus]);

  const startRecording = async () => {
    try {
      // Set minimal audio mode for recording
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        shouldDuckAndroid: false,
        playThroughEarpieceAndroid: false
      });

      if (recording) {
        await stopRecording();
      }
      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync({
        android: {
          extension: '.m4a',
          outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
          audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
          sampleRate: 44100,
          numberOfChannels: 1,
          bitRate: 128000,
          audioSource: Audio.RECORDING_OPTION_ANDROID_AUDIO_SOURCE_MIC,
        },
        ios: {
          extension: '.m4a',
          outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_MPEG4AAC,
          audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MAX,
          sampleRate: 44100,
          numberOfChannels: 1,
          bitRate: 128000,
          linearPCMBitDepth: 16,
          linearPCMIsBigEndian: false,
          linearPCMIsFloat: false,
        },
      });
      await newRecording.startAsync();
      setRecording(newRecording);
      setRecordingStatus('Recording');
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording:', err);
      setRecordingStatus('Error');
    }
  };

  const stopRecording = async () => {
    if (!recording) return;
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      console.log('Recording stopped, URI:', uri);
      if (!uri) {
        throw new Error('No URI returned from recording');
      }
      setRecordingUri(uri);
      
      // Clean up old sound if it exists
      if (sound) {
        await sound.unloadAsync();
      }

      // Set proper audio mode and category after recording
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        shouldDuckAndroid: false,
        playThroughEarpieceAndroid: false,
        interruptionModeIOS: 0,
        interruptionModeAndroid: 1
      });
      
      // Set AVAudioSession category
      await Audio.setAudioModeAsync({
        ios: {
          category: Audio.AUDIO_MODE_PLAYBACK,
          mixWithOthers: false
        }
      });

      // Create sound object with high volume
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri },
        {
          shouldPlay: false,
          volume: 1.0,
          playsInSilentModeIOS: true,
        },
        (status) => {
          if (status.didJustFinish) {
            setRecordingStatus('Stopped');
          }
        }
      );
      
      setSound(newSound);
      setRecording(null);
      setRecordingStatus('Stopped');
      console.log('Sound object created');
    } catch (err) {
      console.error('Failed to stop recording:', err);
      setRecordingStatus('Error');
    }
  };

  const stopPlayback = async () => {
    if (sound) {
      try {
        await sound.stopAsync();
        setRecordingStatus('Stopped');
      } catch (err) {
        console.error('Failed to stop playback:', err);
        setRecordingStatus('Error');
      }
    }
  };

  const playRecording = async () => {
    if (recordingStatus === 'Playing') {
      await stopPlayback();
      return;
    }
    if (!recordingUri) {
      setRecordingStatus('No recording to play');
      return;
    }
    try {
      // Clean up existing sound
      if (sound) {
        await sound.unloadAsync();
      }

      // Set audio mode for playback using AVAudioSession category
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        shouldDuckAndroid: false,
        playThroughEarpieceAndroid: false,
        interruptionModeIOS: 0,
        interruptionModeAndroid: 1
      });
      
      // Set AVAudioSession category
      await Audio.setAudioModeAsync({
        ios: {
          category: Audio.AUDIO_MODE_PLAYBACK,
          mixWithOthers: false
        }
      });
      console.log('Audio mode set for playback with speaker category');

      // Create sound object
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: recordingUri },
        {
          shouldPlay: false,
          volume: 1.0,
          playsInSilentModeIOS: true,
          forceSpeakerOn: true,
          androidImplementation: 'MediaPlayer',
          audioFlags: 'speaker',
        },
        (status) => {
          if (status.didJustFinish) {
            setRecordingStatus('Stopped');
            console.log('Playback finished');
          } else if (status.error) {
            console.error('Playback error:', status.error);
            setRecordingStatus('Error');
          }
        }
      );

      setSound(newSound);
      
      await newSound.playAsync();
      setRecordingStatus('Playing');
      console.log('Playing recording through speaker');
    } catch (err) {
      console.error('Failed to play recording:', err);
      setRecordingStatus('Error');
    }
  };

  const resetRecording = async () => {
    try {
      if (recording) {
        await recording.stopAndUnloadAsync();
        setRecording(null);
      }
      if (sound) {
        const status = await sound.getStatusAsync();
        if (status.isLoaded) {
          await sound.unloadAsync();
        }
        setSound(null);
      }
      
      // Reset states while maintaining speaker settings
      setRecordingUri(null);
      setRecordingStatus('Idle');
      
      // Reset to default audio mode
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        staysActiveInBackground: true
      });
      
      console.log('Recording reset with speaker mode maintained');
    } catch (err) {
      console.error('Failed to reset recording:', err);
      setRecordingStatus('Error');
    }
  };

  // Waveform bars
  const renderWaveform = () => {
    const barCount = 20;
    const bars = [];
    const barColor = mode === 'zoomer' ? '#FF00FF' : '#003D99';

    for (let i = 0; i < barCount; i++) {
      const scaleY = waveformAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0.3, 1],
      });

      const baseHeight = recordingStatus === 'Stopped' && recordingUri
        ? 15 + Math.sin(i / barCount * Math.PI * 2) * 8
        : 15;

      bars.push(
        <Animated.View
          key={i}
          style={[
            styles.waveBar,
            {
              backgroundColor: barColor,
              height: baseHeight,
              transform: [
                {
                  scaleY: recordingStatus === 'Idle'
                    ? 0.5
                    : recordingStatus === 'Recording'
                    ? scaleY
                    : recordingStatus === 'Playing'
                    ? scaleY
                    : recordingStatus === 'Stopped' && recordingUri
                    ? 1
                    : 0.5,
                },
              ],
            },
          ]}
        />
      );
    }
    return <View style={styles.waveformContainer}>{bars}</View>;
  };

  return (
    <View style={styles.container}>
      <View style={styles.statusBar}>
        <Text style={styles.statusText}>9:41</Text>
      </View>
      <View style={styles.content}>
        <View style={bannerStyle}>
          <Text style={styles.header}>
            {mode === 'zoomer' ? 'Voice Snap Studio' : 'Voice Studio'}
          </Text>
        </View>
        <Text style={styles.statusText}>
          Status: {recordingStatus}
        </Text>
        {renderWaveform()}
        <View style={styles.controls}>
          <TouchableOpacity
            style={[
              styles.controlButton,
              buttonStyle,
              recordingStatus === 'Playing' ? styles.disabledButton : null,
            ]}
            onPress={recordingStatus === 'Recording' ? stopRecording : startRecording}
            disabled={recordingStatus === 'Playing'}
          >
            <Text style={styles.buttonText}>
              {recording ? 'Stop' : 'Record'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.controlButton,
              buttonStyle,
              (!recordingUri && recordingStatus !== 'Playing') || recordingStatus === 'Recording' ? styles.disabledButton : null,
            ]}
            onPress={playRecording}
            disabled={(!recordingUri && recordingStatus !== 'Playing') || recordingStatus === 'Recording'}
          >
            <Text style={styles.buttonText}>{recordingStatus === 'Playing' ? 'Stop' : 'Play'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.controlButton,
              buttonStyle,
              (!recordingUri && !recording) || recordingStatus === 'Playing' ? styles.disabledButton : null,
            ]}
            onPress={resetRecording}
            disabled={(!recordingUri && !recording) || recordingStatus === 'Playing'}
          >
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        </View>
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
    padding: 20,
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  statusText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
  },
  waveformContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  waveBar: {
    width: 4,
    borderRadius: 2,
    marginHorizontal: 2,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  controlButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonZoomer: {
    backgroundColor: '#ec4899',
  },
  buttonClassic: {
    backgroundColor: '#1e40af',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  disabledButton: {
    opacity: 0.5,
  },
});