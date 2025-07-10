
'use client'

import { useState } from 'react'
import { useUser } from '../hooks/useUser'

export const DebugProfile = () => {
  const { user, profile, isLoading, updateProfile } = useUser()
  const [testValue, setTestValue] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleTestUpdate = async () => {
    if (!testValue.trim()) return
    
    try {
      setError(null)
      setSuccess(false)
      
      await updateProfile({
        username: testValue,
        preferences: {
          ...profile?.preferences,
          lastTest: new Date().toISOString()
        }
      })
      
      setSuccess(true)
      setTestValue('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile')
    }
  }

  const handleTestWallet = async () => {
    try {
      setError(null)
      setSuccess(false)
      
      const newBalance = (profile?.wallet_balance || 0) + 10
      await updateProfile({
        wallet_balance: newBalance
      })
      
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update wallet')
    }
  }

  if (!user) {
    return (
      <div className="p-4 border border-red-200 rounded-lg bg-red-50">
        <p className="text-red-600">No authenticated user found</p>
      </div>
    )
  }

  return (
    <div className="p-6 border border-gray-200 rounded-lg bg-white space-y-4">
      <h3 className="text-lg font-semibold">Debug Profile Updates</h3>
      
      <div className="space-y-2">
        <p><strong>User ID:</strong> {user.id}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Profile Username:</strong> {profile?.username || 'None'}</p>
        <p><strong>Wallet Balance:</strong> ${profile?.wallet_balance || 0}</p>
        <p><strong>Loading:</strong> {isLoading ? 'Yes' : 'No'}</p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded text-red-600">
          <strong>Error:</strong> {error}
        </div>
      )}

      {success && (
        <div className="p-3 bg-green-50 border border-green-200 rounded text-green-600">
          Profile updated successfully!
        </div>
      )}

      <div className="space-y-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={testValue}
            onChange={(e) => setTestValue(e.target.value)}
            placeholder="Enter new username"
            className="px-3 py-2 border border-gray-300 rounded flex-1"
          />
          <button
            onClick={handleTestUpdate}
            disabled={isLoading || !testValue.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? 'Updating...' : 'Update Username'}
          </button>
        </div>

        <button
          onClick={handleTestWallet}
          disabled={isLoading}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          {isLoading ? 'Updating...' : 'Add $10 to Wallet'}
        </button>
      </div>
    </div>
  )
}

export default DebugProfile
