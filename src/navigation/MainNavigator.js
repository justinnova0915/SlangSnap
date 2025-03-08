import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import StashScreen from '../screens/StashScreen';
import QuizScreen from '../screens/QuizScreen';
import VoiceRecordingScreen from '../../screens/VoiceRecordingScreen';
import PreferencesScreen from '../../screens/PreferencesScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeZoomerScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Zoomer Home Screen</Text>
    </View>
  );
}

function HomeClassicScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Classic Home Screen</Text>
    </View>
  );
}

export default function MainNavigator({ route }) {
  const { mode } = route.params || { mode: 'zoomer' };
  const stashTabName = mode === 'zoomer' ? 'Stash' : 'Library';

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={mode === 'zoomer' ? HomeZoomerScreen : HomeClassicScreen} />
      <Tab.Screen name={stashTabName}>
        {() => (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={stashTabName} component={StashScreen} />
            <Stack.Screen name="Quiz" component={QuizScreen} />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen name="Voice" component={VoiceRecordingScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}