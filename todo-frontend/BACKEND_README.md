# Todo App Backend API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
Most endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

---

## 📌 User Routes

### 1. User Signup
**Endpoint:** `POST /users/signup`  
**Authentication:** Not required  
**Content-Type:** `multipart/form-data`

**Request Body:**
```javascript
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "profile_pic": <file> // Optional
}
```

**Success Response (201):**
```json
{
  "message": "User Registered Successfully."
}
```

**Error Responses:**
- `400` - All fields are required
- `400` - Email already exists
- `400` - Username already taken

---

### 2. User Signin
**Endpoint:** `POST /users/signin`  
**Authentication:** Not required  
**Content-Type:** `application/json`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Signin Successful"
}
```

**Error Responses:**
- `400` - Invalid Credentials
- `400` - Invalid Password

---

### 3. Get User Profile
**Endpoint:** `GET /users/profile`  
**Authentication:** Required  
**Content-Type:** `application/json`

**Success Response (200):**
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "johndoe",
    "email": "john@example.com",
    "profile_pic": "https://cloudinary.com/..."
  }
}
```

**Error Responses:**
- `401` - Unauthorized / Invalid Token

---

### 4. Update User Profile
**Endpoint:** `PUT /users/profile`  
**Authentication:** Required  
**Content-Type:** `multipart/form-data`

**Request Body:**
```javascript
{
  "username": "newusername", // Optional
  "profile_pic": <file> // Optional
}
```

**Success Response (200):**
```json
{
  "message": "Profile updated successfully.",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "newusername",
    "email": "john@example.com",
    "profile_pic": "https://cloudinary.com/..."
  }
}
```

**Error Responses:**
- `401` - Unauthorized / Invalid Token

---

### 5. Delete User Account
**Endpoint:** `DELETE /users/account`  
**Authentication:** Required  
**Content-Type:** `application/json`

**Success Response (200):**
```json
{
  "message": "Account deleted."
}
```

**Error Responses:**
- `401` - Unauthorized / Invalid Token

---

## 📝 Todo Routes

### 1. Create Todo
**Endpoint:** `POST /todos`  
**Authentication:** Required  
**Content-Type:** `application/json`

**Request Body:**
```json
{
  "title": "Complete project",
  "description": "Finish the todo app", // Optional
  "priority": "high", // Optional: "low", "medium", "high" (default: "medium")
  "status": "pending", // Optional: "pending", "completed" (default: "pending")
  "dueDate": "2024-12-31" // Optional
}
```

**Success Response (201):**
```json
{
  "message": "Todo Created.",
  "todo": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Complete project",
    "description": "Finish the todo app",
    "priority": "high",
    "status": "pending",
    "dueDate": "2024-12-31T00:00:00.000Z",
    "user": "507f1f77bcf86cd799439012",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Responses:**
- `400` - Title is required
- `401` - Unauthorized / Invalid Token

---

### 2. Get All Todos (with Search, Filter, Sort, Pagination)
**Endpoint:** `GET /todos`  
**Authentication:** Required  
**Content-Type:** `application/json`

**Query Parameters:**
- `search` - Search in title or description (optional)
- `status` - Filter by status: "pending" or "completed" (optional)
- `priority` - Filter by priority: "low", "medium", or "high" (optional)
- `sortBy` - Sort by field: "createdAt", "updatedAt", "title", "priority", "dueDate" (default: "createdAt")
- `order` - Sort order: "asc" or "desc" (default: "desc")
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 5)

**Example Request:**
```
GET /todos?search=project&status=pending&priority=high&sortBy=dueDate&order=asc&page=1&limit=5
```

**Success Response (200):**
```json
{
  "todos": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Complete project",
      "description": "Finish the todo app",
      "priority": "high",
      "status": "pending",
      "dueDate": "2024-12-31T00:00:00.000Z",
      "user": "507f1f77bcf86cd799439012",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 3,
    "totalTodos": 15,
    "limit": 5,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

**Error Responses:**
- `401` - Unauthorized / Invalid Token

---

### 3. Get Single Todo
**Endpoint:** `GET /todos/:id`  
**Authentication:** Required  
**Content-Type:** `application/json`

**Success Response (200):**
```json
{
  "todo": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Complete project",
    "description": "Finish the todo app",
    "priority": "high",
    "status": "pending",
    "dueDate": "2024-12-31T00:00:00.000Z",
    "user": "507f1f77bcf86cd799439012",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Responses:**
- `400` - Invalid todo ID
- `404` - Todo not found
- `401` - Unauthorized / Invalid Token

---

### 4. Update Todo
**Endpoint:** `PUT /todos/:id`  
**Authentication:** Required  
**Content-Type:** `application/json`

**Request Body:** (All fields are optional)
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "priority": "low",
  "status": "completed",
  "dueDate": "2024-12-25"
}
```

**Success Response (200):**
```json
{
  "message": "Todo Updated",
  "todo": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Updated title",
    "description": "Updated description",
    "priority": "low",
    "status": "completed",
    "dueDate": "2024-12-25T00:00:00.000Z",
    "user": "507f1f77bcf86cd799439012",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T12:45:00.000Z"
  }
}
```

**Error Responses:**
- `400` - Invalid todo ID
- `400` - Title cannot be empty
- `400` - Priority must be: low, medium, high
- `400` - Invalid date format
- `404` - Todo not found
- `401` - Unauthorized / Invalid Token

---

### 5. Delete Todo
**Endpoint:** `DELETE /todos/:id`  
**Authentication:** Required  
**Content-Type:** `application/json`

**Success Response (200):**
```json
{
  "message": "Todo deleted successfully"
}
```

**Error Responses:**
- `400` - Invalid todo ID
- `404` - Todo not found
- `401` - Unauthorized / Invalid Token

---

## 🔐 Authentication Flow

### 1. Register a new user
```bash
POST /api/users/signup
```

### 2. Login to get JWT token
```bash
POST /api/users/signin
```

### 3. Use the token in subsequent requests
```bash
Authorization: Bearer <your-jwt-token>
```

---

## 📊 Data Models

### User Model
```javascript
{
  username: String (required, unique, 3-20 chars),
  email: String (required, unique, lowercase),
  password: String (required, hashed, min 6 chars),
  profile_pic: String (optional),
  createdAt: Date,
  updatedAt: Date
}
```

### Todo Model
```javascript
{
  title: String (required),
  description: String (default: ""),
  status: String (enum: ["pending", "completed"], default: "pending"),
  priority: String (enum: ["low", "medium", "high"], default: "medium"),
  dueDate: Date (optional),
  user: ObjectId (required, ref: "User"),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🚀 Quick Start Examples

### Using cURL

#### 1. Register
```bash
curl -X POST http://localhost:5000/api/users/signup \
  -F "username=johndoe" \
  -F "email=john@example.com" \
  -F "password=password123"
```

#### 2. Login
```bash
curl -X POST http://localhost:5000/api/users/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

#### 3. Create Todo
```bash
curl -X POST http://localhost:5000/api/todos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"title":"Complete project","priority":"high"}'
```

#### 4. Get All Todos
```bash
curl -X GET "http://localhost:5000/api/todos?page=1&limit=5" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

### Using JavaScript (Fetch API)

#### 1. Register
```javascript
const formData = new FormData();
formData.append('username', 'johndoe');
formData.append('email', 'john@example.com');
formData.append('password', 'password123');

const response = await fetch('http://localhost:5000/api/users/signup', {
  method: 'POST',
  body: formData
});
const data = await response.json();
```

#### 2. Login
```javascript
const response = await fetch('http://localhost:5000/api/users/signin', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'john@example.com',
    password: 'password123'
  })
});
const data = await response.json();
const token = data.token;
```

#### 3. Create Todo
```javascript
const response = await fetch('http://localhost:5000/api/todos', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    title: 'Complete project',
    description: 'Finish the todo app',
    priority: 'high'
  })
});
const data = await response.json();
```

#### 4. Get All Todos with Filters
```javascript
const params = new URLSearchParams({
  search: 'project',
  status: 'pending',
  priority: 'high',
  sortBy: 'dueDate',
  order: 'asc',
  page: 1,
  limit: 5
});

const response = await fetch(`http://localhost:5000/api/todos?${params}`, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
const data = await response.json();
```

#### 5. Update Todo
```javascript
const response = await fetch(`http://localhost:5000/api/todos/${todoId}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    status: 'completed'
  })
});
const data = await response.json();
```

#### 6. Delete Todo
```javascript
const response = await fetch(`http://localhost:5000/api/todos/${todoId}`, {
  method: 'DELETE',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
const data = await response.json();
```

---

## ⚠️ Error Handling

All error responses follow this format:
```json
{
  "message": "Error description"
}
```

Common HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (authentication required)
- `404` - Not Found
- `500` - Internal Server Error

---

## 🔧 Environment Variables Required

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

---

## 📝 Notes

1. All timestamps are in ISO 8601 format
2. Profile pictures are uploaded to Cloudinary
3. Passwords are hashed using bcrypt
4. JWT tokens expire based on JWT_EXPIRY setting
5. Users can only access/modify their own todos
6. Pagination default is 5 items per page
7. Search is case-insensitive
8. All protected routes require valid JWT token

---

## 🎯 Frontend Integration Checklist

- [ ] Implement user registration form
- [ ] Implement login form and store JWT token
- [ ] Add Authorization header to all protected API calls
- [ ] Implement todo creation form
- [ ] Implement todo list with pagination
- [ ] Add search functionality
- [ ] Add filter by status and priority
- [ ] Add sorting options
- [ ] Implement todo update functionality
- [ ] Implement todo delete functionality
- [ ] Add profile picture upload
- [ ] Handle token expiration and refresh
- [ ] Implement error handling for all API calls

---

**Happy Coding! 🚀**