// API Base URL
const API_BASE_URL = 'http://localhost:5000/api';

// Helper function for API calls
const apiCall = async (endpoint, method = 'GET', body = null, token = null) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API Error');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// User API calls
export const userAPI = {
  // Create user
  createUser: async (userData) => {
    return apiCall('/users', 'POST', userData);
  },

  // Get all users
  getAllUsers: async () => {
    return apiCall('/users', 'GET');
  },

  // Get user by ID
  getUser: async (userId, token) => {
    return apiCall(`/users/${userId}`, 'GET', null, token);
  },

  // Update user
  updateUser: async (userId, userData, token) => {
    return apiCall(`/users/${userId}`, 'PUT', userData, token);
  },

  // Delete user
  deleteUser: async (userId, token) => {
    return apiCall(`/users/${userId}`, 'DELETE', null, token);
  },
};

// Post API calls
export const postAPI = {
  // Create post
  createPost: async (userId, postData, token) => {
    return apiCall(`/posts/${userId}`, 'POST', postData, token);
  },

  // Get all posts
  getAllPosts: async () => {
    return apiCall('/posts', 'GET');
  },

  // Get post by ID
  getPost: async (postId) => {
    return apiCall(`/posts/${postId}`, 'GET');
  },

  // Get user's posts
  getUserPosts: async (userId) => {
    return apiCall(`/posts/user/${userId}`, 'GET');
  },

  // Update post
  updatePost: async (postId, postData, token) => {
    return apiCall(`/posts/${postId}`, 'PUT', postData, token);
  },

  // Like post
  likePost: async (postId, userId, token) => {
    return apiCall(`/posts/${postId}/like/${userId}`, 'POST', null, token);
  },

  // Unlike post
  unlikePost: async (postId, userId, token) => {
    return apiCall(`/posts/${postId}/unlike/${userId}`, 'POST', null, token);
  },

  // Delete post
  deletePost: async (postId, token) => {
    return apiCall(`/posts/${postId}`, 'DELETE', null, token);
  },
};

// Bookshelf API calls
export const bookshelfAPI = {
  // Add book to bookshelf
  addBook: async (userId, bookData, token) => {
    return apiCall(`/bookshelves/${userId}/books`, 'POST', bookData, token);
  },

  // Get user's bookshelf
  getBookshelf: async (userId, token) => {
    return apiCall(`/bookshelves/${userId}`, 'GET', null, token);
  },

  // Remove book from bookshelf
  removeBook: async (userId, bookId, token) => {
    return apiCall(`/bookshelves/${userId}/books/${bookId}`, 'DELETE', null, token);
  },

  // Update book rating
  updateRating: async (userId, bookId, rating, token) => {
    return apiCall(`/bookshelves/${userId}/books/${bookId}/rating`, 'PUT', { rating }, token);
  },
};
