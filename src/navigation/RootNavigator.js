import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';
import { loginSuccess, logout, stylePickerComplete } from '../store/authSlice';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const { token, isLoading, styleSelected} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  console.log('Auth State:', { token, isLoading, styleSelected });
  
  // Force logout on mount
  // useEffect(() => {
  //   dispatch(logout());
  // }, []);

  useEffect(() => {
    const validateAuth = async () => {
      try {
        // If we have a token in the store, validate it
        if (token) {
          try {
            // Try to make an API call to validate the token
            await authAPI.validateToken(token);
          } catch (error) {
            // If token validation fails, log the user out
            console.log('Token validation failed:', error);
            dispatch(logout());
          }
        }
      } catch (error) {
        console.error('Error validating auth:', error);
        dispatch(logout());
      }
    };

    validateAuth();
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