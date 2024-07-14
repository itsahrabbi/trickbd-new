import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Divider } from "react-native-paper";
import CachedImage from "@/src/components/CachedImage";
import { useColorScheme } from "@/src/hooks/useColorScheme";

const BookmarkPostCard = React.memo(({ title, featuredImage , onPress}) => {
   const colorScheme = useColorScheme()
    const styles = colorScheme === "dark" ? cardDarkStyles : cardLightStyles;
  
    return (
        <View style={{ padding: 8 }}>
            <View style={styles.container}>
                <TouchableOpacity onPress={onPress} style={styles.boxContainer}>
                    <View>
                        <Text style={styles.title}>{title}</Text>
                    </View>

                    <CachedImage
                        uri={
                            featuredImage
                                ? featuredImage
                                : "https://placehold.co/100x100"
                        }
                        style={styles.contentImage}
                    />
                </TouchableOpacity>
            </View>
            <Divider />
        </View>
    );
});

export default BookmarkPostCard;
const cardLightStyles = StyleSheet.create({
    container: {
        backgroundColor: "#f5f5f5",
        borderRadius: 8,
        padding: 16 / 2,
        margin: 4
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

    contentImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginBottom: 12
    }
});

const cardDarkStyles = StyleSheet.create({
    container: {
        backgroundColor: "#121212",
        borderRadius: 8,
        padding: 16 / 2,
        margin: 8
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

    contentImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginBottom: 12
    }
});
