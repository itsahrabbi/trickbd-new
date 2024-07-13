import { useState, useEffect } from 'react';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';

const useFetchCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);

    try {
      const netInfo = await NetInfo.fetch();

      if (!netInfo.isConnected) {
        setError('no-internet');
        setLoading(false);
        return;
      }

      let allCategories = [];
      let page = 1;
      let hasMore = true;

      while (hasMore) {
        const response = await axios.get('https://trickbd.com/wp-json/wp/v2/categories', {
          params: {
            per_page: 100,
            page: page,
          },
          timeout: 10000,
        });

        allCategories = [...allCategories, ...response.data];

        const totalPages = parseInt(response.headers['x-wp-totalpages'], 10);
        hasMore = page < totalPages;
        page++;
      }

      setCategories(allCategories);
      setLoading(false);
    } catch (err) {
      if (err.code === 'ECONNABORTED') {
        setError('timeout');
      } else {
        setError('fetch-error');
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, loading, error, fetchCategories };
};
export default useFetchCategories;
