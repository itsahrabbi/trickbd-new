import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/src/hooks/useColorScheme';
import { Divider } from 'react-native-paper';

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
  }) => {
    const colorScheme = useColorScheme();
    const styles = colorScheme === 'dark' ? darkStyles : lightStyles;

    return (
      <View style={{ padding: 8 }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image
              source={{
                uri: authorAvatar ? authorAvatar : 'https://placehold.co/50x50',
              }}
              style={styles.profilePic}
            />
            <View style={styles.headerText}>
              <Text style={styles.name}>{authorName}</Text>
              <Text style={styles.name}>in</Text>
              <Text style={[styles.name, { fontWeight: 'bold' }]}>{categories}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={onPress} style={styles.boxContainer}>
            <View>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.subtitle}>{excerpt}</Text>
            </View>

            <Image
              source={{
                uri: featuredImage ? featuredImage : 'https://placehold.co/100x100',
              }}
              style={styles.contentImage}
            />
          </TouchableOpacity>
          <View style={styles.footer}>
            <TouchableOpacity>
              <Text style={styles.timeAgo}>{timestamp + ' '}</Text>
            </TouchableOpacity>
            <View style={styles.stats}>
              <TouchableOpacity style={styles.stats}>
                <Ionicons name="eye-outline" size={16} color="#666" />
                <Text style={styles.statText}>{views > 0 ? views : 0}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.stats}>
                <Ionicons name="hand-left-outline" size={16} color="#666" />
                <Text style={styles.statText}>{likes > 0 ? likes : 0}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.stats}>
                <Ionicons
                  name="chatbubble-outline"
                  size={16}
                  color="#666"
                  style={styles.commentIcon}
                />
                <Text style={styles.statText}>{commentsCount}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Divider />
      </View>
    );
  }
);

const lightStyles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 16 / 2,
    margin: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  profilePic: {
    width: 20,
    height: 20,
    borderRadius: 20,
    marginRight: 12,
  },
  headerText: {
    flex: 1,
    flexDirection: 'row',
  },
  name: {
    fontWeight: 'normal',
    fontSize: 12,
    fontFamily: 'HindShiliguri',
    marginRight: 4,
    color: 'gray',
  },
  publication: {
    color: '#666',
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    marginBottom: 8,
    fontFamily: 'HindShiliguriBold',
  },
  subtitle: {
    fontSize: 14,
    color: '#444',
    marginBottom: 12,
    fontFamily: 'HindShiliguri',
  },
  contentImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeAgo: {
    color: '#666',
    fontSize: 13,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    marginLeft: 4,
    marginRight: 12,
    color: '#666',
    fontSize: 13,
  },
  commentIcon: {
    marginLeft: 8,
  },
});

const darkStyles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    borderRadius: 8,
    padding: 16 / 2,
    margin: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  profilePic: {
    width: 20,
    height: 20,
    borderRadius: 20,
    marginRight: 12,
  },
  headerText: {
    flex: 1,
    flexDirection: 'row',
  },
  name: {
    fontWeight: 'normal',
    fontSize: 12,
    fontFamily: 'HindShiliguri',
    color: 'gray',
    marginRight: 4,
  },
  publication: {
    color: 'gray',
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    marginBottom: 8,
    fontFamily: 'HindShiliguriBold',
    color: '#d3d3d3',
  },
  subtitle: {
    fontSize: 14,
    color: '#a6a6a6',
    marginBottom: 12,
    fontFamily: 'HindShiliguri',
  },
  contentImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeAgo: {
    color: 'gray',
    fontSize: 13,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    marginLeft: 4,
    marginRight: 12,
    color: '#666',
    fontSize: 13,
  },
  commentIcon: {
    marginLeft: 8,
  },
});

export default PostCard;
