import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';
import { loginSuccess } from '../store/authSlice';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const { token, isLoading } = useSelector((state) => state.auth);
  console.log('token:', token);
  console.log('isLoading:', isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadStoredAuth = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        const storedUser = await AsyncStorage.getItem('user');
        
        if (storedToken && storedUser) {
          dispatch(loginSuccess({
            token: storedToken,
            user: JSON.parse(storedUser)
          }));
        }
      } catch (error) {
        console.error('Error loading stored auth:', error);
      }
    };

    loadStoredAuth();
  }, []);

  // If we have a token, render the main app, otherwise render the auth flow
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {token && styleSelected? (
          <Stack.Screen name="Main" component={MainNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;