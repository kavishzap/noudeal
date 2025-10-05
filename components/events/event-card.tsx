import Link from "next/link"
import Image from "next/image"
import { Calendar, MapPin, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Event } from "@/data/events"
import { formatDateTime, formatPrice } from "@/utils/format"
import { mockTicketTiers } from "@/data/tickets"

interface EventCardProps {
  event: Event
  variant?: "default" | "featured"
}

export function EventCard({ event, variant = "default" }: EventCardProps) {
  const eventTickets = mockTicketTiers.filter((ticket) => ticket.eventId === event.id)
  const minPrice = eventTickets.length > 0 ? Math.min(...eventTickets.map((t) => t.price)) : 0

  const categoryColors = {
    concert: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    theatre: "bg-pink-500/10 text-pink-400 border-pink-500/20",
    festival: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    sports: "bg-green-500/10 text-green-400 border-green-500/20",
    comedy: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    conference: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  }

  return (
    <Card
      className={`group overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 ${
        variant === "featured" ? "md:col-span-2 md:row-span-2" : ""
      }`}
    >
      <div className="relative">
        <div className={`aspect-video ${variant === "featured" ? "md:aspect-[2/1]" : ""} overflow-hidden`}>
          <Image
            src={event.image || "/placeholder.svg"}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge className={categoryColors[event.category]}>
            {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
          </Badge>
          {event.trending && (
            <Badge variant="secondary" className="bg-red-500/10 text-red-400 border-red-500/20">
              Trending
            </Badge>
          )}
        </div>
        {minPrice > 0 && (
          <div className="absolute top-4 right-4">
            <Badge variant="secondary" className="bg-background/90 text-foreground">
              From {formatPrice(minPrice * 100)}
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3
              className={`font-semibold text-balance leading-tight ${
                variant === "featured" ? "text-xl md:text-2xl" : "text-lg"
              }`}
            >
              {event.title}
            </h3>
            <p
              className={`text-muted-foreground mt-2 line-clamp-2 ${variant === "featured" ? "text-base" : "text-sm"}`}
            >
              {event.description}
            </p>
          </div>

          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{formatDateTime(event.startDate)}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>
                {event.venue.name}, {event.venue.city}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>By {event.organizer.name}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <Link href={`/events/${event.slug}`} className="flex-1">
              <Button className="w-full bg-[#74B70E] hover:bg-[#009272]">Get Tickets</Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
