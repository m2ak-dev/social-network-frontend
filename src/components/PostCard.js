import React from 'react';
import './PostCard.css';

const PostCard = ({ post, onLike, onUnlike, onDelete, currentUserId, isLiked }) => {
  const author = post.author;

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-author">
          <div className="author-avatar">
            {author.profilePicture ? (
              <img src={author.profilePicture} alt={author.username} />
            ) : (
              <div className="avatar-placeholder">
                {author.username.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="author-info">
            <h4>{author.fullName}</h4>
            <p className="username">@{author.username}</p>
            <p className="timestamp">
              {new Date(post.createdDate).toLocaleDateString()}
            </p>
          </div>
        </div>
        {currentUserId === author.id && (
          <button className="btn-delete" onClick={onDelete}>
            ✕
          </button>
        )}
      </div>

      <div className="post-content">
        <p>{post.content}</p>
        {post.image && (
          <img src={post.image} alt="Post" className="post-image" />
        )}
      </div>

      <div className="post-footer">
        <button
          className={`btn-like ${isLiked ? 'liked' : ''}`}
          onClick={isLiked ? onUnlike : onLike}
        >
          <span className="heart">❤️</span>
          <span>{post.likesCount} {post.likesCount === 1 ? 'Like' : 'Likes'}</span>
        </button>
      </div>

      {post.likedBy.length > 0 && (
        <div className="liked-by">
          <p>
            Liked by: {post.likedBy.map(u => u.username).join(', ')}
          </p>
        </div>
      )}
    </div>
  );
};

export default PostCard;
