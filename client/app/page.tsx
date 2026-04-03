"use client"

import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, ShoppingBag } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ProductCard } from "@/components/product-card"
import { ProductFilters } from "@/components/product-filters"
import { ProductGridSkeleton } from "@/components/product-skeleton"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { products, getFeaturedProducts } from "@/lib/data"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 30000])
  const [isLoading, setIsLoading] = useState(true)

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  const maxPrice = useMemo(
    () => Math.max(...products.map((p) => p.price)),
    []
  )

  const featuredProducts = useMemo(() => getFeaturedProducts(), [])

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
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar onSearch={setSearchQuery} searchQuery={searchQuery} />
      
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* Featured Products */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-10">
              <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Featured Products
                </h2>
                <p className="text-muted-foreground mt-1">
                  Handpicked products just for you
                </p>
              </div>
              <Button asChild variant="ghost" className="hidden sm:flex group animate-in fade-in slide-in-from-right-4 duration-500">
                <Link href="/products">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
            {isLoading ? (
              <ProductGridSkeleton count={4} />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
            <div className="mt-8 text-center sm:hidden">
              <Button asChild variant="outline" className="group">
                <Link href="/products">
                  View All Products
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* All Products with Filters */}
        <section className="py-12 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="mb-10 animate-in fade-in slide-in-from-top-4 duration-500">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                All Products
              </h2>
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
                {isLoading ? (
                  <ProductGridSkeleton count={6} />
                ) : filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredProducts.map((product, index) => (
                      <div
                        key={product.id}
                        className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 animate-in fade-in zoom-in-95 duration-300">
                    <div className="flex justify-center mb-6">
                      <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center">
                        <ShoppingBag className="h-10 w-10 text-muted-foreground" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      No products found
                    </h3>
                    <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                      Try adjusting your filters or search query to find what you&apos;re looking for.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchQuery("")
                        setSelectedCategory("All")
                        setPriceRange([0, maxPrice])
                      }}
                    >
                      Clear All Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
