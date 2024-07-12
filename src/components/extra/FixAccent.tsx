import React from 'react';
import { Platform } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import { useColorScheme } from '@/src/hooks/useColorScheme';

const FixAccent = () => {
  const colorScheme = useColorScheme();
  React.useEffect(() => {
    if (Platform.OS === 'android') {
      setNavBarColor(colorScheme === 'dark' ? '#121212' : '#f5f5f5');
    }
  }, [colorScheme]);

  const setNavBarColor = async (color) => {
    if (Platform.OS === 'android') {
      try {
        await NavigationBar.setBackgroundColorAsync(color);
      } catch (error) {
        console.error('Failed to set navigation bar color:', error);
      }
    }
  };
  return <></>;
};
export default FixAccent;
