import React from 'react';
import './UserCard.css';

const UserCard = ({ user, onViewProfile }) => {
  return (
    <div className="user-card">
      <div className="user-avatar">
        {user.profilePicture ? (
          <img src={user.profilePicture} alt={user.username} />
        ) : (
          <div className="avatar-placeholder">
            {user.username.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <div className="user-info">
        <h3>{user.fullName}</h3>
        <p className="username">@{user.username}</p>
        {user.bio && <p className="bio">{user.bio}</p>}
        <p className="email">{user.email}</p>
      </div>
      {onViewProfile && (
        <button className="btn-primary" onClick={onViewProfile}>
          View Profile
        </button>
      )}
    </div>
  );
};

export default UserCard;
