"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: January 2024</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Terms and Conditions</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground mb-4">
                  By accessing and using Mauritius Tickets, you accept and agree to be bound by the terms and provision
                  of this agreement.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">2. Ticket Purchases</h2>
                <div className="text-muted-foreground space-y-3">
                  <p>• All ticket sales are final unless the event is cancelled by the organizer</p>
                  <p>• Tickets are non-transferable unless explicitly stated otherwise</p>
                  <p>• You must be 18 years or older to purchase tickets</p>
                  <p>• Valid identification may be required at the event entrance</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">3. Event Changes and Cancellations</h2>
                <div className="text-muted-foreground space-y-3">
                  <p>• Event organizers reserve the right to change event details, including date, time, and venue</p>
                  <p>• In case of event cancellation, full refunds will be processed automatically</p>
                  <p>• We are not responsible for any additional costs incurred due to event changes</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">4. User Conduct</h2>
                <div className="text-muted-foreground space-y-3">
                  <p>• Users must provide accurate information when creating accounts and purchasing tickets</p>
                  <p>• Fraudulent activities or misuse of the platform will result in account termination</p>
                  <p>• Users are responsible for maintaining the security of their account credentials</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">5. Limitation of Liability</h2>
                <p className="text-muted-foreground mb-4">
                  Mauritius Tickets acts as an intermediary between event organizers and ticket purchasers. We are not
                  liable for any issues arising from the events themselves, including but not limited to event quality,
                  safety, or organizer conduct.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">6. Privacy</h2>
                <p className="text-muted-foreground mb-4">
                  Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use,
                  and protect your personal information.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">7. Contact Information</h2>
                <div className="text-muted-foreground space-y-2">
                  <p>For questions about these terms, please contact us:</p>
                  <p>Email: legal@mauritiustickets.com</p>
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
