import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fonts } from './src/styles/typography';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

// Import screens
import WelcomeScreen from './src/screens/WelcomeScreen';
import StylePickerScreen from './src/screens/StylePickerScreen';
import PreferencesScreen from './src/screens/PreferencesScreen';
import FirstSnapScreen from './src/screens/FirstSnapScreen';
import HomeScreen from './src/screens/HomeScreen';
import VideoPlayerScreen from './src/screens/VideoPlayerScreen';
import VoiceRecordingScreen from './src/screens/VoiceRecordingScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import QuizScreen from './src/screens/QuizScreen';
import StashScreen from './src/screens/StashScreen';
import { StyleTestScreen } from './src/screens/StyleTestScreen';

const loadFonts = async () => {
  await Font.loadAsync({
    Righteous: require('./src/assets/fonts/Righteous.ttf'),
    PermanentMarker: require('./src/assets/fonts/PermanentMarker.ttf'),
  });
};

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const ONBOARDING_COMPLETE = 'onboarding_complete';

function LoadingScreen() {
  return (
    <View style={[styles.screen, styles.loadingContainer]}>
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
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

export default function App() {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [isFontLoaded, setIsFontLoaded] = useState(false);

  useEffect(() => {
    loadFonts().then(() => setIsFontLoaded(true));
  }, []);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      await AsyncStorage.setItem(ONBOARDING_COMPLETE, 'false');
      setIsOnboardingComplete(false);
      setIsLoading(false);
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      setIsLoading(false);
    }
  };

  if (isLoading || !isFontLoaded) {
    return <LoadingScreen />;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={isOnboardingComplete ? "HomeZoomer" : "Welcome"}
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
            {!isOnboardingComplete ? (
              <>
                <Stack.Screen 
                  name="Welcome" 
                  component={WelcomeScreen} 
                  options={{ headerShown: false }} 
                />
                <Stack.Screen 
                  name="StylePicker" 
                  component={StylePickerScreen} 
                  options={{ 
                    title: 'Pick Your Vibe',
                    headerLeft: null
                  }} 
                />
                <Stack.Screen 
                  name="Preferences" 
                  component={PreferencesScreen} 
                  options={{ title: 'Select Interests' }} 
                />
                <Stack.Screen 
                  name="FirstSnap" 
                  component={FirstSnapScreen} 
                  options={{ 
                    title: 'First Snap',
                    headerLeft: null
                  }} 
                />
              </>
            ) : null}
            <Stack.Screen 
              name="HomeZoomer" 
              component={ZoomerTabNavigator}
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
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  tabBarZoomer: {
    backgroundColor: 'rgba(29, 29, 31, 0.8)',
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  tabBarClassic: {
    backgroundColor: 'rgba(248, 249, 250, 0.95)',
    borderTopColor: '#e0e0e0',
  },
});