import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { useColorScheme } from '@/src/hooks/useColorScheme';
import Button from '@/src/components/Button';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const animationFiles = {
  'no-internet': require('@/src/assets/animations/no-internet.json'),
  general: require('@/src/assets/animations/error.json'),
};
export default function ErrorMessage({}) {
  const colorScheme = useColorScheme();
  const styles = colorScheme === 'dark' ? darkStyles : lightStyles;

  const fileName = animationFiles['no-internet'];

  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <LottieView source={fileName} autoPlay loop style={{ height: 200, width: 200 }} />
        <Text style={styles.title}>Internet connection error!</Text>
        <Text style={styles.caption}>
          No internet connection available. Please check your internet connection
        </Text>
        <Button
          title="Try again"
          onPress={() => router.push('/')}
          style={{ marginTop: 20 }}
          labelStyle={{ fontSize: 14 }}
          icon="reload-sharp"
        />
      </View>
    </View>
  );
}

const commonStyles = StyleSheet.create({
  center: {
    flex: 1,
    flexDirect: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderRadius: 8, // Decreased corner radius (default is usually 28)
  },
  label: {
    fontSize: 16,
  },
});
const darkStyles = StyleSheet.create({
  ...commonStyles,
  title: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'HindShiliguriBold',
  },
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  caption: {
    paddingRight: 10 * 2,
    paddingLeft: 10 * 2,
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'HindShiliguri',
  },
});
const lightStyles = StyleSheet.create({
  ...commonStyles,
  title: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'HindShiliguriBold',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  caption: {
    paddingRight: 10 * 2,
    paddingLeft: 10 * 2,
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'HindShiliguri',
  },
});
