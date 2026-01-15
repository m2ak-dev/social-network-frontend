import React from 'react';
import './Sidebar.css';

const Sidebar = ({ currentPage, onNavigate }) => {
  const menuItems = [
    { id: 'home', label: '🏠 Home', icon: '🏠' },
    { id: 'bookshelf', label: '📚 Bookshelf', icon: '📚' },
    { id: 'profile', label: '👤 Profile', icon: '👤' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">📚</div>
        <h1 className="logo-text">KitabXano</h1>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map(item => (
          <button
            key={item.id}
            className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <p className="sidebar-tagline">Kitob Xazinasi</p>
      </div>
    </aside>
  );
};

export default Sidebar;
