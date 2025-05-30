"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import type { Category } from "@/lib/types"
import { Smartphone, Shield, Headphones, Speaker, Battery, Cable, Monitor, BatteryCharging } from "lucide-react"

// Mapeamento de ícones por nome
const iconMap: Record<string, React.ElementType> = {
  Smartphone,
  Shield,
  Headphones,
  Speaker,
  Battery,
  Cable,
  Monitor,
  BatteryCharging,
}

export function CategoryGrid() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("/api/categories")
        if (!response.ok) {
          throw new Error("Falha ao carregar categorias")
        }
        const data = await response.json()
        setCategories(data)
      } catch (err) {
        setError("Erro ao carregar categorias")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-200 mx-auto mb-4"></div>
              <div className="h-6 bg-gray-200 rounded mb-2 w-1/2 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => {
        // Usar o ícone mapeado ou um padrão
        const IconComponent = category.icon && iconMap[category.icon] ? iconMap[category.icon] : Smartphone

        return (
          <Link key={category.id} href={`/categoria/${category.slug}`}>
            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              <CardContent className="p-6 text-center">
                <div
                  className={`${category.color || "bg-purple-500"} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                <p className="text-gray-600">{category.description}</p>
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}
