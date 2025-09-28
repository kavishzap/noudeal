"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Refund Policy</h1>
            <p className="text-muted-foreground">Last updated: January 2024</p>
          </div>

          <Alert className="mb-8">
            <InfoIcon className="h-4 w-4" />
            <AlertDescription>
              This policy applies to all ticket purchases made through Mauritius Tickets. Individual events may have
              additional terms.
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>Refund Terms and Conditions</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">1. General Refund Policy</h2>
                <div className="text-muted-foreground space-y-3">
                  <p>• All ticket sales are final and non-refundable unless specifically stated otherwise</p>
                  <p>• Tickets are non-transferable and cannot be exchanged for other events</p>
                  <p>• Refunds are only provided in cases of event cancellation by the organizer</p>
                  <p>• Processing fees and service charges are non-refundable</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">2. Event Cancellation</h2>
                <div className="text-muted-foreground space-y-3">
                  <p>
                    <strong>Full Refund:</strong> If an event is cancelled by the organizer, you will receive a full
                    refund of the ticket price (excluding processing fees).
                  </p>
                  <p>
                    <strong>Processing Time:</strong> Refunds will be processed within 5-10 business days to your
                    original payment method.
                  </p>
                  <p>
                    <strong>Notification:</strong> You will be notified via email and SMS about the cancellation and
                    refund process.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">3. Event Postponement</h2>
                <div className="text-muted-foreground space-y-3">
                  <p>• If an event is postponed, your tickets remain valid for the new date</p>
                  <p>
                    • If you cannot attend the new date, you may request a refund within 7 days of the postponement
                    announcement
                  </p>
                  <p>• Refund requests must be submitted through our customer support</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">4. Venue or Time Changes</h2>
                <div className="text-muted-foreground space-y-3">
                  <p>• Minor changes to venue or time do not qualify for refunds</p>
                  <p>
                    • Significant changes (different city, major time change) may qualify for refunds at our discretion
                  </p>
                  <p>• You will be notified of any changes as soon as possible</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">5. Exceptional Circumstances</h2>
                <div className="text-muted-foreground space-y-3">
                  <p>Refunds may be considered in exceptional circumstances such as:</p>
                  <p>• Medical emergencies (with valid documentation)</p>
                  <p>• Natural disasters or government restrictions</p>
                  <p>• Technical errors on our platform during purchase</p>
                  <p>• Duplicate purchases made in error</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">6. How to Request a Refund</h2>
                <div className="text-muted-foreground space-y-3">
                  <p>To request a refund (where applicable):</p>
                  <p>1. Contact our customer support team</p>
                  <p>2. Provide your order number and reason for refund</p>
                  <p>3. Include any supporting documentation</p>
                  <p>4. Allow 5-10 business days for processing</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">7. Contact Information</h2>
                <div className="text-muted-foreground space-y-2">
                  <p>For refund requests or questions:</p>
                  <p>Email: refunds@mauritiustickets.com</p>
                  <p>Phone: +230 5123 4567</p>
                  <p>Hours: Monday-Friday, 9:00 AM - 6:00 PM (GMT+4)</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">8. Dispute Resolution</h2>
                <p className="text-muted-foreground mb-4">
                  If you are not satisfied with our refund decision, you may escalate the matter through our formal
                  dispute resolution process. All disputes will be handled in accordance with Mauritian consumer
                  protection laws.
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
