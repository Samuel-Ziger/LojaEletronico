import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TechStore - Acessórios para Celular e Eletrônicos",
  description:
    "Loja especializada em acessórios para celular: capas, películas, fones de ouvido, carregadores e muito mais. Qualidade garantida e entrega rápida.",
  keywords: "acessórios celular, capas, películas, fones de ouvido, carregadores, eletrônicos",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
