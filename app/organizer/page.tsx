"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import { Plus, Calendar, Users, DollarSign, TrendingUp, Eye, Edit, QrCode, Download, MapPin } from "lucide-react"
import { useOrganizerStore } from "@/store/organizer"
import { formatDateTime, formatPrice } from "@/utils/format"
import { mockEvents } from "@/data/events"

// Mock analytics data
const salesData = [
  { name: "Jan", sales: 4000, tickets: 240 },
  { name: "Feb", sales: 3000, tickets: 180 },
  { name: "Mar", sales: 5000, tickets: 300 },
  { name: "Apr", sales: 4500, tickets: 270 },
  { name: "May", sales: 6000, tickets: 360 },
  { name: "Jun", sales: 5500, tickets: 330 },
]

const categoryData = [
  { name: "Music", value: 45, color: "#8b5cf6" },
  { name: "Theatre", value: 25, color: "#06b6d4" },
  { name: "Sports", value: 20, color: "#10b981" },
  { name: "Comedy", value: 10, color: "#f59e0b" },
]

const recentSales = [
  { id: "1", event: "Sega Festival 2024", amount: 25000, tickets: 2, time: "2 hours ago" },
  { id: "2", event: "Comedy Night", amount: 15000, tickets: 1, time: "4 hours ago" },
  { id: "3", event: "Beach Concert", amount: 35000, tickets: 3, time: "6 hours ago" },
  { id: "4", event: "Cricket Match", amount: 20000, tickets: 2, time: "8 hours ago" },
]

export default function OrganizerDashboard() {
  const { organizer } = useOrganizerStore()
  const [activeTab, setActiveTab] = useState("overview")

  // Mock organizer data if not logged in
  const currentOrganizer = organizer || {
    id: "org-1",
    name: "Mauritius Events Co.",
    email: "events@mauritius.com",
    phone: "+230 5123 4567",
    description: "Premier event organizer in Mauritius",
    verified: true,
  }

  const organizerEvents = mockEvents.filter((event) => event.organizer.id === currentOrganizer.id)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="text-lg">{currentOrganizer.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold">{currentOrganizer.name}</h1>
                  {currentOrganizer.verified && <Badge variant="default">Verified</Badge>}
                </div>
                <p className="text-muted-foreground">{currentOrganizer.email}</p>
              </div>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="scanner">QR Scanner</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Rs 145,230</div>
                  <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tickets Sold</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,234</div>
                  <p className="text-xs text-muted-foreground">+15.3% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Events</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{organizerEvents.length}</div>
                  <p className="text-xs text-muted-foreground">2 upcoming this week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12.5%</div>
                  <p className="text-xs text-muted-foreground">+2.1% from last month</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Sales */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>Latest ticket purchases across your events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentSales.map((sale) => (
                    <div key={sale.id} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{sale.event}</div>
                        <div className="text-sm text-muted-foreground">{sale.time}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{formatPrice(sale.amount)}</div>
                        <div className="text-sm text-muted-foreground">{sale.tickets} ticket(s)</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Sales Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
                <CardDescription>Monthly sales and ticket performance</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sales" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>My Events</CardTitle>
                    <CardDescription>Manage your events and track performance</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Event
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {organizerEvents.map((event) => (
                    <div key={event.id} className="border rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {formatDateTime(event.startDate)}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {event.venue.name}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={event.status === "published" ? "default" : "secondary"}>
                              {event.status}
                            </Badge>
                            <Badge variant="outline">{event.category}</Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold">Rs 25,000</div>
                          <div className="text-sm text-muted-foreground">150 sold / 500 total</div>
                          <Progress value={30} className="w-24 mt-2" />
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <QrCode className="h-4 w-4 mr-2" />
                          Scan Tickets
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                      </div>
                    </div>
                  ))}

                  {organizerEvents.length === 0 && (
                    <div className="text-center py-12">
                      <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No events yet</h3>
                      <p className="text-muted-foreground mb-4">Create your first event to start selling tickets</p>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Create Event
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Category Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Event Categories</CardTitle>
                  <CardDescription>Distribution of events by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Sales Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>Sales Trend</CardTitle>
                  <CardDescription>Ticket sales over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="tickets" stroke="#8b5cf6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Detailed analytics for your events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-primary">Rs 145,230</div>
                    <div className="text-sm text-muted-foreground">Total Revenue</div>
                    <div className="text-xs text-green-600 mt-1">+20.1% vs last month</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-primary">1,234</div>
                    <div className="text-sm text-muted-foreground">Tickets Sold</div>
                    <div className="text-xs text-green-600 mt-1">+15.3% vs last month</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-primary">12.5%</div>
                    <div className="text-sm text-muted-foreground">Conversion Rate</div>
                    <div className="text-xs text-green-600 mt-1">+2.1% vs last month</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scanner" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>QR Code Scanner</CardTitle>
                <CardDescription>Scan tickets at event entrance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <QrCode className="h-24 w-24 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">QR Scanner</h3>
                  <p className="text-muted-foreground mb-6">
                    Use your device camera to scan ticket QR codes at the event entrance
                  </p>
                  <Button size="lg">
                    <QrCode className="h-5 w-5 mr-2" />
                    Start Scanning
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Scans */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Scans</CardTitle>
                <CardDescription>Latest ticket validations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: "1",
                      ticket: "TKT-123456",
                      event: "Sega Festival 2024",
                      time: "2 minutes ago",
                      status: "valid",
                    },
                    { id: "2", ticket: "TKT-789012", event: "Comedy Night", time: "5 minutes ago", status: "valid" },
                    {
                      id: "3",
                      ticket: "TKT-345678",
                      event: "Beach Concert",
                      time: "8 minutes ago",
                      status: "already_used",
                    },
                    { id: "4", ticket: "TKT-901234", event: "Cricket Match", time: "12 minutes ago", status: "valid" },
                  ].map((scan) => (
                    <div key={scan.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{scan.ticket}</div>
                        <div className="text-sm text-muted-foreground">{scan.event}</div>
                      </div>
                      <div className="text-right">
                        <Badge variant={scan.status === "valid" ? "default" : "destructive"}>
                          {scan.status === "valid" ? "Valid" : "Already Used"}
                        </Badge>
                        <div className="text-sm text-muted-foreground mt-1">{scan.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
}
