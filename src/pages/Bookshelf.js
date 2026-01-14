import React, { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';
import { bookshelfAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import './Bookshelf.css';

function Bookshelf() {
  const { currentUserId } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [filterRating, setFilterRating] = useState(0);

  useEffect(() => {
    fetchBookshelf();
  }, [currentUserId]);

  const fetchBookshelf = async () => {
    if (!currentUserId) return;
    
    try {
      setLoading(true);
      const data = await bookshelfAPI.getBookshelf(currentUserId);
      setBooks(data.books || []);
      setError('');
    } catch (err) {
      setError('Kitoblarni yuklashda xato: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveBook = async (bookId) => {
    try {
      await bookshelfAPI.removeBook(currentUserId, bookId);
      setBooks(books.filter(b => b.id !== bookId));
    } catch (err) {
      setError('Kitobni o\'chirishda xato: ' + err.message);
    }
  };

  const handleRateBook = async (bookId, rating) => {
    try {
      await bookshelfAPI.updateRating(currentUserId, bookId, rating);
      setBooks(books.map(b => 
        b.id === bookId ? { ...b, rating } : b
      ));
    } catch (err) {
      setError('Baholashni yangilashda xato: ' + err.message);
    }
  };

  const getSortedBooks = () => {
    let filtered = books.filter(b => !filterRating || b.rating >= filterRating);
    
    switch (sortBy) {
      case 'title':
        return filtered.sort((a, b) => a.title.localeCompare(b.title));
      case 'author':
        return filtered.sort((a, b) => a.author.localeCompare(b.author));
      case 'rating':
        return filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'date':
      default:
        return filtered.sort((a, b) => 
          new Date(b.publishedDate) - new Date(a.publishedDate)
        );
    }
  };

  const sortedBooks = getSortedBooks();

  return (
    <div className="bookshelf-container">
      <div className="bookshelf-header">
        <h1>📚 Mening Kitob Xazinasi</h1>
        <p className="total-books">Jami kitoblar: {books.length}</p>
      </div>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError('')} className="btn-close-error">✕</button>
        </div>
      )}

      {loading ? (
        <div className="loading">Kitoblar yuklanimoqda...</div>
      ) : books.length === 0 ? (
        <div className="no-books">
          <div className="no-books-icon">📖</div>
          <p>Sizning kitob xazinasi hali bo'sh</p>
          <p className="sub-text">Kitoblar qo'shing va ularni baholang</p>
        </div>
      ) : (
        <>
          <div className="bookshelf-controls">
            <div className="control-group">
              <label htmlFor="sort-select">Saralash:</label>
              <select 
                id="sort-select"
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="date">Yangi kitoblar</option>
                <option value="title">Nomi bo'yicha (A-Z)</option>
                <option value="author">Muallif bo'yicha (A-Z)</option>
                <option value="rating">Bahosi bo'yicha (Yuqori)</option>
              </select>
            </div>

            <div className="control-group">
              <label htmlFor="filter-select">Baholash filtri:</label>
              <select 
                id="filter-select"
                value={filterRating} 
                onChange={(e) => setFilterRating(Number(e.target.value))}
              >
                <option value={0}>Hammasi</option>
                <option value={1}>⭐ 1+ yulduz</option>
                <option value={2}>⭐⭐ 2+ yulduz</option>
                <option value={3}>⭐⭐⭐ 3+ yulduz</option>
                <option value={4}>⭐⭐⭐⭐ 4+ yulduz</option>
                <option value={5}>⭐⭐⭐⭐⭐ 5 yulduz</option>
              </select>
            </div>
          </div>

          <div className="books-grid">
            {sortedBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onRemove={handleRemoveBook}
                onRateChange={handleRateBook}
              />
            ))}
          </div>

          {sortedBooks.length === 0 && books.length > 0 && (
            <div className="no-books">
              <p>Tanlangan filtriga mos kitoblar topilmadi</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Bookshelf;
