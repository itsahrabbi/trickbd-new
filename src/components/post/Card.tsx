import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Divider } from "react-native-paper";
import CachedImage from "@/src/components/CachedImage";

const PostCard = React.memo(
    ({
        title,
        authorName,
        authorAvatar,
        excerpt,
        categories,
        featuredImage,
        likes,
        views,
        commentsCount,
        timestamp,
        onPress,
        styles
    }) => {
        return (
            <View style={{ padding: 8 }}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <CachedImage
                            uri={
                                authorAvatar
                                    ? authorAvatar
                                    : "https://placehold.co/50x50"
                            }
                            style={styles.profilePic}
                        />
                        <View style={styles.headerText}>
                            <Text style={styles.name}>{authorName}</Text>
                            <Text style={styles.name}>in</Text>
                            <Text style={[styles.name, { fontWeight: "bold" }]}>
                                {categories}
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={onPress}
                        style={styles.boxContainer}
                    >
                        <View>
                            <Text style={styles.title}>{title}</Text>
                            <Text style={styles.subtitle}>{excerpt}</Text>
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
                    <View style={styles.footer}>
                        <TouchableOpacity>
                            <Text style={styles.timeAgo}>
                                {timestamp + " "}
                            </Text>
                        </TouchableOpacity>
                        <View style={styles.stats}>
                            <TouchableOpacity style={styles.stats}>
                                <Ionicons
                                    name="eye-outline"
                                    size={16}
                                    color="#666"
                                />
                                <Text style={styles.statText}>
                                    {views > 0 ? views : 0}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.stats}>
                                <Ionicons
                                    name="hand-left-outline"
                                    size={16}
                                    color="#666"
                                />
                                <Text style={styles.statText}>
                                    {likes > 0 ? likes : 0}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.stats}>
                                <Ionicons
                                    name="chatbubble-outline"
                                    size={16}
                                    color="#666"
                                    style={styles.commentIcon}
                                />
                                <Text style={styles.statText}>
                                    {commentsCount}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <Divider />
            </View>
        );
    }
);

export default PostCard;
