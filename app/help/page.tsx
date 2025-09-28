"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { HelpCircle, MessageCircle, Phone, Mail, Search } from "lucide-react"

const faqs = [
  {
    question: "How do I purchase tickets?",
    answer:
      "Browse events on our homepage or events page, select your desired event, choose your ticket type and quantity, then proceed to checkout. You'll need to create an account or sign in to complete your purchase.",
  },
  {
    question: "Can I cancel or refund my tickets?",
    answer:
      "Refund policies vary by event. Generally, tickets are non-refundable unless the event is cancelled by the organizer. Check the specific event's terms and conditions for details.",
  },
  {
    question: "How do I access my tickets?",
    answer:
      "After purchase, you can access your tickets through your account dashboard. You'll also receive an email confirmation with your ticket details and QR codes.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept major credit cards (Visa, Mastercard), mobile money (Orange Money, MCB Juice), and bank transfers. All payments are processed securely.",
  },
  {
    question: "Can I transfer my ticket to someone else?",
    answer:
      "Most tickets are non-transferable. However, some events may allow ticket transfers. Check the event details or contact the organizer for specific transfer policies.",
  },
  {
    question: "What if I lose my ticket or QR code?",
    answer:
      "Don't worry! You can always access your tickets through your account dashboard. If you're having trouble, contact our support team with your order details.",
  },
  {
    question: "Do I need to print my tickets?",
    answer:
      "No, you can show your digital tickets on your mobile device. However, make sure your phone is charged and the QR code is clearly visible.",
  },
  {
    question: "What happens if an event is cancelled?",
    answer:
      "If an event is cancelled by the organizer, you'll receive a full refund automatically. We'll notify you via email and SMS about the cancellation and refund process.",
  },
  {
    question: "How early should I arrive at the venue?",
    answer:
      "We recommend arriving at least 30 minutes before the event starts to allow time for entry, security checks, and finding your seat.",
  },
  {
    question: "Can I buy tickets at the venue?",
    answer:
      "This depends on the event. Some events offer door sales, but we recommend purchasing online in advance to guarantee your spot and often get better prices.",
  },
]

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Help & Support</h1>
          <p className="text-muted-foreground">Find answers to common questions or get in touch with our team</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  Frequently Asked Questions
                </CardTitle>
                <CardDescription>Find quick answers to common questions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search FAQs..." className="pl-10" />
                  </div>
                </div>

                <Accordion type="single" collapsible className="space-y-2">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4">
                      <AccordionTrigger className="text-left hover:no-underline">{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Contact Section */}
          <div className="space-y-6">
            {/* Contact Methods */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
                <CardDescription>Get in touch with our support team</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">Phone Support</div>
                    <div className="text-sm text-muted-foreground">+230 5123 4567</div>
                    <div className="text-xs text-muted-foreground">Mon-Fri, 9AM-6PM</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">Email Support</div>
                    <div className="text-sm text-muted-foreground">support@mauritiustickets.com</div>
                    <div className="text-xs text-muted-foreground">Response within 24 hours</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">Live Chat</div>
                    <div className="text-sm text-muted-foreground">Available 24/7</div>
                    <Button size="sm" className="mt-2">
                      Start Chat
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
                <CardDescription>We'll get back to you as soon as possible</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your@email.com" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="How can we help?" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Describe your issue or question..." rows={4} />
                  </div>

                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <a href="/terms">Terms of Service</a>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <a href="/privacy">Privacy Policy</a>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <a href="/refund-policy">Refund Policy</a>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <a href="/organizer">Become an Organizer</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
