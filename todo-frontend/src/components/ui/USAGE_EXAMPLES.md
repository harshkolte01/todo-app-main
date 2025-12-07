# UI Components Usage Guide

This guide shows you how to use each component with simple examples.

## 📦 Components Created

1. **Button** - Reusable button with different styles
2. **Input** - Form input with label and error handling
3. **TodoCard** - Display todo items with all details
4. **Pagination** - Navigate through pages

---

## 🔵 Button Component

### Import
```jsx
import Button from './components/ui/Button';
// OR
import { Button } from './components/ui';
```

### Basic Usage
```jsx
// Primary button (blue)
<Button variant="primary" onClick={handleClick}>
  Login
</Button>

// Secondary button (gray)
<Button variant="secondary" onClick={handleCancel}>
  Cancel
</Button>

// Danger button (red)
<Button variant="danger" onClick={handleDelete}>
  Delete
</Button>
```

### Different Sizes
```jsx
<Button size="sm">Small Button</Button>
<Button size="md">Medium Button</Button>
<Button size="lg">Large Button</Button>
```

### Disabled State
```jsx
<Button disabled>Loading...</Button>
```

### Submit Button (for forms)
```jsx
<Button type="submit" variant="primary">
  Submit Form
</Button>
```

---

## 📝 Input Component

### Import
```jsx
import Input from './components/ui/Input';
// OR
import { Input } from './components/ui';
```

### Basic Usage
```jsx
const [email, setEmail] = useState('');

<Input 
  label="Email"
  type="email"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
```

### With Error Message
```jsx
const [password, setPassword] = useState('');
const [error, setError] = useState('');

<Input 
  label="Password"
  type="password"
  placeholder="Enter password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  error={error}  // Shows red border and error text
  required
/>
```

### Different Input Types
```jsx
// Text input
<Input type="text" label="Username" />

// Email input
<Input type="email" label="Email" />

// Password input
<Input type="password" label="Password" />

// Date input
<Input type="date" label="Due Date" />
```

---

## 📋 TodoCard Component

### Import
```jsx
import TodoCard from './components/ui/TodoCard';
// OR
import { TodoCard } from './components/ui';
```

### Basic Usage
```jsx
const todoItem = {
  _id: "123",
  title: "Complete project",
  description: "Finish the todo app",
  priority: "high",        // 'low', 'medium', or 'high'
  status: "pending",       // 'pending' or 'completed'
  dueDate: "2024-12-31"
};

<TodoCard 
  todo={todoItem}
  onEdit={() => handleEdit(todoItem._id)}
  onDelete={() => handleDelete(todoItem._id)}
  onToggleStatus={() => handleToggle(todoItem._id)}
/>
```

### Display Multiple Todos
```jsx
const todos = [/* array of todo objects */];

{todos.map((todo) => (
  <TodoCard 
    key={todo._id}
    todo={todo}
    onEdit={() => handleEdit(todo._id)}
    onDelete={() => handleDelete(todo._id)}
    onToggleStatus={() => handleToggle(todo._id)}
  />
))}
```

---

## 📄 Pagination Component

### Import
```jsx
import Pagination from './components/ui/Pagination';
// OR
import { Pagination } from './components/ui';
```

### Basic Usage
```jsx
const [currentPage, setCurrentPage] = useState(1);

// This data comes from your backend API response
const paginationData = {
  currentPage: 1,
  totalPages: 5,
  hasNextPage: true,
  hasPrevPage: false
};

<Pagination 
  currentPage={paginationData.currentPage}
  totalPages={paginationData.totalPages}
  onPageChange={(page) => setCurrentPage(page)}
  hasNextPage={paginationData.hasNextPage}
  hasPrevPage={paginationData.hasPrevPage}
/>
```

---

## 🎯 Complete Example: Login Form

Here's a complete example showing how to use Button and Input together:

```jsx
import { useState } from 'react';
import { Button, Input } from './components/ui';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Submit to API
    console.log('Login:', { email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input 
        label="Email"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
        required
      />
      
      <Input 
        label="Password"
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
        required
      />
      
      <Button type="submit" variant="primary">
        Login
      </Button>
    </form>
  );
}
```

---

## 🎯 Complete Example: Todo List

Here's how to display todos with pagination:

```jsx
import { useState, useEffect } from 'react';
import { TodoCard, Pagination } from './components/ui';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({});

  // Fetch todos from API
  useEffect(() => {
    fetchTodos(currentPage);
  }, [currentPage]);

  const fetchTodos = async (page) => {
    // Call your backend API
    const response = await fetch(
      `http://localhost:5000/api/todos?page=${page}&limit=5`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    const data = await response.json();
    setTodos(data.todos);
    setPagination(data.pagination);
  };

  const handleEdit = (id) => {
    console.log('Edit todo:', id);
  };

  const handleDelete = (id) => {
    console.log('Delete todo:', id);
  };

  const handleToggle = (id) => {
    console.log('Toggle status:', id);
  };

  return (
    <div>
      {/* Todo Cards */}
      <div className="space-y-4">
        {todos.map((todo) => (
          <TodoCard 
            key={todo._id}
            todo={todo}
            onEdit={() => handleEdit(todo._id)}
            onDelete={() => handleDelete(todo._id)}
            onToggleStatus={() => handleToggle(todo._id)}
          />
        ))}
      </div>

      {/* Pagination */}
      <Pagination 
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={setCurrentPage}
        hasNextPage={pagination.hasNextPage}
        hasPrevPage={pagination.hasPrevPage}
      />
    </div>
  );
}
```

---

## 🎨 Styling Notes

All components use **Tailwind CSS** classes. The styles are:

- **Responsive** - Work on all screen sizes
- **Accessible** - Keyboard navigation and focus states
- **Consistent** - Same design language across all components
- **Customizable** - Easy to modify colors and sizes

---

## 📚 Next Steps

Now you can use these components to build:

1. **Login Page** - Use Input and Button
2. **Signup Page** - Use Input and Button
3. **Todo List Page** - Use TodoCard and Pagination
4. **Create Todo Form** - Use Input and Button

Happy coding! 🚀