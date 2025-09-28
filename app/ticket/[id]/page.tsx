"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { QrCode, Download, Share2, Calendar, MapPin, Ticket, Clock } from "lucide-react"
import { formatDateTime, formatPrice } from "@/utils/format"
import { mockEvents } from "@/data/events"

// Mock ticket data
const mockTicket = {
  id: "ticket-1",
  orderId: "TKT-1234567890-ABC123",
  eventId: "sega-festival-2024",
  tierName: "General Admission",
  price: 100000,
  attendeeName: "John Doe",
  attendeeEmail: "john@example.com",
  qrCode: "QR-ticket-1-TKT-1234567890-ABC123-1705315800000",
  status: "valid",
  purchaseDate: "2024-01-15T10:30:00Z",
  seatNumber: null,
}

export default function TicketPage() {
  const params = useParams()
  const [showQR, setShowQR] = useState(false)

  const event = mockEvents.find((e) => e.id === mockTicket.eventId)

  if (!event) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Ticket not found</h1>
          <p className="text-muted-foreground">The ticket you're looking for doesn't exist.</p>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Ticket className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Your Ticket</CardTitle>
              <CardDescription>Present this QR code at the event entrance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Event Details */}
              <div className="text-center space-y-2">
                <h2 className="text-xl font-bold">{event.title}</h2>
                <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDateTime(event.startDate)}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {event.venue.name}
                  </div>
                </div>
              </div>

              {/* QR Code */}
              <div className="text-center">
                {showQR ? (
                  <div className="space-y-4">
                    <div className="w-48 h-48 bg-card border-2 border-border rounded-lg mx-auto flex items-center justify-center">
                      <div className="text-center">
                        <QrCode className="h-24 w-24 text-foreground mx-auto mb-2" />
                        <div className="text-xs text-muted-foreground font-mono break-all px-2">
                          {mockTicket.qrCode}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">Show this QR code at the event entrance</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-48 h-48 bg-muted rounded-lg mx-auto flex items-center justify-center">
                      <div className="text-center">
                        <QrCode className="h-16 w-16 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Tap to reveal QR code</p>
                      </div>
                    </div>
                    <Button onClick={() => setShowQR(true)} variant="outline">
                      Show QR Code
                    </Button>
                  </div>
                )}
              </div>

              {/* Ticket Details */}
              <div className="space-y-4 pt-6 border-t">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Ticket Type</label>
                    <p className="text-sm">{mockTicket.tierName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Price</label>
                    <p className="text-sm">{formatPrice(mockTicket.price)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Attendee</label>
                    <p className="text-sm">{mockTicket.attendeeName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Status</label>
                    <Badge variant={mockTicket.status === "valid" ? "default" : "secondary"}>{mockTicket.status}</Badge>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">Order ID</label>
                  <p className="text-sm font-mono">{mockTicket.orderId}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">Purchase Date</label>
                  <p className="text-sm">{formatDateTime(mockTicket.purchaseDate)}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-6 border-t">
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>

              {/* Important Notes */}
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Important Information
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Arrive at least 30 minutes before the event starts</li>
                  <li>• Bring a valid ID for verification</li>
                  <li>• This ticket is non-transferable and non-refundable</li>
                  <li>• Screenshots of QR codes are not accepted</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
