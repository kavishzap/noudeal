"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import { ArrowLeft, ArrowRight, Calendar, MapPin, Ticket, Eye, Plus, Trash2 } from "lucide-react"

interface EventFormData {
  // Step 1: Basics
  title: string
  category: string
  description: string

  // Step 2: Schedule & Venue
  startDate: string
  startTime: string
  endDate: string
  endTime: string
  venueName: string
  venueAddress: string
  venueCity: string

  // Step 3: Tickets
  isSeated: boolean
  ticketTiers: Array<{
    id: string
    name: string
    price: number
    quantity: number
    description: string
  }>
}

const categories = ["Music", "Theatre", "Sports", "Comedy", "Festival", "Conference", "Workshop", "Other"]

const cities = [
  "Port Louis",
  "Ebène",
  "Flic-en-Flac",
  "Rose Hill",
  "Pamplemousses",
  "Moka",
  "Grand Baie",
  "Quatre Bornes",
]

export default function CreateEventPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    category: "",
    description: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    venueName: "",
    venueAddress: "",
    venueCity: "",
    isSeated: false,
    ticketTiers: [
      {
        id: "tier-1",
        name: "General Admission",
        price: 50000, // Rs 500
        quantity: 100,
        description: "",
      },
    ],
  })

  const updateFormData = (updates: Partial<EventFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }))
  }

  const addTicketTier = () => {
    const newTier = {
      id: `tier-${Date.now()}`,
      name: "",
      price: 0,
      quantity: 0,
      description: "",
    }
    updateFormData({
      ticketTiers: [...formData.ticketTiers, newTier],
    })
  }

  const updateTicketTier = (id: string, updates: Partial<(typeof formData.ticketTiers)[0]>) => {
    updateFormData({
      ticketTiers: formData.ticketTiers.map((tier) => (tier.id === id ? { ...tier, ...updates } : tier)),
    })
  }

  const removeTicketTier = (id: string) => {
    if (formData.ticketTiers.length > 1) {
      updateFormData({
        ticketTiers: formData.ticketTiers.filter((tier) => tier.id !== id),
      })
    }
  }

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSaveDraft = () => {
    toast.success("Event saved as draft")
    router.push("/organizer")
  }

  const handlePublish = () => {
    toast.success("Event published successfully!")
    router.push("/organizer")
  }

  const progress = (currentStep / 4) * 100

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Create New Event</h1>
            <p className="text-muted-foreground">Set up your event details and start selling tickets</p>

            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Step {currentStep} of 4</span>
                <span className="text-sm text-muted-foreground">{Math.round(progress)}% complete</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>

          {/* Step 1: Basics */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Event Basics
                </CardTitle>
                <CardDescription>Tell us about your event</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter event title"
                    value={formData.title}
                    onChange={(e) => updateFormData({ title: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => updateFormData({ category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category.toLowerCase()}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your event..."
                    rows={4}
                    value={formData.description}
                    onChange={(e) => updateFormData({ description: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Schedule & Venue */}
          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Schedule & Venue
                </CardTitle>
                <CardDescription>When and where is your event?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date *</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => updateFormData({ startDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Start Time *</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={formData.startTime}
                      onChange={(e) => updateFormData({ startTime: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date *</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => updateFormData({ endDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endTime">End Time *</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={formData.endTime}
                      onChange={(e) => updateFormData({ endTime: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="venueName">Venue Name *</Label>
                  <Input
                    id="venueName"
                    placeholder="Enter venue name"
                    value={formData.venueName}
                    onChange={(e) => updateFormData({ venueName: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="venueAddress">Venue Address *</Label>
                  <Input
                    id="venueAddress"
                    placeholder="Enter venue address"
                    value={formData.venueAddress}
                    onChange={(e) => updateFormData({ venueAddress: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="venueCity">City *</Label>
                  <Select value={formData.venueCity} onValueChange={(value) => updateFormData({ venueCity: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Tickets */}
          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ticket className="h-5 w-5" />
                  Tickets & Pricing
                </CardTitle>
                <CardDescription>Set up your ticket tiers and pricing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="isSeated">Seated Event</Label>
                    <p className="text-sm text-muted-foreground">Enable if your event has assigned seating</p>
                  </div>
                  <Switch
                    id="isSeated"
                    checked={formData.isSeated}
                    onCheckedChange={(checked) => updateFormData({ isSeated: checked })}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Ticket Tiers</h4>
                    <Button onClick={addTicketTier} size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Tier
                    </Button>
                  </div>

                  {formData.ticketTiers.map((tier, index) => (
                    <div key={tier.id} className="border rounded-lg p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <h5 className="font-medium">Tier {index + 1}</h5>
                        {formData.ticketTiers.length > 1 && (
                          <Button variant="ghost" size="sm" onClick={() => removeTicketTier(tier.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Tier Name *</Label>
                          <Input
                            placeholder="e.g. General Admission"
                            value={tier.name}
                            onChange={(e) => updateTicketTier(tier.id, { name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Price (Rs) *</Label>
                          <Input
                            type="number"
                            placeholder="0"
                            value={tier.price / 100}
                            onChange={(e) =>
                              updateTicketTier(tier.id, { price: Number.parseInt(e.target.value) * 100 || 0 })
                            }
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Quantity Available *</Label>
                        <Input
                          type="number"
                          placeholder="0"
                          value={tier.quantity}
                          onChange={(e) =>
                            updateTicketTier(tier.id, { quantity: Number.parseInt(e.target.value) || 0 })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          placeholder="Optional description for this tier"
                          rows={2}
                          value={tier.description}
                          onChange={(e) => updateTicketTier(tier.id, { description: e.target.value })}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Preview & Publish */}
          {currentStep === 4 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Preview & Publish
                </CardTitle>
                <CardDescription>Review your event before publishing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border rounded-lg p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold">{formData.title}</h3>
                    <Badge variant="outline" className="mt-2">
                      {formData.category}
                    </Badge>
                  </div>

                  <p className="text-muted-foreground">{formData.description}</p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Start:</span> {formData.startDate} at {formData.startTime}
                    </div>
                    <div>
                      <span className="font-medium">End:</span> {formData.endDate} at {formData.endTime}
                    </div>
                  </div>

                  <div className="text-sm">
                    <span className="font-medium">Venue:</span> {formData.venueName}, {formData.venueAddress},{" "}
                    {formData.venueCity}
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Ticket Tiers:</h4>
                    <div className="space-y-2">
                      {formData.ticketTiers.map((tier) => (
                        <div key={tier.id} className="flex justify-between items-center text-sm">
                          <span>{tier.name}</span>
                          <span>
                            Rs {(tier.price / 100).toFixed(0)} • {tier.quantity} available
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={handleSaveDraft} className="flex-1 bg-transparent">
                    Save as Draft
                  </Button>
                  <Button onClick={handlePublish} className="flex-1">
                    Publish Event
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            {currentStep < 4 ? (
              <Button onClick={nextStep}>
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleSaveDraft}>
                  Save Draft
                </Button>
                <Button onClick={handlePublish}>Publish</Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
