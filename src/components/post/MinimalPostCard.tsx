import React, { useMemo } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { Card } from "react-native-paper";

const MinimalPostCard = React.memo(props => {
    return (
        <Card style={styles.card} onPress={props.onPress}>
            <Image
                source={{
                    uri: props.featuredImage
                        ? props.featuredImage
                        : "https://placehold.co/600x400"
                }}
                style={styles.image}
                // Use disk caching
            />
            <View style={styles.content}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.description}>{props.excerpt}</Text>
            </View>
        </Card>
    );
});

const styles = StyleSheet.create({
    card: {
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 8
    },
    image: {
        height: 200,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8
    },
    content: {
        padding: 16
    },
    title: {
        fontSize: 18,
        fontWeight: "bold"
    },
    description: {
        fontSize: 14,
        marginTop: 8
    }
});

export default MinimalPostCard;
