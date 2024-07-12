import { useState, useEffect, useCallback } from 'react';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import { useSavePost } from '@/src/hooks/useSavePost';

const useFetchSinglePost = (postId) => {
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { isPostSaved, getPost } = useSavePost();

  const fetchPost = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const netInfo = await NetInfo.fetch();
      if (!netInfo.isConnected) {
        //throw new Error("No internet connection");
        const isSaved = await isPostSaved(postId);
        if (isSaved) {
          try {
            const response = await getPost(postId);
            setPostData({
              id: response.postId,
              title: response?.title,
              content: response?.postContent,
              date: response?.postDate,
              author: {
                name: response?.authorName,
                avatar: response?.authorAvatar,
                role: response?.authorRole,
              },
              categories: {
                name: postData?.categories ? postData.categories[0].title : 'Uncategorized',
                slug: postData?.categories ? postData.categories[0].slug : 'uncategorized',
              },
              custom_fields: {
                trickbd_total_like: postData?.custom_fields?.trickbd_total_likes?.[0] ?? 0,
                views: postData?.custom_fields?.views?.[0] ?? 0,
              },
            });
          } catch (e) {
            throw new Error(e);
          }
        }
      }

      const response = await axios.get('https://trickbd.com/apixyzv1/get_post/', {
        params: {
          id: postId,
          include: 'thumbnail,content,date,title,author,custom_fields,categories',
        },
        timeout: 10000,
      });
      setPostData(response.data.post);
    } catch (e) {
      setError(e.message === 'No internet connection' ? 'no-internet' : 'general');
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    if (postId) {
      fetchPost();
    } else {
      setError('general');
    }
  }, [postId, fetchPost]);

  return { postData, loading, error, fetchPost };
};

export default useFetchSinglePost;
