import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { fonts } from '../styles/typography';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

const VoiceRecordingScreen = () => {
  const mode = useSelector(state => state.settings.mode);
  const [activeTab, setActiveTab] = useState('Record');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(7); // Mock recording time in seconds

  const tabs = ['Record', 'My Recordings', 'Featured'];

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Voice Snap Studio</Text>
      <View style={styles.headerRight}>
        <View style={styles.pointsMultiplier}>
          <FontAwesome5 name="bolt" size={12} color="#2563EB" />
          <Text style={styles.multiplierText}>2x Points</Text>
        </View>
        <TouchableOpacity style={styles.settingsButton}>
          <FontAwesome5 name="cog" size={20} color="#4B5563" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderTabs = () => (
    <View style={styles.tabsContainer}>
      <View style={styles.tabs}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              activeTab === tab && styles.activeTab
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[
              styles.tabText,
              activeTab === tab && styles.activeTabText
            ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderCurrentTerm = () => (
    <View style={styles.section}>
      <View style={styles.card}>
        <View style={styles.termHeader}>
          <View style={styles.termInfo}>
            <View style={styles.termEmoji}>
              <Text style={styles.emoji}>🎯</Text>
            </View>
            <View>
              <Text style={styles.termTitle}>on the ball</Text>
              <Text style={styles.termCategory}>Business Idiom</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.infoButton}>
            <FontAwesome5 name="info" size={16} color="#2563EB" />
          </TouchableOpacity>
        </View>

        <View style={styles.exampleBox}>
          <Text style={styles.exampleText}>
            "She's always <Text style={styles.highlightedText}>on the ball</Text> with her project deadlines." = Alert and attentive
          </Text>
        </View>

        <TouchableOpacity style={styles.listenButton}>
          <FontAwesome5 name="volume-up" size={16} color="#2563EB" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Listen to Example</Text>
        </TouchableOpacity>

        <View style={styles.termActions}>
          <TouchableOpacity style={styles.actionButton}>
            <FontAwesome5 name="sync" size={14} color="#4B5563" style={styles.buttonIcon} />
            <Text style={styles.actionButtonText}>Another Idiom</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <FontAwesome5 name="bookmark" size={14} color="#4B5563" style={styles.buttonIcon} />
            <Text style={styles.actionButtonText}>Save for Later</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderRecordingSection = () => (
    <View style={styles.section}>
      <View style={styles.card}>
        <View style={styles.recordingHeader}>
          <Text style={styles.recordingTitle}>Record Your Voice</Text>
          <Text style={styles.recordingSubtitle}>Practice using this idiom in a sentence</Text>
        </View>

        <View style={styles.waveformContainer}>
          {/* Mock waveform visualization */}
          <View style={styles.waveform} />
        </View>

        <View style={styles.sampleSentences}>
          <Text style={styles.sampleTitle}>Sample sentences:</Text>
          <Text style={styles.sampleText}>• "Our new project manager is always on the ball."</Text>
          <Text style={styles.sampleText}>• "To succeed in this job, you need to stay on the ball."</Text>
          <Text style={styles.sampleText}>• "She's known for being on the ball with all client requests."</Text>
        </View>

        <View style={styles.recordingControls}>
          <TouchableOpacity style={styles.controlButton}>
            <FontAwesome5 name="undo" size={20} color="#4B5563" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.recordButton}
            onPress={() => setIsRecording(!isRecording)}
          >
            <FontAwesome5 
              name="microphone" 
              size={24} 
              color="white" 
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton}>
            <FontAwesome5 name="play" size={20} color="#4B5563" />
          </TouchableOpacity>
        </View>

        <Text style={styles.recordingTime}>
          00:{recordingTime.toString().padStart(2, '0')} / 00:30 seconds
        </Text>

        <View style={styles.mixerSection}>
          <View style={styles.mixerHeader}>
            <Text style={styles.mixerTitle}>Mix Voices</Text>
            <TouchableOpacity style={styles.addVoiceButton}>
              <FontAwesome5 name="plus" size={12} color="white" style={styles.buttonIcon} />
              <Text style={styles.addVoiceText}>Add Voice</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.mixerTimeline}>
            <View style={styles.voiceClip}>
              <View style={styles.clipHeader}>
                <Text style={styles.clipTitle}>Main Voice</Text>
                <FontAwesome5 name="grip-lines" size={12} color="#9CA3AF" />
              </View>
              <View style={styles.clipWaveform} />
            </View>

            <View style={[styles.voiceClip, styles.echoClip]}>
              <View style={styles.clipHeader}>
                <Text style={styles.clipTitle}>Echo</Text>
                <FontAwesome5 name="grip-lines" size={12} color="#9CA3AF" />
              </View>
              <View style={[styles.clipWaveform, styles.echoWaveform]} />
            </View>
          </View>

          <View style={styles.timelineMarkers}>
            <Text style={styles.timeMarker}>0:00</Text>
            <Text style={styles.timeMarker}>0:15</Text>
            <Text style={styles.timeMarker}>0:30</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderActions = () => (
    <View style={styles.actionsContainer}>
      <TouchableOpacity style={styles.discardButton}>
        <Text style={styles.discardButtonText}>Discard</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save Recording</Text>
      </TouchableOpacity>
    </View>
  );

  const renderPracticeTips = () => (
    <View style={styles.section}>
      <View style={styles.card}>
        <Text style={styles.tipsTitle}>Voice Practice Tips</Text>
        <View style={styles.tipsList}>
          <View style={styles.tipItem}>
            <FontAwesome5 name="check-circle" size={16} color="#2563EB" style={styles.tipIcon} />
            <Text style={styles.tipText}>Use the idiom in a complete sentence that provides context</Text>
          </View>
          <View style={styles.tipItem}>
            <FontAwesome5 name="check-circle" size={16} color="#2563EB" style={styles.tipIcon} />
            <Text style={styles.tipText}>Practice with different intonations to sound more natural</Text>
          </View>
          <View style={styles.tipItem}>
            <FontAwesome5 name="check-circle" size={16} color="#2563EB" style={styles.tipIcon} />
            <Text style={styles.tipText}>Record yourself multiple times and listen for improvements</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderFeaturedExamples = () => (
    <View style={styles.section}>
      <View style={styles.featuredHeader}>
        <Text style={styles.featuredTitle}>Featured Examples</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllLink}>See All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.featuredList}>
        <View style={styles.featuredItem}>
          <View style={styles.speakerAvatar}>
            <Text style={styles.avatarEmoji}>👩</Text>
          </View>
          <View style={styles.speakerInfo}>
            <View style={styles.speakerHeader}>
              <Text style={styles.speakerName}>Jennifer W.</Text>
              <View style={styles.speakerBadge}>
                <FontAwesome5 name="star" size={12} color="#F59E0B" style={styles.badgeIcon} />
                <Text style={styles.badgeText}>Native Speaker</Text>
              </View>
            </View>
            <Text style={styles.recordingText}>"Our new hire is really on the ball with customer relations."</Text>
          </View>
          <TouchableOpacity style={styles.playButton}>
            <FontAwesome5 name="play" size={12} color="#2563EB" />
          </TouchableOpacity>
        </View>

        <View style={styles.featuredItem}>
          <View style={styles.speakerAvatar}>
            <Text style={styles.avatarEmoji}>👨</Text>
          </View>
          <View style={styles.speakerInfo}>
            <View style={styles.speakerHeader}>
              <Text style={styles.speakerName}>Michael T.</Text>
              <View style={styles.speakerBadge}>
                <FontAwesome5 name="award" size={12} color="#2563EB" style={styles.badgeIcon} />
                <Text style={styles.badgeText}>Top Contributor</Text>
              </View>
            </View>
            <Text style={styles.recordingText}>"To succeed in this company, you need to stay on the ball."</Text>
          </View>
          <TouchableOpacity style={styles.playButton}>
            <FontAwesome5 name="play" size={12} color="#2563EB" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {renderHeader()}
      {renderTabs()}
      {renderCurrentTerm()}
      {renderRecordingSection()}
      {renderActions()}
      {renderPracticeTips()}
      {renderFeaturedExamples()}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: fonts.righteous,
    color: '#1F2937',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  pointsMultiplier: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#DBEAFE',
    borderRadius: 9999,
    paddingHorizontal: 12,
    paddingVertical: 4,
    gap: 4,
  },
  multiplierText: {
    color: '#2563EB',
    fontSize: 12,
    fontWeight: '500',
  },
  settingsButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabsContainer: {
    padding: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#2563EB',
    borderRadius: 6,
  },
  tabText: {
    color: '#4B5563',
    fontSize: 14,
    fontWeight: '500',
  },
  activeTabText: {
    color: 'white',
  },
  section: {
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  termHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  termInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  termEmoji: {
    width: 48,
    height: 48,
    backgroundColor: '#EFF6FF',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 24,
  },
  termTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  termCategory: {
    fontSize: 14,
    color: '#6B7280',
  },
  infoButton: {
    width: 32,
    height: 32,
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exampleBox: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#DBEAFE',
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
  },
  exampleText: {
    color: '#374151',
  },
  highlightedText: {
    color: '#2563EB',
    fontWeight: '500',
  },
  listenButton: {
    backgroundColor: '#F3F4F6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 6,
    marginBottom: 12,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: '#374151',
    fontSize: 14,
  },
  termActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 6,
  },
  actionButtonText: {
    color: '#374151',
    fontSize: 14,
  },
  recordingHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  recordingTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  recordingSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  waveformContainer: {
    height: 96,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 6,
    marginBottom: 16,
    padding: 8,
  },
  waveform: {
    flex: 1,
    backgroundColor: '#EFF6FF',
  },
  sampleSentences: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#DBEAFE',
    borderRadius: 6,
    padding: 12,
    marginBottom: 16,
  },
  sampleTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 4,
  },
  sampleText: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 4,
  },
  recordingControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 12,
  },
  controlButton: {
    width: 40,
    height: 40,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordButton: {
    width: 56,
    height: 56,
    backgroundColor: '#2563EB',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordingTime: {
    textAlign: 'center',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  mixerSection: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 16,
  },
  mixerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  mixerTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  addVoiceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563EB',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  addVoiceText: {
    color: 'white',
    fontSize: 12,
  },
  mixerTimeline: {
    minHeight: 100,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 6,
    padding: 12,
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  voiceClip: {
    width: 128,
    height: 64,
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#DBEAFE',
    borderRadius: 6,
    padding: 8,
    justifyContent: 'space-between',
  },
  echoClip: {
    width: 96,
    backgroundColor: '#F9FAFB',
    borderColor: '#E5E7EB',
  },
  clipHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  clipTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#4B5563',
  },
  clipWaveform: {
    height: 8,
    backgroundColor: '#BFDBFE',
    borderRadius: 4,
  },
  echoWaveform: {
    backgroundColor: '#E5E7EB',
  },
  timelineMarkers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeMarker: {
    fontSize: 12,
    color: '#6B7280',
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  discardButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  discardButtonText: {
    color: '#374151',
    fontWeight: '500',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#2563EB',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  tipsList: {
    gap: 8,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  tipIcon: {
    marginTop: 2,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  featuredHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  featuredTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  seeAllLink: {
    color: '#2563EB',
    fontSize: 14,
  },
  featuredList: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  featuredItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  speakerAvatar: {
    width: 40,
    height: 40,
    backgroundColor: '#EFF6FF',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarEmoji: {
    fontSize: 20,
  },
  speakerInfo: {
    flex: 1,
  },
  speakerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  speakerName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  speakerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  badgeIcon: {
    marginRight: 4,
  },
  badgeText: {
    fontSize: 12,
    color: '#6B7280',
  },
  recordingText: {
    fontSize: 12,
    color: '#6B7280',
  },
  playButton: {
    width: 32,
    height: 32,
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
});

export default VoiceRecordingScreen;