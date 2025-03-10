import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import RootNavigator from './src/navigation/RootNavigator';

const loadFonts = async () => {
  await Font.loadAsync({
    Righteous: require('./src/assets/fonts/Righteous.ttf'),
    PermanentMarker: require('./src/assets/fonts/PermanentMarker.ttf'),
  });
};

function LoadingScreen() {
  return (
    <View style={styles.loadingContainer}>
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
}

export default function App() {
  const [isFontLoaded, setIsFontLoaded] = useState(false);

  useEffect(() => {
    loadFonts().then(() => setIsFontLoaded(true));
  }, []);

  if (!isFontLoaded) {
    return <LoadingScreen />;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <RootNavigator />
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  }
});