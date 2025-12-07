# Todo App - Full Stack Practice Project

A full-stack todo application built for learning and practicing modern web development technologies. This project demonstrates user authentication, CRUD operations, file uploads, and responsive UI design.

## 🎯 Project Purpose

This is a **practice project** designed to learn and implement:
- RESTful API development with Node.js and Express
- MongoDB database operations with Mongoose
- JWT-based authentication
- File uploads with Cloudinary
- React frontend with modern hooks and context API
- Responsive UI with Tailwind CSS

## 🏗️ Architecture

```
todo-app/
├── backend/          # Node.js + Express API
└── todo-frontend/    # React + Vite frontend
```

---

## 🔧 Backend Implementation

### Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **File Storage:** Cloudinary
- **Email Service:** Nodemailer
- **Password Hashing:** bcrypt

### Key Features

#### 1. **User Management**
- User registration with email validation
- Secure password hashing (bcrypt with 10 salt rounds)
- JWT-based authentication (7-day token expiry)
- Profile picture upload to Cloudinary
- Profile update and account deletion
- Welcome email on registration

#### 2. **Todo Management**
- Create, read, update, delete todos
- Todo properties:
  - Title (required)
  - Description (optional)
  - Status: `pending` | `completed`
  - Priority: `low` | `medium` | `high`
  - Due date (optional)
- User-specific todos (users can only access their own)

#### 3. **Advanced Features**
- **Search:** Case-insensitive search in title and description
- **Filtering:** By status and priority
- **Sorting:** By createdAt, updatedAt, title, priority, or dueDate
- **Pagination:** Default 5 items per page, customizable
- **Validation:** Comprehensive input validation and error handling

### API Endpoints

#### Authentication
```
POST   /api/users/signup    - Register new user
POST   /api/users/signin    - Login and get JWT token
GET    /api/users/profile   - Get user profile (protected)
PUT    /api/users/profile   - Update profile (protected)
DELETE /api/users/account   - Delete account (protected)
```

#### Todos
```
POST   /api/todos           - Create todo (protected)
GET    /api/todos           - Get all todos with filters (protected)
GET    /api/todos/:id       - Get single todo (protected)
PUT    /api/todos/:id       - Update todo (protected)
DELETE /api/todos/:id       - Delete todo (protected)
```

### Database Models

#### User Schema
```javascript
{
  username: String (unique, 3-20 chars),
  email: String (unique, lowercase),
  password: String (hashed, min 6 chars),
  profile_pic: String (Cloudinary URL),
  createdAt: Date,
  updatedAt: Date
}
```

#### Todo Schema
```javascript
{
  title: String (required),
  description: String,
  status: String (pending/completed),
  priority: String (low/medium/high),
  dueDate: Date,
  user: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

### Middleware

1. **Authentication Middleware** ([`authMiddleware.js`](backend/middleware/authMiddleware.js))
   - Verifies JWT tokens
   - Attaches user info to request object
   - Protects routes from unauthorized access

2. **Todo Middleware** ([`todoMiddleware.js`](backend/middleware/todoMiddleware.js))
   - Validates todo ownership
   - Ensures users can only modify their own todos

3. **Upload Middleware** ([`upload.js`](backend/middleware/upload.js))
   - Handles multipart/form-data
   - Configures Multer for file uploads

### Configuration

#### Required Environment Variables
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_secret_key
JWT_EXPIRY=7d
PASSWORD_SALT_ROUNDS=10
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
GOOGLE_EMAIL=your_email@gmail.com
GOOGLE_APP_PASSWORD=your_app_password
```

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with required variables (see above)

4. Start development server:
```bash
npm run dev
```

5. Start production server:
```bash
npm start
```

The API will be available at `http://localhost:5000`

---

## 🎨 Frontend Overview

### Tech Stack
- **Framework:** React 19
- **Build Tool:** Vite
- **Styling:** Tailwind CSS 4
- **State Management:** Context API (AuthContext, ToastContext)

### Key Features
- User authentication (signup/signin)
- Protected routes
- Todo CRUD operations
- Search and filter functionality
- Pagination
- Profile management with picture upload
- Responsive design
- Toast notifications

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd todo-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
```

The app will be available at `http://localhost:5173`

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Cloudinary account
- Gmail account (for email service)

### Full Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd todo-app
```

2. **Setup Backend**
```bash
cd backend
npm install
# Create .env file with required variables
npm run dev
```

3. **Setup Frontend** (in new terminal)
```bash
cd todo-frontend
npm install
# Create .env file with API URL
npm run dev
```

4. **Access the application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

---

## 📚 Learning Outcomes

This project helps practice:
- Building RESTful APIs with Express
- MongoDB schema design and relationships
- JWT authentication implementation
- File upload handling with Cloudinary
- React hooks (useState, useEffect, useContext)
- Context API for state management
- Protected routes in React
- API integration with fetch/axios
- Form handling and validation
- Responsive design with Tailwind CSS
- Error handling on both frontend and backend

---

## 📖 Documentation

- **Backend API Documentation:** [`backend/BACKEND_README.md`](backend/BACKEND_README.md)
- **Frontend Components:** [`todo-frontend/src/components/ui/USAGE_EXAMPLES.md`](todo-frontend/src/components/ui/USAGE_EXAMPLES.md)

---

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Protected API routes
- User-specific data access
- Input validation and sanitization
- CORS configuration
- Environment variable protection

---

## 🛠️ Development Tips

1. **Backend Development:**
   - Use Postman or Thunder Client to test API endpoints
   - Check MongoDB Compass for database inspection
   - Monitor console logs for debugging

2. **Frontend Development:**
   - Use React DevTools for component inspection
   - Check browser console for errors
   - Use Network tab to debug API calls

3. **Common Issues:**
   - Ensure MongoDB is running
   - Verify environment variables are set correctly
   - Check CORS settings if frontend can't connect to backend
   - Ensure JWT token is included in protected requests

---

## 📝 License

This is a practice project for educational purposes.

---

## 🤝 Contributing

This is a personal practice project, but feel free to fork and experiment!

---

**Happy Learning! 🚀**