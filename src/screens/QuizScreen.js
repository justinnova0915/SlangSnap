import React from 'react';
import { View, Text } from 'react-native';

export default function QuizScreen({ route }) {
  const { mode } = route.params || { mode: 'zoomer' };
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Quiz Screen ({mode === 'zoomer' ? 'Stash' : 'Library'})</Text>
    </View>
  );
}