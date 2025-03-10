import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../store/authSlice';
import { authAPI } from '../services/api';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [serverStatus, setServerStatus] = useState('checking');
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    testServerConnection();
  }, []);

  const testServerConnection = async () => {
    try {
      await authAPI.testConnection();
      console.log('Server connection successful');
      setServerStatus('connected');
    } catch (error) {
      console.log('Server connection failed:', error);
      setServerStatus('error');
      Alert.alert(
        'Connection Error',
        'Unable to connect to the server. Please check your internet connection and try again.'
      );
    }
  };

  const handleLogin = async () => {
    if (serverStatus !== 'connected') {
      Alert.alert(
        'Connection Error',
        'Not connected to server. Please wait for connection to be established.'
      );
      await testServerConnection();
      return;
    }

    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      console.log('1. Starting login attempt');
      dispatch(loginStart());
      
      console.log('2. Calling authAPI.login');
      const response = await authAPI.login(email, password);
      console.log('3. API Response:', response);
      
      if (!response || !response.token) {
        console.log('4. No token in response');
        throw new Error('Invalid login response');
      }
      
      console.log('5. Dispatching loginSuccess');
      dispatch(loginSuccess(response));
      navigation.navigate('StylePicker');
    } catch (error) {
      console.log('Login Error:', error);
      let errorMessage = 'An error occurred during login. Please try again.';
      
      if (error.message.includes('Network Error')) {
        errorMessage = 'Unable to connect to the server. Please check your internet connection.';
      } else if (error.message === 'Invalid credentials') {
        errorMessage = 'Incorrect email or password. Please try again.';
      } else if (error.response?.status === 404) {
        errorMessage = 'Server not found. Please try again later.';
      }
      
      dispatch(loginFailure(errorMessage));
      Alert.alert('Login Failed', errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity 
        style={styles.button} 
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.registerLink}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.registerText}>
          Don't have an account? Register here
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center'
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16
  },
  button: {
    backgroundColor: '#007AFF',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  registerLink: {
    marginTop: 20,
    alignItems: 'center'
  },
  registerText: {
    color: '#007AFF',
    fontSize: 16
  }
});

export default LoginScreen;