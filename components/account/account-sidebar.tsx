"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { createClientSupabaseClient } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { User, Home, Package, MapPin, Heart, LogOut } from "lucide-react"

interface AccountSidebarProps {
  userId: string
}

export function AccountSidebar({ userId }: AccountSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClientSupabaseClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  const menuItems = [
    {
      label: "Painel",
      href: "/minha-conta",
      icon: <Home className="h-4 w-4 mr-2" />,
      exact: true,
    },
    {
      label: "Meu Perfil",
      href: "/minha-conta/perfil",
      icon: <User className="h-4 w-4 mr-2" />,
    },
    {
      label: "Meus Pedidos",
      href: "/minha-conta/pedidos",
      icon: <Package className="h-4 w-4 mr-2" />,
    },
    {
      label: "Meus Endereços",
      href: "/minha-conta/enderecos",
      icon: <MapPin className="h-4 w-4 mr-2" />,
    },
    {
      label: "Lista de Desejos",
      href: "/minha-conta/lista-desejos",
      icon: <Heart className="h-4 w-4 mr-2" />,
    },
  ]

  const isActive = (href: string, exact = false) => {
    if (exact) {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <div className="space-y-2">
      {menuItems.map((item) => (
        <Link key={item.href} href={item.href}>
          <Button
            variant={isActive(item.href, item.exact) ? "default" : "ghost"}
            className={`w-full justify-start ${
              isActive(item.href, item.exact) ? "bg-purple-600 hover:bg-purple-700" : ""
            }`}
          >
            {item.icon}
            {item.label}
          </Button>
        </Link>
      ))}

      <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700" onClick={handleLogout}>
        <LogOut className="h-4 w-4 mr-2" />
        Sair
      </Button>
    </div>
  )
}
