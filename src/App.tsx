/**
 * Main App Component
 * Demonstrates the user profile synchronization system
 */

import React, { useEffect } from 'react';
import { UserProvider } from './context/UserContext';
import UserProfile from './components/UserProfile';
import ErrorBoundary from './components/ErrorBoundary';
import { showNotification } from './utils/notifications';
import apiService from './services/api';

function App(): JSX.Element {
  useEffect(() => {
    // Set auth token (in real app, this would come from login)
    const token = process.env.REACT_APP_AUTH_TOKEN || 'demo-token-123';
    apiService.setAuthToken(token);

    // Show welcome notification
    showNotification('Welcome to DupliVerse Profile Management!', 'info');
  }, []);

  return (
    <ErrorBoundary>
      <UserProvider>
        <div className="min-h-screen bg-gray-50">
          {/* Header */}
          <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <h1 className="text-2xl font-bold text-gray-900">
                    DupliVerse
                  </h1>
                  <span className="ml-2 text-sm text-gray-500">
                    Profile Management
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="space-y-8">
              {/* Page Title */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  User Profile
                </h2>
                <p className="mt-2 text-gray-600">
                  Manage your profile information with real-time synchronization
                </p>
              </div>

              {/* Profile Component */}
              <UserProfile 
                className="max-w-4xl"
                showSyncButton={true}
                autoSync={true}
              />

              {/* Feature Information */}
              <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Features Demonstrated
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-800">✅ API Integration</h4>
                    <p className="text-sm text-gray-600">
                      RESTful API calls with proper authentication headers
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-800">✅ State Management</h4>
                    <p className="text-sm text-gray-600">
                      React Context with useReducer for global state
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-800">✅ Error Handling</h4>
                    <p className="text-sm text-gray-600">
                      Comprehensive error boundaries and user feedback
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-800">✅ TypeScript</h4>
                    <p className="text-sm text-gray-600">
                      Full type safety with comprehensive interfaces
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-800">✅ Auto-Sync</h4>
                    <p className="text-sm text-gray-600">
                      Automatic synchronization with smart intervals
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-800">✅ Loading States</h4>
                    <p className="text-sm text-gray-600">
                      Beautiful loading indicators and status feedback
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </UserProvider>
    </ErrorBoundary>
  );
}

export default App;