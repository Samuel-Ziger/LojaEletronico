"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { createClientSupabaseClient } from "@/lib/supabase"
import Link from "next/link"
import { User } from "lucide-react"

export function AuthButton() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClientSupabaseClient()

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

  if (loading) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <User className="h-5 w-5" />
      </Button>
    )
  }

  if (user) {
    return (
      <Button variant="ghost" size="icon" asChild>
        <Link href="/minha-conta">
          <User className="h-5 w-5" />
        </Link>
      </Button>
    )
  }

  return (
    <Button variant="ghost" size="icon" asChild>
      <Link href="/login">
        <User className="h-5 w-5" />
      </Link>
    </Button>
  )
}
