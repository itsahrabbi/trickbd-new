// useFetchPosts.js
import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import * as Helpers from '@/src/helpers';
import useNetworkStatus from '@/src/hooks/useNetworkStatus';
import { router } from 'expo-router';

const POSTS_PER_PAGE = 10;
const API_ENDPOINT = 'https://trickbd.com/apixyzv1/get_posts/';

export default function useFetchPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const { isConnected } = useNetworkStatus();

  const fetchPosts = useCallback(async (newPage = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_ENDPOINT, {
        params: {
          include: 'id,title,thumbnail,custom_fields,date,excerpt,author,date,categories,comments',
          count: POSTS_PER_PAGE * newPage,
        },
        timeout: 5000,
      });

      if (!response.data || !Array.isArray(response.data.posts)) {
        throw new Error('Invalid response format');
      }

      const allPosts = response.data.posts;
      const start = (newPage - 1) * POSTS_PER_PAGE;
      const end = start + POSTS_PER_PAGE;
      const paginatedPosts = allPosts.slice(start, end);

      const newData = paginatedPosts
        .map((post) => {
          if (!post) {
            console.warn('Encountered null or undefined post');
            return null;
          }
          return {
            id: post.id || Math.random().toString(),
            title: post.title || '',
            excerpt: Helpers.stripHtmlTags(post.excerpt),
            authorName: post.author?.name || '',
            authorAvatar: post.author?.avatar_url || '',
            featuredImage: post.thumbnail || '',
            categories:
              Array.isArray(post.categories) && post.categories.length > 0
                ? [post.categories[0].title]
                : ['Uncategorized'],
            commentsCount: Array.isArray(post.comments) ? post.comments.length : 0,
            likes: post.custom_fields?.trickbd_total_like || 0,
            views: post.custom_fields?.views || 0,
            timestamp: post.date || '',
          };
        })
        .filter(Boolean);

      setPosts((prevPosts) => (newPage === 1 ? newData : [...prevPosts, ...newData]));
      setPage(newPage);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    if (true) {
      fetchPosts(1);
    } else {
      router.push('custom-error');
    }
  }, [fetchPosts]);

  return {
    posts,
    loading,
    refreshing,
    error,
    fetchPosts,
    setRefreshing,
    page,
  };
}
