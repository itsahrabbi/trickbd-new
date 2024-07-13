// useFetchRecentPosts.js
import { useState, useCallback, useEffect, useRef } from 'react';
import axios from 'axios';
import * as Helpers from '@/src/helpers';
import useNetworkStatus from '@/src/hooks/useNetworkStatus';
import { router } from 'expo-router';
import { truncateStr, shortenStr, formatDate } from '@/src/helpers';
import { decode } from 'html-entities';
const API_ENDPOINT = 'https://trickbd.com/apixyzv1/get_posts/';

export default function useFetchRecentPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const { isConnected } = useNetworkStatus();
  const abortControllerRef = useRef(null);

  const fetchPosts = useCallback(async (newPage = 1) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(API_ENDPOINT, {
        params: {
          include: 'id,title,thumbnail,custom_fields,date,excerpt,author,date,categories,comments',
          page: newPage,
        },
        timeout: 50000,
        signal: abortControllerRef.current.signal,
      });

      if (!response.data || !Array.isArray(response.data.posts)) {
        throw new Error('Invalid response format');
      }

      const newData = response.data.posts.filter(Boolean).map((post) => ({
        id: post.id || Math.random().toString(),
        title: truncateStr(decode(post.title || ''), 45),
        excerpt: truncateStr(shortenStr(decode(Helpers.stripHtmlTags(post.excerpt)), 60), 48),
        authorName: decode(post.author?.name || ''),
        authorAvatar: post.author?.avatar_url || '',
        featuredImage: post.thumbnail || '',
        categories: truncateStr(
          decode(
            Array.isArray(post.categories) && post.categories.length > 0
              ? post.categories.map((category) => category.title).join(', ')
              : 'Uncategorized'
          ),
          70
        ),
        commentsCount: Array.isArray(post.comments) ? post.comments.length : 0,
        likes: post.custom_fields?.trickbd_total_like || 0,
        views: post.custom_fields?.views || 0,
        timestamp: formatDate(post.date || ''),
      }));

      setPosts((prevPosts) => (newPage === 1 ? newData : [...prevPosts, ...newData]));
      setPage(newPage);
    } catch (err) {
      if (!axios.isCancel(err)) {
        setError(err);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    if (isConnected) {
      fetchPosts(1);
    } else {
      router.push('custom-error');
    }

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [isConnected, fetchPosts]);

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
