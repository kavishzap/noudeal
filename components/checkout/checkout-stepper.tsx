"use client"

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface CheckoutStepperProps {
  currentStep: number
  steps: {
    id: number
    title: string
    description: string
  }[]
}

export function CheckoutStepper({ currentStep, steps }: CheckoutStepperProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200",
                  currentStep > step.id
                    ? "bg-primary border-primary text-primary-foreground"
                    : currentStep === step.id
                      ? "border-primary text-primary bg-primary/10"
                      : "border-muted-foreground/30 text-muted-foreground",
                )}
              >
                {currentStep > step.id ? <Check className="h-5 w-5" /> : <span>{step.id}</span>}
              </div>
              <div className="mt-2 text-center">
                <p
                  className={cn(
                    "text-sm font-medium",
                    currentStep >= step.id ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {step.title}
                </p>
                <p className="text-xs text-muted-foreground hidden sm:block">{step.description}</p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-0.5 mx-4 transition-all duration-200",
                  currentStep > step.id ? "bg-primary" : "bg-muted-foreground/30",
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
