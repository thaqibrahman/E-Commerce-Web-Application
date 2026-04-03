"use client"

import { useState, use } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Star, ShoppingCart, Minus, Plus, ChevronLeft, Truck, Shield, RotateCcw, Check, Heart, Share2 } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/lib/cart-context"
import { getProductById, getReviewsByProductId, products, type Product } from "@/lib/data"
import { cn, formatPrice } from "@/lib/utils"
import { ProductCard } from "@/components/product-card"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isAdding, setIsAdding] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { addItem } = useCart()

  const product = getProductById(id)
  const reviews = getReviewsByProductId(id)

  if (!product) {
    notFound()
  }

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0

  // Get related products (same category, excluding current)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const handleAddToCart = () => {
    setIsAdding(true)
    addItem(product, quantity)
    setTimeout(() => {
      setIsAdding(false)
      setQuantity(1)
    }, 1500)
  }

  // Mock multiple images
  const productImages = [
    product.image,
    product.image.replace("w=400", "w=401"),
    product.image.replace("w=400", "w=402"),
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="mb-6 animate-in fade-in slide-in-from-top-4 duration-300">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors group"
            >
              <ChevronLeft className="h-4 w-4 mr-1 transition-transform group-hover:-translate-x-1" />
              Back to Products
            </Link>
          </nav>

          {/* Product Details */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Gallery */}
            <div className="space-y-4 animate-in fade-in slide-in-from-left-8 duration-500">
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted group">
                <Image
                  src={productImages[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {discount > 0 && (
                  <span className="absolute top-4 left-4 rounded-full bg-destructive px-4 py-1.5 text-sm font-bold text-destructive-foreground shadow-lg">
                    -{discount}% OFF
                  </span>
                )}
                {/* Action buttons */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-card/90 backdrop-blur-sm shadow-lg transition-all hover:scale-110"
                  >
                    <Heart
                      className={cn(
                        "h-5 w-5 transition-colors",
                        isWishlisted ? "fill-destructive text-destructive" : "text-muted-foreground"
                      )}
                    />
                  </button>
                  <button className="flex h-10 w-10 items-center justify-center rounded-full bg-card/90 backdrop-blur-sm shadow-lg transition-all hover:scale-110">
                    <Share2 className="h-5 w-5 text-muted-foreground" />
                  </button>
                </div>
              </div>
              <div className="flex gap-3">
                {productImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={cn(
                      "relative w-20 h-20 rounded-xl overflow-hidden bg-muted border-2 transition-all duration-200",
                      selectedImage === i
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-transparent hover:border-muted-foreground/30"
                    )}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} thumbnail ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500 delay-200">
              <div>
                <p className="text-sm text-primary font-semibold mb-2 uppercase tracking-wide">
                  {product.category}
                </p>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                  {product.name}
                </h1>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 bg-success/10 px-3 py-1.5 rounded-full">
                  <Star className="h-4 w-4 fill-success text-success" />
                  <span className="text-sm font-semibold text-success">{product.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.reviewCount.toLocaleString("en-IN")} ratings & reviews
                </span>
              </div>

              {/* Price */}
              <div className="p-4 bg-muted/50 rounded-xl">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-4xl font-bold text-foreground">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-xl text-muted-foreground line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                      <span className="text-sm font-semibold text-success bg-success/10 px-2 py-1 rounded">
                        Save {formatPrice(product.originalPrice - product.price)}
                      </span>
                    </>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-2">Inclusive of all taxes</p>
              </div>

              <Separator />

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "h-3 w-3 rounded-full animate-pulse",
                    product.inStock ? "bg-success" : "bg-destructive"
                  )}
                />
                <span
                  className={cn(
                    "text-sm font-semibold",
                    product.inStock ? "text-success" : "text-destructive"
                  )}
                >
                  {product.inStock ? "In Stock - Ready to ship" : "Out of Stock"}
                </span>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center border border-border rounded-xl overflow-hidden">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-none h-12 w-12"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-14 text-center font-semibold text-lg">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-none h-12 w-12"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={!product.inStock || isAdding}
                  className={cn(
                    "flex-1 h-12 text-base transition-all duration-300",
                    isAdding && "bg-success hover:bg-success"
                  )}
                >
                  {isAdding ? (
                    <>
                      <Check className="mr-2 h-5 w-5 animate-in zoom-in duration-200" />
                      Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Add to Cart
                    </>
                  )}
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 border border-border/50 transition-colors hover:border-primary/30">
                  <Truck className="h-5 w-5 text-primary shrink-0" />
                  <div>
                    <p className="text-sm font-semibold">Free Delivery</p>
                    <p className="text-xs text-muted-foreground">Orders ₹4,000+</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 border border-border/50 transition-colors hover:border-primary/30">
                  <Shield className="h-5 w-5 text-primary shrink-0" />
                  <div>
                    <p className="text-sm font-semibold">2 Year Warranty</p>
                    <p className="text-xs text-muted-foreground">Full coverage</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 border border-border/50 transition-colors hover:border-primary/30">
                  <RotateCcw className="h-5 w-5 text-primary shrink-0" />
                  <div>
                    <p className="text-sm font-semibold">Easy Returns</p>
                    <p className="text-xs text-muted-foreground">30 day policy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="mt-16 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-300">
            <Tabs defaultValue="reviews" className="w-full">
              <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 gap-8">
                <TabsTrigger
                  value="reviews"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent pb-4 px-0 text-base font-medium"
                >
                  Reviews ({reviews.length})
                </TabsTrigger>
                <TabsTrigger
                  value="specifications"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent pb-4 px-0 text-base font-medium"
                >
                  Specifications
                </TabsTrigger>
              </TabsList>
              <TabsContent value="reviews" className="mt-8">
                {reviews.length > 0 ? (
                  <div className="space-y-4">
                    {reviews.map((review, index) => (
                      <Card 
                        key={review.id} 
                        className="transition-all duration-300 hover:shadow-md animate-in fade-in slide-in-from-bottom-4"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="text-sm font-semibold text-primary">
                                  {review.userName.charAt(0)}
                                </span>
                              </div>
                              <div>
                                <p className="font-semibold text-foreground">
                                  {review.userName}
                                </p>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <div className="flex">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                      <Star
                                        key={i}
                                        className={cn(
                                          "h-3.5 w-3.5",
                                          i < review.rating
                                            ? "fill-warning text-warning"
                                            : "fill-muted text-muted"
                                        )}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-xs text-muted-foreground">
                                    {new Date(review.date).toLocaleDateString("en-IN", {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric"
                                    })}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <p className="mt-4 text-muted-foreground leading-relaxed">
                            {review.comment}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <p className="text-muted-foreground">
                      No reviews yet. Be the first to review this product!
                    </p>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="specifications" className="mt-8">
                <Card>
                  <CardContent className="p-6">
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <dt className="text-sm text-muted-foreground mb-1">Category</dt>
                        <dd className="font-semibold">{product.category}</dd>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <dt className="text-sm text-muted-foreground mb-1">Availability</dt>
                        <dd className="font-semibold">
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </dd>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <dt className="text-sm text-muted-foreground mb-1">Rating</dt>
                        <dd className="font-semibold">{product.rating} / 5</dd>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <dt className="text-sm text-muted-foreground mb-1">Reviews</dt>
                        <dd className="font-semibold">
                          {product.reviewCount.toLocaleString("en-IN")}
                        </dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-16 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-400">
              <h2 className="text-2xl font-bold text-foreground mb-8">
                You might also like
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard key={relatedProduct.id} product={relatedProduct} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
