import { useState } from 'react';
import { Button } from './ui';
import { useAuth } from '../context/AuthContext';
import Link from './Link';
import { navigate } from '../utils/navigation';

/**
 * Navbar Component
 *
 * Navigation bar with logo, links, and user dropdown menu.
 * Shows different links based on authentication status.
 * Uses AuthContext for global auth state.
 */

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Toggle dropdown menu
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  const handleBlur = () => {
    setTimeout(() => setIsDropdownOpen(false), 200);
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Left Side - Logo/Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-blue-600 text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xl">
                T
              </div>
              <span className="text-xl font-bold text-gray-900">TodoApp</span>
            </Link>
          </div>

          {/* Right Side - Navigation Links */}
          <div className="flex items-center space-x-6">
            
            {/* Home Link */}
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Home
            </Link>

            {/* Conditional Links based on Authentication */}
            {isAuthenticated ? (
              <>
                {/* Todos Link (only when logged in) */}
                <Link
                  to="/todos"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Todos
                </Link>

                {/* User Dropdown */}
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    onBlur={handleBlur}
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium transition-colors focus:outline-none"
                  >
                    {/* User Avatar */}
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                      {user?.username?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    
                    {/* Username */}
                    <span>{user?.username || 'User'}</span>
                    
                    {/* Dropdown Arrow */}
                    <svg 
                      className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1"
                      onMouseDown={(e) => e.preventDefault()} // Prevent blur when clicking inside dropdown
                    >
                      {/* Profile Link */}
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <div className="flex items-center space-x-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span>Profile</span>
                        </div>
                      </Link>

                      {/* Divider */}
                      <div className="border-t border-gray-200 my-1"></div>

                      {/* Logout Button */}
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <div className="flex items-center space-x-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          <span>Logout</span>
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Sign In Link (only when not logged in) */}
                <Link
                  to="/auth"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;