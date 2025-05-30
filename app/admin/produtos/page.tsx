import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createServerSupabaseClient } from "@/lib/supabase"
import { Plus } from "lucide-react"
import Link from "next/link"
import { ProductsTable } from "@/components/admin/products-table"

export default async function AdminProductsPage() {
  const supabase = createServerSupabaseClient()

  const { data: products } = await supabase
    .from("products")
    .select(`
      *,
      category:categories(name)
    `)
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Produtos</h1>
          <p className="text-gray-600">Gerencie os produtos da loja</p>
        </div>
        <Button asChild>
          <Link href="/admin/produtos/novo">
            <Plus className="h-4 w-4 mr-2" />
            Novo Produto
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Produtos</CardTitle>
          <CardDescription>{products?.length || 0} produtos cadastrados</CardDescription>
        </CardHeader>
        <CardContent>
          <ProductsTable products={products || []} />
        </CardContent>
      </Card>
    </div>
  )
}
