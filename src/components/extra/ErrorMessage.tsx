import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { useColorScheme } from '@/src/hooks/useColorScheme';
import Button from '@/src/components/Button';
import { Ionicons } from '@expo/vector-icons';

const animationFiles = {
  'no-internet': require('@/src/assets/animations/no-internet.json'),
  general: require('@/src/assets/animations/error.json'),
};
export default function ErrorMessage({
  errorType,
  title,
  message,
  center,
  action,
  actionTitle,
  onActionPress,
  actionIcon,
}) {
  const colorScheme = useColorScheme();
  const styles = colorScheme === 'dark' ? darkStyles : lightStyles;
  const et = errorType === 'general' ? 1 : 1;
  const ef = errorType || 'general';
  const fileName = animationFiles[ef];

  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <LottieView source={fileName} autoPlay loop style={{ height: 200 * et, width: 200 * et }} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.caption}>{message}</Text>
        {action && (
          <Button
            title={actionTitle}
            onPress={onActionPress}
            style={{ marginTop: 20 }}
            labelStyle={{ fontSize: 14 }}
            icon={actionIcon}
          />
        )}
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
});
const darkStyles = StyleSheet.create({
  ...commonStyles,
  title: {
    color: 'white',
    fontSize: 20,
    marginBottom: 5,
    fontFamily: 'HindShiliguriBold',
  },
  caption: {
    paddingRight: 10 * 2,
    paddingLeft: 10 * 2,
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'HindShiliguri',
  },
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
});
const lightStyles = StyleSheet.create({
  ...commonStyles,
  title: {
    color: 'black',
    fontSize: 20,
    marginBottom: 5,
    fontFamily: 'HindShiliguriBold',
  },
  caption: {
    paddingRight: 10 * 2,
    paddingLeft: 10 * 2,
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'HindShiliguri',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
