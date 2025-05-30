import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-9xl font-bold text-purple-600 mb-4">404</h1>
      <h2 className="text-3xl font-bold mb-6">Página não encontrada</h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        A página que você está procurando não existe ou foi removida.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild size="lg">
          <Link href="/">
            <Home className="mr-2 h-5 w-5" />
            Voltar para a Home
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/produtos">
            <Search className="mr-2 h-5 w-5" />
            Ver Produtos
          </Link>
        </Button>
      </div>
    </div>
  )
}
