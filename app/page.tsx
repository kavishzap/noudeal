import Link from "next/link";
import { ArrowRight, Calendar, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { EventCard } from "@/components/events/event-card";
import { mockEvents, categories } from "@/data/events";
import { PriceFilter } from "./filter";

export default function HomePage() {
  const featuredEvents = mockEvents.filter((event) => event.featured);
  const trendingEvents = mockEvents
    .filter((event) => event.trending)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section
          className="relative py-20 lg:py-32 overflow-hidden bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://www.jsonline.com/gcdn/authoring/authoring-images/2025/06/14/PTX1/84198380007-06132025-coldplay-at-sun-bowl-42.jpg?crop=4935,2777,x0,y0&width=3200&height=1801&format=pjpg&auto=webp')",
          }}
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-background/80 to-background/95" />

          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="mb-4">
                  <Star className="h-3 w-3 mr-1" />
                  Mauritius' Premier Event Platform
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold text-balance leading-tight">
                  Discover Amazing Events in{" "}
                  <span className="text-primary">Mauritius</span>
                </h1>
                <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
                  From vibrant Sega festivals to world-class concerts, find and
                  book tickets for the best events across the island.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Link href="/events" className="flex-1">
                  <Button size="lg" className="w-full">
                    Browse All Events
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Trending Events */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
                <h2 className="text-3xl font-bold">Featured Events</h2>
              </div>
              <p className="text-muted-foreground text-lg">
                See what everyone's talking about
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="">
          <div className="container mx-auto px-4">
            <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border-primary/20">
              <CardContent className="p-8 md:p-12 text-center">
                <h2 className="text-3xl font-bold mb-4">Never Miss an Event</h2>
                <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                  Get notified about the latest events, exclusive presales, and
                  special offers in Mauritius.
                </p>
                <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1"
                  />
                  <Button type="submit">Subscribe</Button>
                </form>
                <p className="text-xs text-muted-foreground mt-4">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
