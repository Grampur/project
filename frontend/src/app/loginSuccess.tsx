import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import SwipeableCard from './swipeableCard';
import axios from 'axios';

type Place = {
  id: number;
  name: string;
};

const places: Place[] = [
  { id: 1, name: 'Sparcos' },
  { id: 2, name: 'Yakini' },
  { id: 3, name: 'Ultra Sushi' },
];

export default function IndexScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipeLeft = (place: Place) => {
    console.log('Skipped:', place.name);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleSwipeRight = (place: Place) => {
    console.log('Liked:', place.name);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://192.168.1.66:3001/accounts/logout', {}, {
        withCredentials: true // Important for sending cookies
      });
      
      if (response.status === 200) {
        // Redirect to index page after successful logout
        router.replace('/');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Pressable 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </Pressable>
        <Text style={styles.header}>Login successful</Text>
        <View style={styles.cardContainer}>
          {places
            .slice(currentIndex, currentIndex + 2)
            .reverse()
            .map((place) => (
              <SwipeableCard
                key={place.id}
                place={place}
                onSwipeLeft={handleSwipeLeft}
                onSwipeRight={handleSwipeRight}
              />
            ))}
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    marginBottom: 15,
    fontWeight: 'bold',
    marginTop: 20,
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
  },
  logoutButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: '#FF3B30',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    zIndex: 1,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});