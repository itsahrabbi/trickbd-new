// RecentPosts.js
import React, { useCallback, useMemo } from 'react';
import { View, FlatList, RefreshControl, ToastAndroid } from 'react-native';
import { router } from 'expo-router';
import { ActivityIndicator } from 'react-native-paper';
import PostCard from '@/src/components/post/Card';
import ErrorMessage from '@/src/components/extra/ErrorMessage';
import useFetchPosts from '@/src/hooks/useFetchPosts';

export default function RecentPosts() {
  const { posts, loading, refreshing, error, fetchPosts, setRefreshing, page } = useFetchPosts();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPosts(1);
  }, [fetchPosts]);

  const loadMorePosts = useCallback(() => {
    if (!loading) {
      fetchPosts(page + 1);
      ToastAndroid.show('Loading next page', ToastAndroid.SHORT);
    }
  }, [loading, page, fetchPosts]);

  const renderPost = useCallback(({ item }) => {
    if (!item) return null;
    return (
      <PostCard
        {...item}
        onPress={() =>
          router.push({
            pathname: '(posts)/single/[id]',
            params: { id: item.id },
          })
        }
      />
    );
  }, []);

  const keyExtractor = useCallback((item) => item?.id?.toString() || Math.random().toString(), []);

  const renderFooter = useMemo(() => {
    if (!loading) return null;
    return (
      <View style={{ padding: 10 }}>
        <ActivityIndicator animating={true} size="small" color="gray" />
      </View>
    );
  }, [loading]);

  if (error) {
    return (
      <ErrorMessage
        errorType="general"
        title="Oops! Something Went Wrong"
        message={`We apologize for the inconvenience, but something went wrong. (Error: ${error.message})`}
        onActionPress={() => fetchPosts(1)}
        action={true}
        actionTitle="Try Again"
        actionIcon="refresh"
      />
    );
  }

  return (
    <FlatList
      data={posts}
      renderItem={renderPost}
      keyExtractor={keyExtractor}
      onEndReached={loadMorePosts}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    />
  );
}
