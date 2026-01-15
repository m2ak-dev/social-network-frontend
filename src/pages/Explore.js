import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Explore.css';
import UserCard from '../components/UserCard';

const Explore = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://kitabxano-backend.onrender.com/api';

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/users`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch users');

      const data = await response.json();
      setUsers(data.users || []);
      setFilteredUsers(data.users || []);
      setError('');
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="explore-container">
      <div className="explore-header">
        <h2>🌍 Explore Users</h2>
        <p>Foydalanuvchilar bilan bog'lanish</p>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="🔍 Foydalanuvchi, email yoki nomni qidirish..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Foydalanuvchilar yuklanmoqda...</div>
      ) : filteredUsers.length === 0 ? (
        <div className="empty-state">
          <p>😕 Foydalanuvchi topilmadi</p>
        </div>
      ) : (
        <div className="users-grid">
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}

      <div className="explore-stats">
        <p>Jami: <strong>{users.length}</strong> foydalanuvchi</p>
      </div>
    </div>
  );
};

export default Explore;
