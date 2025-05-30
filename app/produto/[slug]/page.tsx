import { createServerSupabaseClient } from "@/lib/supabase"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Heart, Star, Truck, Shield, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { AddToCartButton } from "@/components/add-to-cart-button"

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const supabase = createServerSupabaseClient()
  const { data: product } = await supabase
    .from("products")
    .select("name, short_description")
    .eq("slug", params.slug)
    .single()

  if (!product) {
    return {
      title: "Produto não encontrado",
      description: "O produto que você está procurando não existe.",
    }
  }

  return {
    title: `${product.name} - TechStore`,
    description: product.short_description || product.name,
  }
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const supabase = createServerSupabaseClient()
  const { data: product } = await supabase
    .from("products")
    .select("*, category:categories(*)")
    .eq("slug", params.slug)
    .single()

  if (!product) {
    notFound()
  }

  // Buscar produtos relacionados da mesma categoria
  const { data: relatedProducts } = await supabase
    .from("products")
    .select("id, name, slug, price, image_url")
    .eq("category_id", product.category_id)
    .neq("id", product.id)
    .limit(4)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/produtos" className="text-gray-600 hover:text-purple-600 flex items-center">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para produtos
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Imagem do produto */}
        <div className="bg-white p-4 rounded-lg">
          <div className="relative aspect-square">
            <Image
              src={product.image_url || "/placeholder.svg?height=600&width=600"}
              alt={product.name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                {product.badge}
              </span>
            )}
          </div>
        </div>

        {/* Detalhes do produto */}
        <div>
          <div className="mb-2">
            <Link href={`/categoria/${product.category?.slug}`} className="text-purple-600 hover:underline">
              {product.category?.name}
            </Link>
          </div>

          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-600">({product.review_count} avaliações)</span>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl font-bold text-green-600">
              {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(product.price)}
            </span>
            {product.original_price && (
              <span className="text-lg text-gray-500 line-through">
                {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(product.original_price)}
              </span>
            )}
          </div>

          <div className="mb-6">
            <p className="text-gray-700 mb-4">{product.short_description}</p>

            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-1">
                <Truck className="h-4 w-4 text-green-600" />
                <span>Frete grátis</span>
              </div>
              <div className="flex items-center gap-1">
                <Shield className="h-4 w-4 text-blue-600" />
                <span>Garantia de 12 meses</span>
              </div>
            </div>

            <div className="text-sm text-gray-600 mb-4">
              <span className="font-medium">Disponibilidade:</span>{" "}
              {product.stock_quantity > 0 ? "Em estoque" : "Esgotado"}
            </div>

            {product.brand && (
              <div className="text-sm text-gray-600 mb-4">
                <span className="font-medium">Marca:</span> {product.brand}
              </div>
            )}

            {product.sku && (
              <div className="text-sm text-gray-600 mb-4">
                <span className="font-medium">SKU:</span> {product.sku}
              </div>
            )}
          </div>

          <div className="flex gap-4 mb-8">
            <AddToCartButton product={product} />
            <Button size="lg" variant="outline" className="border-gray-300">
              <Heart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Descrição completa */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Descrição</h2>
        <div className="prose max-w-none">
          <p>{product.description}</p>
        </div>
      </div>

      {/* Produtos relacionados */}
      {relatedProducts && relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Produtos Relacionados</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((relatedProduct) => (
              <Link key={relatedProduct.id} href={`/produto/${relatedProduct.slug}`}>
                <div className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="relative aspect-square mb-3">
                    <Image
                      src={relatedProduct.image_url || "/placeholder.svg?height=200&width=200"}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover rounded-md"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <h3 className="font-medium text-sm line-clamp-2">{relatedProduct.name}</h3>
                  <p className="text-green-600 font-bold mt-1">
                    {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
                      relatedProduct.price,
                    )}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
