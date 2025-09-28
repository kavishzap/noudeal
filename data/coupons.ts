export interface Coupon {
  code: string
  type: "percent" | "amount"
  value: number
  description: string
  minAmount?: number
  maxDiscount?: number
  validUntil: string
  usageLimit: number
  usedCount: number
}

export const mockCoupons: Coupon[] = [
  {
    code: "WELCOME10",
    type: "percent",
    value: 10,
    description: "10% off your first booking",
    minAmount: 500,
    maxDiscount: 200,
    validUntil: "2025-12-31T23:59:59+04:00",
    usageLimit: 1000,
    usedCount: 245,
  },
  {
    code: "EARLYBIRD",
    type: "amount",
    value: 150,
    description: "Rs 150 off early bird bookings",
    minAmount: 800,
    validUntil: "2025-06-30T23:59:59+04:00",
    usageLimit: 500,
    usedCount: 89,
  },
  {
    code: "STUDENT20",
    type: "percent",
    value: 20,
    description: "20% student discount",
    minAmount: 300,
    maxDiscount: 500,
    validUntil: "2025-12-31T23:59:59+04:00",
    usageLimit: 2000,
    usedCount: 567,
  },
  {
    code: "FESTIVAL25",
    type: "percent",
    value: 25,
    description: "25% off festival tickets",
    minAmount: 1000,
    maxDiscount: 750,
    validUntil: "2025-04-30T23:59:59+04:00",
    usageLimit: 200,
    usedCount: 45,
  },
]
