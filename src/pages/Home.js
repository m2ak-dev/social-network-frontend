import React, { useState, useEffect } from 'react';
import { postAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import PostCard from '../components/PostCard';
import './Home.css';

const Home = () => {
  const { token } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newPost, setNewPost] = useState({ content: '', image: '' });

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const response = await postAPI.getAllPosts();
      setPosts(response.posts || []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!token) {
      setError('Please login to create a post');
      return;
    }

    if (!newPost.content.trim()) {
      setError('Post content cannot be empty');
      return;
    }

    try {
      const userId = token;
      await postAPI.createPost(userId, newPost, token);
      setNewPost({ content: '', image: '' });
      await loadPosts();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLike = async (postId) => {
    if (!token) {
      setError('Please login to like posts');
      return;
    }

    try {
      await postAPI.likePost(postId, token, token);
      await loadPosts();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUnlike = async (postId) => {
    if (!token) return;

    try {
      await postAPI.unlikePost(postId, token, token);
      await loadPosts();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (postId) => {
    if (!token) return;

    try {
      await postAPI.deletePost(postId, token);
      await loadPosts();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="home">
      <div className="container">
        {token && (
          <div className="create-post">
            <h2>Create a Post</h2>
            <form onSubmit={handleCreatePost}>
              <textarea
                placeholder="What's on your mind?"
                value={newPost.content}
                onChange={(e) =>
                  setNewPost({ ...newPost, content: e.target.value })
                }
                rows="4"
              />
              <input
                type="text"
                placeholder="Image URL (optional)"
                value={newPost.image}
                onChange={(e) =>
                  setNewPost({ ...newPost, image: e.target.value })
                }
              />
              <button type="submit" className="btn-submit">
                Post
              </button>
            </form>
          </div>
        )}

        {error && <div className="error-message">{error}</div>}

        <div className="posts-section">
          <h2>Feed</h2>
          {loading ? (
            <p className="loading">Loading posts...</p>
          ) : posts.length === 0 ? (
            <p className="no-posts">No posts yet. Be the first to post!</p>
          ) : (
            posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onLike={() => handleLike(post.id)}
                onUnlike={() => handleUnlike(post.id)}
                onDelete={() => handleDelete(post.id)}
                currentUserId={token}
                isLiked={post.likedBy.some((u) => u.id === token)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
