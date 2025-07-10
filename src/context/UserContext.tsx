/**
 * User Context Provider
 * Global state management for user profile data
 */

import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { UserProfile, UserState } from '../types/user';
import apiService from '../services/api';
import { showNotification } from '../utils/notifications';

// Action Types
type UserAction =
  | { type: 'SYNC_START' }
  | { type: 'SYNC_SUCCESS'; payload: UserProfile }
  | { type: 'SYNC_ERROR'; payload: string }
  | { type: 'UPDATE_START' }
  | { type: 'UPDATE_SUCCESS'; payload: UserProfile }
  | { type: 'UPDATE_ERROR'; payload: string }
  | { type: 'CLEAR_ERROR' }
  | { type: 'SET_PROFILE'; payload: UserProfile | null };

// Initial State
const initialState: UserState = {
  profile: null,
  isLoading: false,
  isUpdating: false,
  lastSyncAt: null,
  error: null,
  syncStatus: 'idle',
};

// Reducer Function
function userReducer(state: UserState, action: UserAction): UserState {
  switch (action.type) {
    case 'SYNC_START':
      return {
        ...state,
        isLoading: true,
        error: null,
        syncStatus: 'syncing',
      };

    case 'SYNC_SUCCESS':
      return {
        ...state,
        profile: action.payload,
        isLoading: false,
        error: null,
        syncStatus: 'success',
        lastSyncAt: new Date().toISOString(),
      };

    case 'SYNC_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        syncStatus: 'error',
      };

    case 'UPDATE_START':
      return {
        ...state,
        isUpdating: true,
        error: null,
      };

    case 'UPDATE_SUCCESS':
      return {
        ...state,
        profile: action.payload,
        isUpdating: false,
        error: null,
        lastSyncAt: new Date().toISOString(),
      };

    case 'UPDATE_ERROR':
      return {
        ...state,
        isUpdating: false,
        error: action.payload,
      };

    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
        syncStatus: state.syncStatus === 'error' ? 'idle' : state.syncStatus,
      };

    case 'SET_PROFILE':
      return {
        ...state,
        profile: action.payload,
      };

    default:
      return state;
  }
}

// Context Type
interface UserContextType extends UserState {
  syncProfile: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  clearError: () => void;
  logout: () => void;
}

// Create Context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider Props
interface UserProviderProps {
  children: React.ReactNode;
}

/**
 * User Context Provider Component
 */
export function UserProvider({ children }: UserProviderProps): JSX.Element {
  const [state, dispatch] = useReducer(userReducer, initialState);

  /**
   * Sync user profile from backend
   */
  const syncProfile = useCallback(async (): Promise<void> => {
    try {
      dispatch({ type: 'SYNC_START' });

      const profile = await apiService.fetchUserProfile();
      
      dispatch({ type: 'SYNC_SUCCESS', payload: profile });
      
      showNotification('Profile synchronized successfully', 'success');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to sync profile';
      
      dispatch({ type: 'SYNC_ERROR', payload: errorMessage });
      
      showNotification(errorMessage, 'error');
      
      console.error('Profile sync failed:', error);
    }
  }, []);

  /**
   * Update user profile
   */
  const updateProfile = useCallback(async (updates: Partial<UserProfile>): Promise<void> => {
    try {
      dispatch({ type: 'UPDATE_START' });

      const updatedProfile = await apiService.updateUserProfile(updates);
      
      dispatch({ type: 'UPDATE_SUCCESS', payload: updatedProfile });
      
      showNotification('Profile updated successfully', 'success');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update profile';
      
      dispatch({ type: 'UPDATE_ERROR', payload: errorMessage });
      
      showNotification(errorMessage, 'error');
      
      console.error('Profile update failed:', error);
    }
  }, []);

  /**
   * Clear error state
   */
  const clearError = useCallback((): void => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  /**
   * Logout user and clear data
   */
  const logout = useCallback((): void => {
    apiService.clearAuthToken();
    dispatch({ type: 'SET_PROFILE', payload: null });
    showNotification('Logged out successfully', 'info');
  }, []);

  /**
   * Auto-sync profile on mount and token changes
   */
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token && !state.profile) {
      syncProfile();
    }
  }, [syncProfile, state.profile]);

  /**
   * Periodic sync every 5 minutes when user is active
   */
  useEffect(() => {
    if (!state.profile) return;

    const interval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        syncProfile();
      }
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [syncProfile, state.profile]);

  const contextValue: UserContextType = {
    ...state,
    syncProfile,
    updateProfile,
    clearError,
    logout,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}

/**
 * Custom hook to use User Context
 */
export function useUser(): UserContextType {
  const context = useContext(UserContext);
  
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  
  return context;
}

export default UserContext;