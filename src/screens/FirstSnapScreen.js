import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { fonts } from '../styles/typography';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ONBOARDING_COMPLETE = 'onboarding_complete';

export default function FirstSnapScreen() {
  const navigation = useNavigation();
  const mode = useSelector((state) => state.settings.mode);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const content = {
    zoomer: {
      clip: "This party's lit!",
      question: "What does 'lit' mean in this context?",
      options: [
        "Actually on fire",
        "Very exciting and fun",
        "Well illuminated",
        "Too bright"
      ],
      correctAnswer: 1
    },
    classic: {
      clip: "She's on the ball with this project.",
      question: "What does 'on the ball' mean?",
      options: [
        "Playing sports",
        "Alert and efficient",
        "Standing on a ball",
        "Having fun"
      ],
      correctAnswer: 1
    }
  };

  const currentContent = mode === 'zoomer' ? content.zoomer : content.classic;

  const handleAnswer = (index) => {
    setSelectedAnswer(index);
    if (index === currentContent.correctAnswer) {
      setQuizCompleted(true);
    }
  };

  const handleContinue = async () => {
    try {
      // Mark onboarding as complete
      await AsyncStorage.setItem(ONBOARDING_COMPLETE, 'true');
      // Always navigate to HomeZoomer (which handles both modes internally)
      navigation.replace('HomeZoomer');
    } catch (error) {
      console.error('Error saving onboarding status:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>First {mode === 'zoomer' ? 'Snap' : 'Lesson'}</Text>
      
      {/* Clip Section */}
      <View style={styles.clipContainer}>
        <LinearGradient
          colors={mode === 'zoomer' ? ['#EC4899', '#8B5CF6'] : ['#3B82F6', '#1E40AF']}
          style={styles.clipGradient}
        >
          <Text style={styles.clipText}>{currentContent.clip}</Text>
        </LinearGradient>
      </View>

      {/* Quiz Section */}
      <View style={styles.quizContainer}>
        <Text style={styles.question}>{currentContent.question}</Text>
        {currentContent.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedAnswer === index && styles.selectedOption,
              selectedAnswer === index && 
              index === currentContent.correctAnswer && 
              styles.correctOption
            ]}
            onPress={() => handleAnswer(index)}
            disabled={quizCompleted}
          >
            <Text style={[
              styles.optionText,
              selectedAnswer === index && styles.selectedOptionText
            ]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Result & Continue */}
      {quizCompleted && (
        <View style={styles.resultContainer}>
          <Text style={styles.successText}>
            {mode === 'zoomer' ? '🔥 You nailed it!' : 'Well done!'}
          </Text>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    padding: 24,
  },
  title: {
    fontFamily: fonts.righteous,
    fontSize: 32,
    color: '#fff',
    marginBottom: 24,
    textAlign: 'center',
  },
  clipContainer: {
    marginBottom: 32,
    borderRadius: 12,
    overflow: 'hidden',
  },
  clipGradient: {
    padding: 24,
    alignItems: 'center',
  },
  clipText: {
    fontFamily: fonts.righteous,
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
  },
  quizContainer: {
    marginBottom: 24,
  },
  question: {
    fontFamily: fonts.righteous,
    fontSize: 18,
    color: '#fff',
    marginBottom: 16,
  },
  optionButton: {
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  selectedOption: {
    backgroundColor: '#374151',
  },
  correctOption: {
    backgroundColor: '#059669',
  },
  optionText: {
    fontFamily: fonts.righteous,
    fontSize: 16,
    color: '#D1D5DB',
  },
  selectedOptionText: {
    color: '#fff',
  },
  resultContainer: {
    alignItems: 'center',
  },
  successText: {
    fontFamily: fonts.righteous,
    fontSize: 24,
    color: '#059669',
    marginBottom: 16,
  },
  continueButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  continueButtonText: {
    fontFamily: fonts.righteous,
    fontSize: 18,
    color: '#fff',
  },
});