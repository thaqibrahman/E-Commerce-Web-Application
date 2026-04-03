"use client"

import { useState } from "react"
import { ChevronDown, SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import { categories } from "@/lib/data"
import { cn, formatPrice } from "@/lib/utils"

interface ProductFiltersProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
  priceRange: [number, number]
  onPriceRangeChange: (range: [number, number]) => void
  maxPrice: number
}

function FilterContent({
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  maxPrice,
}: ProductFiltersProps) {
  const [categoryOpen, setCategoryOpen] = useState(true)
  const [priceOpen, setPriceOpen] = useState(true)

  const activeFilters = (selectedCategory !== "All" ? 1 : 0) + (priceRange[0] > 0 || priceRange[1] < maxPrice ? 1 : 0)

  return (
    <div className="space-y-6">
      {/* Active Filters Count */}
      {activeFilters > 0 && (
        <div className="flex items-center justify-between pb-2 border-b border-border">
          <span className="text-sm font-medium">
            {activeFilters} filter{activeFilters > 1 ? "s" : ""} active
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-xs"
            onClick={() => {
              onCategoryChange("All")
              onPriceRangeChange([0, maxPrice])
            }}
          >
            Clear all
          </Button>
        </div>
      )}

      {/* Categories */}
      <Collapsible open={categoryOpen} onOpenChange={setCategoryOpen}>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-semibold hover:text-primary transition-colors">
          Categories
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform duration-200",
              categoryOpen && "rotate-180"
            )}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-3 animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={cn(
                  "w-full text-left px-3 py-2.5 text-sm rounded-lg transition-all duration-200",
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground font-medium shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Price Range */}
      <Collapsible open={priceOpen} onOpenChange={setPriceOpen}>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-semibold hover:text-primary transition-colors">
          Price Range
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform duration-200",
              priceOpen && "rotate-180"
            )}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-6">
            <Slider
              value={priceRange}
              onValueChange={(value) =>
                onPriceRangeChange(value as [number, number])
              }
              max={maxPrice}
              step={500}
              className="w-full"
            />
            <div className="flex items-center justify-between">
              <div className="px-3 py-1.5 bg-muted rounded-lg">
                <span className="text-sm font-medium">
                  {formatPrice(priceRange[0])}
                </span>
              </div>
              <div className="h-px flex-1 bg-border mx-3" />
              <div className="px-3 py-1.5 bg-muted rounded-lg">
                <span className="text-sm font-medium">
                  {formatPrice(priceRange[1])}
                </span>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Reset Filters */}
      <Button
        variant="outline"
        size="sm"
        className="w-full mt-4"
        onClick={() => {
          onCategoryChange("All")
          onPriceRangeChange([0, maxPrice])
        }}
      >
        Reset Filters
      </Button>
    </div>
  )
}

export function ProductFilters(props: ProductFiltersProps) {
  const activeFilters = (props.selectedCategory !== "All" ? 1 : 0) + (props.priceRange[0] > 0 || props.priceRange[1] < props.maxPrice ? 1 : 0)

  return (
    <>
      {/* Desktop Filters */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-20 rounded-xl border border-border bg-card p-5 shadow-sm">
          <h2 className="font-semibold mb-4 flex items-center gap-2 text-foreground">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {activeFilters > 0 && (
              <Badge variant="secondary" className="ml-auto">
                {activeFilters}
              </Badge>
            )}
          </h2>
          <FilterContent {...props} />
        </div>
      </aside>

      {/* Mobile Filters */}
      <div className="lg:hidden mb-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {activeFilters > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {activeFilters}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent {...props} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
