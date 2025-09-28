"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { EventCard } from "@/components/events/event-card"
import { EventFilters } from "@/components/events/event-filters"
import { mockEvents } from "@/data/events"
import { mockTicketTiers } from "@/data/tickets"
import { isSameDay, isSameWeek, isSameMonth, addDays, addMonths } from "@/utils/format"

interface FilterState {
  query: string
  category: string
  city: string
  dateRange: string
  priceRange: string
  sortBy: string
}

export default function EventsPage() {
  const [filters, setFilters] = useState<FilterState>({
    query: "",
    category: "all",
    city: "all",
    dateRange: "all",
    priceRange: "all",
    sortBy: "trending",
  })

  const filteredAndSortedEvents = useMemo(() => {
    const filtered = mockEvents.filter((event) => {
      // Query filter
      if (filters.query) {
        const query = filters.query.toLowerCase()
        if (
          !event.title.toLowerCase().includes(query) &&
          !event.description.toLowerCase().includes(query) &&
          !event.venue.name.toLowerCase().includes(query) &&
          !event.organizer.name.toLowerCase().includes(query)
        ) {
          return false
        }
      }

      // Category filter
      if (filters.category !== "all" && event.category !== filters.category) {
        return false
      }

      // City filter
      if (filters.city !== "all") {
        const cityMap: Record<string, string> = {
          "port-louis": "Port Louis",
          ebene: "Ebène",
          "flic-en-flac": "Flic-en-Flac",
          "rose-hill": "Rose Hill",
          pamplemousses: "Pamplemousses",
          moka: "Moka",
        }
        if (event.venue.city !== cityMap[filters.city]) {
          return false
        }
      }

      // Date range filter
      if (filters.dateRange !== "all") {
        const eventDate = new Date(event.startDate)
        const now = new Date()

        switch (filters.dateRange) {
          case "today":
            if (!isSameDay(eventDate, now)) return false
            break
          case "tomorrow":
            if (!isSameDay(eventDate, addDays(now, 1))) return false
            break
          case "this-week":
            if (!isSameWeek(eventDate, now)) return false
            break
          case "this-month":
            if (!isSameMonth(eventDate, now)) return false
            break
          case "next-month":
            if (!isSameMonth(eventDate, addMonths(now, 1))) return false
            break
        }
      }

      // Price range filter
      if (filters.priceRange !== "all") {
        const eventTickets = mockTicketTiers.filter((ticket) => ticket.eventId === event.id)
        if (eventTickets.length === 0) return false

        const minPrice = Math.min(...eventTickets.map((t) => t.price))

        switch (filters.priceRange) {
          case "0-500":
            if (minPrice >= 500) return false
            break
          case "500-1000":
            if (minPrice < 500 || minPrice >= 1000) return false
            break
          case "1000-2000":
            if (minPrice < 1000 || minPrice >= 2000) return false
            break
          case "2000+":
            if (minPrice < 2000) return false
            break
        }
      }

      return true
    })

    // Sort events
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "trending":
          if (a.trending && !b.trending) return -1
          if (!a.trending && b.trending) return 1
          return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()

        case "date-asc":
          return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()

        case "date-desc":
          return new Date(b.startDate).getTime() - new Date(a.startDate).getTime()

        case "price-asc":
        case "price-desc": {
          const aTickets = mockTicketTiers.filter((ticket) => ticket.eventId === a.id)
          const bTickets = mockTicketTiers.filter((ticket) => ticket.eventId === b.id)

          const aMinPrice = aTickets.length > 0 ? Math.min(...aTickets.map((t) => t.price)) : 0
          const bMinPrice = bTickets.length > 0 ? Math.min(...bTickets.map((t) => t.price)) : 0

          return filters.sortBy === "price-asc" ? aMinPrice - bMinPrice : bMinPrice - aMinPrice
        }

        default:
          return 0
      }
    })

    return filtered
  }, [filters])

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">All Events</h1>
          <p className="text-muted-foreground">Discover amazing events happening across Mauritius</p>
        </div>

        <div className="space-y-8">
          <EventFilters onFiltersChange={setFilters} />

          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {filteredAndSortedEvents.length} event{filteredAndSortedEvents.length !== 1 ? "s" : ""} found
            </p>
          </div>

          {filteredAndSortedEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg mb-4">No events found matching your criteria</p>
              <p className="text-sm text-muted-foreground">Try adjusting your filters or search terms</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
