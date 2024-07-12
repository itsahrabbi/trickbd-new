import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Header from './components/Header';
import { useColorScheme } from '@/src/hooks/useColorScheme';
import { useBookmarkPost } from '@/src/hooks/post/useBookmarkPost';

const Bookmarks = () => {
  const [results, setResults] = useState([]);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const styles = isDarkMode ? darkStyles : lightStyles;
  const { removePost, getPosts } = useBookmarkPost();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getPosts();
        setResults(posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      {results.map((item) => (
        <Text
          key={item.id}
          style={{ fontFamily: 'HindShiliguri', margin: 4 }}
        >{`Item ${item.id}: ${item.title}`}</Text>
      ))}
    </View>
  );
};

export default Bookmarks;

const darkStyles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    flex: 1,
  },
});

const lightStyles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
});
