import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart } from "lucide-react"
import Image from "next/image"

// Simulando dados de produtos - em produção, estes viriam da API do Shopify
const featuredProducts = [
  {
    id: "1",
    name: "Capa iPhone 14 Pro Max Transparente",
    price: "R$ 49,90",
    originalPrice: "R$ 69,90",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 124,
    badge: "Mais Vendido",
  },
  {
    id: "2",
    name: "Película 3D Samsung Galaxy S23",
    price: "R$ 29,90",
    originalPrice: "R$ 39,90",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 89,
    badge: "Novo",
  },
  {
    id: "3",
    name: "Fone Bluetooth Premium",
    price: "R$ 199,90",
    originalPrice: "R$ 299,90",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviews: 256,
    badge: "Oferta",
  },
  {
    id: "4",
    name: "Carregador Rápido 65W",
    price: "R$ 89,90",
    originalPrice: "R$ 119,90",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    reviews: 178,
    badge: "Desconto",
  },
]

export function FeaturedProducts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {featuredProducts.map((product) => (
        <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
          <div className="relative">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={300}
              height={300}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600">{product.badge}</Badge>
          </div>

          <CardContent className="p-4">
            <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>

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
              <span className="text-sm text-gray-600">({product.reviews})</span>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold text-green-600">{product.price}</span>
              <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
            </div>

            <Button className="w-full bg-purple-600 hover:bg-purple-700">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Adicionar ao Carrinho
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
