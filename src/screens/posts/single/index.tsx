import React, { useEffect, useRef, useCallback, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Alert,
  ToastAndroid,
  Dimensions,
  Share,
} from 'react-native';
import * as Linking from 'expo-linking';
import { WebView } from 'react-native-webview';
import { ActivityIndicator, Dialog, Portal, Button } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';
import { useColorScheme } from '@/src/hooks/useColorScheme';
import { useFetchSinglePost } from '@/src/hooks/post';
import * as Helpers from '@/src/helpers';
import Header from './components/Header';
import boilerplate from './webview/boilerplate';
import ErrorMessage from '@/src/components/extra/ErrorMessage';

const INITIAL_HEIGHT = Dimensions.get('window').height;

const App = () => {
  const [webViewHeight, setWebViewHeight] = useState(INITIAL_HEIGHT);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const webViewRef = useRef(null);
  const { id } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const styles = isDarkMode ? darkStyles : lightStyles;

  const { postData, loading, error, fetchPost } = useFetchSinglePost(id);
  const onShouldStartLoadWithRequest = useCallback((event) => {
    if (event.url.startsWith('data:image')) return false;
    if (event.url !== 'about:blank') {
      Linking.openURL(event.url).catch((err) => console.error('Error opening URL:', err));
      return false;
    }
    return true;
  }, []);

  const injectedJavaScript = `
        (function() {
            const updateHeight = () => window.ReactNativeWebView.postMessage(JSON.stringify({type: 'height', height: document.body.scrollHeight}));
            setTimeout(updateHeight, 500);
            window.addEventListener('load', updateHeight);
            window.addEventListener('resize', updateHeight);

            var allImages = document.getElementsByTagName('img');
            for (var i = 0; i < allImages.length; i++) {
                allImages[i].onclick = event => {
                    event.preventDefault();
                    window.ReactNativeWebView.postMessage(JSON.stringify({type: 'imageClick', src: event.target.src}));
                    return false;
                };
            }
        })();
        true;
    `;

  const onMessage = useCallback((event) => {
    const data = JSON.parse(event.nativeEvent.data);
    if (data.type === 'height') {
      const height = Number(data.height);
      if (!isNaN(height) && height > 0) setWebViewHeight(height);
    } else if (data.type === 'imageClick') {
      setSelectedImage(data.src);
      setDialogVisible(true);
    }
  }, []);

  const htmlContent = boilerplate(isDarkMode, postData?.content);
  async function handleSharePress() {
    await Share.share({
      message: `Read exclusive "${postData.title}" by ${
        postData.author.name
      } \n https://trickbd.com/${
        postData?.categories ? postData.categories[0].slug : 'uncategorized'
      }/${postData.id}`,
      options: {
        dialogueTitle: postData.title,
      },
    });
  }

  if (error) {
    return (
      <ErrorMessage
        errorType={error}
        title={error === 'no-internet' ? 'No Internet Connection' : 'Oops! Something went wrong'}
        message={
          error === 'no-internet'
            ? 'Please check your internet connection and try again.'
            : "We're having trouble loading the content. Please try again later."
        }
        action={true}
        actionTitle="Retry"
        onActionPress={() => fetchPost(id)}
      />
    );
  }

  return (
    <ScrollView style={styles.container}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} backgroundColor={styles.statusBarColor} />
      <SafeAreaView style={styles.safeArea}>
        <Header bookmarkData={postData} loadState={loading} onSharePress={handleSharePress} />
        <View style={styles.contentHeader}>
          <Text style={styles.title}>{!loading && decode(postData?.title)}</Text>
          {!loading && postData && (
            <View style={styles.authorInfo}>
              <Image
                source={{
                  uri: postData.author?.avatar_url
                    ? postData.author.avatar_url
                    : 'https://placehold.co/50x50',
                }}
                style={styles.avatar}
                resizeMode="cover"
              />
              <View>
                <Text style={styles.authorName}>
                  {decode(postData.author?.name)} | {decode(postData.author?.role)}
                </Text>
                <Text style={styles.dateRead}>
                  {Helpers.calculateReadingTime(postData.content)} ·{' '}
                  {Helpers.formatDate(postData.date)}
                </Text>
              </View>
            </View>
          )}
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: postData?.thumbnail ? postData.thumbnail : 'https://placehold.co/600x400',
              }}
              style={styles.image}
              resizeMode="cover"
              onError={() => ToastAndroid.show(`Loading images and mapping`, ToastAndroid.SHORT)}
            />
          </View>
        </View>
        <View style={styles.content}>
          {loading ? (
            <ActivityIndicator animating={true} size="small" color="gray" />
          ) : postData ? (
            <WebView
              ref={webViewRef}
              source={{ html: htmlContent }}
              onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
              style={{ height: webViewHeight }}
              originWhitelist={['*']}
              onMessage={onMessage}
              injectedJavaScript={injectedJavaScript}
              scrollEnabled={false}
              onError={() => setError('general')}
            />
          ) : null}
        </View>
      </SafeAreaView>
      <Portal>
        <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
          <Dialog.Content>
            <Image
              source={{ uri: selectedImage }}
              style={styles.dialogImage}
              resizeMode="contain"
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDialogVisible(false)}>Close</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
};

const darkStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  safeArea: { flex: 1 },
  content: { flex: 1 },
  statusBarColor: '#121212',
  contentHeader: { padding: 20 },
  title: {
    fontSize: 20,
    fontFamily: 'HindShiliguriBold',
    marginBottom: 10,
    color: 'white',
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e5e7eb',
    marginRight: 10,
  },
  authorName: { fontSize: 16, color: 'white', fontFamily: 'HindShiliguri' },
  dateRead: { color: 'gray', fontFamily: 'HindShiliguri' },
  imageContainer: {
    aspectRatio: 16 / 5.5,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: { width: '100%', height: '100%' },
  dialogImage: { width: '100%', height: 300 },
});

const lightStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  safeArea: { flex: 1 },
  content: { flex: 1 },
  statusBarColor: '#f5f5f5',
  contentHeader: { padding: 20 },
  title: {
    fontSize: 20,
    fontFamily: 'HindShiliguriBold',
    marginBottom: 10,
    color: 'black',
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e5e7eb',
    marginRight: 10,
  },
  authorName: { fontSize: 16, color: 'black', fontFamily: 'HindShiliguri' },
  dateRead: { color: 'gray', fontFamily: 'HindShiliguri' },
  imageContainer: {
    aspectRatio: 16 / 5.5,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: { width: '100%', height: '100%' },
  dialogImage: { width: '100%', height: 300 },
});

export default App;
