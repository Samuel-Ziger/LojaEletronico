import type React from "react"
import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { AccountSidebar } from "@/components/account/account-sidebar"

export const metadata = {
  title: "Minha Conta - TechStore",
  description: "Gerencie seus dados, pedidos e preferências",
}

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  // Verificar se o usuário está autenticado
  const session = await getSession()
  if (!session) {
    redirect("/login?redirectTo=/minha-conta")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Minha Conta</h1>

      <div className="grid md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <AccountSidebar userId={session.user.id} />
        </div>
        <div className="md:col-span-3">{children}</div>
      </div>
    </div>
  )
}
