import { useState, useEffect } from 'react';
import { Button, Input } from '../components/ui';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import authService from '../services/authService';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

/**
 * Profile Page
 * 
 * User profile page where users can view and update their information.
 * Features: View profile, update username, update profile picture, delete account.
 */

const Profile = () => {
  const { user, isAuthenticated, setUser: updateUser, logout: authLogout, refreshUser } = useAuth();
  const { showSuccess, showError } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  // Edit mode state
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    username: ''
  });
  
  // Profile picture state
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  
  // Error and success messages
  const [message, setMessage] = useState({ type: '', text: '' });

  // Set edit data when user is available
  useEffect(() => {
    if (user) {
      setEditData({ username: user.username });
    }
  }, [user]);

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Update profile
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    const formData = new FormData();
    formData.append('username', editData.username);
    if (selectedFile) {
      formData.append('profile_pic', selectedFile);
    }

    const result = await authService.updateProfile(formData);

    if (result.success) {
      updateUser(result.data.user);
      setIsEditing(false);
      setSelectedFile(null);
      setPreviewUrl(null);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      showSuccess('Profile updated successfully!');
    } else {
      setMessage({ type: 'error', text: result.error || 'Failed to update profile' });
      showError(result.error || 'Failed to update profile');
    }
  };

  // Delete account
  const handleDeleteAccount = async () => {
    if (!confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }

    const result = await authService.deleteAccount();

    if (result.success) {
      showSuccess('Account deleted successfully. Redirecting...');
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    } else {
      setMessage({ type: 'error', text: result.error || 'Failed to delete account' });
      showError(result.error || 'Failed to delete account');
    }
  };

  // Handle logout
  const handleLogout = () => {
    authLogout();
    window.location.href = '/';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-1">Manage your account information</p>
        </div>

        {/* Message Display */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-50 border border-green-200 text-green-800' 
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            {message.text}
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          
          {/* Profile Picture Section */}
          <div className="flex items-center space-x-6 mb-6 pb-6 border-b border-gray-200">
            <div className="relative">
              {/* Display current or preview image */}
              {previewUrl || user?.profile_pic ? (
                <img 
                  src={previewUrl || user.profile_pic} 
                  alt="Profile" 
                  className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
                />
              ) : (
                <div className="w-24 h-24 bg-blue-600 text-white rounded-full flex items-center justify-center text-3xl font-bold">
                  {user?.username?.charAt(0).toUpperCase()}
                </div>
              )}
              
              {/* Edit badge */}
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 cursor-pointer hover:bg-blue-700 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">{user?.username}</h2>
              <p className="text-gray-600">{user?.email}</p>
              <p className="text-sm text-gray-500 mt-1">
                Member since {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })
                  : 'N/A'
                }
              </p>
            </div>

            {!isEditing && (
              <Button variant="primary" onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            )}
          </div>

          {/* Profile Form */}
          {isEditing ? (
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <Input
                label="Username"
                type="text"
                value={editData.username}
                onChange={(e) => setEditData({ ...editData, username: e.target.value })}
                required
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={user?.email}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
              </div>

              {selectedFile && (
                <div className="text-sm text-gray-600">
                  Selected file: {selectedFile.name}
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <Button type="submit" variant="primary">
                  Save Changes
                </Button>
                <Button 
                  type="button" 
                  variant="secondary" 
                  onClick={() => {
                    setIsEditing(false);
                    setEditData({ username: user.username });
                    setSelectedFile(null);
                    setPreviewUrl(null);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <p className="text-gray-900">{user?.username}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <p className="text-gray-900">{user?.email}</p>
              </div>
            </div>
          )}
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-lg shadow-md p-6 border-2 border-red-200">
          <h3 className="text-xl font-bold text-red-600 mb-2">Danger Zone</h3>
          <p className="text-gray-600 mb-4">
            Once you delete your account, there is no going back. All your todos will be permanently deleted.
          </p>
          <Button variant="danger" onClick={handleDeleteAccount}>
            Delete Account
          </Button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Profile;