"use client"

import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Calendar, MapPin, Users, Share2, Clock, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { TicketTierSelector } from "@/components/tickets/ticket-tier-selector"
import { SeatMapDemo } from "@/components/tickets/seat-map-demo"
import { mockEvents } from "@/data/events"
import { mockTicketTiers, mockSeatSections } from "@/data/tickets"
import { formatDateTime, formatDate, formatTime } from "@/utils/format"

interface EventDetailPageProps {
  params: {
    slug: string
  }
}

export default function EventDetailPage({ params }: EventDetailPageProps) {
  const event = mockEvents.find((e) => e.slug === params.slug)

  if (!event) {
    notFound()
  }

  const eventTickets = mockTicketTiers.filter((ticket) => ticket.eventId === event.id)
  const hasSeatedTickets = eventTickets.some((ticket) => ticket.type === "seated")

  const categoryColors = {
    concert: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    theatre: "bg-pink-500/10 text-pink-400 border-pink-500/20",
    festival: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    sports: "bg-green-500/10 text-green-400 border-green-500/20",
    comedy: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    conference: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: event.description,
          url: window.location.href,
        })
      } catch (error) {
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.href)
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Back Navigation */}
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/events"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Events
          </Link>
        </div>

        {/* Hero Image */}
        <div className="relative h-64 md:h-96 overflow-hidden">
          <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className={categoryColors[event.category]}>
                {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
              </Badge>
              {event.trending && (
                <Badge variant="secondary" className="bg-red-500/10 text-red-400 border-red-500/20">
                  Trending
                </Badge>
              )}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Event Info */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">{event.title}</h1>
                <p className="text-lg text-muted-foreground text-pretty leading-relaxed">{event.description}</p>
              </div>

              {/* Event Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Event Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Date & Time</span>
                      </div>
                      <p className="font-medium">{formatDateTime(event.startDate)}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>Duration</span>
                      </div>
                      <p className="font-medium">
                        {formatTime(event.startDate)} - {formatTime(event.endDate)}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>Venue</span>
                    </div>
                    <div>
                      <p className="font-medium">{event.venue.name}</p>
                      <p className="text-sm text-muted-foreground">{event.venue.address}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>Organizer</span>
                    </div>
                    <div>
                      <p className="font-medium">{event.organizer.name}</p>
                      <p className="text-sm text-muted-foreground">{event.organizer.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Ticket Selection */}
              {hasSeatedTickets ? (
                <SeatMapDemo event={event} sections={mockSeatSections} />
              ) : (
                <TicketTierSelector event={event} tickets={eventTickets} />
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <Button variant="outline" className="w-full bg-transparent mb-4" onClick={handleShare}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Event
                  </Button>

                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Category</span>
                      <span className="font-medium capitalize">{event.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">City</span>
                      <span className="font-medium">{event.venue.city}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date</span>
                      <span className="font-medium">{formatDate(event.startDate)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
