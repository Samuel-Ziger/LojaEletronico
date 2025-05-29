import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail } from "lucide-react"

export function NewsletterSection() {
  return (
    <section className="bg-gradient-to-r from-purple-600 to-pink-600 py-16">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <Mail className="h-16 w-16 text-white mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">Fique por Dentro das Novidades</h2>
          <p className="text-purple-100 mb-8 text-lg">
            Receba ofertas exclusivas, lançamentos e dicas sobre acessórios para seus dispositivos.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Seu melhor e-mail"
              className="bg-white/10 border-white/20 text-white placeholder:text-purple-200"
            />
            <Button className="bg-white text-purple-600 hover:bg-gray-100 font-semibold">Inscrever-se</Button>
          </div>

          <p className="text-purple-200 text-sm mt-4">Não enviamos spam. Cancele a qualquer momento.</p>
        </div>
      </div>
    </section>
  )
}
