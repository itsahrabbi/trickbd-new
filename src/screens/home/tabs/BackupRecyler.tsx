import React, { useState, useEffect } from "react";
import { View, Text, Dimensions, StyleSheet, SafeAreaView } from "react-native";
import {
    RecyclerListView,
    DataProvider,
    LayoutProvider
} from "recyclerlistview";

const { width, height } = Dimensions.get("window");

// Generate 100 items with varying content lengths
const generateItems = () => {
    return Array(100)
        .fill()
        .map((_, index) => ({
            id: index,
            text: `Item ${index + 1} ${".".repeat(Math.random() * 100)}`
        }));
};

export default function App() {
    const [dataProvider, setDataProvider] = useState(
        new DataProvider((r1, r2) => r1.id !== r2.id)
    );

    const [layoutProvider, setLayoutProvider] = useState(null);

    useEffect(() => {
        const items = generateItems();
        const heights = {};

        // Pre-calculate heights (you'd typically do this after rendering in a real app)
        items.forEach((item, index) => {
            heights[index] = Math.max(50, 20 + item.text.length * 0.5); // Minimum height of 50
        });

        setDataProvider(prevState => prevState.cloneWithRows(items));

        setLayoutProvider(
            new LayoutProvider(
                index => 0,
                (type, dim, index) => {
                    dim.width = width;
                    dim.height = heights[index];
                }
            )
        );
    }, []);

    const rowRenderer = (type, data) => {
        return (
            <View style={styles.row}>
                <Text style={styles.text}>{data.text}</Text>
            </View>
        );
    };

    if (!layoutProvider) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.listContainer}>
                <RecyclerListView
                    style={styles.list}
                    dataProvider={dataProvider}
                    layoutProvider={layoutProvider}
                    rowRenderer={rowRenderer}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    listContainer: {
        flex: 1,
        width: width,
        height: height
    },
    list: {
        flex: 1
    },
    row: {
        width: width,
        justifyContent: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        paddingHorizontal: 16,
        paddingVertical: 10
    },
    text: {
        fontSize: 16
    }
});
