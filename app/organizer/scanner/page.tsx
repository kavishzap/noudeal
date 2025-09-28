"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { QrCode, CheckCircle, XCircle, AlertTriangle, Camera, Scan } from "lucide-react"

interface ScanResult {
  id: string
  ticketId: string
  eventTitle: string
  attendeeName: string
  tierName: string
  status: "valid" | "invalid" | "already_used"
  timestamp: string
}

export default function QRScannerPage() {
  const [isScanning, setIsScanning] = useState(false)
  const [scanResults, setScanResults] = useState<ScanResult[]>([])
  const [currentScan, setCurrentScan] = useState<ScanResult | null>(null)

  const mockScan = () => {
    const mockResults: ScanResult[] = [
      {
        id: "scan-1",
        ticketId: "TKT-1234567890-ABC123",
        eventTitle: "Sega Festival 2024",
        attendeeName: "John Doe",
        tierName: "General Admission",
        status: "valid",
        timestamp: new Date().toISOString(),
      },
      {
        id: "scan-2",
        ticketId: "TKT-0987654321-XYZ789",
        eventTitle: "Comedy Night Port Louis",
        attendeeName: "Jane Smith",
        tierName: "Premium Seating",
        status: "already_used",
        timestamp: new Date(Date.now() - 300000).toISOString(),
      },
      {
        id: "scan-3",
        ticketId: "TKT-INVALID-123456",
        eventTitle: "Unknown Event",
        attendeeName: "Unknown",
        tierName: "Unknown",
        status: "invalid",
        timestamp: new Date(Date.now() - 600000).toISOString(),
      },
    ]

    const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)]
    const newResult = {
      ...randomResult,
      id: `scan-${Date.now()}`,
      timestamp: new Date().toISOString(),
    }

    setCurrentScan(newResult)
    setScanResults((prev) => [newResult, ...prev])
    setIsScanning(false)
  }

  const startScanning = () => {
    setIsScanning(true)
    setCurrentScan(null)
    // Simulate scanning delay
    setTimeout(() => {
      mockScan()
    }, 2000)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "valid":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "invalid":
        return <XCircle className="h-5 w-5 text-red-500" />
      case "already_used":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "valid":
        return "default"
      case "invalid":
        return "destructive"
      case "already_used":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "valid":
        return "Valid Ticket"
      case "invalid":
        return "Invalid Ticket"
      case "already_used":
        return "Already Used"
      default:
        return "Unknown"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">QR Code Scanner</h1>
          <p className="text-muted-foreground">Scan tickets at event entrance for validation</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Scanner Interface */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="h-5 w-5" />
                  Scanner
                </CardTitle>
                <CardDescription>Point your camera at the ticket QR code</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center mb-6">
                  {isScanning ? (
                    <div className="text-center">
                      <Scan className="h-16 w-16 text-primary mx-auto mb-4 animate-pulse" />
                      <p className="text-lg font-medium">Scanning...</p>
                      <p className="text-sm text-muted-foreground">Point camera at QR code</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-lg font-medium">Ready to scan</p>
                      <p className="text-sm text-muted-foreground">Tap the button below to start</p>
                    </div>
                  )}
                </div>

                <Button onClick={startScanning} disabled={isScanning} className="w-full" size="lg">
                  {isScanning ? "Scanning..." : "Start Scanning"}
                </Button>
              </CardContent>
            </Card>

            {/* Current Scan Result */}
            {currentScan && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {getStatusIcon(currentScan.status)}
                    Scan Result
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Alert variant={currentScan.status === "valid" ? "default" : "destructive"}>
                      <AlertDescription className="flex items-center gap-2">
                        {getStatusIcon(currentScan.status)}
                        <strong>{getStatusText(currentScan.status)}</strong>
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-2">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Ticket ID</label>
                        <p className="font-mono text-sm">{currentScan.ticketId}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Event</label>
                        <p className="text-sm">{currentScan.eventTitle}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Attendee</label>
                        <p className="text-sm">{currentScan.attendeeName}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Ticket Type</label>
                        <p className="text-sm">{currentScan.tierName}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Scan History */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Scan History</CardTitle>
                <CardDescription>Recent ticket validations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scanResults.length > 0 ? (
                    scanResults.map((result) => (
                      <div key={result.id} className="flex items-start justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {getStatusIcon(result.status)}
                            <span className="font-medium text-sm">{result.ticketId}</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <div>{result.eventTitle}</div>
                            <div>
                              {result.attendeeName} • {result.tierName}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={getStatusColor(result.status) as any} className="mb-1">
                            {getStatusText(result.status)}
                          </Badge>
                          <div className="text-xs text-muted-foreground">
                            {new Date(result.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <QrCode className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No scans yet</p>
                      <p className="text-sm text-muted-foreground">Start scanning tickets to see results here</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
