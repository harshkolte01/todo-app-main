import { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

/**
 * AuthContext
 * 
 * Global authentication state management.
 * Provides auth state (token, user) and functions (login, logout, setUser) to all components.
 */

// Create the context
const AuthContext = createContext(null);

/**
 * Custom hook to use auth context
 * 
 * Usage in any component:
 * const { user, token, isAuthenticated, login, logout, setUser } = useAuth();
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

/**
 * AuthProvider Component
 * 
 * Wraps the app and provides auth state to all children.
 * Initializes auth state from localStorage on mount.
 */
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    initializeAuth();
  }, []);

  /**
   * Initialize authentication state
   * Reads token from localStorage and fetches user profile
   */
  const initializeAuth = async () => {
    const token = localStorage.getItem('token');
    
    if (token) {
      // Token exists, fetch user profile
      const result = await authService.getProfile();
      
      if (result.success) {
        setAuthState({
          token,
          user: result.data.user,
          isAuthenticated: true,
          isLoading: false
        });
      } else {
        // Token invalid, clear it
        localStorage.removeItem('token');
        setAuthState({
          token: null,
          user: null,
          isAuthenticated: false,
          isLoading: false
        });
      }
    } else {
      // No token
      setAuthState({
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false
      });
    }
  };

  /**
   * Login function
   * Sets token and user in state
   * 
   * @param {string} token - JWT token
   * @param {object} user - User object
   */
  const login = (token, user) => {
    localStorage.setItem('token', token);
    setAuthState({
      token,
      user,
      isAuthenticated: true,
      isLoading: false
    });
  };

  /**
   * Logout function
   * Clears token and user from state and localStorage
   */
  const logout = () => {
    localStorage.removeItem('token');
    setAuthState({
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
  };

  /**
   * Update user in state
   * Used when user updates their profile
   * 
   * @param {object} user - Updated user object
   */
  const setUser = (user) => {
    setAuthState(prev => ({
      ...prev,
      user
    }));
  };

  /**
   * Refresh user profile
   * Fetches latest user data from API
   */
  const refreshUser = async () => {
    if (authState.token) {
      const result = await authService.getProfile();
      if (result.success) {
        setUser(result.data.user);
      }
    }
  };

  // Context value
  const value = {
    // State
    token: authState.token,
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    isLoading: authState.isLoading,
    
    // Functions
    login,
    logout,
    setUser,
    refreshUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;