import { createServerSupabaseClient } from "./supabase"
import { redirect } from "next/navigation"

// Função para verificar se o usuário está autenticado no servidor
export async function getSession() {
  const supabase = createServerSupabaseClient()
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    return session
  } catch (error) {
    console.error("Erro ao obter sessão:", error)
    return null
  }
}

// Função para verificar se o usuário está autenticado e redirecionar se não estiver
export async function requireAuth() {
  const session = await getSession()
  if (!session) {
    redirect("/login?redirectTo=" + encodeURIComponent(window.location.pathname))
  }
  return session
}

// Função para obter o perfil do usuário
export async function getUserProfile(userId: string) {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.from("user_profiles").select("*").eq("id", userId).single()

  if (error) {
    console.error("Erro ao buscar perfil do usuário:", error)
    return null
  }

  return data
}
