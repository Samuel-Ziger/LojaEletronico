"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createClientSupabaseClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import Link from "next/link"

export function AuthForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [redirectTo, setRedirectTo] = useState("/")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [activeTab, setActiveTab] = useState("login")

  // Estados para formulário de login
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")

  // Estados para formulário de cadastro
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")

  const supabase = createClientSupabaseClient()

  // Get redirect URL safely
  useEffect(() => {
    const redirect = searchParams?.get("redirectTo") || "/"
    setRedirectTo(redirect)
  }, [searchParams])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      })

      if (error) throw error

      router.push(redirectTo)
      router.refresh()
    } catch (error: any) {
      console.error("Erro ao fazer login:", error)
      setError(error.message || "Falha ao fazer login. Verifique suas credenciais.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    // Validação de senha
    if (registerPassword !== registerConfirmPassword) {
      setError("As senhas não coincidem")
      setIsLoading(false)
      return
    }

    if (registerPassword.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres")
      setIsLoading(false)
      return
    }

    try {
      // Registrar usuário
      const { data, error } = await supabase.auth.signUp({
        email: registerEmail,
        password: registerPassword,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      })

      if (error) throw error

      if (data.user) {
        // Criar perfil do usuário
        const { error: profileError } = await supabase.from("user_profiles").insert({
          id: data.user.id,
          email: registerEmail,
          first_name: firstName,
          last_name: lastName,
        })

        if (profileError) {
          console.error("Erro ao criar perfil:", profileError)
        }
      }

      // Verificar se é necessário confirmar e-mail
      if (data?.user?.identities?.length === 0) {
        setActiveTab("confirmation")
      } else {
        router.push(redirectTo)
        router.refresh()
      }
    } catch (error: any) {
      console.error("Erro ao registrar:", error)
      setError(error.message || "Falha ao criar conta. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Cadastro</TabsTrigger>
        </TabsList>

        {/* Tab de Login */}
        <TabsContent value="login">
          <form onSubmit={handleLogin}>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Entre com sua conta para continuar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm">{error}</div>}

              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <Link href="/recuperar-senha" className="text-sm text-purple-600 hover:underline">
                    Esqueceu a senha?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
                {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                Entrar
              </Button>
            </CardFooter>
          </form>
        </TabsContent>

        {/* Tab de Cadastro */}
        <TabsContent value="register">
          <form onSubmit={handleRegister}>
            <CardHeader>
              <CardTitle>Criar Conta</CardTitle>
              <CardDescription>Cadastre-se para começar a comprar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm">{error}</div>}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nome</Label>
                  <Input
                    id="firstName"
                    placeholder="Seu nome"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Sobrenome</Label>
                  <Input
                    id="lastName"
                    placeholder="Seu sobrenome"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="registerEmail">E-mail</Label>
                <Input
                  id="registerEmail"
                  type="email"
                  placeholder="seu@email.com"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="registerPassword">Senha</Label>
                <div className="relative">
                  <Input
                    id="registerPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={registerConfirmPassword}
                  onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
                {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                Criar Conta
              </Button>
            </CardFooter>
          </form>
        </TabsContent>

        {/* Tab de Confirmação */}
        <TabsContent value="confirmation">
          <CardHeader>
            <CardTitle>Verifique seu e-mail</CardTitle>
            <CardDescription>
              Enviamos um link de confirmação para {registerEmail}. Por favor, verifique sua caixa de entrada para
              ativar sua conta.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button
              className="w-full"
              variant="outline"
              onClick={() => {
                setActiveTab("login")
              }}
            >
              Voltar para o Login
            </Button>
          </CardFooter>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
