"use client"

import { create } from "zustand"
import type { Event } from "@/data/events"

export interface OrganizerEvent extends Omit<Event, "id"> {
  id?: string
  status: "draft" | "published" | "cancelled"
  createdAt: string
  updatedAt: string
}

interface OrganizerState {
  events: OrganizerEvent[]
  currentEvent: OrganizerEvent | null

  createEvent: (event: Omit<OrganizerEvent, "id" | "createdAt" | "updatedAt">) => void
  updateEvent: (id: string, updates: Partial<OrganizerEvent>) => void
  deleteEvent: (id: string) => void
  setCurrentEvent: (event: OrganizerEvent | null) => void
  publishEvent: (id: string) => void
}

export const useOrganizerStore = create<OrganizerState>((set, get) => ({
  events: [],
  currentEvent: null,

  createEvent: (event) => {
    const newEvent: OrganizerEvent = {
      ...event,
      id: `org-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    set((state) => ({
      events: [...state.events, newEvent],
    }))
  },

  updateEvent: (id, updates) => {
    set((state) => ({
      events: state.events.map((event) =>
        event.id === id ? { ...event, ...updates, updatedAt: new Date().toISOString() } : event,
      ),
    }))
  },

  deleteEvent: (id) => {
    set((state) => ({
      events: state.events.filter((event) => event.id !== id),
    }))
  },

  setCurrentEvent: (event) => set({ currentEvent: event }),

  publishEvent: (id) => {
    get().updateEvent(id, { status: "published" })
  },
}))
