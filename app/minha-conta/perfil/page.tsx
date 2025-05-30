import { getSession } from "@/lib/auth"
import { createServerSupabaseClient } from "@/lib/supabase"
import { ProfileForm } from "@/components/account/profile-form"

export const metadata = {
  title: "Meu Perfil - TechStore",
  description: "Edite suas informações pessoais",
}

export default async function ProfilePage() {
  const session = await getSession()
  if (!session) return null

  const supabase = createServerSupabaseClient()
  const { data: profile } = await supabase.from("user_profiles").select("*").eq("id", session.user.id).single()

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Meu Perfil</h2>
      <ProfileForm initialData={profile || {}} userId={session.user.id} />
    </div>
  )
}
