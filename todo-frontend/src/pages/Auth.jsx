import { useState, useEffect } from 'react';
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
  const { login, isAuthenticated, isLoading: authLoading } = useAuth();
  const { showSuccess, showError } = useToast();

  // Redirect authenticated users to todos page
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      window.location.href = '/todos';
    }
  }, [isAuthenticated, authLoading]);
  
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
    confirmPassword: '',
    profilePic: null
  });
  
  // Preview URL for profile picture
  const [previewUrl, setPreviewUrl] = useState(null);
  
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

  // Handle profile picture selection
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors({ ...errors, profilePic: 'Please select an image file' });
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, profilePic: 'Image size should be less than 5MB' });
        return;
      }
      
      setSignUpData({ ...signUpData, profilePic: file });
      setErrors({ ...errors, profilePic: null });
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
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
    
    // Add profile picture if selected
    if (signUpData.profilePic) {
      formData.append('profile_pic', signUpData.profilePic);
    }
    
    // Call authService
    const result = await authService.signup(formData);
    
    setIsLoading(false);
    
    if (result.success) {
      // Show success message and switch to sign in
      alert('Account created successfully! Please sign in.');
      setIsSignIn(true);
      setSignUpData({ username: '', email: '', password: '', confirmPassword: '', profilePic: null });
      setPreviewUrl(null);
    } else {
      setErrors({ general: result.error || 'Sign up failed' });
    }
  };

  // Show loading state while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If authenticated, don't render auth form (redirect will happen)
  if (isAuthenticated) {
    return null;
  }

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
                
                {/* Profile Picture Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profile Picture (Optional)
                  </label>
                  <div className="flex items-center gap-4">
                    {/* Preview */}
                    {previewUrl && (
                      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300">
                        <img
                          src={previewUrl}
                          alt="Profile preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    {/* File Input */}
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePicChange}
                        className="block w-full text-sm text-gray-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-full file:border-0
                          file:text-sm file:font-semibold
                          file:bg-blue-50 file:text-blue-700
                          hover:file:bg-blue-100
                          cursor-pointer"
                      />
                      {errors.profilePic && (
                        <p className="mt-1 text-sm text-red-600">{errors.profilePic}</p>
                      )}
                      <p className="mt-1 text-xs text-gray-500">
                        PNG, JPG, GIF up to 5MB
                      </p>
                    </div>
                  </div>
                </div>
                
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