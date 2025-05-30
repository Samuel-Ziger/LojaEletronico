"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import type { Product } from "@/lib/types"

interface AddToCartButtonProps {
  product: Product
  quantity?: number
  className?: string
}

export function AddToCartButton({ product, quantity = 1, className }: AddToCartButtonProps) {
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart(product, quantity)
  }

  return (
    <Button
      size="lg"
      className={`bg-purple-600 hover:bg-purple-700 flex-1 ${className}`}
      onClick={handleAddToCart}
      disabled={product.stock_quantity === 0}
    >
      <ShoppingCart className="h-5 w-5 mr-2" />
      {product.stock_quantity === 0 ? "Esgotado" : "Adicionar ao Carrinho"}
    </Button>
  )
}
