import type React from "react"
import type { Metadata } from "next"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { CartDrawer } from "@/components/cart/cart-drawer"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "NouDeal - Premium Event Tickets in Mauritius",
  description: "Discover and book tickets for the best concerts, theatre, festivals, and sports events in Mauritius",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
          <Suspense fallback={null}>
            {children}
            <Toaster />
            <CartDrawer />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
