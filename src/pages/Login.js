import React, { useState } from 'react';
import { userAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import './Auth.css';

const Login = ({ onSuccess }) => {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const response = await userAPI.getAllUsers();
        const user = response.users.find((u) => u.email === email);

        if (!user || user.password !== password) {
          throw new Error('Email yoki parol noto\'g\'ri');
        }

        login(user.id);
        onSuccess();
      } else {
        if (!email || !password || !username || !fullName) {
          throw new Error('Barcha maydonlar to\'ldirilishi kerak');
        }

        const response = await userAPI.createUser({
          email,
          password,
          username,
          fullName,
        });

        login(response.user.id);
        onSuccess();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>📚 KitabXano</h1>
        <p className="app-tagline">Kitob Xazinasi - Book Treasure</p>
        <h2>{isLogin ? 'Kirish' : 'Ro\'yxatdan o\'tish'}</h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="Foydalanuvchi nomi"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="To'liq ismi"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </>
          )}

          <input
            type="password"
            placeholder="Parol"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading} className="btn-submit">
            {loading ? 'Yuklanmoqda...' : isLogin ? 'Kirish' : 'Ro\'yxatdan o\'tish'}
          </button>
        </form>

        <p className="toggle-auth">
          {isLogin ? 'Akkauntingiz yo\'qmi? ' : 'Akkauntingiz bormi? '}
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="btn-toggle"
          >
            {isLogin ? 'Ro\'yxatdan o\'tish' : 'Kirish'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
