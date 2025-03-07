# Audio Routing Issue Documentation

## Issue Description
After recording audio, playback is routed to the earpiece instead of speakers, affecting both:
- Recorded audio playback
- Video playback (which previously used speakers correctly)

## Current Behavior
1. Initial state:
   - Video playback works correctly through speakers
   - System audio routing is working as expected

2. After recording:
   - All audio playback routes to earpiece
   - This affects both recorded audio and video playback
   - The change persists until app restart

## Attempted Solutions

### 1. Minimal Audio Settings
```javascript
await Audio.setAudioModeAsync({
  allowsRecordingIOS: false,
  playsInSilentModeIOS: true,
  staysActiveInBackground: true
});
```
Result: Did not resolve the issue, audio still routed to earpiece

### 2. Explicit Speaker Settings
```javascript
await Audio.setAudioModeAsync({
  ...settings,
  outputMode: 2,
  iosVolumeMode: 2
});
```
Result: Temporarily worked but routing reverted to earpiece

### 3. Sound Object Configuration
```javascript
await Audio.Sound.createAsync(
  { uri },
  {
    forceSpeakerOn: true,
    androidImplementation: 'MediaPlayer',
    audioFlags: 'speaker'
  }
);
```
Result: Speaker flags did not maintain speaker routing

### 4. AVAudioSession Categories
```javascript
await Audio.setAudioModeAsync({
  ios: {
    category: Audio.AUDIO_MODE_PLAYBACK,
    mixWithOthers: false
  }
});
```
Result: Did not resolve the routing issue

## Observations
1. Video playback component does not explicitly set audio mode but achieves correct speaker routing
2. Recording appears to change something fundamental in the audio routing system
3. Changes persist even after stopping recording and releasing audio resources
4. The issue affects system-wide audio routing within the app

## Possible Investigation Areas
1. AVAudioSession state changes during recording
2. System audio routing preferences
3. Interaction between recording and playback audio categories
4. Comparison with video component's audio session handling

## Current Workaround
None identified. Users need to restart the app to restore speaker output.

## Next Steps
1. Consider this a known issue for future investigation
2. May require deeper investigation of iOS AVAudioSession behavior
3. Could benefit from native iOS debugging to understand audio session state changes
