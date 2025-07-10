
import { useEffect } from 'react'
import useUserStore from '../store/userStore'
import { supabase } from '../lib/supabase'

export const useUser = () => {
  const store = useUserStore()

  useEffect(() => {
    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          store.setUser(session.user)
          await store.fetchProfile()
        } else if (event === 'SIGNED_OUT') {
          store.clearUserData()
        } else if (event === 'TOKEN_REFRESHED' && session?.user) {
          store.setUser(session.user)
          await store.fetchProfile()
        }
      }
    )

    // Initial session check
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session?.user) {
          store.setUser(session.user)
          await store.fetchProfile()
        }
      } catch (error) {
        console.error('Error checking session:', error)
      } finally {
        store.setHydrated(true)
      }
    }

    if (!store.isHydrated) {
      checkSession()
    }

    return () => {
      subscription.unsubscribe()
    }
  }, [store])

  // Auto-sync on visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && store.user) {
        store.fetchProfile()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [store])

  return {
    user: store.user,
    profile: store.profile,
    isLoading: store.isLoading,
    isHydrated: store.isHydrated,
    updateProfile: store.updateProfile,
    fetchProfile: store.fetchProfile,
    clearUserData: store.clearUserData
  }
}

// Simplified hook for components that only need user data
export const useUserData = () => {
  const { user, profile } = useUser()
  return { user, profile }
}

// Hook for wallet operations with debouncing
export const useWallet = () => {
  const { profile, updateProfile } = useUser()
  
  const updateWalletBalance = async (newBalance: number) => {
    await updateProfile({ wallet_balance: newBalance })
  }

  const addToWallet = async (amount: number) => {
    if (profile) {
      const newBalance = profile.wallet_balance + amount
      await updateWalletBalance(newBalance)
    }
  }

  const subtractFromWallet = async (amount: number) => {
    if (profile) {
      const newBalance = Math.max(0, profile.wallet_balance - amount)
      await updateWalletBalance(newBalance)
    }
  }

  return {
    balance: profile?.wallet_balance || 0,
    updateWalletBalance,
    addToWallet,
    subtractFromWallet
  }
}
