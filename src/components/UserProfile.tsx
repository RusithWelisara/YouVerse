/**
 * User Profile Component
 * Displays and manages user profile data with sync functionality
 */

import React, { useState, useCallback } from 'react';
import { User, Settings, RefreshCw, Save, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { useUserProfile } from '../hooks/useUserProfile';
import { UserProfile as UserProfileType } from '../types/user';
import LoadingSpinner from './LoadingSpinner';
import ErrorBoundary from './ErrorBoundary';

interface UserProfileProps {
  className?: string;
  showSyncButton?: boolean;
  autoSync?: boolean;
}

/**
 * User Profile Component with sync functionality
 */
function UserProfile({ 
  className = '', 
  showSyncButton = true, 
  autoSync = true 
}: UserProfileProps): JSX.Element {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<UserProfileType>>({});

  const {
    profile,
    isLoading,
    isUpdating,
    error,
    syncProfile,
    updateProfile,
    clearError,
    lastSyncAt,
    syncStatus,
  } = useUserProfile({
    autoSync,
    onSyncSuccess: (profile) => {
      console.log('Profile synced successfully:', profile.email);
    },
    onSyncError: (error) => {
      console.error('Profile sync failed:', error);
    },
    onUpdateSuccess: (profile) => {
      setIsEditing(false);
      setEditForm({});
    },
  });

  /**
   * Handle sync button click
   */
  const handleSync = useCallback(async (): Promise<void> => {
    try {
      await syncProfile();
    } catch (error) {
      console.error('Manual sync failed:', error);
    }
  }, [syncProfile]);

  /**
   * Handle edit form submission
   */
  const handleSaveChanges = useCallback(async (): Promise<void> => {
    if (!editForm || Object.keys(editForm).length === 0) {
      setIsEditing(false);
      return;
    }

    try {
      await updateProfile(editForm);
    } catch (error) {
      console.error('Profile update failed:', error);
    }
  }, [editForm, updateProfile]);

  /**
   * Handle input changes in edit mode
   */
  const handleInputChange = useCallback((field: keyof UserProfileType, value: any): void => {
    setEditForm(prev => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  /**
   * Cancel editing
   */
  const handleCancelEdit = useCallback((): void => {
    setIsEditing(false);
    setEditForm({});
  }, []);

  /**
   * Start editing
   */
  const handleStartEdit = useCallback((): void => {
    if (profile) {
      setEditForm({
        firstName: profile.firstName,
        lastName: profile.lastName,
        bio: profile.bio,
        phoneNumber: profile.phoneNumber,
      });
      setIsEditing(true);
    }
  }, [profile]);

  /**
   * Format last sync time
   */
  const formatLastSync = useCallback((timestamp: string | null): string => {
    if (!timestamp) return 'Never';
    
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)} hours ago`;
    
    return date.toLocaleDateString();
  }, []);

  /**
   * Get sync status icon
   */
  const getSyncStatusIcon = useCallback(() => {
    switch (syncStatus) {
      case 'syncing':
        return <RefreshCw className="w-4 h-4 animate-spin text-blue-500" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  }, [syncStatus]);

  // Loading state
  if (isLoading && !profile) {
    return (
      <div className={`flex items-center justify-center p-8 ${className}`}>
        <LoadingSpinner size="lg" />
        <span className="ml-3 text-gray-600">Loading profile...</span>
      </div>
    );
  }

  // No profile state
  if (!profile && !isLoading) {
    return (
      <div className={`text-center p-8 ${className}`}>
        <User className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Profile Found</h3>
        <p className="text-gray-600 mb-4">Unable to load your profile data.</p>
        <button
          onClick={handleSync}
          className="btn btn-primary"
          disabled={isLoading}
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Retry
        </button>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className={`bg-white rounded-lg shadow-md ${className}`}>
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                {profile?.avatar ? (
                  <img
                    src={profile.avatar}
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <User className="w-6 h-6 text-white" />
                )}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {profile?.firstName} {profile?.lastName}
                </h2>
                <p className="text-sm text-gray-600">{profile?.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {/* Sync Status */}
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                {getSyncStatusIcon()}
                <span>Last sync: {formatLastSync(lastSyncAt)}</span>
              </div>

              {/* Sync Button */}
              {showSyncButton && (
                <button
                  onClick={handleSync}
                  disabled={isLoading || isUpdating}
                  className="btn btn-outline btn-sm"
                  title="Sync profile data"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                </button>
              )}

              {/* Edit Button */}
              <button
                onClick={isEditing ? handleCancelEdit : handleStartEdit}
                disabled={isLoading || isUpdating}
                className="btn btn-outline btn-sm"
              >
                {isEditing ? 'Cancel' : <Settings className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="px-6 py-3 bg-red-50 border-l-4 border-red-400">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
              <p className="text-sm text-red-700">{error}</p>
              <button
                onClick={clearError}
                className="ml-auto text-red-400 hover:text-red-600"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Profile Content */}
        <div className="px-6 py-4">
          {isEditing ? (
            /* Edit Mode */
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={editForm.firstName || ''}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={editForm.lastName || ''}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={editForm.phoneNumber || ''}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  value={editForm.bio || ''}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tell us about yourself..."
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={handleCancelEdit}
                  disabled={isUpdating}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveChanges}
                  disabled={isUpdating}
                  className="btn btn-primary"
                >
                  {isUpdating ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            /* View Mode */
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Contact Information
                  </h4>
                  <div className="mt-2 space-y-2">
                    <p className="text-sm">
                      <span className="font-medium">Email:</span> {profile?.email}
                    </p>
                    {profile?.phoneNumber && (
                      <p className="text-sm">
                        <span className="font-medium">Phone:</span> {profile.phoneNumber}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Account Status
                  </h4>
                  <div className="mt-2 space-y-2">
                    <p className="text-sm">
                      <span className="font-medium">Plan:</span>{' '}
                      <span className="capitalize">{profile?.subscription.plan}</span>
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Status:</span>{' '}
                      <span className={`capitalize ${
                        profile?.subscription.status === 'active' 
                          ? 'text-green-600' 
                          : 'text-red-600'
                      }`}>
                        {profile?.subscription.status}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {profile?.bio && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Bio
                  </h4>
                  <p className="mt-2 text-sm text-gray-700">{profile.bio}</p>
                </div>
              )}

              <div>
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  Account Details
                </h4>
                <div className="mt-2 text-sm text-gray-600">
                  <p>Member since: {new Date(profile?.createdAt || '').toLocaleDateString()}</p>
                  {profile?.lastLoginAt && (
                    <p>Last login: {new Date(profile.lastLoginAt).toLocaleDateString()}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default UserProfile;