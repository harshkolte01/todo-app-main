/**
 * Todo Service
 * 
 * Handles all todo-related API calls.
 * Uses the centralized API client.
 */

import { get, post, put, del } from './apiClient';

/**
 * Get all todos with optional filters, search, sort, and pagination
 * 
 * @param {object} params - Query parameters
 * @param {string} params.search - Search in title or description (optional)
 * @param {string} params.status - Filter by status: "pending" or "completed" (optional)
 * @param {string} params.priority - Filter by priority: "low", "medium", or "high" (optional)
 * @param {string} params.sortBy - Sort by field: "createdAt", "updatedAt", "title", "priority", "dueDate" (default: "createdAt")
 * @param {string} params.order - Sort order: "asc" or "desc" (default: "desc")
 * @param {number} params.page - Page number (default: 1)
 * @param {number} params.limit - Items per page (default: 5)
 * @returns {Promise} - Todos array and pagination data
 * 
 * Example:
 * const result = await todoService.getTodos({
 *   search: 'project',
 *   status: 'pending',
 *   priority: 'high',
 *   sortBy: 'dueDate',
 *   order: 'asc',
 *   page: 1,
 *   limit: 5
 * });
 * 
 * if (result.success) {
 *   console.log('Todos:', result.data.todos);
 *   console.log('Pagination:', result.data.pagination);
 * }
 */
export const getTodos = async (params = {}) => {
  try {
    // Build query string
    const queryParams = new URLSearchParams();
    
    if (params.search) queryParams.append('search', params.search);
    if (params.status) queryParams.append('status', params.status);
    if (params.priority) queryParams.append('priority', params.priority);
    if (params.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params.order) queryParams.append('order', params.order);
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);
    
    const queryString = queryParams.toString();
    const endpoint = queryString ? `/todos?${queryString}` : '/todos';
    
    const data = await get(endpoint); // true = auth required (default)
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Get a single todo by ID
 * 
 * @param {string} id - Todo ID
 * @returns {Promise} - Todo data
 * 
 * Example:
 * const result = await todoService.getTodoById('507f1f77bcf86cd799439011');
 * if (result.success) {
 *   console.log('Todo:', result.data.todo);
 * }
 */
export const getTodoById = async (id) => {
  try {
    const data = await get(`/todos/${id}`);
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Create a new todo
 * 
 * @param {object} todoData - Todo data
 * @param {string} todoData.title - Todo title (required)
 * @param {string} todoData.description - Todo description (optional)
 * @param {string} todoData.priority - Priority: "low", "medium", "high" (default: "medium")
 * @param {string} todoData.status - Status: "pending", "completed" (default: "pending")
 * @param {string} todoData.dueDate - Due date in YYYY-MM-DD format (optional)
 * @returns {Promise} - Created todo data
 * 
 * Example:
 * const result = await todoService.createTodo({
 *   title: 'Complete project',
 *   description: 'Finish the todo app',
 *   priority: 'high',
 *   dueDate: '2024-12-31'
 * });
 * 
 * if (result.success) {
 *   console.log('Created todo:', result.data.todo);
 * }
 */
export const createTodo = async (todoData) => {
  try {
    const data = await post('/todos', todoData);
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Update an existing todo
 * 
 * @param {string} id - Todo ID
 * @param {object} updates - Fields to update (all optional)
 * @param {string} updates.title - New title
 * @param {string} updates.description - New description
 * @param {string} updates.priority - New priority: "low", "medium", "high"
 * @param {string} updates.status - New status: "pending", "completed"
 * @param {string} updates.dueDate - New due date
 * @returns {Promise} - Updated todo data
 * 
 * Example:
 * const result = await todoService.updateTodo('507f1f77bcf86cd799439011', {
 *   status: 'completed'
 * });
 * 
 * if (result.success) {
 *   console.log('Updated todo:', result.data.todo);
 * }
 */
export const updateTodo = async (id, updates) => {
  try {
    const data = await put(`/todos/${id}`, updates);
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Delete a todo
 * 
 * @param {string} id - Todo ID
 * @returns {Promise} - Response data
 * 
 * Example:
 * const result = await todoService.deleteTodo('507f1f77bcf86cd799439011');
 * if (result.success) {
 *   console.log('Todo deleted');
 * }
 */
export const deleteTodo = async (id) => {
  try {
    const data = await del(`/todos/${id}`);
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Toggle todo status (pending <-> completed)
 * 
 * @param {string} id - Todo ID
 * @param {string} currentStatus - Current status
 * @returns {Promise} - Updated todo data
 * 
 * Example:
 * const result = await todoService.toggleStatus('507f1f77bcf86cd799439011', 'pending');
 * if (result.success) {
 *   console.log('Status toggled to:', result.data.todo.status);
 * }
 */
export const toggleStatus = async (id, currentStatus) => {
  const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';
  return updateTodo(id, { status: newStatus });
};

export default {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleStatus
};