// PostCardPlaceholder.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useColorScheme } from "@/src/hooks/useColorScheme";

const PostCardPlaceholder = () => {
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === 'dark' ? '#333' : '#e0e0e0';

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={[styles.header, { backgroundColor }]}>
        <View style={[styles.avatar, { backgroundColor }]} />
        <View style={[styles.headerText, { backgroundColor }]} />
      </View>
      <View style={[styles.title, { backgroundColor }]} />
      <View style={[styles.subtitle, { backgroundColor }]} />
      <View style={styles.footer}>
        <View style={[styles.footerItem, { backgroundColor }]} />
        <View style={[styles.footerItem, { backgroundColor }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 16,
    margin: 8,
    height: 150,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 12,
  },
  headerText: {
    height: 10,
    width: '50%',
    borderRadius: 4,
  },
  title: {
    height: 16,
    width: '80%',
    borderRadius: 4,
    marginBottom: 8,
  },
  subtitle: {
    height: 14,
    width: '60%',
    borderRadius: 4,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerItem: {
    height: 10,
    width: '20%',
    borderRadius: 4,
  },
});

export default PostCardPlaceholder;