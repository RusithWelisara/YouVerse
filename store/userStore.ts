
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { supabase } from '../lib/supabase'
import { UserStore, Profile } from '../types/supabase'

const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set, get) => ({
        // State
        user: null,
        profile: null,
        isLoading: false,
        isHydrated: false,

        // Actions
        setUser: (user) => {
          set({ user }, false, 'setUser')
        },

        setProfile: (profile) => {
          set({ profile }, false, 'setProfile')
        },

        setLoading: (isLoading) => {
          set({ isLoading }, false, 'setLoading')
        },

        setHydrated: (isHydrated) => {
          set({ isHydrated }, false, 'setHydrated')
        },

        fetchProfile: async () => {
          const { user } = get()
          if (!user?.id) return

          try {
            set({ isLoading: true })

            const { data, error } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', user.id)
              .single()

            if (error) {
              if (error.code === 'PGRST116') {
                // Profile doesn't exist, create one
                const newProfile = {
                  id: user.id,
                  username: user.email?.split('@')[0] || null,
                  wallet_balance: 0,
                  preferences: {}
                }

                const { data: createdProfile, error: createError } = await supabase
                  .from('profiles')
                  .insert(newProfile)
                  .select()
                  .single()

                if (createError) {
                  console.error('Error creating profile:', createError)
                  return
                }

                set({ profile: createdProfile })
              } else {
                console.error('Error fetching profile:', error)
              }
            } else {
              set({ profile: data })
            }
          } catch (error) {
            console.error('Unexpected error fetching profile:', error)
          } finally {
            set({ isLoading: false })
          }
        },

        updateProfile: async (updates) => {
          const { user, profile } = get()
          if (!user?.id || !profile) return

          try {
            set({ isLoading: true })

            // Optimistic update
            const optimisticProfile = { ...profile, ...updates }
            set({ profile: optimisticProfile })

            const { data, error } = await supabase
              .from('profiles')
              .update(updates)
              .eq('id', user.id)
              .select()
              .single()

            if (error) {
              // Revert optimistic update on error
              set({ profile })
              console.error('Error updating profile:', error)
              throw error
            } else {
              set({ profile: data })
            }
          } catch (error) {
            console.error('Unexpected error updating profile:', error)
            throw error
          } finally {
            set({ isLoading: false })
          }
        },

        clearUserData: () => {
          set({
            user: null,
            profile: null,
            isLoading: false,
            isHydrated: false
          }, false, 'clearUserData')
        }
      }),
      {
        name: 'dupliverse-user-store',
        partialize: (state) => ({
          // Only persist user and profile, not loading states
          user: state.user,
          profile: state.profile
        })
      }
    ),
    {
      name: 'user-store'
    }
  )
)

export default useUserStore
