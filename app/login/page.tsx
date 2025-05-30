import { AuthForm } from "@/components/auth/auth-form"
import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"

export const metadata = {
  title: "Login - TechStore",
  description: "Entre na sua conta ou crie uma nova para acessar sua área de cliente",
}

export default async function LoginPage() {
  // Verificar se o usuário já está logado
  const session = await getSession()
  if (session) {
    redirect("/minha-conta")
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Acesse sua conta</h1>
        <AuthForm />
      </div>
    </div>
  )
}
