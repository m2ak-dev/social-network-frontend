import React, { useState } from 'react';
import './BookCard.css';

function BookCard({ book, onRemove, onRateChange }) {
  const [rating, setRating] = useState(book.rating || 0);
  const [isRating, setIsRating] = useState(false);

  const handleRating = async (newRating) => {
    setRating(newRating);
    setIsRating(true);
    
    try {
      if (onRateChange) {
        await onRateChange(book.id, newRating);
      }
    } catch (error) {
      console.error('Rating yangilashda xato:', error);
      setRating(book.rating || 0);
    } finally {
      setIsRating(false);
    }
  };

  const handleRemove = async () => {
    if (window.confirm(`"${book.title}" kitobini o'chirmoqchisiz?`)) {
      try {
        if (onRemove) {
          await onRemove(book.id);
        }
      } catch (error) {
        console.error('Kitobni o\'chirishda xato:', error);
      }
    }
  };

  return (
    <div className="book-card">
      <div className="book-header">
        <div className="book-cover">
          {book.coverImage ? (
            <img src={book.coverImage} alt={book.title} />
          ) : (
            <div className="cover-placeholder">
              <span className="book-icon">📚</span>
            </div>
          )}
        </div>
        
        <div className="book-info">
          <h3 className="book-title">{book.title}</h3>
          <p className="book-author">Muallif: {book.author}</p>
          <p className="book-genre">Janr: {book.genre}</p>
          
          <div className="rating-section">
            <label>Baholash:</label>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className={`star ${rating >= star ? 'filled' : ''}`}
                  onClick={() => handleRating(star)}
                  disabled={isRating}
                  title={`${star} yulduz`}
                >
                  ⭐
                </button>
              ))}
            </div>
            {rating > 0 && <span className="rating-text">{rating}/5</span>}
          </div>
        </div>
      </div>

      {book.description && (
        <div className="book-description">
          <p>{book.description}</p>
        </div>
      )}

      {book.publishedDate && (
        <p className="book-meta">Nashr sanasi: {new Date(book.publishedDate).getFullYear()}</p>
      )}

      <button className="btn-remove" onClick={handleRemove} title="Kitobni o'chirish">
        ✕
      </button>
    </div>
  );
}

export default BookCard;
