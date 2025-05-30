import { createServerSupabaseClient } from "./supabase"
import type { User } from "@supabase/supabase-js"

export interface UserRole {
  id: number
  name: string
  description: string
  permissions: Record<string, any>
}

export interface UserWithRoles extends User {
  roles?: UserRole[]
  isAdmin?: boolean
  isSuperAdmin?: boolean
}

// Verificar se um usuário é administrador (servidor)
export async function isUserAdmin(userId: string): Promise<boolean> {
  const supabase = createServerSupabaseClient()

  try {
    // Verificar se o usuário tem role de admin
    const { data: roleAssignments } = await supabase
      .from("user_role_assignments")
      .select(`
        role_id,
        user_roles (
          name,
          permissions
        )
      `)
      .eq("user_id", userId)

    if (roleAssignments && roleAssignments.length > 0) {
      return roleAssignments.some(
        (assignment: any) => assignment.user_roles?.name === "admin" || assignment.user_roles?.name === "super_admin",
      )
    }

    // Verificar se o email está na lista de admins autorizados
    const { data: profile } = await supabase.from("user_profiles").select("email").eq("id", userId).single()

    if (profile?.email) {
      const { data: adminEmail } = await supabase
        .from("admin_emails")
        .select("email")
        .eq("email", profile.email)
        .single()

      return !!adminEmail
    }

    return false
  } catch (error) {
    console.error("Erro ao verificar admin:", error)
    return false
  }
}

// Obter roles do usuário
export async function getUserRoles(userId: string): Promise<UserRole[]> {
  const supabase = createServerSupabaseClient()

  try {
    const { data: roleAssignments } = await supabase
      .from("user_role_assignments")
      .select(`
        user_roles (
          id,
          name,
          description,
          permissions
        )
      `)
      .eq("user_id", userId)

    return roleAssignments?.map((assignment: any) => assignment.user_roles) || []
  } catch (error) {
    console.error("Erro ao obter roles:", error)
    return []
  }
}

// Verificar permissão específica
export async function hasPermission(userId: string, resource: string, action: string): Promise<boolean> {
  const roles = await getUserRoles(userId)

  return roles.some((role) => {
    const permissions = role.permissions as Record<string, any>
    return permissions[resource]?.[action] === true || permissions.system?.full_access === true
  })
}

// Atribuir role de admin automaticamente para emails autorizados
export async function assignAdminRoleIfAuthorized(userId: string, email: string): Promise<void> {
  const supabase = createServerSupabaseClient()

  try {
    // Verificar se o email está autorizado
    const { data: adminEmail } = await supabase.from("admin_emails").select("role_name").eq("email", email).single()

    if (adminEmail) {
      // Obter ID da role
      const { data: role } = await supabase.from("user_roles").select("id").eq("name", adminEmail.role_name).single()

      if (role) {
        // Atribuir role ao usuário (se ainda não tiver)
        await supabase.from("user_role_assignments").upsert({
          user_id: userId,
          role_id: role.id,
          assigned_by: userId,
          assigned_at: new Date().toISOString(),
        })
      }
    }
  } catch (error) {
    console.error("Erro ao atribuir role de admin:", error)
  }
}
