import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios, { AxiosError } from 'axios';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.1.66:3001/accounts/login', {
        email,
        password
      }, {
        withCredentials: true,
        timeout: 5000
      });

      if (response.status === 200) {
        Alert.alert('Success', 'Login successful!');
        router.push('/loginSuccess');
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 401) {
            Alert.alert('Error', 'Invalid credentials');
          } else {
            Alert.alert('Error', 'An error occurred during login');
          }
        } else if (error.request) {
          console.log("here:", error.request);
          Alert.alert('Error', 'No response from server');
        } else {
          Alert.alert('Error', 'Error setting up request');
        }
      } else {
        // Handle non-Axios errors
        Alert.alert('Error', 'An unexpected error occurred');
      }
      console.error('Login error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput 
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      <TouchableOpacity 
        style={styles.loginButton}
        onPress={handleLogin}
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});