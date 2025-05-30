import { Button } from "@/components/ui/button"
import { ArrowRight, Smartphone, Headphones, Speaker } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-20 overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Acessórios Premium para
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                {" "}
                Seus Dispositivos
              </span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Descubra nossa coleção completa de capas, películas, fones de ouvido, carregadores e muito mais. Qualidade
              garantida e entrega rápida.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
                <Link href="/produtos">
                  Ver Produtos <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-slate-900"
              >
                <Link href="/categorias">Explorar Categorias</Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:scale-105 transition-transform duration-300 cursor-pointer">
                  <Smartphone className="h-12 w-12 text-purple-400 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Capas & Películas</h3>
                  <p className="text-gray-300 text-sm">Proteção completa para seu smartphone</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:scale-105 transition-transform duration-300 cursor-pointer">
                  <Speaker className="h-12 w-12 text-pink-400 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Caixas de Som</h3>
                  <p className="text-gray-300 text-sm">Som de alta qualidade</p>
                </div>
              </div>
              <div className="space-y-6 mt-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:scale-105 transition-transform duration-300 cursor-pointer">
                  <Headphones className="h-12 w-12 text-blue-400 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Fones de Ouvido</h3>
                  <p className="text-gray-300 text-sm">Experiência sonora imersiva</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
