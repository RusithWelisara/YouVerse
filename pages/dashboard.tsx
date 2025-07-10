
'use client'

import { useUser, useWallet } from '../hooks/useUser'
import AuthButton from '../components/auth/AuthButton'
import SyncStatus from '../components/SyncStatus'
import LoadingSpinner from '../components/LoadingSpinner'

export default function Dashboard() {
  const { user, profile, isLoading, isHydrated, updateProfile } = useUser()
  const { balance, addToWallet, subtractFromWallet } = useWallet()

  const handleUpdateUsername = async () => {
    const newUsername = prompt('Enter new username:', profile?.username || '')
    if (newUsername && newUsername !== profile?.username) {
      try {
        await updateProfile({ username: newUsername })
        alert('Username updated successfully!')
      } catch (error) {
        alert('Failed to update username')
      }
    }
  }

  const handleUpdatePreferences = async () => {
    const newTheme = profile?.preferences?.theme === 'dark' ? 'light' : 'dark'
    try {
      await updateProfile({ 
        preferences: { 
          ...profile?.preferences, 
          theme: newTheme 
        } 
      })
    } catch (error) {
      alert('Failed to update preferences')
    }
  }

  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Syncing your Dupliverse...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Welcome to Dupliverse</h1>
          <p className="mb-6 text-gray-600">Please sign in to access your dashboard</p>
          <AuthButton />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Dupliverse Dashboard</h1>
            <div className="flex items-center space-x-4">
              <SyncStatus />
              <AuthButton />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* User Info Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">User Profile</h3>
                {isLoading ? (
                  <LoadingSpinner />
                ) : (
                  <div className="space-y-3">
                    <p><strong>Email:</strong> {user?.email}</p>
                    <p><strong>Username:</strong> {profile?.username || 'Not set'}</p>
                    <p><strong>Joined:</strong> {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : 'Unknown'}</p>
                    <button 
                      onClick={handleUpdateUsername}
                      className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      Update Username
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Wallet Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Wallet</h3>
                <div className="space-y-3">
                  <p className="text-2xl font-bold text-green-600">${balance.toFixed(2)}</p>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => addToWallet(10)}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                    >
                      +$10
                    </button>
                    <button 
                      onClick={() => subtractFromWallet(5)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                    >
                      -$5
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Preferences Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Preferences</h3>
                <div className="space-y-3">
                  <p><strong>Theme:</strong> {profile?.preferences?.theme || 'light'}</p>
                  <button 
                    onClick={handleUpdatePreferences}
                    className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                  >
                    Toggle Theme
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}
