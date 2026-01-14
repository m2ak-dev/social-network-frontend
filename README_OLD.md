# 📱 Social Network Frontend

A modern React frontend for the Social Network application. Built with React, featuring user authentication, post creation, and social interactions.

## 🎯 Features

- ✅ User Authentication (Login/Sign Up)
- ✅ Create and View Posts
- ✅ Like/Unlike Posts
- ✅ User Profiles
- ✅ Real-time Feed
- ✅ Responsive Design
- ✅ Error Handling

## 📁 Project Structure

```
social-network-frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── UserCard.js           # User display component
│   │   ├── UserCard.css
│   │   ├── PostCard.js           # Post display component
│   │   └── PostCard.css
│   ├── contexts/
│   │   └── AuthContext.js        # Authentication context
│   ├── pages/
│   │   ├── Home.js              # Home/Feed page
│   │   ├── Home.css
│   │   ├── Login.js             # Login/Sign up page
│   │   └── Auth.css
│   ├── services/
│   │   └── api.js               # API calls
│   ├── App.js                   # Main app component
│   ├── App.css
│   ├── index.js
│   ├── index.css
│   └── logo.svg
├── package.json
└── README.md
```

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend server running on http://localhost:5000

### Steps

1. **Install Dependencies**

```bash
npm install
```

2. **Start Development Server**

```bash
npm start
```

The app will open at `http://localhost:3000`

## 📖 Usage Guide

### 1. Sign Up

- Click "Sign Up" on the login page
- Fill in your email, username, full name, and password
- Click "Sign Up"

### 2. Login

- Enter your email and password
- Click "Login"

### 3. Create a Post

- Once logged in, go to the Home page
- Enter your post content in the textarea
- Optionally add an image URL
- Click "Post"

### 4. Interact with Posts

- **Like**: Click the heart button to like a post
- **Unlike**: Click again to unlike
- **Delete**: Click the X button to delete your own posts

### 5. View Feed

- The Home page shows all posts from all users
- Posts display author info, content, image, and like count

## 🔑 API Integration

The frontend communicates with the backend API at `http://localhost:5000/api`.

## 🔐 Authentication

Authentication uses Bearer token (User ID) stored in localStorage.

## 🧪 Test Users

**User 1:**

- Email: john@example.com
- Password: pass123

**User 2:**

- Email: jane@example.com
- Password: pass456

## 📦 Dependencies

- **react**: ^18.2.0
- **react-dom**: ^18.2.0

## 🛠️ Development

```bash
npm start       # Start dev server
npm run build   # Build for production
npm test        # Run tests
```

## 🎨 Components

- **App.js**: Main application with routing
- **AuthContext.js**: Global authentication state
- **Home.js**: Feed page with post creation
- **Login.js**: Authentication page
- **PostCard.js**: Individual post display
- **UserCard.js**: User information display

## 📱 Responsive Design

Fully responsive on desktop, tablet, and mobile devices.

## 🚨 Error Handling

- API error messages displayed to user
- Form validation
- Network error handling

## 🌐 Deployment

```bash
npm run build  # Creates optimized build
```

Deploy to: Vercel, Netlify, GitHub Pages, or any static hosting.

## 📚 Learn More

- [React Docs](https://react.dev)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Context API](https://react.dev/reference/react/useContext)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
