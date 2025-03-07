import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function StashScreen({ navigation, route }) {
  const { mode } = route.params || { mode: 'zoomer' };
  const title = mode === 'zoomer' ? 'Stash' : 'Library';
  const buttonColor = mode === 'zoomer' ? '#f02fc2' : '#3b82f6';

  return (
    <View style={styles.screen}>
      <View style={styles.statusBar}>
        <Text style={styles.statusText}>9:41</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.screenText}>{title}</Text>
        <Button
          title="Go to Quiz"
          onPress={() => navigation.navigate('Quiz', { mode })}
          color={buttonColor}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
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
  screenText: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 20,
  }
});