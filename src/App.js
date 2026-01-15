import React, { useState } from 'react';
import './App.css';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Home from './pages/Home';
import Bookshelf from './pages/Bookshelf';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Sidebar from './components/Sidebar';

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
        <div className="app-layout">
          <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
          <main className="main-content">
            <div className="page-container">
              {currentPage === 'home' && <Home />}
              {currentPage === 'bookshelf' && <Bookshelf />}
              {currentPage === 'explore' && <Explore />}
              {currentPage === 'profile' && <Profile />}
            </div>
          </main>
        </div>
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
