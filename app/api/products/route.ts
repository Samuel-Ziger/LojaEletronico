import { createServerSupabaseClient } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const featured = searchParams.get("featured")
  const limit = searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")!) : 100

  const supabase = createServerSupabaseClient()

  let query = supabase
    .from("products")
    .select("*, category:categories(*)")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(limit)

  if (category) {
    // Buscar pelo slug da categoria
    const { data: categoryData } = await supabase.from("categories").select("id").eq("slug", category).single()

    if (categoryData) {
      query = query.eq("category_id", categoryData.id)
    }
  }

  if (featured === "true") {
    query = query.eq("is_featured", true)
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
