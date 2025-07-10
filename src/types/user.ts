/**
 * User Profile Type Definitions
 * Comprehensive type safety for user data management
 */

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  bio?: string;
  preferences: UserPreferences;
  subscription: SubscriptionInfo;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  isEmailVerified: boolean;
  isActive: boolean;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
  notifications: NotificationSettings;
  privacy: PrivacySettings;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  marketing: boolean;
  security: boolean;
}

export interface PrivacySettings {
  profileVisibility: 'public' | 'private' | 'friends';
  showEmail: boolean;
  showPhone: boolean;
  allowDataCollection: boolean;
}

export interface SubscriptionInfo {
  plan: 'free' | 'premium' | 'enterprise';
  status: 'active' | 'inactive' | 'cancelled' | 'expired';
  expiresAt?: string;
  features: string[];
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: ApiError[];
  meta?: {
    timestamp: string;
    requestId: string;
    version: string;
  };
}

export interface ApiError {
  code: string;
  message: string;
  field?: string;
  details?: Record<string, any>;
}

// State Management Types
export interface UserState {
  profile: UserProfile | null;
  isLoading: boolean;
  isUpdating: boolean;
  lastSyncAt: string | null;
  error: string | null;
  syncStatus: 'idle' | 'syncing' | 'success' | 'error';
}

// Hook Return Types
export interface UseUserProfileReturn {
  profile: UserProfile | null;
  isLoading: boolean;
  isUpdating: boolean;
  error: string | null;
  syncProfile: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  clearError: () => void;
  lastSyncAt: string | null;
  syncStatus: UserState['syncStatus'];
}

// API Configuration Types
export interface ApiConfig {
  baseUrl: string;
  timeout: number;
  retryAttempts: number;
  retryDelay: number;
}

export interface AuthHeaders {
  Authorization: string;
  'Content-Type': string;
  'X-API-Version': string;
  'X-Client-Version': string;
}