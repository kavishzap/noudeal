"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { categories } from "@/data/events";
import { Card } from "@/components/ui/card";

interface FilterState {
  query: string;
  category: string;
  city: string;
  dateRange: string;
  priceRange: string;
  sortBy: string;
}

interface EventFiltersProps {
  onFiltersChange: (filters: FilterState) => void;
}

export function EventFilters({ onFiltersChange }: EventFiltersProps) {
  const router = useRouter();
  const sp = useSearchParams();

  const [filters, setFilters] = useState<FilterState>({
    query: sp.get("query") || "",
    category: sp.get("category") || "all",
    city: sp.get("city") || "all",
    dateRange: sp.get("dateRange") || "all",
    priceRange: sp.get("priceRange") || "all",
    sortBy: sp.get("sortBy") || "trending",
  });

  const cities = [
    { id: "all", name: "All Cities" },
    { id: "port-louis", name: "Port Louis" },
    { id: "ebene", name: "Ebène" },
    { id: "flic-en-flac", name: "Flic-en-Flac" },
    { id: "rose-hill", name: "Rose Hill" },
    { id: "pamplemousses", name: "Pamplemousses" },
    { id: "moka", name: "Moka" },
  ];

  const dateRanges = [
    { id: "all", name: "Any Time" },
    { id: "today", name: "Today" },
    { id: "tomorrow", name: "Tomorrow" },
    { id: "this-week", name: "This Week" },
    { id: "this-month", name: "This Month" },
    { id: "next-month", name: "Next Month" },
  ];

  const priceRanges = [
    { id: "all", name: "Any Price" },
    { id: "0-500", name: "Under Rs 500" },
    { id: "500-1000", name: "Rs 500 - Rs 1,000" },
    { id: "1000-2000", name: "Rs 1,000 - Rs 2,000" },
    { id: "2000+", name: "Rs 2,000+" },
  ];

  const sortOptions = [
    { id: "trending", name: "Trending" },
    { id: "date-asc", name: "Date (Earliest)" },
    { id: "date-desc", name: "Date (Latest)" },
    { id: "price-asc", name: "Price (Low to High)" },
    { id: "price-desc", name: "Price (High to Low)" },
  ];

  // Debounced URL sync for smoother UX
  useEffect(() => {
    onFiltersChange(filters);
    const t = setTimeout(() => {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([k, v]) => {
        if (v && v !== "all" && v !== "") params.set(k, v);
      });
      const url = params.toString() ? `/events?${params.toString()}` : "/events";
      router.replace(url, { scroll: false });
    }, 200);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const updateFilter = (key: keyof FilterState, value: string) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  const resetFilters = () =>
    setFilters({
      query: "",
      category: "all",
      city: "all",
      dateRange: "all",
      priceRange: "all",
      sortBy: "trending",
    });

  const activeFilterCount = useMemo(
    () =>
      Object.entries(filters).filter(
        ([key, value]) =>
          value && value !== "all" && value !== "" && key !== "sortBy"
      ).length,
    [filters]
  );

  return (
    <div className="space-y-3">
      {/* Compact toolbar card (no sidebar; dropdowns visible on mobile too) */}
      <Card className="border bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-3 py-3 md:px-4 md:py-3">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          {/* Search */}
          <div className="flex-1 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search events..."
                value={filters.query}
                onChange={(e) => updateFilter("query", e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {/* Inline dropdowns (show on all breakpoints) */}
          <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
            {/* Sort (Trending) */}
            <Select
              value={filters.sortBy}
              onValueChange={(v) => updateFilter("sortBy", v)}
            >
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent align="end">
                {sortOptions.map((o) => (
                  <SelectItem key={o.id} value={o.id}>
                    {o.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Price */}
            <Select
              value={filters.priceRange}
              onValueChange={(v) => updateFilter("priceRange", v)}
            >
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="Price" />
              </SelectTrigger>
              <SelectContent align="end">
                {priceRanges.map((range) => (
                  <SelectItem key={range.id} value={range.id}>
                    {range.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Active chips */}
      {activeFilterCount > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto py-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {filters.query && (
            <Badge variant="secondary" className="gap-1">
              Search: {filters.query}
              <X
                className="h-3 w-3 cursor-pointer opacity-70 hover:opacity-100"
                onClick={() => updateFilter("query", "")}
              />
            </Badge>
          )}
          {filters.category !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {categories.find((c) => c.id === filters.category)?.name}
              <X
                className="h-3 w-3 cursor-pointer opacity-70 hover:opacity-100"
                onClick={() => updateFilter("category", "all")}
              />
            </Badge>
          )}
          {filters.city !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {cities.find((c) => c.id === filters.city)?.name}
              <X
                className="h-3 w-3 cursor-pointer opacity-70 hover:opacity-100"
                onClick={() => updateFilter("city", "all")}
              />
            </Badge>
          )}
          {filters.dateRange !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {dateRanges.find((d) => d.id === filters.dateRange)?.name}
              <X
                className="h-3 w-3 cursor-pointer opacity-70 hover:opacity-100"
                onClick={() => updateFilter("dateRange", "all")}
              />
            </Badge>
          )}
          {filters.priceRange !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {priceRanges.find((p) => p.id === filters.priceRange)?.name}
              <X
                className="h-3 w-3 cursor-pointer opacity-70 hover:opacity-100"
                onClick={() => updateFilter("priceRange", "all")}
              />
            </Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 ml-1"
            onClick={resetFilters}
          >
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        </div>
      )}
    </div>
  );
}
