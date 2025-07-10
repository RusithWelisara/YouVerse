/**
 * API Service Layer
 * Handles all HTTP requests with proper error handling and authentication
 */

import { UserProfile, ApiResponse, ApiError, ApiConfig, AuthHeaders } from '../types/user';

class ApiService {
  private config: ApiConfig;
  private authToken: string | null = null;

  constructor(config: ApiConfig) {
    this.config = config;
    this.authToken = this.getStoredToken();
  }

  /**
   * Get authentication token from localStorage
   */
  private getStoredToken(): string | null {
    try {
      return localStorage.getItem('auth_token');
    } catch (error) {
      console.warn('Failed to retrieve auth token from localStorage:', error);
      return null;
    }
  }

  /**
   * Set authentication token
   */
  public setAuthToken(token: string): void {
    this.authToken = token;
    try {
      localStorage.setItem('auth_token', token);
    } catch (error) {
      console.warn('Failed to store auth token in localStorage:', error);
    }
  }

  /**
   * Clear authentication token
   */
  public clearAuthToken(): void {
    this.authToken = null;
    try {
      localStorage.removeItem('auth_token');
    } catch (error) {
      console.warn('Failed to remove auth token from localStorage:', error);
    }
  }

  /**
   * Generate authentication headers
   */
  private getAuthHeaders(): AuthHeaders {
    if (!this.authToken) {
      throw new Error('Authentication token is required');
    }

    return {
      'Authorization': `Bearer ${this.authToken}`,
      'Content-Type': 'application/json',
      'X-API-Version': '1.0',
      'X-Client-Version': process.env.REACT_APP_VERSION || '1.0.0',
    };
  }

  /**
   * Generic HTTP request method with retry logic
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    attempt: number = 1
  ): Promise<ApiResponse<T>> {
    const url = `${this.config.baseUrl}${endpoint}`;
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.getAuthHeaders(),
          ...options.headers,
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Handle HTTP errors
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || 
          `HTTP ${response.status}: ${response.statusText}`
        );
      }

      const data: ApiResponse<T> = await response.json();
      
      // Validate API response structure
      if (typeof data.success !== 'boolean') {
        throw new Error('Invalid API response format');
      }

      return data;

    } catch (error) {
      // Handle network errors and timeouts
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request timeout - please check your connection');
        }
        
        // Retry logic for network errors
        if (attempt < this.config.retryAttempts && this.isRetryableError(error)) {
          console.warn(`Request failed (attempt ${attempt}), retrying...`, error.message);
          await this.delay(this.config.retryDelay * attempt);
          return this.request<T>(endpoint, options, attempt + 1);
        }
      }

      throw error;
    }
  }

  /**
   * Check if error is retryable
   */
  private isRetryableError(error: Error): boolean {
    const retryableMessages = [
      'fetch',
      'network',
      'timeout',
      'connection',
      'ECONNRESET',
      'ENOTFOUND',
      'ECONNREFUSED'
    ];
    
    return retryableMessages.some(msg => 
      error.message.toLowerCase().includes(msg.toLowerCase())
    );
  }

  /**
   * Delay utility for retry logic
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Fetch user profile from API
   */
  public async fetchUserProfile(): Promise<UserProfile> {
    try {
      const response = await this.request<UserProfile>('/api/user/profile', {
        method: 'GET',
      });

      if (!response.success || !response.data) {
        throw new Error(response.message || 'Failed to fetch user profile');
      }

      return response.data;
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      throw new Error(
        error instanceof Error 
          ? error.message 
          : 'An unexpected error occurred while fetching profile'
      );
    }
  }

  /**
   * Update user profile via API
   */
  public async updateUserProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
    try {
      const response = await this.request<UserProfile>('/api/user/profile', {
        method: 'PATCH',
        body: JSON.stringify(updates),
      });

      if (!response.success || !response.data) {
        throw new Error(response.message || 'Failed to update user profile');
      }

      return response.data;
    } catch (error) {
      console.error('Failed to update user profile:', error);
      throw new Error(
        error instanceof Error 
          ? error.message 
          : 'An unexpected error occurred while updating profile'
      );
    }
  }

  /**
   * Health check endpoint
   */
  public async healthCheck(): Promise<boolean> {
    try {
      const response = await this.request<{ status: string }>('/api/health', {
        method: 'GET',
      });
      return response.success && response.data.status === 'ok';
    } catch (error) {
      console.warn('API health check failed:', error);
      return false;
    }
  }
}

// Create and export API service instance
export const apiService = new ApiService({
  baseUrl: process.env.REACT_APP_API_URL || 'https://api.dupliverse.com',
  timeout: 30000, // 30 seconds
  retryAttempts: 3,
  retryDelay: 1000, // 1 second base delay
});

export default apiService;