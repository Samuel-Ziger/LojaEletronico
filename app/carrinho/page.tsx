"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/contexts/cart-context"

export default function CartPage() {
  const { cart, updateCartItemQuantity, removeFromCart, clearCart } = useCart()

  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-4">Seu carrinho está vazio</h1>
        <p className="text-gray-600 mb-8">Adicione alguns produtos incríveis ao seu carrinho!</p>
        <Button asChild size="lg">
          <Link href="/produtos">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Continuar Comprando
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/produtos" className="text-gray-600 hover:text-purple-600 flex items-center">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Continuar comprando
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8">Carrinho de Compras</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Lista de produtos */}
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <Image
                      src={item.product.image_url || "/placeholder.svg?height=96&width=96"}
                      alt={item.product.name}
                      fill
                      className="object-cover rounded-md"
                      sizes="96px"
                    />
                  </div>

                  <div className="flex-1">
                    <Link href={`/produto/${item.product.slug}`}>
                      <h3 className="font-semibold text-lg hover:text-purple-600 transition-colors">
                        {item.product.name}
                      </h3>
                    </Link>
                    <p className="text-gray-600 text-sm mb-2">{item.product.category?.name}</p>
                    <p className="text-2xl font-bold text-green-600">
                      {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
                        item.product.price,
                      )}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateCartItemQuantity(item.product.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateCartItemQuantity(item.product.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="flex justify-between items-center pt-4">
            <Button variant="outline" onClick={clearCart}>
              Limpar Carrinho
            </Button>
            <p className="text-gray-600">{cart.itemCount} itens no carrinho</p>
          </div>
        </div>

        {/* Resumo do pedido */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Resumo do Pedido</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>
                    {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(cart.total)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Frete:</span>
                  <span className="text-green-600">{cart.total >= 199 ? "Grátis" : "R$ 15,90"}</span>
                </div>
                <hr />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>
                    {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
                      cart.total + (cart.total >= 199 ? 0 : 15.9),
                    )}
                  </span>
                </div>
              </div>

              {cart.total < 199 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                  <p className="text-sm text-yellow-800">
                    Adicione mais{" "}
                    {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(199 - cart.total)}{" "}
                    para ganhar frete grátis!
                  </p>
                </div>
              )}

              <Button size="lg" className="w-full bg-purple-600 hover:bg-purple-700 mb-3">
                Finalizar Compra
              </Button>

              <Button variant="outline" size="lg" className="w-full">
                <Link href="/produtos" className="flex items-center">
                  Continuar Comprando
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
