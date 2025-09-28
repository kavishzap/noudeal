export interface TicketTier {
  id: string
  eventId: string
  name: string
  description: string
  price: number
  currency: "MUR"
  available: number
  total: number
  type: "general" | "seated"
  benefits: string[]
  saleStartDate: string
  saleEndDate: string
}

export interface SeatSection {
  id: string
  name: string
  price: number
  color: string
  rows: number
  seatsPerRow: number
  unavailableSeats: string[]
}

export const mockTicketTiers: TicketTier[] = [
  {
    id: "sega-vip",
    eventId: "1",
    name: "VIP Experience",
    description: "Premium viewing area, complimentary drinks, and meet & greet",
    price: 1500,
    currency: "MUR",
    available: 48,
    total: 50,
    type: "general",
    benefits: ["Premium viewing area", "Complimentary drinks", "Meet & greet", "VIP lounge access"],
    saleStartDate: "2025-01-15T00:00:00+04:00",
    saleEndDate: "2025-03-15T16:00:00+04:00",
  },
  // Jazz Night
  {
    id: "jazz-general",
    eventId: "2",
    name: "Standard Seating",
    description: "Reserved seating with great views of the stage",
    price: 1200,
    currency: "MUR",
    available: 120,
    total: 150,
    type: "seated",
    benefits: ["Reserved seating", "Welcome drink"],
    saleStartDate: "2025-01-20T00:00:00+04:00",
    saleEndDate: "2025-02-28T17:00:00+04:00",
  },
  {
    id: "jazz-premium",
    eventId: "2",
    name: "Premium Seating",
    description: "Front section seating with dinner included",
    price: 2000,
    currency: "MUR",
    available: 35,
    total: 40,
    type: "seated",
    benefits: ["Front section seating", "3-course dinner", "Premium bar access"],
    saleStartDate: "2025-01-20T00:00:00+04:00",
    saleEndDate: "2025-02-28T17:00:00+04:00",
  },
  {
    id: "jazz-vip",
    eventId: "2",
    name: "VIP Table",
    description: "Private table for 4 with premium service",
    price: 3500,
    currency: "MUR",
    available: 8,
    total: 10,
    type: "seated",
    benefits: ["Private table for 4", "Dedicated service", "Premium menu", "Artist meet & greet"],
    saleStartDate: "2025-01-20T00:00:00+04:00",
    saleEndDate: "2025-02-28T17:00:00+04:00",
  },
]

export const mockSeatSections: SeatSection[] = [
  {
    id: "section-a",
    name: "Section A",
    price: 2000,
    color: "#7c3aed",
    rows: 8,
    seatsPerRow: 12,
    unavailableSeats: ["A3-5", "A3-6", "A5-8", "A7-2", "A7-3"],
  },
  {
    id: "section-b",
    name: "Section B",
    price: 1500,
    color: "#2563eb",
    rows: 10,
    seatsPerRow: 14,
    unavailableSeats: ["B2-7", "B4-12", "B6-3", "B8-9", "B8-10"],
  },
  {
    id: "section-c",
    name: "Section C",
    price: 1200,
    color: "#059669",
    rows: 12,
    seatsPerRow: 16,
    unavailableSeats: ["C1-8", "C3-14", "C5-2", "C9-11", "C11-6"],
  },
]
