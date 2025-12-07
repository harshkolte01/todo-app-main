/**
 * API Client
 * 
 * Centralized API configuration and request handler.
 * Automatically adds Authorization header when token is available.
 * Handles 401 errors (token expiry) and shows toast notifications.
 */

// Base URL for all API requests from environment variable
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Store toast function reference (will be set by setToastHandler)
let toastHandler = null;

/**
 * Set the toast handler function
 * This should be called once when the app initializes
 */
export const setToastHandler = (handler) => {
  toastHandler = handler;
};

/**
 * Get token from localStorage
 */
const getToken = () => {
  return localStorage.getItem('token');
};

/**
 * Handle 401 Unauthorized errors (token expiry)
 */
const handle401Error = () => {
  // Clear token and user data
  localStorage.removeItem('token');
  
  // Show toast notification
  if (toastHandler) {
    toastHandler.showError('Session expired. Please login again.');
  }
  
  // Redirect to auth page after a short delay
  setTimeout(() => {
    window.location.href = '/auth';
  }, 1500);
};

/**
 * Make API request
 * 
 * @param {string} endpoint - API endpoint (e.g., '/users/signin')
 * @param {object} options - Fetch options
 * @param {boolean} includeAuth - Whether to include Authorization header (default: true)
 * @returns {Promise} - Response data
 */
const apiRequest = async (endpoint, options = {}, includeAuth = true) => {
  const url = `${BASE_URL}${endpoint}`;
  
  // Prepare headers
  const headers = options.headers || {};
  
  // Add auth header if needed and not FormData
  if (includeAuth && !(options.body instanceof FormData)) {
    const token = getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  
  // Add Authorization header for FormData too
  if (includeAuth && options.body instanceof FormData) {
    const token = getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  
  // Add Content-Type for JSON if not FormData
  if (!(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }
  
  try {
    // Make request
    const response = await fetch(url, {
      ...options,
      headers
    });
    
    // Handle 401 Unauthorized (token expiry)
    if (response.status === 401) {
      handle401Error();
      throw {
        status: 401,
        message: 'Session expired. Please login again.',
        isAuthError: true
      };
    }
    
    // Parse response
    const data = await response.json();
    
    // Handle other errors
    if (!response.ok) {
      throw {
        status: response.status,
        message: data.message || 'Request failed',
        data
      };
    }
    
    return data;
  } catch (error) {
    // If it's already our formatted error, rethrow it
    if (error.status) {
      throw error;
    }
    
    // Handle network errors
    throw {
      status: 0,
      message: 'Network error. Please check your connection.',
      originalError: error
    };
  }
};

/**
 * GET request
 */
export const get = (endpoint, includeAuth = true) => {
  return apiRequest(endpoint, { method: 'GET' }, includeAuth);
};

/**
 * POST request
 */
export const post = (endpoint, body, includeAuth = true) => {
  return apiRequest(
    endpoint,
    {
      method: 'POST',
      body: body instanceof FormData ? body : JSON.stringify(body)
    },
    includeAuth
  );
};

/**
 * PUT request
 */
export const put = (endpoint, body, includeAuth = true) => {
  return apiRequest(
    endpoint,
    {
      method: 'PUT',
      body: body instanceof FormData ? body : JSON.stringify(body)
    },
    includeAuth
  );
};

/**
 * DELETE request
 */
export const del = (endpoint, includeAuth = true) => {
  return apiRequest(endpoint, { method: 'DELETE' }, includeAuth);
};

/**
 * Save token to localStorage
 */
export const saveToken = (token) => {
  localStorage.setItem('token', token);
};

/**
 * Remove token from localStorage
 */
export const removeToken = () => {
  localStorage.removeItem('token');
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
  return !!getToken();
};

export default {
  get,
  post,
  put,
  del,
  saveToken,
  removeToken,
  isAuthenticated,
  setToastHandler,
  BASE_URL
};