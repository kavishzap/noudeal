"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { QrCode, CheckCircle, XCircle, AlertTriangle, Scan } from "lucide-react"

interface TicketValidation {
  ticketId: string
  status: "valid" | "used" | "refunded" | "invalid"
  eventTitle?: string
  attendeeName?: string
  tierName?: string
  seatNumber?: string
}

export default function ScanPage() {
  const [qrInput, setQrInput] = useState("")
  const [validationResult, setValidationResult] = useState<TicketValidation | null>(null)
  const [isValidating, setIsValidating] = useState(false)

  // Mock ticket database for validation
  const mockTickets: Record<string, TicketValidation> = {
    "QR-ticket-1-TKT-1234567890-ABC123-1705315800000": {
      ticketId: "TKT-1234567890-ABC123",
      status: "valid",
      eventTitle: "Sega Festival 2024",
      attendeeName: "John Doe",
      tierName: "General Admission",
    },
    "QR-ticket-2-TKT-0987654321-XYZ789-1704891600000": {
      ticketId: "TKT-0987654321-XYZ789",
      status: "used",
      eventTitle: "Comedy Night Port Louis",
      attendeeName: "Jane Smith",
      tierName: "Premium Seating",
      seatNumber: "A-12",
    },
    "QR-ticket-3-TKT-REFUNDED-123456-1704000000000": {
      ticketId: "TKT-REFUNDED-123456",
      status: "refunded",
      eventTitle: "Beach Concert Flic-en-Flac",
      attendeeName: "Bob Wilson",
      tierName: "VIP Access",
    },
  }

  const validateTicket = async () => {
    if (!qrInput.trim()) return

    setIsValidating(true)
    setValidationResult(null)

    // Simulate validation delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const ticket = mockTickets[qrInput.trim()]
    if (ticket) {
      setValidationResult(ticket)
    } else {
      setValidationResult({
        ticketId: qrInput.trim(),
        status: "invalid",
      })
    }

    setIsValidating(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "valid":
        return <CheckCircle className="h-6 w-6 text-green-500" />
      case "used":
        return <AlertTriangle className="h-6 w-6 text-yellow-500" />
      case "refunded":
        return <AlertTriangle className="h-6 w-6 text-orange-500" />
      case "invalid":
        return <XCircle className="h-6 w-6 text-red-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "valid":
        return "default"
      case "used":
        return "secondary"
      case "refunded":
        return "secondary"
      case "invalid":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "valid":
        return "Valid Ticket"
      case "used":
        return "Already Used"
      case "refunded":
        return "Refunded"
      case "invalid":
        return "Invalid Ticket"
      default:
        return "Unknown"
    }
  }

  const getStatusMessage = (status: string) => {
    switch (status) {
      case "valid":
        return "This ticket is valid and can be used for entry."
      case "used":
        return "This ticket has already been used for entry."
      case "refunded":
        return "This ticket has been refunded and is no longer valid."
      case "invalid":
        return "This ticket code is not recognized or has expired."
      default:
        return ""
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <QrCode className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Ticket Scanner</h1>
            <p className="text-muted-foreground">Scan or enter ticket QR codes to validate entry at events</p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scan className="h-5 w-5" />
                Validate Ticket
              </CardTitle>
              <CardDescription>Paste the QR code content or scan with your device camera</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="qr-input">QR Code Content</Label>
                <Input
                  id="qr-input"
                  placeholder="Paste QR code content here..."
                  value={qrInput}
                  onChange={(e) => setQrInput(e.target.value)}
                  className="font-mono text-sm"
                />
              </div>

              <Button onClick={validateTicket} disabled={!qrInput.trim() || isValidating} className="w-full">
                {isValidating ? "Validating..." : "Validate Ticket"}
              </Button>

              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Try these demo codes:</p>
                <div className="space-y-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs font-mono"
                    onClick={() => setQrInput("QR-ticket-1-TKT-1234567890-ABC123-1705315800000")}
                  >
                    Valid Ticket
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs font-mono"
                    onClick={() => setQrInput("QR-ticket-2-TKT-0987654321-XYZ789-1704891600000")}
                  >
                    Used Ticket
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs font-mono"
                    onClick={() => setQrInput("INVALID-CODE-123")}
                  >
                    Invalid Code
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Validation Result */}
          {validationResult && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {getStatusIcon(validationResult.status)}
                  Validation Result
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert variant={validationResult.status === "valid" ? "default" : "destructive"}>
                  <AlertDescription className="flex items-center gap-2">
                    {getStatusIcon(validationResult.status)}
                    <div>
                      <strong>{getStatusText(validationResult.status)}</strong>
                      <div className="text-sm mt-1">{getStatusMessage(validationResult.status)}</div>
                    </div>
                  </AlertDescription>
                </Alert>

                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Ticket ID</label>
                    <p className="font-mono text-sm">{validationResult.ticketId}</p>
                  </div>

                  {validationResult.eventTitle && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Event</label>
                      <p className="text-sm">{validationResult.eventTitle}</p>
                    </div>
                  )}

                  {validationResult.attendeeName && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Attendee</label>
                      <p className="text-sm">{validationResult.attendeeName}</p>
                    </div>
                  )}

                  {validationResult.tierName && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Ticket Type</label>
                      <p className="text-sm">{validationResult.tierName}</p>
                    </div>
                  )}

                  {validationResult.seatNumber && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Seat</label>
                      <p className="text-sm">{validationResult.seatNumber}</p>
                    </div>
                  )}

                  <div className="pt-2">
                    <Badge variant={getStatusColor(validationResult.status) as any}>
                      {getStatusText(validationResult.status)}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
