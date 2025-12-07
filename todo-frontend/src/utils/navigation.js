/**
 * Simple Navigation Utility
 * 
 * Provides client-side navigation without full page reloads.
 * This is a beginner-friendly alternative to React Router.
 * 
 * Usage:
 * import { navigate } from './utils/navigation';
 * navigate('/todos');
 */

/**
 * Navigate to a new route without page reload
 * @param {string} path - The path to navigate to (e.g., '/todos')
 */
export const navigate = (path) => {
  // Update browser history
  window.history.pushState({}, '', path);
  
  // Dispatch custom event to notify App component
  window.dispatchEvent(new PopStateEvent('popstate'));
};

/**
 * Replace current route without adding to history
 * @param {string} path - The path to replace with
 */
export const replace = (path) => {
  window.history.replaceState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
};

/**
 * Go back in history
 */
export const goBack = () => {
  window.history.back();
};

/**
 * Go forward in history
 */
export const goForward = () => {
  window.history.forward();
};

/**
 * Get current path
 */
export const getCurrentPath = () => {
  return window.location.pathname;
};

export default {
  navigate,
  replace,
  goBack,
  goForward,
  getCurrentPath
};