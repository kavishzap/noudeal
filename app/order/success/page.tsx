"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle, Download, Eye, ArrowRight, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useCheckoutStore } from "@/store/checkout"
import { formatPrice } from "@/utils/format"
import { useToast } from "@/hooks/use-toast"

interface MockOrder {
  ref: string
  items: Array<{
    id: string
    eventTitle: string
    ticketTierName: string
    quantity: number
    price: number
    seatInfo?: {
      section: string
      row: string
      seat: string
    }
  }>
  attendeeInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
  }
  total: number
  createdAt: string
}

export default function OrderSuccessPage() {
  const searchParams = useSearchParams()
  const orderRef = searchParams.get("ref")
  const { lastOrderRef, attendeeInfo } = useCheckoutStore()
  const { toast } = useToast()
  const [order, setOrder] = useState<MockOrder | null>(null)

  useEffect(() => {
    // In a real app, this would fetch the order from an API
    if (orderRef && attendeeInfo) {
      // Mock order data
      setOrder({
        ref: orderRef,
        items: [
          {
            id: "1",
            eventTitle: "Sega Festival 2025",
            ticketTierName: "General Admission",
            quantity: 2,
            price: 750,
          },
        ],
        attendeeInfo,
        total: 1650, // Including fees
        createdAt: new Date().toISOString(),
      })
    }
  }, [orderRef, attendeeInfo])

  const handleDownloadTickets = () => {
    toast({
      title: "Download started",
      description: "Your tickets are being prepared for download.",
    })
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "I just got tickets!",
          text: `I just booked tickets for ${order?.items[0]?.eventTitle}!`,
          url: window.location.origin,
        })
      } catch (error) {
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.origin)
        toast({
          title: "Link copied",
          description: "Event link copied to clipboard.",
        })
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.origin)
      toast({
        title: "Link copied",
        description: "Event link copied to clipboard.",
      })
    }
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-muted-foreground">Loading your order...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
            <p className="text-muted-foreground text-lg">
              Thank you for your purchase. Your tickets have been sent to your email.
            </p>
          </div>

          {/* Order Details */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Order Details</span>
                <Badge variant="secondary">#{order.ref}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Items */}
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.eventTitle}</h3>
                      <p className="text-sm text-muted-foreground">{item.ticketTierName}</p>
                      {item.seatInfo && (
                        <p className="text-xs text-muted-foreground">
                          {item.seatInfo.section} - Row {item.seatInfo.row}, Seat {item.seatInfo.seat}
                        </p>
                      )}
                      {item.quantity > 1 && <p className="text-xs text-muted-foreground">Quantity: {item.quantity}</p>}
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatPrice(item.price * item.quantity * 100)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Customer Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Attendee Information</h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      {order.attendeeInfo.firstName} {order.attendeeInfo.lastName}
                    </p>
                    <p className="text-muted-foreground">{order.attendeeInfo.email}</p>
                    <p className="text-muted-foreground">{order.attendeeInfo.phone}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Order Summary</h4>
                  <div className="space-y-1 text-sm">
                    <p>Order Total: {formatPrice(order.total * 100)}</p>
                    <p className="text-muted-foreground">Ordered on {new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Download className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Download Tickets</h3>
                <p className="text-sm text-muted-foreground mb-4">Get your tickets as a PDF file</p>
                <Button onClick={handleDownloadTickets} className="w-full">
                  Download PDF
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Eye className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">View Tickets</h3>
                <p className="text-sm text-muted-foreground mb-4">Access your tickets anytime</p>
                <Button variant="outline" asChild className="w-full bg-transparent">
                  <Link href="/account">My Tickets</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Additional Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" onClick={handleShare} className="bg-transparent">
              <Share2 className="h-4 w-4 mr-2" />
              Share Event
            </Button>
            <Button asChild>
              <Link href="/events">
                Browse More Events
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>

          {/* Important Info */}
          <Card className="mt-8 bg-muted/30">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">Important Information</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Your tickets have been sent to {order.attendeeInfo.email}</li>
                <li>• Please bring a valid ID and your ticket (digital or printed) to the event</li>
                <li>• Tickets are non-refundable unless the event is cancelled</li>
                <li>• For support, contact us at support@NouDeal.com</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
