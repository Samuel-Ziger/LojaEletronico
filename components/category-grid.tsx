import { Card, CardContent } from "@/components/ui/card"
import { Smartphone, Shield, Headphones, Speaker, Battery, Cable } from "lucide-react"
import Link from "next/link"

const categories = [
  {
    id: "capas",
    name: "Capas",
    icon: Smartphone,
    description: "Proteção e estilo para seu celular",
    color: "bg-blue-500",
  },
  {
    id: "peliculas",
    name: "Películas",
    icon: Shield,
    description: "Proteção de tela premium",
    color: "bg-green-500",
  },
  {
    id: "fones",
    name: "Fones de Ouvido",
    icon: Headphones,
    description: "Som de alta qualidade",
    color: "bg-purple-500",
  },
  {
    id: "caixas-som",
    name: "Caixas de Som",
    icon: Speaker,
    description: "Áudio potente e claro",
    color: "bg-red-500",
  },
  {
    id: "carregadores",
    name: "Carregadores",
    icon: Battery,
    description: "Carregamento rápido e seguro",
    color: "bg-yellow-500",
  },
  {
    id: "cabos",
    name: "Cabos",
    icon: Cable,
    description: "Conectividade confiável",
    color: "bg-indigo-500",
  },
]

export function CategoryGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => {
        const IconComponent = category.icon
        return (
          <Link key={category.id} href={`/categoria/${category.id}`}>
            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              <CardContent className="p-6 text-center">
                <div
                  className={`${category.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
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
