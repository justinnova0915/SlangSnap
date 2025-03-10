import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fonts } from '../styles/typography';

// Import screens
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import StylePickerScreen from '../screens/StylePickerScreen';
import PreferencesScreen from '../screens/PreferencesScreen';
import FirstSnapScreen from '../screens/FirstSnapScreen';
import HomeScreen from '../screens/HomeScreen';
import VideoPlayerScreen from '../screens/VideoPlayerScreen';
import VoiceRecordingScreen from '../screens/VoiceRecordingScreen';
import SettingsScreen from '../screens/SettingsScreen';
import QuizScreen from '../screens/QuizScreen';
import StashScreen from '../screens/StashScreen';
import { StyleTestScreen } from '../screens/StyleTestScreen';
import PreferencesContent from './PreferencesContent';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import screens
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import StylePickerScreen from '../screens/StylePickerScreen';
import PreferencesScreen from '../screens/PreferencesScreen';
import FirstSnapScreen from '../screens/FirstSnapScreen';
import HomeScreen from '../screens/HomeScreen';
import VideoPlayerScreen from '../screens/VideoPlayerScreen';
import VoiceRecordingScreen from '../screens/VoiceRecordingScreen';
import SettingsScreen from '../screens/SettingsScreen';
import QuizScreen from '../screens/QuizScreen';
import StashScreen from '../screens/StashScreen';
import { StyleTestScreen } from '../screens/StyleTestScreen';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fonts } from '../styles/typography';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  tabBarZoomer: {
    backgroundColor: 'rgba(29, 29, 31, 0.8)',
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  tabBarClassic: {
    backgroundColor: 'rgba(248, 249, 250, 0.95)',
    borderTopColor: '#e0e0e0',
  },
});

// Zoomer Tab Navigator
function ZoomerTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Learn') iconName = 'play';
          else if (route.name === 'Voice') iconName = 'mic';
          else if (route.name === 'Stash') iconName = 'book';
          else if (route.name === 'Profile') iconName = 'person';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: styles.tabBarZoomer,
        tabBarActiveTintColor: '#FF00FF',
        tabBarInactiveTintColor: '#aaa',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Learn" component={VideoPlayerScreen} />
      <Tab.Screen name="Voice" component={VoiceRecordingScreen} />
      <Tab.Screen name="Stash" component={StashScreen} />
      <Tab.Screen name="Profile" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

// Classic Tab Navigator
function ClassicTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Learn') iconName = 'play';
          else if (route.name === 'Voice') iconName = 'mic';
          else if (route.name === 'Library') iconName = 'book';
          else if (route.name === 'Profile') iconName = 'person';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: styles.tabBarClassic,
        tabBarActiveTintColor: '#003D99',
        tabBarInactiveTintColor: '#777',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Learn" component={VideoPlayerScreen} />
      <Tab.Screen name="Voice" component={VoiceRecordingScreen} />
      <Tab.Screen name="Library" component={StashScreen} />
      <Tab.Screen name="Profile" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

// Zoomer Tab Navigator
function ZoomerTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Learn') iconName = 'play';
          else if (route.name === 'Voice') iconName = 'mic';
          else if (route.name === 'Stash') iconName = 'book';
          else if (route.name === 'Profile') iconName = 'person';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: styles.tabBarZoomer,
        tabBarActiveTintColor: '#FF00FF',
        tabBarInactiveTintColor: '#aaa',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Learn" component={VideoPlayerScreen} />
      <Tab.Screen name="Voice" component={VoiceRecordingScreen} />
      <Tab.Screen name="Stash" component={StashScreen} />
      <Tab.Screen name="Profile" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

// Classic Tab Navigator
function ClassicTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Learn') iconName = 'play';
          else if (route.name === 'Voice') iconName = 'mic';
          else if (route.name === 'Library') iconName = 'book';
          else if (route.name === 'Profile') iconName = 'person';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: styles.tabBarClassic,
        tabBarActiveTintColor: '#003D99',
        tabBarInactiveTintColor: '#777',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Learn" component={VideoPlayerScreen} />
      <Tab.Screen name="Voice" component={VoiceRecordingScreen} />
      <Tab.Screen name="Library" component={StashScreen} />
      <Tab.Screen name="Profile" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarZoomer: {
    backgroundColor: 'rgba(29, 29, 31, 0.8)',
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  tabBarClassic: {
    backgroundColor: 'rgba(248, 249, 250, 0.95)',
    borderTopColor: '#e0e0e0',
  },
});

export default function RootNavigator() {
  const { token } = useSelector((state) => state.auth);
  const { mode } = useSelector(state => state.settings) || { mode: 'zoomer' };
  const isOnboardingComplete = false; // TODO: Get onboarding status from AsyncStorage

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {token ? (
          <>
            <Stack.Screen
              name="HomeZoomer"
              component={mode === 'zoomer' ? ZoomerTabNavigator : ClassicTabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Quiz"
              component={QuizScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="VideoPlayer"
              component={VideoPlayerScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="VoiceRecording"
              component={VoiceRecordingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Stash"
              component={StashScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="StyleTest"
              component={StyleTestScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
            <Stack.Screen name="StylePicker" component={StylePickerScreen} options={{ headerShown: false }} />
            <Stack.Screen name="FirstSnap" component={FirstSnapScreen} options={{ headerShown: false }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}