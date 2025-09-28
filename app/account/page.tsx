"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  User,
  Ticket,
  Settings,
  Calendar,
  MapPin,
  Download,
  Share2,
  Eye,
} from "lucide-react";
import { useUserStore } from "@/store/user";
import { formatDateTime, formatPrice } from "@/utils/format";
import { mockEvents } from "@/data/events";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// SSR-safe QR (no rendering on server)
const QRCode = dynamic(() => import("react-qr-code"), { ssr: false });

// ✅ Mock orders with eventId matching your mockEvents (first one fixed)
const mockOrders = [
  {
    id: "TKT-1234567890-ABC123",
    eventId: "sega-festival-2025", // was "sega-festival-2024"
    status: "confirmed",
    purchaseDate: "2024-01-15T10:30:00Z",
    totalAmount: 250000, // Rs 2,500
    tickets: [
      {
        id: "ticket-1",
        tierName: "General Admission",
        quantity: 2,
        price: 100000,
        attendeeName: "John Doe",
        qrCode: "QR-ticket-1-TKT-1234567890-ABC123-1705315800000",
      },
    ],
  },
  {
    id: "TKT-0987654321-XYZ789",
    eventId: "comedy-night-port-louis",
    status: "confirmed",
    purchaseDate: "2024-01-10T14:20:00Z",
    totalAmount: 150000, // Rs 1,500
    tickets: [
      {
        id: "ticket-2",
        tierName: "Premium Seating",
        quantity: 1,
        price: 120000,
        attendeeName: "John Doe",
        qrCode: "QR-ticket-2-TKT-0987654321-XYZ789-1704891600000",
      },
    ],
  },
];

export default function AccountPage() {
  const { isLoggedIn, profile, logout } = useUserStore();
  const [activeTab, setActiveTab] = useState("profile");

  // QR modal state
  const [qrOpen, setQrOpen] = useState(false);
  const [qrTitle, setQrTitle] = useState<string>("");
  const [qrPayload, setQrPayload] = useState<string>("");

  if (!isLoggedIn || !profile) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Please sign in</h1>
          <p className="text-muted-foreground mb-8">
            You need to be signed in to view your account.
          </p>
          <Button asChild>
            <a href="/auth/login">Sign in</a>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const getEventById = (eventId: string) =>
    mockEvents.find((e) => e.id === eventId || e.slug === eventId);

  const openQr = (args: {
    orderId: string;
    ticketId: string;
    attendeeName: string;
    eventId: string;
    eventTitle?: string;
  }) => {
    const payload = JSON.stringify({
      type: "TICKET",
      version: 1,
      orderId: args.orderId,
      ticketId: args.ticketId,
      eventId: args.eventId,
      attendee: args.attendeeName,
      issuedAt: new Date().toISOString(),
    });
    setQrPayload(payload);
    setQrTitle(args.eventTitle || "Ticket QR");
    setQrOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-lg">
                {profile.firstName?.[0]}
                {profile.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">
                {profile.firstName} {profile.lastName}
              </h1>
              <p className="text-muted-foreground">{profile.email}</p>
            </div>
          </div>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" /> Profile
            </TabsTrigger>
            <TabsTrigger value="tickets" className="flex items-center gap-2">
              <Ticket className="h-4 w-4" /> My Tickets
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" /> Settings
            </TabsTrigger>
          </TabsList>

          {/* PROFILE */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Your account details and contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Info label="First Name" value={profile.firstName} />
                  <Info label="Last Name" value={profile.lastName} />
                  <Info label="Email" value={profile.email} />
                  <Info label="Phone" value={profile.phone || "Not provided"} />
                </div>
                <div className="pt-4">
                  <Button variant="outline">Edit Profile</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Statistics</CardTitle>
                <CardDescription>
                  Your booking history and activity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Stat value={mockOrders.length} label="Total Orders" />
                  <Stat
                    value={mockOrders.reduce(
                      (sum, o) =>
                        sum + o.tickets.reduce((s, t) => s + t.quantity, 0),
                      0
                    )}
                    label="Tickets Purchased"
                  />
                  <Stat
                    value={formatPrice(
                      mockOrders.reduce((sum, o) => sum + o.totalAmount, 0)
                    )}
                    label="Total Spent"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TICKETS */}
          <TabsContent value="tickets" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Tickets</CardTitle>
                <CardDescription>
                  View and manage your event tickets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockOrders.map((order) => {
                    const event = getEventById(order.eventId);

                    return (
                      <div key={order.id} className="border rounded-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-2">
                              {event?.title ?? order.eventId}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {event ? formatDateTime(event.startDate) : "—"}
                              </div>
                              {event?.venue?.name && (
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4" />
                                  {event.venue.name}
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant={
                                  order.status === "confirmed"
                                    ? "default"
                                    : "secondary"
                                }
                              >
                                {order.status}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                Order #{order.id}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-semibold">
                              {formatPrice(order.totalAmount)}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {order.tickets.reduce(
                                (sum, t) => sum + t.quantity,
                                0
                              )}{" "}
                              ticket(s)
                            </div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          {order.tickets.map((ticket) => (
                            <div
                              key={ticket.id}
                              className="rounded-lg bg-muted p-4"
                            >
                              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                {/* Left: ticket details */}
                                <div className="min-w-0">
                                  <div className="font-medium">
                                    {ticket.tierName}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    Quantity: {ticket.quantity} •{" "}
                                    {formatPrice(ticket.price)} each
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    Attendee: {ticket.attendeeName}
                                  </div>
                                </div>

                                {/* Right: actions */}
                                <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-end">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full sm:w-auto"
                                    onClick={() =>
                                      openQr({
                                        orderId: order.id,
                                        ticketId: ticket.id,
                                        attendeeName: ticket.attendeeName,
                                        eventId: order.eventId,
                                        eventTitle: event?.title,
                                      })
                                    }
                                  >
                                    <Eye className="h-4 w-4 mr-2" />
                                    View QR
                                  </Button>

                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full sm:w-auto"
                                  >
                                    <Download className="h-4 w-4 mr-2" />
                                    Download
                                  </Button>

                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full sm:w-auto"
                                  >
                                    <Share2 className="h-4 w-4 mr-2" />
                                    Share
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}

                  {mockOrders.length === 0 && (
                    <div className="text-center py-12">
                      <Ticket className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">
                        No tickets yet
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        You haven't purchased any tickets yet. Start exploring
                        events!
                      </p>
                      <Button asChild>
                        <a href="/events">Browse Events</a>
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SETTINGS */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Actions</CardTitle>
                <CardDescription>Manage your account settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ActionRow
                  title="Change Password"
                  desc="Update your account password"
                  action={<Button variant="outline">Change Password</Button>}
                />
                <ActionRow
                  title="Download Data"
                  desc="Export your account data and booking history"
                  action={<Button variant="outline">Download</Button>}
                />
                <ActionRow
                  title="Sign Out"
                  desc="Sign out of your account on this device"
                  action={
                    <Button variant="outline" onClick={logout}>
                      Sign Out
                    </Button>
                  }
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />

      {/* QR Dialog */}
      <Dialog open={qrOpen} onOpenChange={setQrOpen}>
        <DialogContent className="sm:max-w-[380px]">
          <DialogHeader>
            <DialogTitle>{qrTitle}</DialogTitle>
            <DialogDescription>For scanning purposes only</DialogDescription>
          </DialogHeader>

          <div className="mx-auto my-2 w-full flex flex-col items-center">
            <div className="relative p-3 bg-white rounded-md">
              {/* QR Code */}
              {qrPayload && (
                <QRCode
                  value={qrPayload}
                  size={240}
                  style={{ height: "auto", width: "100%" }}
                />
              )}
              {/* Optional watermark */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-semibold uppercase tracking-wide opacity-15 rotate-[-20deg]">
                  SCAN ONLY
                </span>
              </div>
            </div>
            <p className="mt-3 text-xs text-muted-foreground text-center">
              Please present this QR code at the venue entrance. <br />
              <span className="font-medium">For scanning purposes only.</span>
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* Small presentational helpers */
function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="text-sm font-medium text-muted-foreground">
        {label}
      </label>
      <p className="text-sm">{value}</p>
    </div>
  );
}

function Stat({ value, label }: { value: React.ReactNode; label: string }) {
  return (
    <div className="text-center p-4 bg-muted rounded-lg">
      <div className="text-2xl font-bold text-primary">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

function ActionRow({
  title,
  desc,
  action,
}: {
  title: string;
  desc: string;
  action: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="font-medium">{title}</div>
        <div className="text-sm text-muted-foreground">{desc}</div>
      </div>
      {action}
    </div>
  );
}
