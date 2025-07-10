
'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useUser } from '../../hooks/useUser'
import LoadingSpinner from '../LoadingSpinner'

export const AuthButton = () => {
  const { user, clearUserData } = useUser()
  const [loading, setLoading] = useState(false)

  const handleSignIn = async () => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })
      if (error) console.error('Sign in error:', error)
    } catch (error) {
      console.error('Unexpected sign in error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signOut()
      if (error) console.error('Sign out error:', error)
      clearUserData()
    } catch (error) {
      console.error('Unexpected sign out error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <button disabled className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-500 rounded">
        <LoadingSpinner size="sm" />
        <span>Loading...</span>
      </button>
    )
  }

  if (user) {
    return (
      <button 
        onClick={handleSignOut}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
      >
        Sign Out
      </button>
    )
  }

  return (
    <button 
      onClick={handleSignIn}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
    >
      Sign In
    </button>
  )
}

export default AuthButton
