import { Link } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to SwipeTrip</Text>
      <Pressable style={styles.button}>
        <Link href={'accountLogin'} style={styles.buttonText}>
          Login
        </Link>
      </Pressable>
      <Pressable style={[styles.button, styles.createAccountButton]}>
        <Link href={'createAccount'} style={styles.buttonText}>
          Create Account
        </Link>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    width: '40%',
    alignItems: 'center',
  },
  createAccountButton: {
    backgroundColor: '#34C759',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});