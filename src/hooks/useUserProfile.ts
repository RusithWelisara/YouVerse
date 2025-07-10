/**
 * Custom Hook for User Profile Management
 * Provides a clean interface for profile operations with advanced features
 */

import { useCallback, useEffect, useRef } from 'react';
import { useUser } from '../context/UserContext';
import { UserProfile, UseUserProfileReturn } from '../types/user';
import { showNotification } from '../utils/notifications';

interface UseUserProfileOptions {
  autoSync?: boolean;
  syncInterval?: number;
  onSyncSuccess?: (profile: UserProfile) => void;
  onSyncError?: (error: string) => void;
  onUpdateSuccess?: (profile: UserProfile) => void;
  onUpdateError?: (error: string) => void;
}

/**
 * Enhanced user profile hook with advanced features
 */
export function useUserProfile(options: UseUserProfileOptions = {}): UseUserProfileReturn {
  const {
    autoSync = true,
    syncInterval = 5 * 60 * 1000, // 5 minutes
    onSyncSuccess,
    onSyncError,
    onUpdateSuccess,
    onUpdateError,
  } = options;

  const {
    profile,
    isLoading,
    isUpdating,
    error,
    syncStatus,
    lastSyncAt,
    syncProfile: contextSyncProfile,
    updateProfile: contextUpdateProfile,
    clearError,
  } = useUser();

  const syncIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastSyncRef = useRef<string | null>(lastSyncAt);

  /**
   * Enhanced sync profile with callbacks
   */
  const syncProfile = useCallback(async (): Promise<void> => {
    try {
      await contextSyncProfile();
      
      if (profile && onSyncSuccess) {
        onSyncSuccess(profile);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Sync failed';
      
      if (onSyncError) {
        onSyncError(errorMessage);
      }
    }
  }, [contextSyncProfile, profile, onSyncSuccess, onSyncError]);

  /**
   * Enhanced update profile with callbacks and optimistic updates
   */
  const updateProfile = useCallback(async (updates: Partial<UserProfile>): Promise<void> => {
    try {
      await contextUpdateProfile(updates);
      
      if (profile && onUpdateSuccess) {
        onUpdateSuccess({ ...profile, ...updates });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Update failed';
      
      if (onUpdateError) {
        onUpdateError(errorMessage);
      }
    }
  }, [contextUpdateProfile, profile, onUpdateSuccess, onUpdateError]);

  /**
   * Setup automatic sync interval
   */
  useEffect(() => {
    if (!autoSync || !profile) return;

    // Clear existing interval
    if (syncIntervalRef.current) {
      clearInterval(syncIntervalRef.current);
    }

    // Setup new interval
    syncIntervalRef.current = setInterval(() => {
      if (document.visibilityState === 'visible') {
        syncProfile();
      }
    }, syncInterval);

    return () => {
      if (syncIntervalRef.current) {
        clearInterval(syncIntervalRef.current);
      }
    };
  }, [autoSync, profile, syncProfile, syncInterval]);

  /**
   * Handle visibility change for smart syncing
   */
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && profile) {
        const now = Date.now();
        const lastSync = lastSyncRef.current ? new Date(lastSyncRef.current).getTime() : 0;
        
        // Sync if more than 2 minutes since last sync
        if (now - lastSync > 2 * 60 * 1000) {
          syncProfile();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [profile, syncProfile]);

  /**
   * Update last sync reference
   */
  useEffect(() => {
    lastSyncRef.current = lastSyncAt;
  }, [lastSyncAt]);

  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    return () => {
      if (syncIntervalRef.current) {
        clearInterval(syncIntervalRef.current);
      }
    };
  }, []);

  return {
    profile,
    isLoading,
    isUpdating,
    error,
    syncProfile,
    updateProfile,
    clearError,
    lastSyncAt,
    syncStatus,
  };
}

/**
 * Simplified hook for basic profile operations
 */
export function useUserProfileSimple(): Pick<UseUserProfileReturn, 'profile' | 'isLoading' | 'syncProfile' | 'updateProfile'> {
  const { profile, isLoading, syncProfile, updateProfile } = useUserProfile({
    autoSync: false,
  });

  return {
    profile,
    isLoading,
    syncProfile,
    updateProfile,
  };
}

export default useUserProfile;