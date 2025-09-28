"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, Users, Calendar, Shield, Award, MapPin } from "lucide-react"

const stats = [
  { label: "Events Hosted", value: "10,000+", icon: Calendar },
  { label: "Happy Customers", value: "50,000+", icon: Users },
  { label: "Years of Experience", value: "5+", icon: Award },
  { label: "Cities Covered", value: "15+", icon: MapPin },
]

const team = [
  {
    name: "Raj Patel",
    role: "Founder & CEO",
    description: "Passionate about bringing amazing events to Mauritius",
    image: "/professional-headshot-of-raj-patel.jpg",
  },
  {
    name: "Priya Sharma",
    role: "Head of Operations",
    description: "Ensuring smooth event experiences for everyone",
    image: "/professional-headshot-of-priya-sharma.jpg",
  },
  {
    name: "Dev Ramgoolam",
    role: "Technology Lead",
    description: "Building the future of event ticketing in Mauritius",
    image: "/professional-headshot-of-dev-ramgoolam.jpg",
  },
]

const values = [
  {
    icon: Heart,
    title: "Customer First",
    description: "We put our customers at the heart of everything we do, ensuring exceptional experiences.",
  },
  {
    icon: Shield,
    title: "Trust & Security",
    description: "Your data and payments are protected with industry-leading security measures.",
  },
  {
    icon: Users,
    title: "Community Focus",
    description: "We're committed to supporting and growing the Mauritian events community.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            About Us
          </Badge>
          <h1 className="text-4xl font-bold mb-4">Bringing Mauritius Together Through Events</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're passionate about connecting people with amazing experiences across the beautiful island of Mauritius.
            From intimate concerts to grand festivals, we make event discovery and booking simple and secure.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="text-center p-6">
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Our Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Founded in 2019, Mauritius Tickets was born from a simple observation: finding and booking events in
                Mauritius was unnecessarily complicated. We set out to change that.
              </p>
              <p>
                What started as a small team of event enthusiasts has grown into the island's leading ticketing
                platform, trusted by thousands of event-goers and hundreds of organizers.
              </p>
              <p>
                Today, we're proud to support the vibrant cultural scene in Mauritius, from traditional Sega festivals
                to international concerts, comedy shows to cricket matches.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="/mauritius-cultural-festival-with-people-dancing.jpg"
              alt="Mauritius cultural event"
              className="rounded-lg w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index}>
                <CardContent className="text-center p-8">
                  <value.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index}>
                <CardContent className="text-center p-8">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Mission */}
        <Card className="mb-16">
          <CardContent className="text-center p-12">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8">
              To make every event in Mauritius easily discoverable and accessible, while providing organizers with the
              tools they need to create unforgettable experiences for their audiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="/events">Discover Events</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/organizer">Become an Organizer</a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Contact CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
          <p className="text-muted-foreground mb-6">
            Have questions or want to learn more about what we do? We'd love to hear from you.
          </p>
          <Button size="lg" asChild>
            <a href="/help">Contact Us</a>
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  )
}
