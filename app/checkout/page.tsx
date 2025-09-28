"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CheckoutStepper } from "@/components/checkout/checkout-stepper"
import { AttendeeForm } from "@/components/checkout/attendee-form"
import { PaymentMethodSelector } from "@/components/checkout/payment-method-selector"
import { OrderSummary } from "@/components/checkout/order-summary"
import { useCartStore } from "@/store/cart"
import { useCheckoutStore } from "@/store/checkout"
import { generateOrderRef } from "@/utils/format"
import { useToast } from "@/hooks/use-toast"

const checkoutSteps = [
  {
    id: 1,
    title: "Information",
    description: "Your details",
  },
  {
    id: 2,
    title: "Payment",
    description: "Payment method",
  },
  {
    id: 3,
    title: "Review",
    description: "Confirm order",
  },
]

export default function CheckoutPage() {
  const router = useRouter()
  const { items, clearCart, getSubtotal } = useCartStore()
  const { currentStep, setStep, attendeeInfo, paymentMethod, setOrderRef, resetCheckout } = useCheckoutStore()
  const { toast } = useToast()

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart")
    }
  }, [items.length, router])

  const handleNext = () => {
    if (currentStep < 3) {
      setStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setStep(currentStep - 1)
    }
  }

  const handlePlaceOrder = async () => {
    if (!attendeeInfo || !paymentMethod) {
      toast({
        title: "Missing information",
        description: "Please complete all steps before placing your order.",
        variant: "destructive",
      })
      return
    }

    // Generate order reference
    const orderRef = generateOrderRef()
    setOrderRef(orderRef)

    // Simulate payment processing
    toast({
      title: "Processing payment...",
      description: "Please wait while we process your order.",
    })

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Clear cart and redirect to success page
    clearCart()
    resetCheckout()
    router.push(`/order/success?ref=${orderRef}`)
  }

  if (items.length === 0) {
    return null // Will redirect via useEffect
  }

  const subtotal = getSubtotal()

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link
            href="/cart"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cart
          </Link>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Checkout</h1>
          <p className="text-muted-foreground">Complete your ticket purchase</p>
        </div>

        {/* Stepper */}
        <div className="mb-8">
          <CheckoutStepper currentStep={currentStep} steps={checkoutSteps} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 1 && <AttendeeForm onNext={handleNext} />}

            {currentStep === 2 && <PaymentMethodSelector onNext={handleNext} onBack={handleBack} />}

            {currentStep === 3 && (
              <div className="space-y-6">
                {/* Review Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Attendee Info */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Attendee Information</h3>
                    {attendeeInfo && (
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="text-muted-foreground">Name:</span> {attendeeInfo.firstName}{" "}
                          {attendeeInfo.lastName}
                        </p>
                        <p>
                          <span className="text-muted-foreground">Email:</span> {attendeeInfo.email}
                        </p>
                        <p>
                          <span className="text-muted-foreground">Phone:</span> {attendeeInfo.phone}
                        </p>
                        {attendeeInfo.company && (
                          <p>
                            <span className="text-muted-foreground">Company:</span> {attendeeInfo.company}
                          </p>
                        )}
                      </div>
                    )}
                    <Button variant="outline" size="sm" onClick={() => setStep(1)} className="bg-transparent">
                      Edit
                    </Button>
                  </div>

                  {/* Payment Method */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Payment Method</h3>
                    {paymentMethod && (
                      <div className="text-sm">
                        <p>
                          <span className="text-muted-foreground">Method:</span>{" "}
                          {paymentMethod.type === "card"
                            ? "Credit/Debit Card"
                            : paymentMethod.type === "mcb-juice"
                              ? "MCB Juice"
                              : "my.t money"}
                        </p>
                      </div>
                    )}
                    <Button variant="outline" size="sm" onClick={() => setStep(2)} className="bg-transparent">
                      Edit
                    </Button>
                  </div>
                </div>

                {/* Place Order */}
                <div className="pt-6 border-t">
                  <div className="flex justify-between items-center mb-6">
                    <Button variant="outline" onClick={handleBack} className="bg-transparent">
                      Back
                    </Button>
                    <Button onClick={handlePlaceOrder} size="lg" className="min-w-48">
                      Place Order
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <OrderSummary />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
