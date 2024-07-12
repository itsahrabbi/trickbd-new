import React, { useState, useRef } from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Carousel from 'react-native-snap-carousel';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');

const ImageGallery = () => {
  const { images, initialIndex } = useLocalSearchParams();
  const [activeIndex, setActiveIndex] = useState(parseInt(initialIndex));
  const carouselRef = useRef(null);

  const renderItem = ({ item }) => (
    <Image source={{ uri: item }} style={styles.image} resizeMode="contain" />
  );

  const goToPrevious = () => {
    if (activeIndex > 0) {
      carouselRef.current.snapToPrev();
    }
  };

  const goToNext = () => {
    if (activeIndex < images.length - 1) {
      carouselRef.current.snapToNext();
    }
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        data={JSON.parse(images)}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
        onSnapToItem={(index) => setActiveIndex(index)}
        firstItem={parseInt(initialIndex)}
      />
      <View style={styles.controls}>
        <TouchableOpacity onPress={goToPrevious} style={styles.button}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.indicator}>{`${activeIndex + 1} / ${JSON.parse(images).length}`}</Text>
        <TouchableOpacity onPress={goToNext} style={styles.button}>
          <Ionicons name="chevron-forward" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  image: {
    width: screenWidth,
    height: '100%',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  button: {
    padding: 10,
  },
  indicator: {
    color: 'white',
    fontSize: 16,
  },
});

export default ImageGallery;
