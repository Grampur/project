import { Link } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';

export default function WelcomeScreen() {
  return (
    <View>
      <Link href = {'accountLogin'}>Welcome to SwipeTrip</Link>
    </View>
  );
}
