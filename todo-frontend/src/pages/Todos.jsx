import { useState, useEffect } from 'react';
import { Button, Input, TodoCard, Pagination } from '../components/ui';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import todoService from '../services/todoService';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

/**
 * Todos Page
 * 
 * Main page for managing todos.
 * Features: Create, Read, Update, Delete todos with search, filter, sort, and pagination.
 */

const Todos = () => {
  const { user, isAuthenticated, logout: authLogout } = useAuth();
  const { showSuccess, showError } = useToast();

  // Todos state
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Pagination state
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalTodos: 0,
    hasNextPage: false,
    hasPrevPage: false
  });

  // Filter and search states
  const [searchInput, setSearchInput] = useState(''); // What user types
  const [searchQuery, setSearchQuery] = useState(''); // What gets sent to API
  const [statusFilter, setStatusFilter] = useState(''); // '', 'pending', 'completed'
  const [priorityFilter, setPriorityFilter] = useState(''); // '', 'low', 'medium', 'high'
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');

  // Create/Edit todo modal state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: ''
  });
  const [editTodo, setEditTodo] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'pending',
    dueDate: ''
  });

  // Fetch todos when filters change
  useEffect(() => {
    if (isAuthenticated) {
      fetchTodos();
    }
  }, [pagination.currentPage, searchQuery, statusFilter, priorityFilter, sortBy, sortOrder, isAuthenticated]);

  // Fetch todos from API
  const fetchTodos = async () => {
    setIsLoading(true);
    
    const result = await todoService.getTodos({
      page: pagination.currentPage,
      limit: 5,
      sortBy: sortBy,
      order: sortOrder,
      search: searchQuery || undefined,
      status: statusFilter || undefined,
      priority: priorityFilter || undefined
    });
    
    setIsLoading(false);
    
    if (result.success) {
      setTodos(result.data.todos);
      setPagination(result.data.pagination);
    } else {
      console.error('Error fetching todos:', result.error);
      showError(result.error || 'Failed to fetch todos');
    }
  };

  // Create new todo
  const handleCreateTodo = async (e) => {
    e.preventDefault();

    const result = await todoService.createTodo(newTodo);
    
    if (result.success) {
      setShowCreateModal(false);
      setNewTodo({ title: '', description: '', priority: 'medium', dueDate: '' });
      showSuccess('Todo created successfully!');
      fetchTodos(); // Refresh list
    } else {
      console.error('Error creating todo:', result.error);
      showError(result.error || 'Failed to create todo');
    }
  };

  // Delete todo
  const handleDeleteTodo = async (id) => {
    if (!confirm('Are you sure you want to delete this todo?')) return;

    const result = await todoService.deleteTodo(id);
    
    if (result.success) {
      showSuccess('Todo deleted successfully!');
      fetchTodos(); // Refresh list
    } else {
      console.error('Error deleting todo:', result.error);
      showError(result.error || 'Failed to delete todo');
    }
  };

  // Toggle todo status
  const handleToggleStatus = async (id, currentStatus) => {
    const result = await todoService.toggleStatus(id, currentStatus);
    
    if (result.success) {
      const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';
      showSuccess(`Todo marked as ${newStatus}!`);
      fetchTodos(); // Refresh list
    } else {
      console.error('Error updating todo:', result.error);
      showError(result.error || 'Failed to update todo');
    }
  };

  // Open edit modal
  const handleEditClick = (todo) => {
    setEditingTodo(todo);
    setEditTodo({
      title: todo.title,
      description: todo.description || '',
      priority: todo.priority,
      status: todo.status,
      dueDate: todo.dueDate ? new Date(todo.dueDate).toISOString().split('T')[0] : ''
    });
    setShowEditModal(true);
  };

  // Update existing todo
  const handleUpdateTodo = async (e) => {
    e.preventDefault();

    const result = await todoService.updateTodo(editingTodo._id, editTodo);
    
    if (result.success) {
      setShowEditModal(false);
      setEditingTodo(null);
      setEditTodo({ title: '', description: '', priority: 'medium', status: 'pending', dueDate: '' });
      showSuccess('Todo updated successfully!');
      fetchTodos(); // Refresh list
    } else {
      console.error('Error updating todo:', result.error);
      showError(result.error || 'Failed to update todo');
    }
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setPagination({ ...pagination, currentPage: 1 }); // Reset to first page
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchInput('');
    setSearchQuery('');
    setPagination({ ...pagination, currentPage: 1 });
  };

  // Handle logout
  const handleLogout = () => {
    authLogout();
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Todos</h1>
            <p className="text-gray-600 mt-1">
              {pagination.totalTodos} {pagination.totalTodos === 1 ? 'task' : 'tasks'} total
            </p>
          </div>
          <Button variant="primary" onClick={() => setShowCreateModal(true)}>
            + Create Todo
          </Button>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            {/* Search with button */}
            <form onSubmit={handleSearch} className="relative">
              <Input
                placeholder="Search todos..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-20 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  title="Clear search"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors text-sm"
              >
                Search
              </button>
            </form>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>

            {/* Priority Filter */}
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            {/* Sort */}
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('-');
                setSortBy(field);
                setSortOrder(order);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="createdAt-desc">Newest First</option>
              <option value="createdAt-asc">Oldest First</option>
              <option value="dueDate-asc">Due Date (Earliest)</option>
              <option value="dueDate-desc">Due Date (Latest)</option>
              <option value="priority-desc">Priority (High to Low)</option>
              <option value="title-asc">Title (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Todos List */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading todos...</p>
          </div>
        ) : todos.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <p className="text-gray-600 mb-4">No todos found</p>
            <Button variant="primary" onClick={() => setShowCreateModal(true)}>
              Create Your First Todo
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {todos.map((todo) => (
              <TodoCard
                key={todo._id}
                todo={todo}
                onEdit={() => handleEditClick(todo)}
                onDelete={() => handleDeleteTodo(todo._id)}
                onToggleStatus={() => handleToggleStatus(todo._id, todo.status)}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {todos.length > 0 && (
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={(page) => setPagination({ ...pagination, currentPage: page })}
            hasNextPage={pagination.hasNextPage}
            hasPrevPage={pagination.hasPrevPage}
          />
        )}
      </div>

      {/* Create Todo Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Create New Todo</h2>
            
            <form onSubmit={handleCreateTodo} className="space-y-4">
              <Input
                label="Title"
                placeholder="Enter todo title"
                value={newTodo.title}
                onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                required
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  placeholder="Enter description (optional)"
                  value={newTodo.description}
                  onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  value={newTodo.priority}
                  onChange={(e) => setNewTodo({ ...newTodo, priority: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <Input
                label="Due Date"
                type="date"
                value={newTodo.dueDate}
                onChange={(e) => setNewTodo({ ...newTodo, dueDate: e.target.value })}
              />

              <div className="flex gap-2 pt-4">
                <Button type="submit" variant="primary">
                  Create Todo
                </Button>
                <Button 
                  type="button" 
                  variant="secondary" 
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Todo Modal */}
      {showEditModal && editingTodo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Edit Todo</h2>
            
            <form onSubmit={handleUpdateTodo} className="space-y-4">
              <Input
                label="Title"
                placeholder="Enter todo title"
                value={editTodo.title}
                onChange={(e) => setEditTodo({ ...editTodo, title: e.target.value })}
                required
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  placeholder="Enter description (optional)"
                  value={editTodo.description}
                  onChange={(e) => setEditTodo({ ...editTodo, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={editTodo.status}
                  onChange={(e) => setEditTodo({ ...editTodo, status: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  value={editTodo.priority}
                  onChange={(e) => setEditTodo({ ...editTodo, priority: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <Input
                label="Due Date"
                type="date"
                value={editTodo.dueDate}
                onChange={(e) => setEditTodo({ ...editTodo, dueDate: e.target.value })}
              />

              <div className="flex gap-2 pt-4">
                <Button type="submit" variant="primary">
                  Update Todo
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingTodo(null);
                    setEditTodo({ title: '', description: '', priority: 'medium', status: 'pending', dueDate: '' });
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Todos;