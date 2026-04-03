"use client"

import { useState, useMemo, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { ProductCard } from "@/components/product-card"
import { ProductFilters } from "@/components/product-filters"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { products } from "@/lib/data"

function ProductsContent() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category") || "All"

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(categoryParam)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500])

  const maxPrice = useMemo(
    () => Math.max(...products.map((p) => p.price)),
    []
  )

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory

      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1]

      return matchesSearch && matchesCategory && matchesPrice
    })
  }, [searchQuery, selectedCategory, priceRange])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onSearch={setSearchQuery} searchQuery={searchQuery} />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">All Products</h1>
            <p className="text-muted-foreground mt-1">
              {filteredProducts.length} products found
            </p>
          </div>

          <div className="flex gap-8">
            {/* Filters Sidebar */}
            <ProductFilters
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              maxPrice={maxPrice}
            />

            {/* Products Grid */}
            <div className="flex-1">
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    No products found matching your criteria.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedCategory("All")
                      setPriceRange([0, maxPrice])
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ProductsContent />
    </Suspense>
  )
}
