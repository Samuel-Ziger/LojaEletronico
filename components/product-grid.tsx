"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Heart } from "lucide-react"
import Image from "next/image"
import type { Product } from "@/lib/types"
import Link from "next/link"

interface ProductGridProps {
  categorySlug?: string
}

export function ProductGrid({ categorySlug }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const url = categorySlug ? `/api/products?category=${categorySlug}` : "/api/products"

        const response = await fetch(url)
        if (!response.ok) {
          throw new Error("Falha ao carregar produtos")
        }
        const data = await response.json()
        setProducts(data)
      } catch (err) {
        setError("Erro ao carregar produtos")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [categorySlug])

  if (loading) {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <div className="h-6 bg-gray-200 rounded w-48"></div>
          <div className="h-10 bg-gray-200 rounded w-40"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-64 bg-gray-200"></div>
              <CardContent className="p-4">
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-3 w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded mb-4 w-1/2"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">{products.length} produtos encontrados</p>
        <select className="border rounded-lg px-3 py-2">
          <option>Ordenar por: Relevância</option>
          <option>Menor preço</option>
          <option>Maior preço</option>
          <option>Mais vendidos</option>
          <option>Melhor avaliados</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="relative">
              <Image
                src={product.image_url || "/placeholder.svg?height=300&width=300"}
                alt={product.name}
                width={300}
                height={300}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {product.badge && (
                <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600">{product.badge}</Badge>
              )}
              <Button variant="ghost" size="icon" className="absolute top-3 right-3 bg-white/80 hover:bg-white">
                <Heart className="h-4 w-4" />
              </Button>
            </div>

            <CardContent className="p-4">
              <div className="text-sm text-gray-500 mb-1">{product.category?.name}</div>
              <Link href={`/produto/${product.slug}`}>
                <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-purple-600 transition-colors">
                  {product.name}
                </h3>
              </Link>

              <div className="flex items-center gap-1 mb-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">({product.review_count})</span>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl font-bold text-green-600">
                  {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(product.price)}
                </span>
                {product.original_price && (
                  <span className="text-sm text-gray-500 line-through">
                    {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
                      product.original_price,
                    )}
                  </span>
                )}
              </div>

              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Adicionar ao Carrinho
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
