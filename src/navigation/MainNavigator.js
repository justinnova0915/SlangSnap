import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen'; // Placeholder or your existing screen
import StashScreen from '../screens/StashScreen'; // Main Stash/Library screen
import QuizScreen from '../screens/QuizScreen'; // Quiz screen to restore
import VoiceRecordingScreen from '../screens/VoiceRecordingScreen'; // From previous steps

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function MainNavigator({ route }) {
  // Mode passed via navigation params; default to 'zoomer'
  const { mode } = route.params || { mode: 'zoomer' };
  const stashTabName = mode === 'zoomer' ? 'Stash' : 'Library';

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name={stashTabName}>
        {() => (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={stashTabName} component={StashScreen} />
            <Stack.Screen name="Quiz" component={QuizScreen} />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen name="Voice" component={VoiceRecordingScreen} />
    </Tab.Navigator>
  );
}