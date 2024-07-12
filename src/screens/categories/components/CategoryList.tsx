import React, { useMemo } from "react";
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    Dimensions
} from "react-native";
import { decode } from 'html-entities';
import { useColorScheme } from "@/src/hooks/useColorScheme";
import { useFetchCategories } from "@/src/hooks/post";
import { capitalizeWordFirstLetter } from "@/src/helpers";
import ErrorMessage from "@/src/components/extra/ErrorMessage";

const { width } = Dimensions.get("window");
const itemWidth = (width - 24) / 2;

const CategoryList = () => {
    const { categories, loading, error, fetchCategories } =
        useFetchCategories();
    const colorScheme = useColorScheme();
    const styles = colorScheme === "dark" ? darkStyles : lightStyles;

    const numColumns = useMemo(() => 2, []);

    const renderCategory = ({ item }) => (
        <TouchableOpacity style={styles.categoryContainer}>
            <Text style={styles.categoryName}>
                {capitalizeWordFirstLetter(decode(item.name))}
            </Text>
            <Text style={styles.categoryCount}>({item.count} posts)</Text>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <ActivityIndicator
                size="large"
                color={colorScheme === "dark" ? "#FFFFFF" : "#000000"}
            />
        );
    }

    if (error) {
        return (
            <ErrorMessage
                errorType={error}
                title={
                    error === "no-internet"
                        ? "No Internet Connection"
                        : "Oops! Something went wrong"
                }
                message={
                    error === "no-internet"
                        ? "Please check your internet connection and try again."
                        : "We're having trouble loading the content. Please try again later."
                }
                action={true}
                actionTitle="Retry"
                onActionPress={fetchCategories}
            />
        );
    }

    return (
        <FlatList
            data={categories}
            renderItem={renderCategory}
            keyExtractor={item => item.id.toString()}
            numColumns={numColumns}
            key={`flatlist-${numColumns}`}
            columnWrapperStyle={styles.row}
            style={styles.container}
        />
    );
};
const lightStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        padding: 8
    },
    row: {
        justifyContent: "space-between"
    },
    categoryContainer: {
        backgroundColor: "#FFFFFF",
        padding: 16,
        marginBottom: 8,
        borderRadius: 8,
        width: itemWidth,
        borderWidth: 0.5,
        borderColor: "#e0e0e0"
    },
    categoryName: {
        fontSize: 16,
        fontFamily: "HindShiliguriBold",
        color: "#333333"
    },
    categoryCount: {
        fontSize: 14,
        fontFamily: "HindShiliguri",
        color: "#666666"
    },
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20
    },
    errorTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333333",
        marginBottom: 10
    },
    errorMessage: {
        fontSize: 16,
        color: "#666666",
        textAlign: "center",
        marginBottom: 20
    },
    actionButton: {
        backgroundColor: "#007AFF",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5
    },
    actionButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold"
    }
});

const darkStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
        padding: 8
    },
    row: {
        justifyContent: "space-between"
    },
    categoryContainer: {
        backgroundColor: "#1E1E1E",
        padding: 16,
        marginBottom: 8,
        borderRadius: 8,
        width: itemWidth,
        borderWidth: 0.5,
        borderColor: "#333"
    },
    categoryName: {
        fontSize: 16,
        fontFamily: "HindShiliguriBold",
        color: "#FFFFFF"
    },
    categoryCount: {
        fontSize: 14,
        fontFamily: "HindShiliguri",
        color: "#AAAAAA"
    },
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20
    },
    errorTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFFFFF",
        marginBottom: 10
    },
    errorMessage: {
        fontSize: 16,
        color: "#AAAAAA",
        textAlign: "center",
        marginBottom: 20
    },
    actionButton: {
        backgroundColor: "#0A84FF",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5
    },
    actionButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold"
    }
});

export default CategoryList;
