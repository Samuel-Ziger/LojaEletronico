"use client"

import { useEffect, useState } from "react"
import { createClientSupabaseClient } from "@/lib/supabase"
import type { User } from "@supabase/supabase-js"

interface AdminStatus {
  isAdmin: boolean
  isSuperAdmin: boolean
  permissions: Record<string, any>
  loading: boolean
}

export function useAdmin(user: User | null): AdminStatus {
  const [adminStatus, setAdminStatus] = useState<AdminStatus>({
    isAdmin: false,
    isSuperAdmin: false,
    permissions: {},
    loading: true,
  })

  const supabase = createClientSupabaseClient()

  useEffect(() => {
    async function checkAdminStatus() {
      if (!user) {
        setAdminStatus({
          isAdmin: false,
          isSuperAdmin: false,
          permissions: {},
          loading: false,
        })
        return
      }

      try {
        // Verificar roles do usuário
        const { data: roleAssignments } = await supabase
          .from("user_role_assignments")
          .select(`
            user_roles (
              name,
              permissions
            )
          `)
          .eq("user_id", user.id)

        let isAdmin = false
        let isSuperAdmin = false
        let allPermissions = {}

        if (roleAssignments && roleAssignments.length > 0) {
          roleAssignments.forEach((assignment: any) => {
            const roleName = assignment.user_roles?.name
            const permissions = assignment.user_roles?.permissions || {}

            if (roleName === "admin" || roleName === "super_admin") {
              isAdmin = true
            }
            if (roleName === "super_admin") {
              isSuperAdmin = true
            }

            // Merge permissions
            allPermissions = { ...allPermissions, ...permissions }
          })
        }

        // Se não tem role, verificar se está na lista de emails autorizados
        if (!isAdmin) {
          const { data: adminEmail } = await supabase
            .from("admin_emails")
            .select("role_name")
            .eq("email", user.email)
            .single()

          if (adminEmail) {
            isAdmin = true
            if (adminEmail.role_name === "super_admin") {
              isSuperAdmin = true
            }
          }
        }

        setAdminStatus({
          isAdmin,
          isSuperAdmin,
          permissions: allPermissions,
          loading: false,
        })
      } catch (error) {
        console.error("Erro ao verificar status de admin:", error)
        setAdminStatus({
          isAdmin: false,
          isSuperAdmin: false,
          permissions: {},
          loading: false,
        })
      }
    }

    checkAdminStatus()
  }, [user, supabase])

  return adminStatus
}
