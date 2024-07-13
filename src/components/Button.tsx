import { useColorScheme } from '@/src/hooks/useColorScheme';
import React from 'react';
import { Button, ActivityIndicator } from 'react-native-paper';
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CustomButton = ({
  icon,
  onPress,
  title,
  mode = 'contained',
  style,
  labelStyle,
  lightColor = '#2f2f2f',
  darkColor = '#6f6f6f',
  lightTextColor = '#ffffff',
  darkTextColor = '#FFFFFF',
  loading,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const buttonColor = isDarkMode ? darkColor : lightColor;
  const textColor = isDarkMode ? darkTextColor : lightTextColor;

  const iconComponent = () => {
    if (loading) {
      return <ActivityIndicator size={16} color={textColor} />;
    }
    if (icon) {
      return <Ionicons name={icon} size={16} color={textColor} />;
    }
    return undefined;
  };

  return (
    <Button
      icon={iconComponent}
      mode={mode}
      loading={loading}
      onPress={onPress}
      textColor={textColor}
      style={[styles.button, { backgroundColor: buttonColor }, style]}
      labelStyle={[styles.label, labelStyle]}
    >
      {title}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
  },
  label: {
    paddingTop: 6,
    fontFamily: 'HindShiliguri',
  },
});

export default CustomButton;
