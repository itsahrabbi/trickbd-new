import React, { useCallback, useMemo, useState, useEffect } from "react";
import { View, FlatList, Text, RefreshControl, StyleSheet } from "react-native";
import { router } from "expo-router";
import { ActivityIndicator } from "react-native-paper";
import PostCard from "@/src/components/post/Card";
import ErrorMessage from "@/src/components/extra/ErrorMessage";
import { useFetchRecentPosts, useFetchCategoryPosts } from "@/src/hooks/post";

const PostCardMemo = React.memo(PostCard);

const Footer = React.memo(({ loading }) => {
    if (!loading) return null;
    return (
        <View style={styles.footer}>
            <ActivityIndicator animating={true} size="small" color="gray" />
        </View>
    );
});

const EmptyList = React.memo(() => <View></View>);

export default function TabCategoryPosts({ slug }) {
    const {
        posts,
        page,
        loading,
        refreshing,
        error,
        fetchPosts,
        setRefreshing
    } =
        slug === "com.ahmedrabbi.trickbdnew-for-you"
            ? useFetchRecentPosts()
            : useFetchCategoryPosts(slug);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchPosts(1);
    }, [fetchPosts, setRefreshing]);

    const loadMorePosts = useCallback(() => {
        if (!loading) {
            fetchPosts(page + 1);
        }
    }, [loading, page, fetchPosts]);

    const navigateToPost = useCallback(id => {
        router.push({
            pathname: "(posts)/single/[id]",
            params: { id }
        });
    }, []);

    const renderPost = useCallback(
        ({ item }) => (
            <PostCardMemo {...item} onPress={() => navigateToPost(item.id)} />
        ),
        [navigateToPost]
    );

    const keyExtractor = useCallback(
        item => item?.id?.toString() || Math.random().toString(),
        []
    );

    const getItemLayout = useCallback(
        (data, index) => ({
            length: 100, // Replace with your item height
            offset: 100 * index,
            index
        }),
        []
    );

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
            ListFooterComponent={<Footer loading={loading} />}
            ListEmptyComponent={EmptyList}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            removeClippedSubviews={true}
            maxToRenderPerBatch={5}
            updateCellsBatchingPeriod={50}
            initialNumToRender={5}
            windowSize={10}
            getItemLayout={getItemLayout}
            CellRendererComponent={React.memo(({ children, ...props }) => (
                <View {...props}>{children}</View>
            ))}
        />
    );
}

const styles = StyleSheet.create({
    footer: {
        padding: 10
    },
    emptyList: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});
