"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface UserProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  dateOfBirth?: string
  preferences: {
    newsletter?: boolean
    smsNotifications?: boolean
    emailNotifications?: boolean
    categories?: string[]
    notifications?: boolean
    language?: "en" | "fr"
  }
}

interface UserState {
  isLoggedIn: boolean
  profile: UserProfile | null

  login: (profile: UserProfile) => void
  logout: () => void
  updateProfile: (updates: Partial<UserProfile>) => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      profile: null,

      login: (profile) => set({ isLoggedIn: true, profile }),

      logout: () => set({ isLoggedIn: false, profile: null }),

      updateProfile: (updates) =>
        set((state) => ({
          profile: state.profile ? { ...state.profile, ...updates } : null,
        })),
    }),
    {
      name: "user-storage",
    },
  ),
)
