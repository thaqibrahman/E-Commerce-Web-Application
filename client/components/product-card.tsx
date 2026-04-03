"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, ShoppingCart, Check, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useCart } from "@/lib/cart-context"
import type { Product } from "@/lib/data"
import { cn, formatPrice } from "@/lib/utils"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsAdding(true)
    addItem(product)
    setTimeout(() => setIsAdding(false), 1500)
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
  }

  return (
    <Card className="group relative overflow-hidden border-border/50 bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
      <Link href={`/product/${product.id}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/5" />
          
          {/* Discount Badge */}
          {discount > 0 && (
            <span className="absolute top-3 left-3 rounded-full bg-destructive px-2.5 py-1 text-xs font-semibold text-destructive-foreground shadow-lg animate-in fade-in slide-in-from-left-2 duration-300">
              -{discount}%
            </span>
          )}
          
          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            className={cn(
              "absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-card/90 backdrop-blur-sm shadow-lg transition-all duration-300",
              "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0",
              isWishlisted && "opacity-100 translate-y-0"
            )}
          >
            <Heart
              className={cn(
                "h-4 w-4 transition-colors duration-200",
                isWishlisted ? "fill-destructive text-destructive" : "text-muted-foreground hover:text-destructive"
              )}
            />
          </button>
          
          {/* Out of Stock Overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
              <span className="rounded-full bg-muted px-4 py-2 text-sm font-medium text-muted-foreground">
                Out of Stock
              </span>
            </div>
          )}
        </div>
      </Link>

      <CardContent className="p-4">
        <Link href={`/product/${product.id}`}>
          <p className="text-xs font-medium text-primary mb-1.5 tracking-wide uppercase">
            {product.category}
          </p>
          <h3 className="font-semibold text-foreground line-clamp-2 min-h-[2.75rem] leading-snug group-hover:text-primary transition-colors duration-200">
            {product.name}
          </h3>
        </Link>
        
        {/* Rating */}
        <div className="mt-2.5 flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-3.5 w-3.5 transition-colors",
                  i < Math.floor(product.rating)
                    ? "fill-warning text-warning"
                    : "fill-muted text-muted"
                )}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground font-medium">
            {product.rating} ({product.reviewCount.toLocaleString("en-IN")})
          </span>
        </div>
        
        {/* Price */}
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-xl font-bold text-foreground">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          disabled={!product.inStock || isAdding}
          className={cn(
            "w-full transition-all duration-300",
            isAdding && "bg-success hover:bg-success"
          )}
          size="default"
        >
          {isAdding ? (
            <>
              <Check className="mr-2 h-4 w-4 animate-in zoom-in duration-200" />
              Added!
            </>
          ) : (
            <>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
