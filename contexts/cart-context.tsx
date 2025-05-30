"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { Cart } from "@/lib/cart"
import type { Product } from "@/lib/types"
import {
  getCartFromStorage,
  addToCart as addToCartUtil,
  removeFromCart as removeFromCartUtil,
  updateCartItemQuantity as updateCartItemQuantityUtil,
  clearCart as clearCartUtil,
} from "@/lib/cart"

interface CartContextType {
  cart: Cart
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: number) => void
  updateCartItemQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  isLoading: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>({ items: [], total: 0, itemCount: 0 })
  const [isLoading, setIsLoading] = useState(true)

  // Carregar carrinho do localStorage na inicialização
  useEffect(() => {
    const savedCart = getCartFromStorage()
    setCart(savedCart)
    setIsLoading(false)
  }, [])

  const addToCart = (product: Product, quantity = 1) => {
    const updatedCart = addToCartUtil(product, quantity)
    setCart(updatedCart)

    // Mostrar notificação de sucesso
    if (typeof window !== "undefined") {
      // Você pode implementar um toast aqui
      console.log(`${product.name} adicionado ao carrinho!`)
    }
  }

  const removeFromCart = (productId: number) => {
    const updatedCart = removeFromCartUtil(productId)
    setCart(updatedCart)
  }

  const updateCartItemQuantity = (productId: number, quantity: number) => {
    const updatedCart = updateCartItemQuantityUtil(productId, quantity)
    setCart(updatedCart)
  }

  const clearCart = () => {
    const updatedCart = clearCartUtil()
    setCart(updatedCart)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart deve ser usado dentro de um CartProvider")
  }
  return context
}
