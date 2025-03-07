import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { selectMode } from '../src/store/settingsSlice';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const quizData = [
  {
    term: 'serving',
    definition: 'Looking exceptionally good or presentable',
    example: 'That outfit is serving major celebrity vibes!',
    mode: 'zoomer',
  },
  {
    term: 'on the ball',
    definition: 'Alert, attentive, and efficient',
    example: 'Sarah is always on the ball with her deadlines.',
    mode: 'classic',
  },
  {
    term: 'slay',
    definition: 'To do something exceptionally well',
    example: 'She slayed that presentation!',
    mode: 'zoomer',
  },
];

export default function QuizScreen() {
  const mode = useSelector(selectMode);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [translateX, setTranslateX] = useState(0);

  const filteredData = quizData.filter((item) => item.mode === mode);
  const currentCard = filteredData[currentIndex] || {};

  const onGestureEvent = (event) => {
    setTranslateX(event.nativeEvent.translationX);
  };

  const onHandlerStateChange = (event) => {
    if (event.nativeEvent.state === State.END) {
      const swipeThreshold = SCREEN_WIDTH * 0.25; // 25% of screen width
      if (Math.abs(translateX) > swipeThreshold) {
        const direction = translateX > 0 ? -1 : 1; // Left swipe: next, Right swipe: previous
        const newIndex = currentIndex + direction;
        if (newIndex >= 0 && newIndex < filteredData.length) {
          setCurrentIndex(newIndex);
        }
      }
      setTranslateX(0); // Reset position
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.statusBar}>
        <Text style={styles.statusText}>9:41</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.header}>
          {mode === 'zoomer' ? 'Slang Quiz' : 'Idiom Quiz'}
        </Text>
        <PanGestureHandler
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={onHandlerStateChange}
        >
          <View
            style={[
              styles.card,
              mode === 'zoomer' ? styles.cardZoomer : styles.cardClassic,
              { transform: [{ translateX }] },
            ]}
          >
            <Text style={styles.term}>{currentCard.term || 'No more cards'}</Text>
            <Text style={styles.definition}>{currentCard.definition || ''}</Text>
            <Text style={styles.example}>
              {currentCard.example ? `"${currentCard.example}"` : ''}
            </Text>
          </View>
        </PanGestureHandler>
        <Text style={styles.counter}>
          {currentIndex + 1} / {filteredData.length}
        </Text>
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  card: {
    width: SCREEN_WIDTH - 40,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  cardZoomer: {
    backgroundColor: '#f02fc2',
  },
  cardClassic: {
    backgroundColor: '#3b82f6',
  },
  term: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  definition: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  example: {
    fontSize: 14,
    color: '#fff',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  counter: {
    fontSize: 14,
    color: '#fff',
    marginTop: 20,
  },
});