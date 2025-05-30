import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Verificar se o usuário está tentando acessar páginas protegidas
  if (req.nextUrl.pathname.startsWith("/minha-conta") && !session) {
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = "/login"
    redirectUrl.searchParams.set("redirectTo", req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Verificar se o usuário já está logado e está tentando acessar páginas de autenticação
  if ((req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/cadastro") && session) {
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = "/minha-conta"
    return NextResponse.redirect(redirectUrl)
  }

  return res
}

export const config = {
  matcher: ["/minha-conta/:path*", "/login", "/cadastro", "/recuperar-senha"],
}
