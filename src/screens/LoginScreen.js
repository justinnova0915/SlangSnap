import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { typography } from '../styles/typography';
import { gradients } from '../styles/gradients';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure, stylePickerComplete} from '../store/authSlice';
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
      dispatch(stylePickerComplete());
      console.log('6. Navigating to StylePicker');
      //navigation.navigate('StylePicker');
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
    <LinearGradient
      colors={gradients.zoomer.primary}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.content}>
        <Text style={[styles.title, typography.zoomer.heading.large]}>Welcome Back!</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, typography.zoomer.body.large]}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="rgba(255,255,255,0.7)"
          />

          <TextInput
            style={[styles.input, typography.zoomer.body.large]}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="rgba(255,255,255,0.7)"
          />
        </View>

        <TouchableOpacity
          onPress={handleLogin}
          disabled={false}
        >
          <LinearGradient
            colors={gradients.zoomer.secondary}
            style={styles.button}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={[styles.buttonText, typography.zoomer.button.large]}>Login</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.registerLink}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={[styles.registerText, typography.zoomer.body.regular]}>
            Don't have an account? Register here
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 40,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  inputContainer: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  input: {
    height: 55,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 15,
    paddingHorizontal: 20,
    marginBottom: 15,
    color: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    height: 55,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  registerLink: {
    marginTop: 30,
    alignItems: 'center',
  },
  registerText: {
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  }
});

export default LoginScreen;