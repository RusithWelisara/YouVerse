
'use client'

import { useEffect, ReactNode } from 'react'
import { useUser } from '../hooks/useUser'

interface UserProviderProps {
  children: ReactNode
}

export const UserProvider = ({ children }: UserProviderProps) => {
  // Initialize user state
  useUser()

  return <>{children}</>
}

export default UserProvider
