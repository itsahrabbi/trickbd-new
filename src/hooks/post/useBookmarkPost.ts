import { useCallback } from 'react';
import * as SQLite from 'expo-sqlite';

let db;

const initDatabase = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync('offline-posts.db');
    console.log('Database path:', db.pathAsString);

    await db.execAsync(`
            CREATE TABLE IF NOT EXISTS posts (
                id TEXT PRIMARY KEY NOT NULL,
                postContent TEXT,
                title TEXT,
                authorAvatar TEXT,
                authorName TEXT,
                authorRole TEXT,
                postDate TEXT,
                categoryName TEXT,
                categorySlug TEXT,
                likes INTEGER DEFAULT 0,
                views INTEGER DEFAULT 0
            );
        `);
  }
};

export const useBookmarkPost = () => {
  const savePost = useCallback(async (post) => {
    await initDatabase();
    const {
      id,
      postContent,
      title,
      authorAvatar,
      authorName,
      authorRole,
      postDate,
      categoryName,
      categorySlug,
      likes,
      views,
    } = post;
    try {
      await db.runAsync(
        `INSERT OR REPLACE INTO posts (id, postContent, title, authorAvatar, authorName, authorRole, postDate, categoryName, categorySlug, likes, views)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          id,
          postContent,
          title,
          authorAvatar,
          authorName,
          authorRole,
          postDate,
          categoryName,
          categorySlug,
          likes || 0,
          views || 0,
        ]
      );
      console.log('Post saved successfully:', id);
    } catch (error) {
      console.error('Error saving post:', error);
      throw error;
    }
  }, []);

  const removePost = useCallback(async (id) => {
    await initDatabase();
    try {
      await db.runAsync('DELETE FROM posts WHERE id = ?', [id]);
      console.log('Post removed successfully:', id);
    } catch (error) {
      console.error('Error removing post:', error);
      throw error;
    }
  }, []);

  const isPostSaved = useCallback(async (id) => {
    await initDatabase();
    try {
      const result = await db.getFirstAsync('SELECT * FROM posts WHERE id = ?', [id]);
      return !!result;
    } catch (error) {
      console.error('Error checking if post is saved:', error);
      throw error;
    }
  }, []);

  const getPosts = useCallback(async () => {
    await initDatabase();
    try {
      return await db.getAllAsync('SELECT * FROM posts');
    } catch (error) {
      console.error('Error getting posts:', error);
      throw error;
    }
  }, []);

  const getPost = useCallback(async (id) => {
    await initDatabase();
    try {
      return await db.getFirstAsync('SELECT * FROM posts WHERE id = ?', [id]);
    } catch (error) {
      console.error('Error getting post:', error);
      throw error;
    }
  }, []);

  const updateLikesViews = useCallback(async (id, likes, views) => {
    await initDatabase();
    try {
      await db.runAsync('UPDATE posts SET likes = ?, views = ? WHERE id = ?', [likes, views, id]);
      console.log('Likes and views updated for post:', id);
    } catch (error) {
      console.error('Error updating likes and views:', error);
      throw error;
    }
  }, []);

  return {
    savePost,
    removePost,
    isPostSaved,
    getPosts,
    getPost,
    updateLikesViews,
  };
};
