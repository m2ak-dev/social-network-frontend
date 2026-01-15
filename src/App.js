import React, { useState } from 'react';
import './App.css';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Home from './pages/Home';
import Bookshelf from './pages/Bookshelf';
import Login from './pages/Login';

const AppContent = () => {
  const { token, logout } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);
  const [currentPage, setCurrentPage] = useState('home');

  const handleLoginSuccess = () => {
    setRefreshKey((k) => k + 1);
    setCurrentPage('home');
  };

  return (
    <div className="App" key={refreshKey}>
      {token ? (
        <>
          <nav className="navbar">
            <div className="navbar-container">
              <div className="navbar-left">
                <h1 className="app-title">📚 KitabXano</h1>
                <p className="app-subtitle">Kitob Xazinasi - Book Treasure</p>
                <div className="nav-links">
                  <button 
                    className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
                    onClick={() => setCurrentPage('home')}
                  >
                    🏠 Home
                  </button>
                  <button 
                    className={`nav-link ${currentPage === 'bookshelf' ? 'active' : ''}`}
                    onClick={() => setCurrentPage('bookshelf')}
                  >
                    📖 Bookshelf
                  </button>
                </div>
              </div>
              <div className="navbar-right">
                <span className="user-id">User: {token}</span>
                <button onClick={logout} className="btn-logout">
                  Logout
                </button>
              </div>
            </div>
          </nav>
          {currentPage === 'home' ? <Home /> : <Bookshelf />}
        </>
      ) : (
        <Login onSuccess={handleLoginSuccess} />
      )}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
