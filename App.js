import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store';
import WelcomeScreen from './screens/WelcomeScreen';
import StylePickerScreen from './screens/StylePickerScreen';
import VideoPlayerScreen from './screens/VideoPlayerScreen';
import VoiceRecordingScreen from './screens/VoiceRecordingScreen';
import SettingsScreen from './screens/SettingsScreen';
import QuizScreen from './src/screens/QuizScreen';
import StashScreen from './src/screens/StashScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Zoomer Tab Navigator
function ZoomerTabNavigator() {
  const StashStack = createStackNavigator();

  function StashStackNavigator() {
      return (
        <StashStack.Navigator screenOptions={{ headerShown: false }}>
          <StashStack.Screen
            name="StashMain"
            component={StashScreen}
            initialParams={{ mode: 'zoomer' }}
          />
          <StashStack.Screen name="Quiz" component={QuizScreen} />
        </StashStack.Navigator>
      );
    }

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
      <Tab.Screen name="Home" component={HomeZoomerScreen} />
      <Tab.Screen name="Learn" component={VideoPlayerScreen} />
      <Tab.Screen name="Voice" component={VoiceRecordingScreen} />
      <Tab.Screen name="Stash" component={StashStackNavigator} />
      <Tab.Screen name="Profile" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

// Classic Tab Navigator
function ClassicTabNavigator() {
  const LibraryStack = createStackNavigator();

  function LibraryStackNavigator() {
      return (
        <LibraryStack.Navigator screenOptions={{ headerShown: false }}>
          <LibraryStack.Screen
            name="LibraryMain"
            component={StashScreen}
            initialParams={{ mode: 'classic' }}
          />
          <LibraryStack.Screen name="Quiz" component={QuizScreen} />
        </LibraryStack.Navigator>
      );
    }

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
      <Tab.Screen name="Home" component={HomeClassicScreen} />
      <Tab.Screen name="Learn" component={VideoPlayerScreen} />
      <Tab.Screen name="Voice" component={VoiceRecordingScreen} />
      <Tab.Screen name="Library" component={LibraryStackNavigator} />
      <Tab.Screen name="Profile" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

// Zoomer Home Screen
function HomeZoomerScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.statusBar}>
        <Text style={styles.statusText}>9:41</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.streakBannerZoomer}>
          <Text style={styles.streakTextZoomer}>3 Day Streak!</Text>
        </View>
        <Text style={styles.screenText}>Zoomer Home</Text>
      </View>
    </View>
  );
}

// Classic Home Screen
function HomeClassicScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.statusBar}>
        <Text style={styles.statusText}>9:41</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.streakBannerClassic}>
          <Text style={styles.streakTextClassic}>3 Day Streak!</Text>
        </View>
        <Text style={styles.screenText}>Classic Home</Text>
      </View>
    </View>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="StylePicker"
              component={StylePickerScreen}
              options={{ headerShown: false }}
            />
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
  },
  tabBarZoomer: {
    backgroundColor: 'rgba(29, 29, 31, 0.8)',
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  tabBarClassic: {
    backgroundColor: 'rgba(248, 249, 250, 0.95)',
    borderTopColor: '#e0e0e0',
  },
  streakBannerZoomer: {
    backgroundColor: '#f02fc2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  streakTextZoomer: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  streakBannerClassic: {
    backgroundColor: '#3b82f6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  streakTextClassic: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
  },
});