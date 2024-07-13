import React, { useCallback, useMemo, useState } from 'react';
import { View, FlatList, RefreshControl, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { ActivityIndicator } from 'react-native-paper';
import Button from '@/src/components/Button';
import PostCard from '@/src/components/post/Card';
import ErrorMessage from '@/src/components/extra/ErrorMessage';
import { useFetchRecentPosts, useFetchCategoryPosts } from '@/src/hooks/post';

export default function TabCategoryPosts({ slug }) {
  const { posts, page, loading, refreshing, error, fetchPosts, setRefreshing } =
    slug === 'com.ahmedrabbi.trickbdnew-for-you'
      ? useFetchRecentPosts()
      : useFetchCategoryPosts(slug);

  const [currentPage, setCurrentPage] = useState(1);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const handleBtnClick = useCallback(() => {
    setLoadingBtn(true);
    setTimeout(() => {
      loadNextPage();
      setLoadingBtn(false);
    }, 1000);
  }, []);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPosts(1);
    setCurrentPage(1);
  }, [fetchPosts, setRefreshing]);

  const loadNextPage = useCallback(() => {
    if (!loading) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchPosts(nextPage);
      console.log(nextPage)
    }
  }, [loading, currentPage, fetchPosts]);

  const renderPost = useCallback(
    ({ item }) => (
      <PostCard
        {...item}
        onPress={() =>
          router.push({
            pathname: '(posts)/single/[id]',
            params: { id: item.id },
          })
        }
      />
    ),
    []
  );

  const keyExtractor = useCallback((item) => item?.id?.toString(), []);

  const renderFooter = useMemo(() => {
    if (loading) {
      return (
        <View style={styles.footer}>
          <ActivityIndicator animating={true} size="small" color="gray" />
        </View>
      );
    }
    return (
      <View style={styles.footer}>
        <Button
          mode="contained"
          onPress={loadNextPage}
          loading={loadingBtn}
          title={`Load Next Page: ${currentPage + 1}`}
          icon="arrow-forward-outline" // You might want to adjust this icon name
        />
      </View>
    );
  }, [loading, currentPage, loadNextPage, loadingBtn]);

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
      data={posts.slice((currentPage - 1) * 10, currentPage * 10)}
      renderItem={renderPost}
      keyExtractor={keyExtractor}
      ListFooterComponent={renderFooter}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      removeClippedSubviews={true}
      maxToRenderPerBatch={5}
      updateCellsBatchingPeriod={50}
      initialNumToRender={5}
      windowSize={10}
    />
  );
}

const styles = StyleSheet.create({
  footer: {
    padding: 10,
  },
});
