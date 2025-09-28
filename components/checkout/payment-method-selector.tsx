"use client"

import { useState } from "react"
import { CreditCard, Smartphone, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useCheckoutStore } from "@/store/checkout"
import { paymentMethods } from "@/config/fees"
import { cn } from "@/lib/utils"

interface PaymentMethodSelectorProps {
  onNext: () => void
  onBack: () => void
}

export function PaymentMethodSelector({ onNext, onBack }: PaymentMethodSelectorProps) {
  const { paymentMethod, setPaymentMethod } = useCheckoutStore()
  const [selectedMethod, setSelectedMethod] = useState(paymentMethod?.id || "")

  const handleContinue = () => {
    if (selectedMethod) {
      const method = paymentMethods.find((m) => m.id === selectedMethod)
      if (method) {
        setPaymentMethod({
          id: method.id,
          type: method.id as "card" | "mcb-juice" | "myt-money",
        })
        onNext()
      }
    }
  }

  const getIcon = (methodId: string) => {
    switch (methodId) {
      case "card":
        return <CreditCard className="h-6 w-6" />
      case "mcb-juice":
      case "myt-money":
        return <Smartphone className="h-6 w-6" />
      default:
        return <CreditCard className="h-6 w-6" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
        <p className="text-sm text-muted-foreground">Choose how you'd like to pay for your tickets</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod}>
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <div key={method.id} className="relative">
                <Label
                  htmlFor={method.id}
                  className={cn(
                    "flex items-center space-x-4 p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:border-primary/40",
                    selectedMethod === method.id ? "border-primary bg-primary/5" : "border-border",
                  )}
                >
                  <RadioGroupItem value={method.id} id={method.id} className="sr-only" />
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-muted">
                    {getIcon(method.id)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{method.name}</h3>
                      {method.processingFee && (
                        <span className="text-xs text-muted-foreground">(+2.5% processing fee)</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{method.description}</p>
                  </div>
                  {selectedMethod === method.id && (
                    <div className="absolute top-4 right-4">
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <Check className="h-4 w-4 text-primary-foreground" />
                      </div>
                    </div>
                  )}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onBack} className="bg-transparent">
            Back
          </Button>
          <Button onClick={handleContinue} disabled={!selectedMethod} className="min-w-32">
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
