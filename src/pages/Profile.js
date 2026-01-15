import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Profile.css';

const Profile = () => {
  const { token, logout } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    fullName: '',
    bio: ''
  });

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://kitabxano-backend.onrender.com/api';

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/users/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch profile');

      const data = await response.json();
      setUser(data);
      setFormData({
        username: data.username || '',
        email: data.email || '',
        fullName: data.fullName || '',
        bio: data.bio || ''
      });
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to update profile');

      setUser({ ...user, ...formData });
      setIsEditing(false);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  if (loading) {
    return <div className="profile-container"><p>Loading profile...</p></div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-cover"></div>
        <div className="profile-info">
          <div className="profile-avatar">
            <span>{user?.username?.charAt(0).toUpperCase() || 'U'}</span>
          </div>
          <div className="profile-details">
            <h1>{user?.fullName || 'User Profile'}</h1>
            <p className="profile-username">@{user?.username}</p>
            <p className="profile-bio">{user?.bio || 'No bio added yet'}</p>
            <p className="profile-email">📧 {user?.email}</p>
          </div>
        </div>
      </div>

      {isEditing ? (
        <div className="profile-edit">
          <h2>Edit Profile</h2>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              disabled
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows="4"
            />
          </div>
          <div className="button-group">
            <button className="btn-save" onClick={handleSaveProfile}>
              ✅ Save Changes
            </button>
            <button className="btn-cancel" onClick={() => setIsEditing(false)}>
              ❌ Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="profile-actions">
          <button className="btn-edit" onClick={() => setIsEditing(true)}>
            ✏️ Edit Profile
          </button>
          <button className="btn-logout-profile" onClick={logout}>
            🚪 Logout
          </button>
        </div>
      )}

      <div className="profile-stats">
        <div className="stat">
          <p className="stat-number">0</p>
          <p className="stat-label">Posts</p>
        </div>
        <div className="stat">
          <p className="stat-number">0</p>
          <p className="stat-label">Following</p>
        </div>
        <div className="stat">
          <p className="stat-number">0</p>
          <p className="stat-label">Followers</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
