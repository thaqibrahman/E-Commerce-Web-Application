"use client"

import Link from "next/link"
import { ArrowRight, Sparkles, Truck, Shield, RotateCcw, Percent } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5Qzk5REYiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
      
      <div className="container mx-auto px-4 py-12 md:py-20 lg:py-24 relative">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Content */}
          <div className="space-y-6 animate-in fade-in slide-in-from-left-8 duration-700">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary border border-primary/20">
              <Sparkles className="h-4 w-4 animate-pulse" />
              New Arrivals Available
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl text-balance">
              Discover Products
              <span className="block text-primary">You&apos;ll Love</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg text-pretty leading-relaxed">
              Shop the latest trends in electronics, fashion, home goods, and more. 
              Quality products at unbeatable prices with fast delivery across India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button asChild size="lg" className="group text-base">
                <Link href="/products">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base">
                <Link href="/products?category=Electronics">
                  Browse Electronics
                </Link>
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="flex items-center gap-3 group cursor-default">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 transition-colors duration-200 group-hover:bg-primary/20">
                  <Truck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Free Shipping</p>
                  <p className="text-xs text-muted-foreground">Orders over ₹4,000</p>
                </div>
              </div>
              <div className="flex items-center gap-3 group cursor-default">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 transition-colors duration-200 group-hover:bg-primary/20">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Secure Payment</p>
                  <p className="text-xs text-muted-foreground">100% protected</p>
                </div>
              </div>
              <div className="flex items-center gap-3 group cursor-default">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 transition-colors duration-200 group-hover:bg-primary/20">
                  <RotateCcw className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Easy Returns</p>
                  <p className="text-xs text-muted-foreground">30 day policy</p>
                </div>
              </div>
              <div className="flex items-center gap-3 group cursor-default">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 transition-colors duration-200 group-hover:bg-primary/20">
                  <Percent className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Best Prices</p>
                  <p className="text-xs text-muted-foreground">Price match guarantee</p>
                </div>
              </div>
            </div>
          </div>

          {/* Image Grid */}
          <div className="relative hidden lg:block animate-in fade-in slide-in-from-right-8 duration-700 delay-200">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="overflow-hidden rounded-2xl bg-muted aspect-[4/5] shadow-2xl shadow-primary/10 group">
                  <img
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop"
                    alt="Featured product - Smart Watch"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="overflow-hidden rounded-2xl bg-muted aspect-square shadow-xl group">
                  <img
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop"
                    alt="Featured product - Headphones"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="overflow-hidden rounded-2xl bg-muted aspect-square shadow-xl group">
                  <img
                    src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop"
                    alt="Featured product - Running Shoes"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="overflow-hidden rounded-2xl bg-muted aspect-[4/5] shadow-2xl shadow-primary/10 group">
                  <img
                    src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=500&fit=crop"
                    alt="Featured product - Leather Bag"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 h-72 w-72 rounded-full bg-primary/10 blur-3xl animate-pulse" />
            <div className="absolute -bottom-4 -left-4 h-72 w-72 rounded-full bg-accent/20 blur-3xl animate-pulse delay-1000" />
          </div>
        </div>
      </div>
    </section>
  )
}
