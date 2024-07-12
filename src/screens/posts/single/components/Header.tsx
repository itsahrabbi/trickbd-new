import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ToastAndroid } from 'react-native';
import * as Linking from 'expo-linking';
import { Feather, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useColorScheme } from '@/src/hooks/useColorScheme';
import { Menu, Divider } from 'react-native-paper';

import { useBookmarkPost as useSavePost } from '@/src/hooks/post/useBookmarkPost';

const Header = ({ onSharePress, bookmarkData, loadState }) => {
  const colorScheme = useColorScheme();
  const styles = colorScheme === 'dark' ? darkStyles : lightStyles;
  const [menuVisible, setMenuVisible] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [bookSt, setBookSt] = useState(false);
  const [postUrl, setPostUrl] = useState(null);
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);
  const { savePost, removePost, isPostSaved } = useSavePost();
  useEffect(() => {
    if (!loadState && bookmarkData) checkSavedStatus();
    if (!loadState && bookmarkData)
      setPostUrl(
        `https://trickbd.com/${
          postData?.categories ? postData.categories[0]?.slug : 'uncategorized'
        }/${postData.id}`
      );
  }, [loadState, bookmarkData]);

  const checkSavedStatus = async () => {
    const savedStatus = await isPostSaved(postData.id);
    setIsSaved(savedStatus);
  };
  const postData = bookmarkData;
  async function handleBookMarkPress() {
    const offlinePostData = {
      id: postData.id,
      postContent: postData?.content,
      title: postData?.title,
      authorAvatar: postData.author?.avatar_url,
      authorName: postData?.author?.name,
      authorRole: postData?.author?.role,
      postDate: postData?.date,
      categoryName: postData?.categories ? postData.categories[0].title : 'Uncategorized',
      categorySlug: postData?.categories ? postData.categories[0].slug : 'uncategorized',
      likes: postData?.custom_fields?.trickbd_total_likes?.[0] ?? 0,
      views: postData?.custom_fields?.views?.[0] ?? 0,
    };
    try {
      if (!isSaved) {
        await savePost(offlinePostData);
        setIsSaved(true);
        ToastAndroid.show('Added to favorites with offline access', ToastAndroid.SHORT);
      } else {
        await removePost(postData.id);
        setIsSaved(false);
        ToastAndroid.show('Removed from favorites with offline access', ToastAndroid.SHORT);
      }
    } catch (e) {
      ToastAndroid.show(`Unwanted error: ${e}`, ToastAndroid.SHORT);
    }
  }

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => router.back()}>
        <Feather name="arrow-left" size={24} style={styles.headerText} />
      </TouchableOpacity>
      <View style={styles.iconWrapper}>
        <TouchableOpacity onPress={() => handleBookMarkPress()}>
          <Ionicons
            name={isSaved ? 'bookmark' : 'bookmark-outline'}
            size={22}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onSharePress}>
          <Feather name="corner-up-right" size={22} style={styles.icon} />
        </TouchableOpacity>
        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          style={{
            marginTop: StatusBar.currentHeight + 16 * 2,
            marginRight: 2,
          }}
          anchor={
            <TouchableOpacity onPress={openMenu}>
              <Feather name="more-vertical" size={22} style={styles.icon} />
            </TouchableOpacity>
          }
        >
          <Menu.Item
            titleStyle={{
              fontSize: 18,
              fontFamily: 'HindShiliguri',
            }}
            onPress={() => {
              setMenuVisible(false);
              ToastAndroid.show('Marked as interested', ToastAndroid.SHORT);
            }}
            title="Interested in"
          />
          <Menu.Item
            titleStyle={{
              fontSize: 18,
              fontFamily: 'HindShiliguri',
            }}
            onPress={() => {
              setMenuVisible(false);
              ToastAndroid.show('Opening in browser', ToastAndroid.SHORT);
              Linking.openURL(postUrl).catch((e) => {
                ToastAndroid.show(`Error: ${e}`, ToastAndroid.SHORT);
              });
            }}
            title="Open in Browser"
          />
          <Divider />
          <Menu.Item
            titleStyle={{
              fontSize: 18,
              fontFamily: 'HindShiliguri',
            }}
            onPress={() => {
              setMenuVisible(false);
            }}
            title="Report post"
          />
        </Menu>
      </View>
    </View>
  );
};
const lightStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: StatusBar.currentHeight + 16,
  },
  headerText: {
    color: 'gray',
  },
  icon: { color: 'gray', marginLeft: 6 * 4 },
  iconWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
const darkStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: StatusBar.currentHeight + 16,
  },
  headerText: {
    color: 'gray',
  },
  icon: { color: 'gray', marginLeft: 6 * 4 },
  iconWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Header;
