import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { fonts } from '../styles/typography';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

const useStyles = (mode) => {
  const isZoomer = mode === 'zoomer';
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isZoomer ? '#111827' : '#F3F4F6',
    },
    contentContainer: {
      paddingBottom: isZoomer ? 24 : 20,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: isZoomer ? 16 : 12,
      backgroundColor: isZoomer ? '#111827' : 'white',
      borderBottomWidth: 1,
      borderBottomColor: isZoomer ? '#1F2937' : '#E5E7EB',
    },
    headerTitle: {
      fontSize: isZoomer ? 24 : 16,
      fontFamily: isZoomer ? fonts.righteous : fonts.georgia,
      color: isZoomer ? '#FFFFFF' : '#1F2937',
    },
    headerRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    pointsMultiplier: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isZoomer ? 'rgba(255,255,255,0.1)' : '#EFF6FF',
      borderWidth: 1,
      borderColor: isZoomer ? 'rgba(255,255,255,0.1)' : '#DBEAFE',
      borderRadius: 9999,
      paddingHorizontal: isZoomer ? 16 : 12,
      paddingVertical: isZoomer ? 6 : 4,
      gap: 4,
    },
    multiplierText: {
      color: isZoomer ? '#FCD34D' : '#2563EB',
      fontSize: isZoomer ? 14 : 12,
      fontFamily: isZoomer ? fonts.righteous : fonts.georgia,
      fontWeight: '500',
    },
    settingsButton: {
      width: isZoomer ? 40 : 32,
      height: isZoomer ? 40 : 32,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isZoomer ? 'rgba(255,255,255,0.1)' : 'transparent',
      borderRadius: isZoomer ? 20 : 16,
    },
    tabsContainer: {
      padding: isZoomer ? 16 : 12,
      backgroundColor: isZoomer ? '#111827' : 'white',
      borderBottomWidth: 1,
      borderBottomColor: isZoomer ? '#1F2937' : '#E5E7EB',
    },
    tabs: {
      flexDirection: 'row',
      backgroundColor: isZoomer ? '#1F2937' : '#F3F4F6',
      borderRadius: isZoomer ? 12 : 8,
      padding: 4,
    },
    tab: {
      flex: 1,
      paddingVertical: isZoomer ? 10 : 8,
      alignItems: 'center',
      borderRadius: isZoomer ? 8 : 6,
    },
    activeTab: {
      backgroundColor: isZoomer ? '#EC4899' : '#2563EB',
    },
    tabText: {
      color: isZoomer ? 'rgba(255,255,255,0.7)' : '#4B5563',
      fontSize: 14,
      fontFamily: isZoomer ? fonts.righteous : fonts.georgia,
      fontWeight: '500',
    },
    activeTabText: {
      color: 'white',
    },
    section: {
      padding: isZoomer ? 16 : 16,
    },
    card: {
      backgroundColor: isZoomer ? '#1F2937' : 'white',
      borderRadius: isZoomer ? 12 : 8,
      padding: isZoomer ? 16 : 16,
      borderWidth: 1,
      borderColor: isZoomer ? '#374151' : '#E5E7EB',
    },
    recordingHeader: {
      alignItems: 'center',
      marginBottom: isZoomer ? 24 : 16,
    },
    recordingTitle: {
      fontSize: isZoomer ? 24 : 18,
      fontFamily: isZoomer ? fonts.righteous : fonts.georgia,
      fontWeight: '600',
      color: isZoomer ? '#FFFFFF' : '#1F2937',
      marginBottom: 4,
    },
    recordingSubtitle: {
      fontSize: isZoomer ? 16 : 14,
      color: isZoomer ? 'rgba(255,255,255,0.7)' : '#6B7280',
      fontFamily: isZoomer ? fonts.righteous : fonts.georgia,
    },
    waveformContainer: {
      height: isZoomer ? 120 : 96,
      backgroundColor: isZoomer ? '#111827' : '#F9FAFB',
      borderWidth: 1,
      borderColor: isZoomer ? '#374151' : '#E5E7EB',
      borderRadius: isZoomer ? 12 : 6,
      marginBottom: isZoomer ? 24 : 16,
      padding: isZoomer ? 12 : 8,
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
    },
    recordingControls: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: isZoomer ? 24 : 16,
      marginBottom: isZoomer ? 16 : 12,
    },
    controlButton: {
      width: isZoomer ? 48 : 40,
      height: isZoomer ? 48 : 40,
      backgroundColor: isZoomer ? 'rgba(255,255,255,0.1)' : '#F3F4F6',
      borderRadius: isZoomer ? 24 : 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    recordButton: {
      width: isZoomer ? 64 : 56,
      height: isZoomer ? 64 : 56,
      backgroundColor: isZoomer ? '#EC4899' : '#2563EB',
      borderRadius: isZoomer ? 32 : 28,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: isZoomer ? '#EC4899' : '#2563EB',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: isZoomer ? 0.5 : 0.3,
      shadowRadius: 8,
      elevation: 6,
    },
    mixerSection: {
      backgroundColor: isZoomer ? '#111827' : '#F9FAFB',
      borderWidth: 1,
      borderColor: isZoomer ? '#374151' : '#E5E7EB',
      borderRadius: isZoomer ? 16 : 8,
      padding: isZoomer ? 20 : 16,
    },
    mixerHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: isZoomer ? 16 : 12,
    },
    mixerTitle: {
      fontSize: isZoomer ? 20 : 14,
      fontWeight: '500',
      color: isZoomer ? '#FFFFFF' : '#374151',
      fontFamily: isZoomer ? fonts.righteous : fonts.georgia,
    },
    addVoiceButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isZoomer ? '#EC4899' : '#2563EB',
      paddingHorizontal: isZoomer ? 12 : 8,
      paddingVertical: isZoomer ? 8 : 4,
      borderRadius: isZoomer ? 999 : 4,
      gap: 4,
    },
    addVoiceText: {
      color: 'white',
      fontSize: isZoomer ? 14 : 12,
      fontFamily: isZoomer ? fonts.righteous : fonts.georgia,
    },
    mixerTimeline: {
      minHeight: isZoomer ? 120 : 100,
      backgroundColor: isZoomer ? '#111827' : 'white',
      borderWidth: 1,
      borderColor: isZoomer ? '#374151' : '#E5E7EB',
      borderRadius: isZoomer ? 12 : 6,
      padding: isZoomer ? 16 : 12,
      flexDirection: 'row',
      gap: isZoomer ? 12 : 8,
      marginBottom: isZoomer ? 16 : 12,
    },
    voiceClip: {
      width: isZoomer ? 160 : 128,
      height: isZoomer ? 80 : 64,
      backgroundColor: isZoomer ? '#EC4899' : '#EFF6FF',
      borderWidth: 1,
      borderColor: isZoomer ? '#F472B6' : '#DBEAFE',
      borderRadius: isZoomer ? 12 : 6,
      padding: isZoomer ? 12 : 8,
      justifyContent: 'space-between',
    },
    echoClip: {
      width: isZoomer ? 120 : 96,
      backgroundColor: isZoomer ? '#1F2937' : '#F9FAFB',
      borderColor: isZoomer ? '#374151' : '#E5E7EB',
    },
    clipHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    clipTitle: {
      fontSize: isZoomer ? 14 : 12,
      fontWeight: '500',
      color: isZoomer ? '#FFFFFF' : '#4B5563',
      fontFamily: isZoomer ? fonts.righteous : fonts.georgia,
    },
    clipWaveform: {
      height: isZoomer ? 10 : 8,
      backgroundColor: isZoomer ? '#F472B6' : '#BFDBFE',
      borderRadius: isZoomer ? 5 : 4,
    },
    echoWaveform: {
      backgroundColor: isZoomer ? '#4B5563' : '#E5E7EB',
    },
    timelineMarkers: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    timeMarker: {
      fontSize: isZoomer ? 14 : 12,
      color: isZoomer ? '#EC4899' : '#6B7280',
      fontFamily: isZoomer ? fonts.righteous : fonts.georgia,
    },
    recordingTime: {
      textAlign: 'center',
      fontSize: isZoomer ? 16 : 14,
      color: isZoomer ? '#FFFFFF' : '#6B7280',
      fontFamily: isZoomer ? fonts.righteous : fonts.georgia,
      marginBottom: isZoomer ? 20 : 16,
    },
    actionsContainer: {
      flexDirection: 'row',
      gap: isZoomer ? 16 : 12,
      paddingHorizontal: 16,
      marginBottom: isZoomer ? 24 : 20,
    },
    discardButton: {
      flex: 1,
      borderWidth: 1,
      borderColor: isZoomer ? '#374151' : '#D1D5DB',
      paddingVertical: isZoomer ? 12 : 8,
      borderRadius: isZoomer ? 12 : 6,
      alignItems: 'center',
      backgroundColor: isZoomer ? 'rgba(255,255,255,0.1)' : 'transparent',
    },
    discardButtonText: {
      color: isZoomer ? '#FFFFFF' : '#374151',
      fontWeight: '500',
      fontFamily: isZoomer ? fonts.righteous : fonts.georgia,
      fontSize: isZoomer ? 16 : 14,
    },
    saveButton: {
      flex: 1,
      backgroundColor: isZoomer ? '#EC4899' : '#2563EB',
      paddingVertical: isZoomer ? 12 : 8,
      borderRadius: isZoomer ? 12 : 6,
      alignItems: 'center',
    },
    saveButtonText: {
      color: 'white',
      fontWeight: '500',
      fontFamily: isZoomer ? fonts.righteous : fonts.georgia,
      fontSize: isZoomer ? 16 : 14,
    },
    tipsTitle: {
      fontSize: isZoomer ? 20 : 16,
      fontWeight: '600',
      color: isZoomer ? '#FFFFFF' : '#1F2937',
      marginBottom: isZoomer ? 12 : 8,
      fontFamily: isZoomer ? fonts.righteous : fonts.georgia,
    },
    tipsList: {
      gap: isZoomer ? 12 : 8,
    },
    tipItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: isZoomer ? 12 : 8,
    },
    tipIcon: {
      marginTop: 2,
      color: isZoomer ? '#EC4899' : '#2563EB',
    },
    tipText: {
      flex: 1,
      fontSize: isZoomer ? 16 : 14,
      color: isZoomer ? '#FFFFFF' : '#374151',
      fontFamily: isZoomer ? fonts.righteous : fonts.georgia,
    },
    featuredHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      marginBottom: isZoomer ? 12 : 8,
    },
    featuredTitle: {
      fontSize: isZoomer ? 20 : 16,
      fontWeight: '600',
      color: isZoomer ? '#FFFFFF' : '#1F2937',
      fontFamily: isZoomer ? fonts.righteous : fonts.georgia,
    },
    seeAllLink: {
      color: isZoomer ? '#EC4899' : '#2563EB',
      fontSize: isZoomer ? 16 : 14,
      fontFamily: isZoomer ? fonts.righteous : fonts.georgia,
    },
    featuredList: {
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: isZoomer ? '#374151' : '#E5E7EB',
    },
    featuredItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: isZoomer ? 20 : 16,
      backgroundColor: isZoomer ? '#1F2937' : 'white',
      borderBottomWidth: 1,
      borderBottomColor: isZoomer ? '#374151' : '#E5E7EB',
    },
    speakerAvatar: {
      width: isZoomer ? 48 : 40,
      height: isZoomer ? 48 : 40,
      backgroundColor: isZoomer ? '#111827' : '#EFF6FF',
      borderRadius: isZoomer ? 24 : 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: isZoomer ? 16 : 12,
      borderWidth: isZoomer ? 1 : 0,
      borderColor: '#374151',
    },
    avatarEmoji: {
      fontSize: isZoomer ? 24 : 20,
    },
    speakerInfo: {
      flex: 1,
    },
    speakerHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: isZoomer ? 4 : 2,
    },
    speakerName: {
      fontSize: isZoomer ? 16 : 14,
      fontWeight: '500',
      color: isZoomer ? '#FFFFFF' : '#1F2937',
      fontFamily: isZoomer ? fonts.righteous : fonts.georgia,
    },
    speakerBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    badgeIcon: {
      marginRight: 4,
      color: isZoomer ? '#EC4899' : '#2563EB',
    },
    badgeText: {
      fontSize: isZoomer ? 14 : 12,
      color: isZoomer ? '#9CA3AF' : '#6B7280',
      fontFamily: isZoomer ? fonts.righteous : fonts.georgia,
    },
    recordingText: {
      fontSize: isZoomer ? 14 : 12,
      color: isZoomer ? '#FFFFFF' : '#6B7280',
      fontFamily: isZoomer ? fonts.righteous : fonts.georgia,
    },
    playButton: {
      width: isZoomer ? 40 : 32,
      height: isZoomer ? 40 : 32,
      backgroundColor: isZoomer ? 'rgba(255,255,255,0.1)' : '#F3F4F6',
      borderRadius: isZoomer ? 20 : 16,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: isZoomer ? 12 : 8,
    },
    termHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: isZoomer ? 16 : 12,
    },
    termInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: isZoomer ? 12 : 8,
    },
    termEmoji: {
      width: isZoomer ? 48 : 40,
      height: isZoomer ? 48 : 40,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isZoomer ? '#1F2937' : '#EFF6FF',
      borderRadius: isZoomer ? 24 : 20,
    },
    termTitle: {
      fontSize: isZoomer ? 20 : 16,
      fontWeight: '600',
      color: isZoomer ? '#FFFFFF' : '#1F2937',
      fontFamily: isZoomer ? fonts.righteous : fonts.georgia,
    },
    termCategory: {
      fontSize: isZoomer ? 14 : 12,
      color: isZoomer ? '#9CA3AF' : '#6B7280',
      fontFamily: isZoomer ? fonts.righteous : fonts.georgia,
    },
    infoButton: {
      width: isZoomer ? 40 : 32,
      height: isZoomer ? 40 : 32,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isZoomer ? 'rgba(255,255,255,0.1)' : 'transparent',
      borderRadius: isZoomer ? 20 : 16,
    },
    exampleBox: {
      backgroundColor: isZoomer ? '#1F2937' : '#F9FAFB',
      borderWidth: 1,
      borderColor: isZoomer ? '#374151' : '#E5E7EB',
      borderRadius: isZoomer ? 12 : 8,
      padding: isZoomer ? 16 : 12,
      marginBottom: isZoomer ? 16 : 12,
    },
    exampleText: {
      fontSize: isZoomer ? 16 : 14,
      color: isZoomer ? '#FFFFFF' : '#374151',
      fontFamily: isZoomer ? fonts.righteous : fonts.georgia,
    },
    highlightedText: {
      color: isZoomer ? '#EC4899' : '#2563EB',
      fontWeight: '600',
    },
    listenButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      backgroundColor: isZoomer ? '#EC4899' : '#2563EB',
      paddingVertical: isZoomer ? 12 : 10,
      borderRadius: isZoomer ? 12 : 6,
      gap: 6,
      marginBottom: isZoomer ? 16 : 12,
      shadowColor: isZoomer ? '#EC4899' : '#2563EB',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: isZoomer ? 0.3 : 0.2,
      shadowRadius: 6,
      elevation: 4,
    },
    buttonIcon: {
      color: 'white',
    },
    buttonText: {
      color: 'white',
      fontSize: isZoomer ? 16 : 14,
      fontWeight: '600',
      fontFamily: isZoomer ? fonts.righteous : fonts.georgia,
    },
    termActions: {
      flexDirection: 'row',
      gap: isZoomer ? 16 : 12,
    },
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isZoomer ? 'rgba(255,255,255,0.1)' : '#F3F4F6',
      paddingHorizontal: isZoomer ? 12 : 8,
      paddingVertical: isZoomer ? 8 : 4,
      borderRadius: isZoomer ? 999 : 4,
      gap: 4,
    },
    actionButtonText: {
      color: isZoomer ? '#FFFFFF' : '#374151',
      fontSize: isZoomer ? 14 : 12,
      fontFamily: isZoomer ? fonts.righteous : fonts.georgia,
    },
    sampleSentences: {
      marginBottom: isZoomer ? 24 : 16,
      backgroundColor: isZoomer ? 'transparent' : '#EFF6FF',
      borderWidth: isZoomer ? 0 : 1,
      borderColor: '#DBEAFE',
      borderRadius: 6,
      padding: isZoomer ? 0 : 12,
    },
    sampleTitle: {
      fontSize: isZoomer ? 16 : 14,
      fontWeight: '500',
      color: isZoomer ? '#FFFFFF' : '#374151',
      fontFamily: isZoomer ? fonts.righteous : fonts.georgia,
      marginBottom: isZoomer ? 12 : 4,
    },
    sampleText: {
      fontSize: isZoomer ? 14 : 13,
      lineHeight: isZoomer ? 22 : 20,
      color: isZoomer ? 'rgba(255,255,255,0.7)' : '#374151',
      fontFamily: isZoomer ? fonts.righteous : fonts.georgia,
      marginBottom: isZoomer ? 8 : 4,
      paddingLeft: isZoomer ? 12 : 0,
    },
  });
};

const VoiceRecordingScreen = () => {
  const mode = useSelector(state => state.settings.mode || 'classic');
  const isZoomer = mode === 'zoomer';
  const styles = useStyles(mode);
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
          <FontAwesome5 name="volume-up" size={20} color="white" />
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

export default VoiceRecordingScreen;