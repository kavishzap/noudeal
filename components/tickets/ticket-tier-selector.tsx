"use client"

import { useState } from "react"
import { Plus, Minus, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useCartStore } from "@/store/cart"
import { useToast } from "@/hooks/use-toast"
import type { TicketTier } from "@/data/tickets"
import type { Event } from "@/data/events"
import { formatPrice } from "@/utils/format"

interface TicketTierSelectorProps {
  event: Event
  tickets: TicketTier[]
}

export function TicketTierSelector({ event, tickets }: TicketTierSelectorProps) {
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const { addItem, openCart } = useCartStore()
  const { toast } = useToast()

  const updateQuantity = (ticketId: string, quantity: number) => {
    const ticket = tickets.find((t) => t.id === ticketId)
    if (!ticket) return

    const maxQuantity = Math.min(ticket.available, 8) // Max 8 tickets per tier
    const newQuantity = Math.max(0, Math.min(quantity, maxQuantity))

    setQuantities((prev) => ({
      ...prev,
      [ticketId]: newQuantity,
    }))
  }

  const addToCart = (ticket: TicketTier) => {
    const quantity = quantities[ticket.id] || 1

    addItem({
      eventId: event.id,
      eventTitle: event.title,
      ticketTierId: ticket.id,
      ticketTierName: ticket.name,
      price: ticket.price,
      quantity,
    })

    toast({
      title: "Added to cart",
      description: `${quantity} x ${ticket.name} ticket${quantity > 1 ? "s" : ""} added to your cart.`,
    })

    // Reset quantity for this ticket
    setQuantities((prev) => ({
      ...prev,
      [ticket.id]: 0,
    }))

    // Open cart drawer
    openCart()
  }

  const getTotalQuantity = () => {
    return Object.values(quantities).reduce((sum, qty) => sum + qty, 0)
  }

  if (tickets.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">Tickets are not yet available for this event.</p>
          <p className="text-sm text-muted-foreground mt-2">Check back soon or contact the organizer for updates.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Your Tickets</CardTitle>
        <p className="text-sm text-muted-foreground">Choose your ticket type and quantity</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {tickets.map((ticket, index) => (
          <div key={ticket.id}>
            {index > 0 && <Separator />}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">{ticket.name}</h3>
                    {ticket.available < 10 && ticket.available > 0 && (
                      <Badge variant="destructive" className="text-xs">
                        Only {ticket.available} left
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{ticket.description}</p>

                  {ticket.benefits.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">Includes:</p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {ticket.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-primary" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="text-right">
                  <p className="text-2xl font-bold">{formatPrice(ticket.price * 100)}</p>
                  <p className="text-xs text-muted-foreground">per ticket</p>
                </div>
              </div>

              {ticket.available > 0 ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(ticket.id, (quantities[ticket.id] || 0) - 1)}
                      disabled={(quantities[ticket.id] || 0) <= 0}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-medium">{quantities[ticket.id] || 0}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(ticket.id, (quantities[ticket.id] || 0) + 1)}
                      disabled={(quantities[ticket.id] || 0) >= Math.min(ticket.available, 8)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <Button
                    onClick={() => addToCart(ticket)}
                    disabled={(quantities[ticket.id] || 0) === 0}
                    className="gap-2"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
              ) : (
                <div className="text-center py-4">
                  <Badge variant="secondary" className="bg-destructive/10 text-destructive border-destructive/20">
                    Sold Out
                  </Badge>
                </div>
              )}
            </div>
          </div>
        ))}

        {getTotalQuantity() > 0 && (
          <div className="pt-4 border-t">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {getTotalQuantity()} ticket{getTotalQuantity() > 1 ? "s" : ""} selected
              </span>
              <span className="font-medium">
                Total:{" "}
                {formatPrice(
                  Object.entries(quantities).reduce((total, [ticketId, qty]) => {
                    const ticket = tickets.find((t) => t.id === ticketId)
                    return total + (ticket ? ticket.price * qty * 100 : 0)
                  }, 0),
                )}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
