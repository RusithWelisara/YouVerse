
'use client'

import { useUser } from '../hooks/useUser'
import LoadingSpinner from './LoadingSpinner'

export const SyncStatus = () => {
  const { isLoading, isHydrated } = useUser()

  if (!isHydrated) {
    return (
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <LoadingSpinner size="sm" />
        <span>Syncing your Dupliverse...</span>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2 text-sm text-blue-600">
        <LoadingSpinner size="sm" />
        <span>Updating...</span>
      </div>
    )
  }

  return null
}

export default SyncStatus
