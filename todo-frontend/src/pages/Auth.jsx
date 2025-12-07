import { useState } from 'react';
import { Button, Input } from '../components/ui';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import authService from '../services/authService';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

/**
 * Auth Page
 * 
 * Combined Sign In and Sign Up page with toggle between forms.
 * Users can switch between signin and signup without changing pages.
 */

const Auth = () => {
  const { login } = useAuth();
  const { showSuccess, showError } = useToast();
  
  // Toggle between signin and signup
  const [isSignIn, setIsSignIn] = useState(true);
  
  // Form states for Sign In
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });
  
  // Form states for Sign Up
  const [signUpData, setSignUpData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  // Error states
  const [errors, setErrors] = useState({});
  
  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Handle Sign In form submission
  const handleSignIn = async (e) => {
    e.preventDefault();
    setErrors({});
    
    // Basic validation
    const newErrors = {};
    if (!signInData.email) newErrors.email = 'Email is required';
    if (!signInData.password) newErrors.password = 'Password is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    
    // Call authService
    const result = await authService.signin({
      email: signInData.email,
      password: signInData.password
    });
    
    setIsLoading(false);
    
    if (result.success) {
      // Get user profile
      const profileResult = await authService.getProfile();
      
      if (profileResult.success) {
        // Update auth context
        login(result.data.token, profileResult.data.user);
        // Redirect to todos page
        window.location.href = '/todos';
      } else {
        setErrors({ general: 'Failed to load profile' });
      }
    } else {
      setErrors({ general: result.error || 'Sign in failed' });
    }
  };

  // Handle Sign Up form submission
  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrors({});
    
    // Basic validation
    const newErrors = {};
    if (!signUpData.username) newErrors.username = 'Username is required';
    if (!signUpData.email) newErrors.email = 'Email is required';
    if (!signUpData.password) newErrors.password = 'Password is required';
    if (signUpData.password !== signUpData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (signUpData.password && signUpData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    
    // Prepare form data
    const formData = new FormData();
    formData.append('username', signUpData.username);
    formData.append('email', signUpData.email);
    formData.append('password', signUpData.password);
    
    // Call authService
    const result = await authService.signup(formData);
    
    setIsLoading(false);
    
    if (result.success) {
      // Show success message and switch to sign in
      alert('Account created successfully! Please sign in.');
      setIsSignIn(true);
      setSignUpData({ username: '', email: '', password: '', confirmPassword: '' });
    } else {
      setErrors({ general: result.error || 'Sign up failed' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Auth Form Container */}
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          
          {/* Card */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            
            {/* Header with Toggle */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {isSignIn ? 'Welcome Back!' : 'Create Account'}
              </h2>
              <p className="text-gray-600">
                {isSignIn 
                  ? 'Sign in to access your todos' 
                  : 'Sign up to start organizing your tasks'
                }
              </p>
            </div>

            {/* Toggle Buttons */}
            <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => {
                  setIsSignIn(true);
                  setErrors({});
                }}
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                  isSignIn 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setIsSignIn(false);
                  setErrors({});
                }}
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                  !isSignIn 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* General Error Message */}
            {errors.general && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{errors.general}</p>
              </div>
            )}

            {/* Sign In Form */}
            {isSignIn ? (
              <form onSubmit={handleSignIn} className="space-y-4">
                <Input
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  value={signInData.email}
                  onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                  error={errors.email}
                  required
                />
                
                <Input
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  value={signInData.password}
                  onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                  error={errors.password}
                  required
                />
                
                <Button 
                  type="submit" 
                  variant="primary" 
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>
            ) : (
              /* Sign Up Form */
              <form onSubmit={handleSignUp} className="space-y-4">
                <Input
                  label="Username"
                  type="text"
                  placeholder="Choose a username"
                  value={signUpData.username}
                  onChange={(e) => setSignUpData({ ...signUpData, username: e.target.value })}
                  error={errors.username}
                  required
                />
                
                <Input
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  value={signUpData.email}
                  onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                  error={errors.email}
                  required
                />
                
                <Input
                  label="Password"
                  type="password"
                  placeholder="Create a password (min 6 characters)"
                  value={signUpData.password}
                  onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                  error={errors.password}
                  required
                />
                
                <Input
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm your password"
                  value={signUpData.confirmPassword}
                  onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
                  error={errors.confirmPassword}
                  required
                />
                
                <Button 
                  type="submit" 
                  variant="primary" 
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? 'Creating Account...' : 'Sign Up'}
                </Button>
              </form>
            )}

            {/* Additional Info */}
            <div className="mt-6 text-center text-sm text-gray-600">
              {isSignIn ? (
                <p>
                  Don't have an account?{' '}
                  <button
                    onClick={() => setIsSignIn(false)}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Sign up here
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{' '}
                  <button
                    onClick={() => setIsSignIn(true)}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Sign in here
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Auth;