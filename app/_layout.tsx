import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { Platform } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import { useColorScheme } from '@/src/hooks/useColorScheme';
import { PaperProvider } from 'react-native-paper';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
export const unstable_settings = {
  initialRouteName: '(posts)',
};
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../src/assets/fonts/SpaceMono-Regular.ttf'),
    HindShiliguri: require('../src/assets/fonts/HindSiliguri-Regular.ttf'),
    HindShiliguriBold: require('../src/assets/fonts/HindSiliguri-Bold.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <PaperProvider>
        <FixNavigationAccent />
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="bookmarks/index" />
          <Stack.Screen name="custom-error" />
          <Stack.Screen name="+not-found" />
        </Stack>
      </PaperProvider>
    </ThemeProvider>
  );
}

const FixNavigationAccent = () => {
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (Platform.OS === 'android') {
      setNavBarColor(colorScheme === 'dark' ? '#121212' : '#f5f5f5');
    }
  }, [colorScheme]);

  const setNavBarColor = async (color: string) => {
    if (Platform.OS === 'android') {
      try {
        await NavigationBar.setBackgroundColorAsync(color);
      } catch (error) {
        console.error('Failed to set navigation bar color:', error);
      }
    }
  };

  return null;
};
