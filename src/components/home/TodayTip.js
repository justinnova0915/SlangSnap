import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { fonts } from '../../styles/typography';

const TodayTip = ({ 
  tipNumber = 42, 
  tipText = "Practice using idioms in context rather than memorizing them in isolation to better understand their nuances.",
  onViewMorePress
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.tipCard}>
        <Text style={styles.title}>Today's Tip</Text>
        <Text style={styles.tipText}>{tipText}</Text>
        <View style={styles.footer}>
          <Text style={styles.tipNumber}>Tip #{tipNumber}</Text>
          <TouchableOpacity onPress={onViewMorePress}>
            <Text style={styles.viewMoreText}>View more tips</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  tipCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  title: {
    fontFamily: fonts.righteous,
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tipNumber: {
    fontSize: 12,
    color: '#6B7280',
  },
  viewMoreText: {
    fontSize: 12,
    color: '#2563EB',
  },
});

export default TodayTip;