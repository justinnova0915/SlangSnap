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
import { registerStart, registerSuccess, registerFailure, resetStyle} from '../store/authSlice';
import { authAPI } from '../services/api';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    // Reset style selection when entering register screen
    dispatch(resetStyle());
  }, []);

  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    try {
      dispatch(registerStart());
      const response = await authAPI.register(username, email, password);
      dispatch(registerSuccess(response));
      navigation.navigate('StylePicker');
    } catch (error) {
      console.log('Registration Error:', error);
      let errorMessage = 'An error occurred during registration. Please try again.';
      
      if (error.message.includes('Network Error')) {
        errorMessage = 'Unable to connect to the server. Please check your internet connection.';
      } else if (error.message.includes('Username or email already exists')) {
        errorMessage = 'This username or email is already registered. Please try another.';
      } else if (error.message.includes('Invalid email')) {
        errorMessage = 'Please enter a valid email address.';
      } else if (error.response?.status === 404) {
        errorMessage = 'Server not found. Please try again later.';
      }
      
      dispatch(registerFailure(errorMessage));
      Alert.alert('Registration Failed', errorMessage);
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
        <Text style={[styles.title, typography.zoomer.heading.large]}>Create Account</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, typography.zoomer.body.large]}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            placeholderTextColor="rgba(255,255,255,0.7)"
          />

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

          <TextInput
            style={[styles.input, typography.zoomer.body.large]}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            placeholderTextColor="rgba(255,255,255,0.7)"
          />
        </View>

        <TouchableOpacity
          onPress={handleRegister}
          disabled={isLoading}
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
              <Text style={[styles.buttonText, typography.zoomer.button.large]}>Register</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginLink}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={[styles.loginText, typography.zoomer.body.regular]}>
            Already have an account? Login here
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
  loginLink: {
    marginTop: 30,
    alignItems: 'center',
  },
  loginText: {
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  }
});

export default RegisterScreen;