import React, { useCallback, useMemo, useState, useEffect } from "react";
import { View, RefreshControl, StyleSheet } from "react-native";
import { router } from "expo-router";
import { ActivityIndicator } from "react-native-paper";
import PostCard from "@/src/components/post/Card";
import ErrorMessage from "@/src/components/extra/ErrorMessage";
import { useFetchRecentPosts, useFetchCategoryPosts } from "@/src/hooks/post";
import { useColorScheme } from "@/src/hooks/useColorScheme";
import { Divider } from "react-native-paper";
import { FlashList } from "@shopify/flash-list";

//const PostCardMemo = React.memo(PostCard);

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

    const colorScheme = useColorScheme();
    const cardStyles =
        colorScheme === "dark" ? cardDarkStyles : cardLightStyles;

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchPosts(1);
    }, [fetchPosts, setRefreshing]);

    const loadMorePosts = useCallback(() => {
        if (!loading) {
            fetchPosts(page + 1);
        }
    }, [loading, page, fetchPosts]);

    const renderPost = useCallback(
        ({ item }) => {
            return (
                <PostCard 
                    styles={cardStyles}
                    {...item}
                    onPress={() =>
                        router.push({
                            pathname: "(posts)/single/[id]",
                            params: { id: item.id }
                        })
                    }
                />
            );
        },
        [loading]
    );

    const keyExtractor = useCallback(
        item => item?.id?.toString() || Math.random().toString(),
        []
    );

    const renderFooter = useMemo(() => {
        if (!loading) return null;
        return (
            <View style={styles.footer}>
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
        <FlashList
            data={posts}
            renderItem={renderPost}
            keyExtractor={keyExtractor}
            onEndReached={loadMorePosts}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            estimatedItemSize={200}
        />
    );
}

const styles = StyleSheet.create({
    footer: {
        padding: 10
    }
});


const cardLightStyles = StyleSheet.create({
    container: {
        backgroundColor: "#f5f5f5",
        borderRadius: 8,
        padding: 16 / 2,
        margin: 4
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12
    },
    profilePic: {
        width: 20,
        height: 20,
        borderRadius: 20,
        marginRight: 12
    },
    headerText: {
        flex: 1,
        flexDirection: "row"
    },
    name: {
        fontWeight: "normal",
        fontSize: 12,
        fontFamily: "HindShiliguri",
        marginRight: 4,
        color: "gray"
    },
    publication: {
        color: "#666"
    },
    boxContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    title: {
        fontSize: 16,
        marginBottom: 8,
        fontFamily: "HindShiliguriBold"
    },
    subtitle: {
        fontSize: 14,
        color: "#444",
        marginBottom: 12,
        fontFamily: "HindShiliguri"
    },
    contentImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginBottom: 12
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    timeAgo: {
        color: "#666",
        fontSize: 13
    },
    stats: {
        flexDirection: "row",
        alignItems: "center"
    },
    statText: {
        marginLeft: 4,
        marginRight: 12,
        color: "#666",
        fontSize: 13
    },
    commentIcon: {
        marginLeft: 8
    }
});

const cardDarkStyles = StyleSheet.create({
    container: {
        backgroundColor: "#121212",
        borderRadius: 8,
        padding: 16 / 2,
        margin: 8
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12
    },
    profilePic: {
        width: 20,
        height: 20,
        borderRadius: 20,
        marginRight: 12
    },
    headerText: {
        flex: 1,
        flexDirection: "row"
    },
    name: {
        fontWeight: "normal",
        fontSize: 12,
        fontFamily: "HindShiliguri",
        color: "gray",
        marginRight: 4
    },
    publication: {
        color: "gray"
    },
    boxContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    title: {
        fontSize: 16,
        marginBottom: 8,
        fontFamily: "HindShiliguriBold",
        color: "#d3d3d3"
    },
    subtitle: {
        fontSize: 14,
        color: "#a6a6a6",
        marginBottom: 12,
        fontFamily: "HindShiliguri"
    },
    contentImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginBottom: 12
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    timeAgo: {
        color: "gray",
        fontSize: 13
    },
    stats: {
        flexDirection: "row",
        alignItems: "center"
    },
    statText: {
        marginLeft: 4,
        marginRight: 12,
        color: "#666",
        fontSize: 13
    },
    commentIcon: {
        marginLeft: 8
    }
});