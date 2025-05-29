import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

export function ProductFilters() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Categorias</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            "Capas (156)",
            "Películas (89)",
            "Fones de Ouvido (67)",
            "Carregadores (45)",
            "Caixas de Som (34)",
            "Cabos (78)",
            "Suportes (23)",
            "Power Banks (19)",
          ].map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox id={category} />
              <label htmlFor={category} className="text-sm cursor-pointer">
                {category}
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Faixa de Preço</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Slider defaultValue={[0, 500]} max={500} step={10} className="w-full" />
            <div className="flex justify-between text-sm text-gray-600">
              <span>R$ 0</span>
              <span>R$ 500+</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Marcas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {["Apple", "Samsung", "Xiaomi", "Motorola", "JBL", "Sony", "Anker", "Baseus"].map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox id={brand} />
              <label htmlFor={brand} className="text-sm cursor-pointer">
                {brand}
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Avaliação</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {["5 estrelas", "4 estrelas ou mais", "3 estrelas ou mais", "2 estrelas ou mais"].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox id={rating} />
              <label htmlFor={rating} className="text-sm cursor-pointer">
                {rating}
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      <Button variant="outline" className="w-full">
        Limpar Filtros
      </Button>
    </div>
  )
}
