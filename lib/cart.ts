import type { Product } from "./types"

export interface CartItem {
  id: number
  product: Product
  quantity: number
}

export interface Cart {
  items: CartItem[]
  total: number
  itemCount: number
}

// Funções para gerenciar o carrinho no localStorage
export const getCartFromStorage = (): Cart => {
  if (typeof window === "undefined") {
    return { items: [], total: 0, itemCount: 0 }
  }

  try {
    const cartData = localStorage.getItem("techstore-cart")
    if (cartData) {
      const cart = JSON.parse(cartData)
      return {
        ...cart,
        total: calculateCartTotal(cart.items),
        itemCount: calculateItemCount(cart.items),
      }
    }
  } catch (error) {
    console.error("Erro ao carregar carrinho:", error)
  }

  return { items: [], total: 0, itemCount: 0 }
}

export const saveCartToStorage = (cart: Cart): void => {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem("techstore-cart", JSON.stringify(cart))
  } catch (error) {
    console.error("Erro ao salvar carrinho:", error)
  }
}

export const calculateCartTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.product.price * item.quantity, 0)
}

export const calculateItemCount = (items: CartItem[]): number => {
  return items.reduce((count, item) => count + item.quantity, 0)
}

export const addToCart = (product: Product, quantity = 1): Cart => {
  const currentCart = getCartFromStorage()
  const existingItemIndex = currentCart.items.findIndex((item) => item.product.id === product.id)

  let updatedItems: CartItem[]

  if (existingItemIndex >= 0) {
    // Produto já existe no carrinho, atualizar quantidade
    updatedItems = currentCart.items.map((item, index) =>
      index === existingItemIndex ? { ...item, quantity: item.quantity + quantity } : item,
    )
  } else {
    // Novo produto no carrinho
    updatedItems = [...currentCart.items, { id: Date.now(), product, quantity }]
  }

  const updatedCart: Cart = {
    items: updatedItems,
    total: calculateCartTotal(updatedItems),
    itemCount: calculateItemCount(updatedItems),
  }

  saveCartToStorage(updatedCart)
  return updatedCart
}

export const removeFromCart = (productId: number): Cart => {
  const currentCart = getCartFromStorage()
  const updatedItems = currentCart.items.filter((item) => item.product.id !== productId)

  const updatedCart: Cart = {
    items: updatedItems,
    total: calculateCartTotal(updatedItems),
    itemCount: calculateItemCount(updatedItems),
  }

  saveCartToStorage(updatedCart)
  return updatedCart
}

export const updateCartItemQuantity = (productId: number, quantity: number): Cart => {
  const currentCart = getCartFromStorage()
  const updatedItems = currentCart.items
    .map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    .filter((item) => item.quantity > 0)

  const updatedCart: Cart = {
    items: updatedItems,
    total: calculateCartTotal(updatedItems),
    itemCount: calculateItemCount(updatedItems),
  }

  saveCartToStorage(updatedCart)
  return updatedCart
}

export const clearCart = (): Cart => {
  const emptyCart: Cart = { items: [], total: 0, itemCount: 0 }
  saveCartToStorage(emptyCart)
  return emptyCart
}
