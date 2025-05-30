"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { createClientSupabaseClient } from "@/lib/supabase"
import { useAdmin } from "@/hooks/use-admin"
import { Shield } from "lucide-react"
import Link from "next/link"
import type { User } from "@supabase/supabase-js"

export function AdminAccessButton() {
  const [user, setUser] = useState<User | null>(null)
  const supabase = createClientSupabaseClient()
  const { isAdmin, loading } = useAdmin(user)

  useEffect(() => {
    async function getUser() {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setUser(session?.user || null)
    }

    getUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  if (loading || !user || !isAdmin) {
    return null
  }

  return (
    <Button variant="outline" size="sm" asChild>
      <Link href="/admin">
        <Shield className="h-4 w-4 mr-2" />
        Admin
      </Link>
    </Button>
  )
}
