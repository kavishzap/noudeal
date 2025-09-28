import Link from "next/link"
import { Facebook, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center text-center gap-4">
          {/* Brand + Socials */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">
                  ND
                </span>
              </div>
              <span className="font-bold text-lg">NouDeal</span>
            </div>
            <div className="flex space-x-3">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-6 text-xs sm:text-sm text-muted-foreground">
            <Link
              href="/contact"
              className="hover:text-primary transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/terms"
              className="hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className="hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
          </div>

          {/* Bottom bar */}
          <p className="text-xs text-muted-foreground">
            &copy; 2025 NouDeal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
