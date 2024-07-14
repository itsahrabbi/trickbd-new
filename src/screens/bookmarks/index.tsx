import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, RefreshControl } from "react-native";
import { FlashList } from "@shopify/flash-list";
import Header from "./components/Header";
import { useColorScheme } from "@/src/hooks/useColorScheme";
import { useBookmarkPost } from "@/src/hooks/post/useBookmarkPost";
import BookmarkPostCard from "./components/PostCard";
const BookmarkSecreen = () => {
    const [results, setResults] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === "dark";
    const styles = isDarkMode ? darkStyles : lightStyles;
    const { removePost, getPosts } = useBookmarkPost();

    const fetchPosts = async () => {
        try {
            const posts = await getPosts();
            setResults(posts);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchPosts();
        setRefreshing(false);
    };

    const renderItem = ({ item }) => <BookmarkPostCard title={item.title} />;

    return (
        <View style={styles.container}>
            <Header />
            <FlashList
                data={results}
                renderItem={renderItem}
                estimatedItemSize={100}
                keyExtractor={item => item.id.toString()}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
        </View>
    );
};

const darkStyles = StyleSheet.create({
    container: {
        backgroundColor: "#121212",
        flex: 1
    }
});

const lightStyles = StyleSheet.create({
    container: {
        backgroundColor: "#f5f5f5",
        flex: 1
    }
});
export default BookmarkSecreen;
