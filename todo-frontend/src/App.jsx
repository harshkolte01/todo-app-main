import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Todos from './pages/Todos';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import { useToast } from './context/ToastContext';
import { setToastHandler } from './services/apiClient';

/**
 * Main App Component
 * 
 * Simple routing based on URL path.
 * In a real app, you would use React Router, but this is a beginner-friendly approach.
 */

function App() {
  const toast = useToast();
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Initialize toast handler for apiClient
  useEffect(() => {
    setToastHandler(toast);
  }, [toast]);

  // Listen for URL changes
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    // Listen for popstate (back/forward buttons)
    window.addEventListener('popstate', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  // Simple routing logic with protected routes
  const renderPage = () => {
    switch (currentPath) {
      case '/':
        return <Home />;
      case '/auth':
        return <Auth />;
      case '/todos':
        return (
          <ProtectedRoute>
            <Todos />
          </ProtectedRoute>
        );
      case '/profile':
        return (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        );
      default:
        return <Home />;
    }
  };

  return renderPage();
}

export default App;
