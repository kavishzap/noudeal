"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: January 2024</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">1. Information We Collect</h2>
                <div className="text-muted-foreground space-y-3">
                  <p>
                    <strong>Personal Information:</strong> Name, email address, phone number, and payment information
                    when you create an account or purchase tickets.
                  </p>
                  <p>
                    <strong>Usage Data:</strong> Information about how you use our website, including pages visited,
                    time spent, and interactions.
                  </p>
                  <p>
                    <strong>Device Information:</strong> Browser type, operating system, and device identifiers.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">2. How We Use Your Information</h2>
                <div className="text-muted-foreground space-y-3">
                  <p>• Process ticket purchases and send confirmations</p>
                  <p>• Provide customer support and respond to inquiries</p>
                  <p>• Send important updates about your bookings and events</p>
                  <p>• Improve our services and user experience</p>
                  <p>• Send marketing communications (with your consent)</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">3. Information Sharing</h2>
                <div className="text-muted-foreground space-y-3">
                  <p>We may share your information with:</p>
                  <p>• Event organizers (name and contact details for attendee lists)</p>
                  <p>• Payment processors to complete transactions</p>
                  <p>• Service providers who help us operate our platform</p>
                  <p>• Law enforcement when required by law</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">4. Data Security</h2>
                <p className="text-muted-foreground mb-4">
                  We implement appropriate security measures to protect your personal information against unauthorized
                  access, alteration, disclosure, or destruction. However, no method of transmission over the internet
                  is 100% secure.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">5. Your Rights</h2>
                <div className="text-muted-foreground space-y-3">
                  <p>You have the right to:</p>
                  <p>• Access and update your personal information</p>
                  <p>• Delete your account and associated data</p>
                  <p>• Opt out of marketing communications</p>
                  <p>• Request a copy of your data</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">6. Cookies</h2>
                <p className="text-muted-foreground mb-4">
                  We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and
                  personalize content. You can control cookie settings through your browser preferences.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">7. Contact Us</h2>
                <div className="text-muted-foreground space-y-2">
                  <p>If you have questions about this Privacy Policy, please contact us:</p>
                  <p>Email: privacy@mauritiustickets.com</p>
                  <p>Phone: +230 5123 4567</p>
                  <p>Address: Port Louis, Mauritius</p>
                </div>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
