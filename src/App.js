import React, { useState } from 'react';
import './App.css';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';

const AppContent = () => {
  const { token, logout } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);

  const handleLoginSuccess = () => {
    setRefreshKey((k) => k + 1);
  };

  return (
    <div className="App" key={refreshKey}>
      {token ? (
        <>
          <nav className="navbar">
            <div className="navbar-container">
              <h1 className="app-title">� KitabXano</h1>
              <p className="app-subtitle">Kitob Xazinasi - Book Treasure</p>
              <div className="navbar-right">
                <span className="user-id">User: {token}</span>
                <button onClick={logout} className="btn-logout">
                  Logout
                </button>
              </div>
            </div>
          </nav>
          <Home />
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
