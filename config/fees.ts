export interface FeeConfig {
  bookingFeeCents: number
  vatPercent: number
  displayVat: boolean
  currency: "MUR"
  processingFeePercent: number
  maxProcessingFee: number
}

export const feeConfig: FeeConfig = {
  bookingFeeCents: 5000, // Rs 50 in cents
  vatPercent: 15,
  displayVat: true,
  currency: "MUR",
  processingFeePercent: 2.5,
  maxProcessingFee: 10000, // Rs 100 max processing fee
}

export const paymentMethods = [
  {
    id: "card",
    name: "Credit/Debit Card",
    description: "Visa, Mastercard, American Express",
    icon: "credit-card",
    processingFee: true,
  },
  {
    id: "mcb-juice",
    name: "MCB Juice",
    description: "Pay with your MCB Juice mobile wallet",
    icon: "smartphone",
    processingFee: false,
  },
  {
    id: "myt-money",
    name: "my.t money",
    description: "Pay with your my.t money account",
    icon: "smartphone",
    processingFee: false,
  },
]
