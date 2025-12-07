/**
 * Auth Service
 * 
 * Handles all authentication-related API calls.
 * Uses the centralized API client.
 */

import { post, get, put, del, saveToken, removeToken } from './apiClient';

/**
 * Sign up a new user
 * 
 * @param {FormData} formData - Form data with username, email, password, profile_pic (optional)
 * @returns {Promise} - Response data
 * 
 * Example:
 * const formData = new FormData();
 * formData.append('username', 'johndoe');
 * formData.append('email', 'john@example.com');
 * formData.append('password', 'password123');
 * formData.append('profile_pic', fileObject); // optional
 * 
 * const result = await authService.signup(formData);
 */
export const signup = async (formData) => {
  try {
    const data = await post('/users/signup', formData, false); // false = no auth needed
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Sign in an existing user
 * 
 * @param {object} credentials - { email, password }
 * @returns {Promise} - Response data with token
 * 
 * Example:
 * const result = await authService.signin({
 *   email: 'john@example.com',
 *   password: 'password123'
 * });
 * 
 * if (result.success) {
 *   console.log('Token:', result.data.token);
 * }
 */
export const signin = async (credentials) => {
  try {
    const data = await post('/users/signin', credentials, false); // false = no auth needed
    
    // Save token to localStorage
    if (data.token) {
      saveToken(data.token);
    }
    
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Get current user profile
 * 
 * @returns {Promise} - User profile data
 * 
 * Example:
 * const result = await authService.getProfile();
 * if (result.success) {
 *   console.log('User:', result.data.user);
 * }
 */
export const getProfile = async () => {
  try {
    const data = await get('/users/profile'); // true = auth required (default)
    return { success: true, data };
  } catch (error) {
    // If unauthorized, remove token
    if (error.status === 401) {
      removeToken();
    }
    return { success: false, error: error.message };
  }
};

/**
 * Update user profile
 * 
 * @param {FormData} formData - Form data with username, profile_pic (optional)
 * @returns {Promise} - Updated user data
 * 
 * Example:
 * const formData = new FormData();
 * formData.append('username', 'newusername');
 * formData.append('profile_pic', fileObject); // optional
 * 
 * const result = await authService.updateProfile(formData);
 */
export const updateProfile = async (formData) => {
  try {
    const data = await put('/users/profile', formData); // true = auth required (default)
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Delete user account
 * 
 * @returns {Promise} - Response data
 * 
 * Example:
 * const result = await authService.deleteAccount();
 * if (result.success) {
 *   // Redirect to home page
 * }
 */
export const deleteAccount = async () => {
  try {
    const data = await del('/users/account'); // true = auth required (default)
    
    // Remove token after successful deletion
    removeToken();
    
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Logout user
 * Removes token from localStorage
 * 
 * Example:
 * authService.logout();
 * window.location.href = '/';
 */
export const logout = () => {
  removeToken();
};

export default {
  signup,
  signin,
  getProfile,
  updateProfile,
  deleteAccount,
  logout
};