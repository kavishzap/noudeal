"use client"

import { create } from "zustand"

export interface AttendeeInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  company?: string
  jobTitle?: string
}

export interface PaymentMethod {
  id: string
  type: "card" | "mcb-juice" | "myt-money"
}

interface CheckoutState {
  currentStep: number
  attendeeInfo: AttendeeInfo | null
  paymentMethod: PaymentMethod | null
  appliedCoupon: string | null
  lastOrderRef: string | null

  setStep: (step: number) => void
  setAttendeeInfo: (info: AttendeeInfo) => void
  setPaymentMethod: (method: PaymentMethod) => void
  applyCoupon: (code: string) => void
  removeCoupon: () => void
  setOrderRef: (ref: string) => void
  resetCheckout: () => void
}

export const useCheckoutStore = create<CheckoutState>((set) => ({
  currentStep: 1,
  attendeeInfo: null,
  paymentMethod: null,
  appliedCoupon: null,
  lastOrderRef: null,

  setStep: (step) => set({ currentStep: step }),

  setAttendeeInfo: (info) => set({ attendeeInfo: info }),

  setPaymentMethod: (method) => set({ paymentMethod: method }),

  applyCoupon: (code) => set({ appliedCoupon: code }),

  removeCoupon: () => set({ appliedCoupon: null }),

  setOrderRef: (ref) => set({ lastOrderRef: ref }),

  resetCheckout: () =>
    set({
      currentStep: 1,
      attendeeInfo: null,
      paymentMethod: null,
      appliedCoupon: null,
    }),
}))
