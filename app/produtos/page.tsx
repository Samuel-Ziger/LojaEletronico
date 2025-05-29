import { Suspense } from "react"
import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"
import { LoadingSpinner } from "@/components/loading-spinner"

export const metadata = {
  title: "Produtos - TechStore",
  description: "Confira todos os nossos produtos: capas, películas, fones de ouvido, carregadores e muito mais.",
}

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Todos os Produtos</h1>
        <p className="text-gray-600">Encontre os melhores acessórios para seus dispositivos</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <ProductFilters />
        </aside>

        <main className="lg:col-span-3">
          <Suspense fallback={<LoadingSpinner />}>
            <ProductGrid />
          </Suspense>
        </main>
      </div>
    </div>
  )
}
