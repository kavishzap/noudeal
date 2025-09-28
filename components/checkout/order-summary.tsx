import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useCartStore } from "@/store/cart"
import { useCheckoutStore } from "@/store/checkout"
import { mockCoupons } from "@/data/coupons"
import { FeeBreakdown } from "@/components/cart/fee-breakdown"
import { formatPrice } from "@/utils/format"

export function OrderSummary() {
  const { items, getSubtotal } = useCartStore()
  const { appliedCoupon } = useCheckoutStore()

  const subtotal = getSubtotal()
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

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Items */}
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <div className="flex-1">
                <p className="font-medium">{item.eventTitle}</p>
                <p className="text-muted-foreground">{item.ticketTierName}</p>
                {item.seatInfo && (
                  <p className="text-xs text-muted-foreground">
                    {item.seatInfo.section} - Row {item.seatInfo.row}, Seat {item.seatInfo.seat}
                  </p>
                )}
                {item.quantity > 1 && <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>}
              </div>
              <div className="text-right">
                <p className="font-medium">{formatPrice(item.price * item.quantity * 100)}</p>
              </div>
            </div>
          ))}
        </div>

        <Separator />

        {/* Applied Coupon */}
        {appliedCoupon && (
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-green-500/20">
              {appliedCoupon}
            </Badge>
            <span className="text-sm text-green-600">-{formatPrice(couponDiscount * 100)}</span>
          </div>
        )}

        {/* Fee Breakdown */}
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
      </CardContent>
    </Card>
  )
}
