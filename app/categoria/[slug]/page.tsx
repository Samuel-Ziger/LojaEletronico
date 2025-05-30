import { Suspense } from "react"
import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"
import { LoadingSpinner } from "@/components/loading-spinner"
import { createServerSupabaseClient } from "@/lib/supabase"
import { notFound } from "next/navigation"

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const supabase = createServerSupabaseClient()
  const { data: category } = await supabase
    .from("categories")
    .select("name, description")
    .eq("slug", params.slug)
    .single()

  if (!category) {
    return {
      title: "Categoria não encontrada",
      description: "A categoria que você está procurando não existe.",
    }
  }

  return {
    title: `${category.name} - TechStore`,
    description: category.description || `Confira nossa seleção de produtos na categoria ${category.name}.`,
  }
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const supabase = createServerSupabaseClient()
  const { data: category } = await supabase.from("categories").select("*").eq("slug", params.slug).single()

  if (!category) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{category.name}</h1>
        <p className="text-gray-600">{category.description}</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <ProductFilters />
        </aside>

        <main className="lg:col-span-3">
          <Suspense fallback={<LoadingSpinner />}>
            <ProductGrid categorySlug={params.slug} />
          </Suspense>
        </main>
      </div>
    </div>
  )
}
