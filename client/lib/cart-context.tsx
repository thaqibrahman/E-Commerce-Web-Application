"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { apiClient } from "./api"
import { useAuth } from "./auth-context"
import type { Product } from "./data"

export interface CartItem {
  product: Product
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (product: Product, quantity?: number) => Promise<void>
  removeItem: (productId: string) => Promise<void>
  updateQuantity: (productId: string, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
  totalItems: number
  totalPrice: number
  loading: boolean
  refreshCart: () => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { isAuthenticated } = useAuth()

  const refreshCart = useCallback(async () => {
    try {
      const cartData = await apiClient.getCart()
      if (!cartData || !Array.isArray(cartData.items)) {
        setItems([])
        return
      }
      // Transform backend cart data to frontend format
      const transformedItems: CartItem[] = cartData.items.map((item: any) => ({
        product: {
          id: item.product._id,
          name: item.product.name,
          description: item.product.description,
          price: item.product.price,
          image: item.product.image || '',
          category: item.product.category,
          rating: 0, // Not in backend
          reviewCount: 0, // Not in backend
          inStock: item.product.countInStock > 0,
        },
        quantity: item.quantity,
      }))
      setItems(transformedItems)
    } catch (error: any) {
      if (error?.message?.toLowerCase().includes('not authorized')) {
        setItems([])
        localStorage.removeItem('token')
      } else {
        console.error('Failed to load cart:', error)
      }
    }
  }, [])

  useEffect(() => {
    refreshCart()
  }, [refreshCart])

  const addItem = useCallback(async (product: Product, quantity = 1) => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    setLoading(true)
    try {
      await apiClient.addToCart({ productId: product.id, quantity })
      await refreshCart()
    } catch (error: any) {
      if (error?.message?.toLowerCase().includes('not authorized')) {
        console.warn('Cart add blocked: not authorized. Redirecting to login.')
        localStorage.removeItem('token')
        router.push('/login')
        return
      }
      console.error('Failed to add item to cart:', error)
    } finally {
      setLoading(false)
    }
  }, [refreshCart, isAuthenticated, router])

  const removeItem = useCallback(async (productId: string) => {
    setLoading(true)
    try {
      await apiClient.removeFromCart(productId)
      await refreshCart()
    } catch (error) {
      console.error('Failed to remove item from cart:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [refreshCart])

  const updateQuantity = useCallback(async (productId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeItem(productId)
      return
    }
    // For update, we can remove and add, or implement update endpoint
    setLoading(true)
    try {
      await removeItem(productId)
      if (quantity > 0) {
        await apiClient.addToCart({ productId, quantity })
      }
      await refreshCart()
    } catch (error) {
      console.error('Failed to update quantity:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [removeItem, refreshCart])

  const clearCart = useCallback(async () => {
    setLoading(true)
    try {
      await apiClient.clearCart()
      setItems([])
    } catch (error) {
      console.error('Failed to clear cart:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    loading,
    refreshCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
