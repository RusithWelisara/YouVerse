
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          wallet_balance: number
          preferences: Record<string, any>
          created_at: string
        }
        Insert: {
          id: string
          username?: string | null
          wallet_balance?: number
          preferences?: Record<string, any>
          created_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          wallet_balance?: number
          preferences?: Record<string, any>
          created_at?: string
        }
      }
    }
  }
}

export type Profile = Database['public']['Tables']['profiles']['Row']

export interface UserState {
  user: any | null
  profile: Profile | null
  isLoading: boolean
  isHydrated: boolean
}

export interface UserActions {
  setUser: (user: any) => void
  setProfile: (profile: Profile | null) => void
  setLoading: (loading: boolean) => void
  setHydrated: (hydrated: boolean) => void
  updateProfile: (updates: Partial<Profile>) => Promise<void>
  clearUserData: () => void
  fetchProfile: () => Promise<void>
}

export type UserStore = UserState & UserActions
