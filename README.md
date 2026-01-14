# 📚 KitabXano Frontend

A modern React frontend for the KitabXano (Book Treasure) application. A comprehensive platform for managing personal book libraries and social interactions around reading.

## 🎯 Features

- ✅ User Authentication (Login/Sign Up)
- ✅ Personal Book Library (Bookshelf)
- ✅ Add/Remove Books from Bookshelf
- ✅ Rate Books (1-5 stars)
- ✅ Sort Books (by title, author, rating, date)
- ✅ Filter Books by Rating
- ✅ Create and View Posts
- ✅ Like/Unlike Posts
- ✅ User Profiles
- ✅ Real-time Feed
- ✅ Responsive Design
- ✅ Error Handling
- ✅ Uzbek Language Support
- ✅ Book-themed UI (Brown color scheme)

## 📁 Project Structure

```
social-network-frontend/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── UserCard.js           # User display component
│   │   ├── UserCard.css
│   │   ├── PostCard.js           # Post display component
│   │   ├── PostCard.css
│   │   ├── BookCard.js           # Book display component
│   │   └── BookCard.css
│   ├── contexts/
│   │   └── AuthContext.js        # Authentication context
│   ├── pages/
│   │   ├── Home.js              # Home/Feed page
│   │   ├── Home.css
│   │   ├── Bookshelf.js         # User's bookshelf page
│   │   ├── Bookshelf.css
│   │   ├── Login.js             # Login/Sign up page
│   │   └── Auth.css
│   ├── services/
│   │   └── api.js               # API calls & endpoints
│   ├── App.js                   # Main app component with routing
│   ├── App.css                  # Global styles
│   ├── index.js
│   ├── index.css
│   └── setupTests.js
├── package.json
├── tsconfig.json
└── README.md
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Backend server running on `http://localhost:5000`

### Install Dependencies

```bash
cd social-network-frontend
npm install
```

### Start Development Server

```bash
npm start
```

The application will open at `http://localhost:3000`

## 📖 Usage Guide

### 1. **Authentication**
- Visit the Login page
- Either sign in with existing credentials or create a new account
- Fill in email, password, and optional username/full name for sign up

### 2. **Home Feed**
- After login, you'll see the Home page with recent posts
- Create new posts with text and optional images
- Like/unlike posts from other users
- View all posts in a real-time feed

### 3. **Bookshelf**
- Click the "📖 Kitoblar" (Books) button in the navigation
- View all books in your personal library
- Add new books to your collection
- Rate books using the 5-star rating system
- Remove books from your shelf
- Sort books by: date added, title, author, or rating
- Filter books by minimum rating (1-5 stars)

### 4. **Navigation**
- Use the top navbar to switch between Home and Bookshelf pages
- Click your user ID to view profile information
- Click "Chiqish" (Logout) to sign out

## 🎨 Design & Styling

- **Color Scheme**: Book-themed brown palette (#8b5a3c primary color)
- **Responsive**: Mobile-friendly design
- **Components**: Modular and reusable React components
- **CSS**: Custom CSS for styling with smooth transitions

## 🔌 API Integration

The frontend communicates with the backend API at `http://localhost:5000/api`:

### User API
- `POST /api/users` - Create new user
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Post API
- `POST /api/posts/:userId` - Create post
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get post by ID
- `DELETE /api/posts/:id` - Delete post
- `POST /api/posts/:id/like/:userId` - Like post
- `POST /api/posts/:id/unlike/:userId` - Unlike post

### Bookshelf API
- `POST /api/bookshelves/:userId/books` - Add book to shelf
- `GET /api/bookshelves/:userId` - Get user's bookshelf
- `DELETE /api/bookshelves/:userId/books/:bookId` - Remove book
- `PUT /api/bookshelves/:userId/books/:bookId/rating` - Update rating

## 🧠 State Management

- **Authentication**: React Context API (AuthContext)
- **Local State**: Component-level state with useState
- **API State**: Managed within components

## 📦 Dependencies

Key packages used:
- `react` - UI framework
- `react-dom` - React DOM rendering
- `fetch` - API communication (built-in)

## 🚦 Development

### Available Scripts

```bash
# Start development server
npm start

# Build for production
npm build

# Run tests
npm test

# Eject configuration (one-way operation)
npm eject
```

## 🌐 Localization

The application supports Uzbek language:
- Login page: Uzbek labels and placeholders
- Navigation: Uzbek menu items ("Uy" for Home, "Kitoblar" for Books)
- Bookshelf: Uzbek sorting and filtering options
- Error messages: Uzbek error handling

## 🤝 Contributing

To contribute to this project:
1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 🆘 Support

For issues or questions:
- Check the backend README.md for API documentation
- Review the code comments in the components
- Check browser console for error messages
- Ensure the backend server is running on port 5000

---

**KitabXano** - Your Digital Book Treasure Chest 📚✨
