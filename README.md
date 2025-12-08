# Todo App

A full-stack todo application built with React and Node.js.

## About the Project

This is a simple todo management application where users can create, update, and delete their tasks. The app includes user authentication, profile management, and email notifications.

## Features

### User Authentication
- **Sign Up**: Create a new account with username, email, and password
- **Sign In**: Login with email and password
- **JWT Authentication**: Secure token-based authentication
- **Profile Picture**: Upload profile picture during signup or update later

### Profile Management
- **View Profile**: See your username, email, and profile picture
- **Update Profile**: Change username and profile picture
- **Delete Account**: Permanently delete your account and all todos

### Todo Operations
- **Create Todo**: Add new tasks with title, description, priority, and due date
- **Read Todos**: View all your todos with pagination
- **Update Todo**: Edit todo details or mark as complete
- **Delete Todo**: Remove todos you no longer need
- **Search**: Find todos by title or description
- **Filter**: Filter by status (pending/completed) or priority (low/medium/high)
- **Sort**: Sort by date, priority, or title

### Email Notifications
- **Welcome Email**: Receive a welcome email when you sign up
- **Powered by Nodemailer**: Automated email service using Gmail

## Tech Stack

**Frontend:**
- React with Hooks
- Tailwind CSS
- Context API for state management

**Backend:**
- Node.js & Express
- MongoDB with Mongoose
- JWT for authentication
- Cloudinary for image storage
- Nodemailer for emails

## API Endpoints

### User Routes
```
POST   /api/users/signup     - Register new user
POST   /api/users/signin     - Login user
GET    /api/users/profile    - Get user profile (protected)
PUT    /api/users/profile    - Update profile (protected)
DELETE /api/users/account    - Delete account (protected)
```

### Todo Routes
```
POST   /api/todos            - Create new todo (protected)
GET    /api/todos            - Get all todos with filters (protected)
GET    /api/todos/:id        - Get single todo (protected)
PUT    /api/todos/:id        - Update todo (protected)
DELETE /api/todos/:id        - Delete todo (protected)
```

**Query Parameters for GET /api/todos:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 5)
- `search` - Search in title/description
- `status` - Filter by pending/completed
- `priority` - Filter by low/medium/high
- `sortBy` - Sort field (createdAt, title, priority, dueDate)
- `order` - Sort order (asc/desc)

## Setup Instructions

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_secret_key
JWT_EXPIRY=7d
PASSWORD_SALT_ROUNDS=10
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
GOOGLE_EMAIL=your_gmail@gmail.com
GOOGLE_APP_PASSWORD=your_gmail_app_password
```

4. Start server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd todo-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start development server:
```bash
npm run dev
```

## Project Structure

```
todo-app/
├── backend/
│   ├── config/          # Database, Cloudinary, Nodemailer config
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Auth, validation middleware
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   └── emails/          # Email templates
└── todo-frontend/
    ├── src/
    │   ├── components/  # Reusable components
    │   ├── context/     # Auth & Toast context
    │   ├── pages/       # Page components
    │   ├── services/    # API services
    │   └── utils/       # Helper functions
    └── public/
```

## Developer

Created by [Harsh Kolte](https://github.com/harshkolte01)

- [GitHub](https://github.com/harshkolte01?tab=repositories)
- [LinkedIn](https://www.linkedin.com/in/harsh-kolte-458978277/)

---

**Happy Coding! 🚀**