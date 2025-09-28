"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  min?: number;
  max?: number;
  step?: number;
  currency?: string; // "Rs"
};

function clamp(n: number, lo: number, hi: number) {
  return Math.min(Math.max(n, lo), hi);
}

export function PriceFilter({
  min = 0,
  max = 5000,
  step = 50,
  currency = "Rs",
}: Props) {
  const router = useRouter();
  const sp = useSearchParams();

  const urlMin = Number(sp.get("price_min") ?? min);
  const urlMax = Number(sp.get("price_max") ?? max);

  const [values, setValues] = React.useState<[number, number]>([
    clamp(isNaN(urlMin) ? min : urlMin, min, max),
    clamp(isNaN(urlMax) ? max : urlMax, min, max),
  ]);

  // debounce route updates
  React.useEffect(() => {
    const t = setTimeout(() => {
      const params = new URLSearchParams(sp.toString());
      params.set("price_min", String(values[0]));
      params.set("price_max", String(values[1]));
      router.replace(`?${params.toString()}`, { scroll: false });
    }, 250);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  const onInput = (idx: 0 | 1) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    setValues((prev) => {
      const next: [number, number] = [...prev] as any;
      next[idx] = isNaN(v) ? prev[idx] : clamp(v, min, max);
      // keep order (min <= max)
      if (next[0] > next[1]) {
        if (idx === 0) next[1] = next[0];
        else next[0] = next[1];
      }
      return next;
    });
  };

  const reset = () => setValues([min, max]);

  return (
    <div className="mb-8 rounded-lg border bg-background p-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <div className="text-sm font-medium">Filter by price</div>
          <div className="text-xs text-muted-foreground">
            {currency} {values[0].toLocaleString()} – {currency}{" "}
            {values[1].toLocaleString()}
          </div>
        </div>

        <div className="flex w-full max-w-xl flex-col gap-3">
          <Slider
            value={values}
            onValueChange={(v) => setValues([v[0], v[1]] as [number, number])}
            min={min}
            max={max}
            step={step}
            className="w-full"
          />
          <div className="grid grid-cols-2 items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{currency}</span>
              <Input
                type="number"
                inputMode="numeric"
                min={min}
                max={max}
                step={step}
                value={values[0]}
                onChange={onInput(0)}
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{currency}</span>
              <Input
                type="number"
                inputMode="numeric"
                min={min}
                max={max}
                step={step}
                value={values[1]}
                onChange={onInput(1)}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end md:justify-normal">
          <Button variant="outline" onClick={reset}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
