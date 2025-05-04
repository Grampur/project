import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SwipeableCard from './swipeableCard';

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

  return (
    // Wrap the main view in GestureHandlerRootView
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.header}>Login successful</Text>
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
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 18,
    marginBottom: 30,
    fontWeight: 'bold',
  },
});
