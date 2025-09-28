"use client"

import Link from "next/link"
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { FeeBreakdown } from "@/components/cart/fee-breakdown"
import { useCartStore } from "@/store/cart"
import { useCheckoutStore } from "@/store/checkout"
import { mockCoupons } from "@/data/coupons"
import { formatPrice } from "@/utils/format"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal, getItemCount } = useCartStore()
  const { appliedCoupon, applyCoupon, removeCoupon } = useCheckoutStore()
  const [couponCode, setCouponCode] = useState("")
  const [couponError, setCouponError] = useState("")
  const { toast } = useToast()

  const itemCount = getItemCount()
  const subtotal = getSubtotal()

  const handleApplyCoupon = () => {
    setCouponError("")

    if (!couponCode.trim()) {
      setCouponError("Please enter a coupon code")
      return
    }

    const coupon = mockCoupons.find((c) => c.code.toLowerCase() === couponCode.trim().toLowerCase())

    if (!coupon) {
      setCouponError("Invalid coupon code")
      return
    }

    if (coupon.usedCount >= coupon.usageLimit) {
      setCouponError("This coupon has reached its usage limit")
      return
    }

    if (new Date(coupon.validUntil) < new Date()) {
      setCouponError("This coupon has expired")
      return
    }

    if (coupon.minAmount && subtotal < coupon.minAmount) {
      setCouponError(`Minimum order amount is ${formatPrice(coupon.minAmount * 100)}`)
      return
    }

    let discount = 0
    if (coupon.type === "percent") {
      discount = (subtotal * coupon.value) / 100
      if (coupon.maxDiscount) {
        discount = Math.min(discount, coupon.maxDiscount)
      }
    } else {
      discount = coupon.value
    }

    applyCoupon(coupon.code)
    setCouponCode("")

    toast({
      title: "Coupon applied",
      description: `You saved ${formatPrice(discount * 100)} with code ${coupon.code}`,
    })
  }

  const appliedCouponData = appliedCoupon ? mockCoupons.find((c) => c.code === appliedCoupon) : null
  const couponDiscount = appliedCouponData
    ? (() => {
        let discount = 0
        if (appliedCouponData.type === "percent") {
          discount = (subtotal * appliedCouponData.value) / 100
          if (appliedCouponData.maxDiscount) {
            discount = Math.min(discount, appliedCouponData.maxDiscount)
          }
        } else {
          discount = appliedCouponData.value
        }
        return discount
      })()
    : 0

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto" />
            <div>
              <h1 className="text-3xl font-bold mb-2">Your cart is empty</h1>
              <p className="text-muted-foreground">Looks like you haven't added any tickets yet.</p>
            </div>
            <Button asChild>
              <Link href="/events">Browse Events</Link>
            </Button>
          </div>
        </main>

        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link
            href="/events"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Your Cart</h1>
              <p className="text-muted-foreground">
                {itemCount} item{itemCount !== 1 ? "s" : ""} in your cart
              </p>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {items.map((item, index) => (
                    <div key={item.id}>
                      {index > 0 && <Separator />}
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold">{item.eventTitle}</h3>
                            <p className="text-sm text-muted-foreground">{item.ticketTierName}</p>
                            {item.seatInfo && (
                              <p className="text-xs text-muted-foreground mt-1">
                                {item.seatInfo.section} - Row {item.seatInfo.row}, Seat {item.seatInfo.seat}
                              </p>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {!item.seatInfo && (
                              <>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <span className="w-12 text-center font-medium">{item.quantity}</span>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  disabled={item.quantity >= 8}
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-lg">{formatPrice(item.price * item.quantity * 100)}</p>
                            {item.quantity > 1 && (
                              <p className="text-sm text-muted-foreground">{formatPrice(item.price * 100)} each</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Coupon Code */}
            <Card>
              <CardHeader>
                <CardTitle>Promo Code</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <div>
                      <p className="font-medium text-green-600">{appliedCoupon}</p>
                      <p className="text-xs text-green-600/80">{appliedCouponData?.description}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={removeCoupon}
                      className="text-green-600 hover:text-green-700"
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="coupon">Enter promo code</Label>
                    <div className="flex gap-2">
                      <Input
                        id="coupon"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="WELCOME10"
                        className="flex-1"
                      />
                      <Button onClick={handleApplyCoupon} variant="outline">
                        Apply
                      </Button>
                    </div>
                    {couponError && <p className="text-sm text-destructive">{couponError}</p>}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <FeeBreakdown
                  subtotal={subtotal}
                  appliedCoupon={
                    appliedCouponData
                      ? {
                          code: appliedCouponData.code,
                          type: appliedCouponData.type,
                          value: appliedCouponData.value,
                          discount: couponDiscount,
                        }
                      : undefined
                  }
                />

                <div className="mt-6 space-y-3">
                  <Button className="w-full" size="lg" asChild>
                    <Link href="/checkout">Proceed to Checkout</Link>
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent" asChild>
                    <Link href="/events">Continue Shopping</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
