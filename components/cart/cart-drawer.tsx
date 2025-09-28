"use client";

import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/utils/format";
import Link from "next/link";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    getSubtotal,
    getItemCount,
  } = useCartStore();

  const itemCount = getItemCount();
  const subtotal = getSubtotal();

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      {/* Make the edge-to-edge panel, we'll add our own inner paddings */}
      <SheetContent className="w-full sm:max-w-lg p-0">
        {/* Sticky header with comfortable padding */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b">
          <SheetHeader className="px-5 sm:px-6 py-4">
            <SheetTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Your Cart
              {itemCount > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {itemCount} item{itemCount !== 1 ? "s" : ""}
                </Badge>
              )}
            </SheetTitle>
            <SheetDescription>
              Review your selected tickets before checkout
            </SheetDescription>
          </SheetHeader>
        </div>

        {/* Body */}
        <div className="flex h-full flex-col">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center px-6 py-10">
              <div className="text-center space-y-4">
                <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto" />
                <div className="space-y-1">
                  <p className="font-medium">Your cart is empty</p>
                  <p className="text-sm text-muted-foreground">
                    Add some tickets to get started
                  </p>
                </div>
                <Button onClick={closeCart} asChild>
                  <Link href="/events">Browse Events</Link>
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Scroll area with inner padding */}
              <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-6 space-y-5">
                {items.map((item) => (
                  <div key={item.id} className="rounded-lg border p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm leading-tight line-clamp-2">
                          {item.eventTitle}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {item.ticketTierName}
                        </p>
                        {item.seatInfo && (
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {item.seatInfo.section} • Row {item.seatInfo.row} •
                            Seat {item.seatInfo.seat}
                          </p>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-muted-foreground hover:text-destructive"
                        aria-label={`Remove ${item.eventTitle}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {!item.seatInfo && (
                          <>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              disabled={item.quantity <= 1}
                              className="h-8 w-8"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-9 text-center text-sm font-medium tabular-nums">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              disabled={item.quantity >= 8}
                              className="h-8 w-8"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          {formatPrice(item.price * item.quantity * 100)}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-xs text-muted-foreground">
                            {formatPrice(item.price * 100)} each
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sticky footer with clear separation and roomy padding */}
              <div className="sticky bottom-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-t">
                <div className="px-5 sm:px-6 py-4 space-y-4">
                  <div className="flex items-center justify-between text-base sm:text-lg font-semibold">
                    <span>Subtotal</span>
                    <span className="tabular-nums">
                      {formatPrice(subtotal * 100)}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <Button
                      className="w-full"
                      size="lg"
                      asChild
                      onClick={closeCart}
                    >
                      <Link href="/checkout">Checkout Now</Link>
                    </Button>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        className="w-full bg-transparent"
                        asChild
                        onClick={closeCart}
                      >
                        <Link href="/cart">View Cart</Link>
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full"
                        onClick={closeCart}
                        asChild
                      >
                        <Link href="/events">Continue Shopping</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
