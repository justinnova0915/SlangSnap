import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fonts } from '../styles/typography';

// Import screens
import WelcomeScreen from '../screens/WelcomeScreen';
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

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ONBOARDING_COMPLETE = 'onboarding_complete';

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

export default function MainNavigator() {
  // Get onboarding status from AsyncStorage
  const [isOnboardingComplete, setIsOnboardingComplete] = React.useState(false);
  const { mode } = useSelector(state => state.settings) || { mode: 'zoomer' };

  React.useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const status = await AsyncStorage.getItem(ONBOARDING_COMPLETE);
      setIsOnboardingComplete(status === 'true');
    } catch (error) {
      console.error('Error checking onboarding status:', error);
    }
  };

  return (
    <Stack.Navigator
      initialRouteName={"HomeZoomer"}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#111827',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontFamily: fonts.righteous,
          fontSize: 20,
        },
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="HomeZoomer"
        component={mode === 'zoomer' ? ZoomerTabNavigator : ClassicTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HomeClassic"
        component={ClassicTabNavigator}
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
      <Stack.Screen
        name="Preferences"
        component={PreferencesScreen}
        options={{
          title: 'Settings',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#111827',
          },
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
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