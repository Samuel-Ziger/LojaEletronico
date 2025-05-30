"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, ShoppingCart, User, Menu, Heart, Smartphone, Headphones, Battery } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

export function Header() {
  const { cart } = useCart()

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-2 text-sm border-b">
          <div className="text-gray-600">Frete grátis para compras acima de R$ 199</div>
          <div className="flex items-center gap-4">
            <Link href="/rastreamento" className="text-gray-600 hover:text-purple-600">
              Rastrear Pedido
            </Link>
            <Link href="/contato" className="text-gray-600 hover:text-purple-600">
              Contato
            </Link>
          </div>
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-lg">
              <Smartphone className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              TechStore
            </span>
          </Link>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input type="search" placeholder="Buscar produtos..." className="pl-10 pr-4" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Heart className="h-5 w-5" />
            </Button>

            <Link href="/carrinho">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cart.itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500">
                    {cart.itemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Minha Conta</DropdownMenuItem>
                <DropdownMenuItem>Meus Pedidos</DropdownMenuItem>
                <DropdownMenuItem>Lista de Desejos</DropdownMenuItem>
                <DropdownMenuItem>Sair</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col space-y-4 mt-8">
                  <Input type="search" placeholder="Buscar produtos..." className="mb-4" />
                  <Link href="/produtos" className="text-lg font-medium">
                    Todos os Produtos
                  </Link>
                  <Link href="/categoria/capas" className="text-lg font-medium">
                    Capas
                  </Link>
                  <Link href="/categoria/peliculas" className="text-lg font-medium">
                    Películas
                  </Link>
                  <Link href="/categoria/fones" className="text-lg font-medium">
                    Fones de Ouvido
                  </Link>
                  <Link href="/categoria/carregadores" className="text-lg font-medium">
                    Carregadores
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8 py-3">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center space-x-1 text-gray-700 hover:text-purple-600">
              <Smartphone className="h-4 w-4" />
              <span>Capas & Películas</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Capas iPhone</DropdownMenuItem>
              <DropdownMenuItem>Capas Samsung</DropdownMenuItem>
              <DropdownMenuItem>Películas 3D</DropdownMenuItem>
              <DropdownMenuItem>Películas Privacidade</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center space-x-1 text-gray-700 hover:text-purple-600">
              <Headphones className="h-4 w-4" />
              <span>Áudio</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Fones Bluetooth</DropdownMenuItem>
              <DropdownMenuItem>Fones com Fio</DropdownMenuItem>
              <DropdownMenuItem>Caixas de Som</DropdownMenuItem>
              <DropdownMenuItem>Soundbars</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center space-x-1 text-gray-700 hover:text-purple-600">
              <Battery className="h-4 w-4" />
              <span>Carregamento</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Carregadores Rápidos</DropdownMenuItem>
              <DropdownMenuItem>Cabos USB-C</DropdownMenuItem>
              <DropdownMenuItem>Carregadores Sem Fio</DropdownMenuItem>
              <DropdownMenuItem>Power Banks</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/ofertas" className="text-red-600 font-medium hover:text-red-700">
            Ofertas
          </Link>

          <Link href="/lancamentos" className="text-gray-700 hover:text-purple-600">
            Lançamentos
          </Link>
        </nav>
      </div>
    </header>
  )
}
