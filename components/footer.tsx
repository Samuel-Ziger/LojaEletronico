import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Smartphone,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Shield,
  Truck,
} from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Features section */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-4">
              <div className="bg-purple-600 p-3 rounded-full">
                <Truck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Frete Grátis</h3>
                <p className="text-gray-400 text-sm">Para compras acima de R$ 199</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="bg-green-600 p-3 rounded-full">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Compra Segura</h3>
                <p className="text-gray-400 text-sm">Seus dados protegidos</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="bg-blue-600 p-3 rounded-full">
                <CreditCard className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Parcele sem Juros</h3>
                <p className="text-gray-400 text-sm">Em até 12x no cartão</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-lg">
                <Smartphone className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">TechStore</span>
            </div>
            <p className="text-gray-400">
              Sua loja especializada em acessórios para celular e eletrônicos. Qualidade garantida e os melhores preços
              do mercado.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/sobre" className="text-gray-400 hover:text-white">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-gray-400 hover:text-white">
                  Contato
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/trabalhe-conosco" className="text-gray-400 hover:text-white">
                  Trabalhe Conosco
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Atendimento</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/minha-conta" className="text-gray-400 hover:text-white">
                  Minha Conta
                </Link>
              </li>
              <li>
                <Link href="/meus-pedidos" className="text-gray-400 hover:text-white">
                  Meus Pedidos
                </Link>
              </li>
              <li>
                <Link href="/trocas-devolucoes" className="text-gray-400 hover:text-white">
                  Trocas e Devoluções
                </Link>
              </li>
              <li>
                <Link href="/rastreamento" className="text-gray-400 hover:text-white">
                  Rastrear Pedido
                </Link>
              </li>
              <li>
                <Link href="/politica-privacidade" className="text-gray-400 hover:text-white">
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-purple-400" />
                <span className="text-gray-400">(11) 99999-9999</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-purple-400" />
                <span className="text-gray-400">contato@techstore.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-purple-400" />
                <span className="text-gray-400">São Paulo, SP</span>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold mb-2">Newsletter</h4>
              <div className="flex space-x-2">
                <Input type="email" placeholder="Seu e-mail" className="bg-gray-800 border-gray-700 text-white" />
                <Button className="bg-purple-600 hover:bg-purple-700">OK</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2024 TechStore. Todos os direitos reservados.</p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm">Formas de pagamento:</span>
              <div className="flex space-x-2">
                <div className="bg-gray-800 px-2 py-1 rounded text-xs">VISA</div>
                <div className="bg-gray-800 px-2 py-1 rounded text-xs">MASTER</div>
                <div className="bg-gray-800 px-2 py-1 rounded text-xs">PIX</div>
                <div className="bg-gray-800 px-2 py-1 rounded text-xs">BOLETO</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
