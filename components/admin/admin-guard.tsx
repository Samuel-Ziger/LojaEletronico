"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClientSupabaseClient } from "@/lib/supabase"
import { useAdmin } from "@/hooks/use-admin"
import { LoadingSpinner } from "@/components/loading-spinner"
import type { User } from "@supabase/supabase-js"

interface AdminGuardProps {
  children: React.ReactNode
  requireSuperAdmin?: boolean
}

export function AdminGuard({ children, requireSuperAdmin = false }: AdminGuardProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClientSupabaseClient()
  const { isAdmin, isSuperAdmin, loading: adminLoading } = useAdmin(user)

  useEffect(() => {
    async function getUser() {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setUser(session?.user || null)
      setLoading(false)
    }

    getUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  useEffect(() => {
    if (!loading && !adminLoading) {
      if (!user) {
        router.push("/login?redirectTo=/admin")
        return
      }

      if (requireSuperAdmin && !isSuperAdmin) {
        router.push("/")
        return
      }

      if (!requireSuperAdmin && !isAdmin) {
        router.push("/")
        return
      }
    }
  }, [user, isAdmin, isSuperAdmin, loading, adminLoading, router, requireSuperAdmin])

  if (loading || adminLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (!user || (!isAdmin && !isSuperAdmin)) {
    return null
  }

  if (requireSuperAdmin && !isSuperAdmin) {
    return null
  }

  return <>{children}</>
}
