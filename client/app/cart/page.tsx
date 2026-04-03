"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, ShieldCheck } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/lib/cart-context"
import { formatPrice } from "@/lib/utils"

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice, clearCart } = useCart()

  const freeShippingThreshold = 4000
  const shippingCost = totalPrice > freeShippingThreshold ? 0 : 99
  const tax = Math.round(totalPrice * 0.18)
  const finalTotal = totalPrice + shippingCost + tax

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-center mb-6">
              <div className="h-28 w-28 rounded-full bg-muted flex items-center justify-center">
                <ShoppingBag className="h-14 w-14 text-muted-foreground" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Your cart is empty
            </h1>
            <p className="text-muted-foreground mb-8 max-w-sm mx-auto leading-relaxed">
              Looks like you haven&apos;t added any items to your cart yet. 
              Start shopping to fill it up!
            </p>
            <Button asChild size="lg" className="group">
              <Link href="/">
                Continue Shopping
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Shopping Cart</h1>
              <p className="text-muted-foreground mt-1">
                {items.length} {items.length === 1 ? "item" : "items"} in your cart
              </p>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearCart} 
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Cart
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, index) => (
                <Card 
                  key={item.product.id} 
                  className="overflow-hidden transition-all duration-300 hover:shadow-lg animate-in fade-in slide-in-from-left-4"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex gap-4 sm:gap-6">
                      {/* Product Image */}
                      <Link href={`/product/${item.product.id}`} className="shrink-0 group">
                        <div className="relative h-24 w-24 sm:h-32 sm:w-32 rounded-xl overflow-hidden bg-muted">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="128px"
                          />
                        </div>
                      </Link>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                          <div>
                            <Link href={`/product/${item.product.id}`}>
                              <h3 className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-2">
                                {item.product.name}
                              </h3>
                            </Link>
                            <p className="text-sm text-muted-foreground mt-1">
                              {item.product.category}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg text-foreground">
                              {formatPrice(item.product.price * item.quantity)}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {formatPrice(item.product.price)} each
                            </p>
                          </div>
                        </div>

                        {/* Quantity & Remove */}
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center border border-border rounded-lg overflow-hidden">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-9 w-9 rounded-none hover:bg-muted"
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity - 1)
                              }
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-12 text-center text-sm font-semibold bg-muted/50">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-9 w-9 rounded-none hover:bg-muted"
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity + 1)
                              }
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => removeItem(item.product.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-20 shadow-lg animate-in fade-in slide-in-from-right-4 duration-500">
                <CardHeader className="pb-4">
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">
                      {shippingCost === 0 ? (
                        <span className="text-success">Free</span>
                      ) : (
                        formatPrice(shippingCost)
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">GST (18%)</span>
                    <span className="font-medium">{formatPrice(tax)}</span>
                  </div>
                  {totalPrice < freeShippingThreshold && (
                    <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                      <p className="text-sm text-primary font-medium">
                        Add {formatPrice(freeShippingThreshold - totalPrice)} more for free shipping!
                      </p>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="font-bold text-2xl text-foreground">
                      {formatPrice(finalTotal)}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                  <Button className="w-full group" size="lg">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/">Continue Shopping</Link>
                  </Button>
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-2">
                    <ShieldCheck className="h-4 w-4" />
                    <span>Secure checkout with SSL encryption</span>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
