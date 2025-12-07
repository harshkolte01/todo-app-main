import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute Component
 * 
 * A wrapper component that protects routes from unauthorized access.
 * 
 * How it works:
 * 1. Checks if user is authenticated using AuthContext
 * 2. If authenticated → renders the children (the protected page)
 * 3. If not authenticated → redirects to /auth page
 * 4. Shows loading state while checking authentication
 * 
 * Usage:
 * <ProtectedRoute>
 *   <Todos />
 * </ProtectedRoute>
 */

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    // If not loading and not authenticated, redirect to auth page
    if (!isLoading && !isAuthenticated) {
      window.location.href = '/auth';
    }
  }, [isAuthenticated, isLoading]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, don't render anything (redirect will happen)
  if (!isAuthenticated) {
    return null;
  }

  // If authenticated, render the protected content
  return children;
};

export default ProtectedRoute;