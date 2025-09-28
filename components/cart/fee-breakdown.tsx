import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/utils/format";
import { feeConfig } from "@/config/fees";

interface FeeBreakdownProps {
  subtotal: number; // in currency units
  appliedCoupon?: {
    code: string;
    type: "percent" | "amount";
    value: number;
    discount: number; // in currency units
  };
}

export function FeeBreakdown({ subtotal, appliedCoupon }: FeeBreakdownProps) {
  // Clean math (no booking or processing fees)
  const discount = appliedCoupon?.discount ?? 0;
  const subtotalAfterDiscount = Math.max(0, subtotal - discount);

  const vat = feeConfig.displayVat
    ? (subtotalAfterDiscount * feeConfig.vatPercent) / 100
    : 0;

  const total = subtotalAfterDiscount + vat;

  return (
    <div className="rounded-lg border bg-card p-4 sm:p-5">
      <div className="space-y-3 text-sm">
        {/* Subtotal */}
        <div className="flex items-baseline justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="tabular-nums font-medium">
            {formatPrice(subtotal * 100)}
          </span>
        </div>

        {/* Discount */}
        {appliedCoupon && discount > 0 && (
          <div className="flex items-baseline justify-between text-emerald-600">
            <span className="flex items-center gap-2">
              Discount
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                {appliedCoupon.code}
              </span>
            </span>
            <span className="tabular-nums">
              -{formatPrice(discount * 100)}
            </span>
          </div>
        )}

        {/* VAT */}
        {feeConfig.displayVat && (
          <div className="flex items-baseline justify-between text-muted-foreground">
            <span>VAT ({feeConfig.vatPercent}%)</span>
            <span className="tabular-nums">{formatPrice(vat * 100)}</span>
          </div>
        )}

        <Separator className="my-1.5" />

        {/* Total */}
        <div className="flex items-baseline justify-between text-base md:text-lg font-semibold">
          <span>Total</span>
          <span className="tabular-nums">{formatPrice(total * 100)}</span>
        </div>

        {/* Helper notes */}
        <div className="text-xs text-muted-foreground">
          {feeConfig.displayVat ? (
            <span>Price includes VAT.</span>
          ) : (
            <span>VAT not applied.</span>
          )}
          {appliedCoupon && discount > 0 && (
            <span className="ml-2">
              You save {formatPrice(discount * 100)}.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
