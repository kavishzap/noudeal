"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCartStore } from "@/store/cart"
import { useToast } from "@/hooks/use-toast"
import type { SeatSection } from "@/data/tickets"
import type { Event } from "@/data/events"
import { formatPrice } from "@/utils/format"

interface SeatMapDemoProps {
  event: Event
  sections: SeatSection[]
}

interface SelectedSeat {
  section: string
  row: string
  seat: string
  price: number
}

export function SeatMapDemo({ event, sections }: SeatMapDemoProps) {
  const [selectedSeats, setSelectedSeats] = useState<SelectedSeat[]>([])
  const { addItem, openCart } = useCartStore()
  const { toast } = useToast()

  const toggleSeat = (section: SeatSection, row: number, seat: number) => {
    const seatId = `${section.id}-${row}-${seat}`
    const seatLabel = `${section.name.split(" ")[1]}${row}-${seat}`

    // Check if seat is unavailable
    if (section.unavailableSeats.includes(seatLabel)) {
      return
    }

    const existingIndex = selectedSeats.findIndex(
      (s) => s.section === section.id && s.row === row.toString() && s.seat === seat.toString(),
    )

    if (existingIndex >= 0) {
      // Remove seat
      setSelectedSeats((prev) => prev.filter((_, index) => index !== existingIndex))
    } else {
      // Add seat (max 8 seats)
      if (selectedSeats.length < 8) {
        setSelectedSeats((prev) => [
          ...prev,
          {
            section: section.id,
            row: row.toString(),
            seat: seat.toString(),
            price: section.price,
          },
        ])
      } else {
        toast({
          title: "Maximum seats reached",
          description: "You can select up to 8 seats at a time.",
          variant: "destructive",
        })
      }
    }
  }

  const selectBestSeat = (section: SeatSection) => {
    // Find first available seat in the middle rows
    const middleRow = Math.ceil(section.rows / 2)
    const middleSeat = Math.ceil(section.seatsPerRow / 2)

    for (let row = middleRow; row <= section.rows; row++) {
      for (let seat = middleSeat; seat <= section.seatsPerRow; seat++) {
        const seatLabel = `${section.name.split(" ")[1]}${row}-${seat}`
        if (!section.unavailableSeats.includes(seatLabel)) {
          toggleSeat(section, row, seat)
          return
        }
      }
    }

    // If no middle seats available, try any available seat
    for (let row = 1; row <= section.rows; row++) {
      for (let seat = 1; seat <= section.seatsPerRow; seat++) {
        const seatLabel = `${section.name.split(" ")[1]}${row}-${seat}`
        if (!section.unavailableSeats.includes(seatLabel)) {
          toggleSeat(section, row, seat)
          return
        }
      }
    }
  }

  const addSeatsToCart = () => {
    selectedSeats.forEach((seat) => {
      const section = sections.find((s) => s.id === seat.section)
      if (section) {
        addItem({
          eventId: event.id,
          eventTitle: event.title,
          ticketTierId: `${seat.section}-seat`,
          ticketTierName: `${section.name} - Row ${seat.row}, Seat ${seat.seat}`,
          price: seat.price,
          quantity: 1,
          seatInfo: {
            section: section.name,
            row: seat.row,
            seat: seat.seat,
          },
        })
      }
    })

    toast({
      title: "Seats added to cart",
      description: `${selectedSeats.length} seat${selectedSeats.length > 1 ? "s" : ""} added to your cart.`,
    })

    setSelectedSeats([])
    openCart()
  }

  const getSeatStatus = (section: SeatSection, row: number, seat: number) => {
    const seatLabel = `${section.name.split(" ")[1]}${row}-${seat}`

    if (section.unavailableSeats.includes(seatLabel)) {
      return "unavailable"
    }

    const isSelected = selectedSeats.some(
      (s) => s.section === section.id && s.row === row.toString() && s.seat === seat.toString(),
    )

    return isSelected ? "selected" : "available"
  }

  const getTotalPrice = () => {
    return selectedSeats.reduce((total, seat) => total + seat.price, 0)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Your Seats</CardTitle>
        <p className="text-sm text-muted-foreground">Click on available seats to select them</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Stage */}
        <div className="text-center">
          <div className="bg-primary/20 border border-primary/40 rounded-lg py-3 px-6 inline-block">
            <span className="text-sm font-medium">STAGE</span>
          </div>
        </div>

        {/* Seat Map */}
        <div className="space-y-8">
          {sections.map((section) => (
            <div key={section.id} className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold">{section.name}</h3>
                  <Badge
                    style={{
                      backgroundColor: `${section.color}20`,
                      color: section.color,
                      borderColor: `${section.color}40`,
                    }}
                  >
                    {formatPrice(section.price * 100)}
                  </Badge>
                </div>
                <Button variant="outline" size="sm" onClick={() => selectBestSeat(section)}>
                  Best Seat
                </Button>
              </div>

              <div
                className="grid gap-1 justify-center"
                style={{ gridTemplateColumns: `repeat(${section.seatsPerRow}, 1fr)` }}
              >
                {Array.from({ length: section.rows }, (_, rowIndex) => {
                  const row = rowIndex + 1
                  return Array.from({ length: section.seatsPerRow }, (_, seatIndex) => {
                    const seat = seatIndex + 1
                    const status = getSeatStatus(section, row, seat)

                    return (
                      <button
                        key={`${row}-${seat}`}
                        onClick={() => toggleSeat(section, row, seat)}
                        disabled={status === "unavailable"}
                        className={`
                          w-6 h-6 text-xs rounded-sm border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50
                          ${
                            status === "available"
                              ? "bg-muted hover:bg-muted/80 border-border hover:border-primary/40"
                              : status === "selected"
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-destructive/20 border-destructive/40 cursor-not-allowed opacity-50"
                          }
                        `}
                        title={`${section.name} - Row ${row}, Seat ${seat} - ${formatPrice(section.price * 100)}`}
                      >
                        {seat}
                      </button>
                    )
                  })
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-muted border border-border rounded-sm" />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-primary rounded-sm" />
            <span>Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-destructive/20 border border-destructive/40 rounded-sm" />
            <span>Unavailable</span>
          </div>
        </div>

        {/* Selected Seats Summary */}
        {selectedSeats.length > 0 && (
          <div className="space-y-4 pt-4 border-t">
            <div className="space-y-2">
              <h4 className="font-medium">Selected Seats ({selectedSeats.length})</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {selectedSeats.map((seat, index) => {
                  const section = sections.find((s) => s.id === seat.section)
                  return (
                    <div key={index} className="flex justify-between">
                      <span>
                        {section?.name} - Row {seat.row}, Seat {seat.seat}
                      </span>
                      <span>{formatPrice(seat.price * 100)}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t">
              <span className="font-semibold">Total: {formatPrice(getTotalPrice() * 100)}</span>
              <Button onClick={addSeatsToCart}>Add to Cart</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
