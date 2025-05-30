import { getSession } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createServerSupabaseClient } from "@/lib/supabase"

export default async function AccountPage() {
  const session = await getSession()
  if (!session) return null

  const supabase = createServerSupabaseClient()
  const { data: profile } = await supabase.from("user_profiles").select("*").eq("id", session.user.id).single()

  // Buscar dados de pedidos (exemplo)
  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false })
    .limit(5)
    .catch(() => ({ data: [] }))

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Bem-vindo, {profile?.first_name || "Cliente"}!</CardTitle>
          <CardDescription>Resumo da sua conta e atividades recentes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-700">Pedidos</h3>
              <p className="text-3xl font-bold mt-2">{orders?.length || 0}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-700">Endereços</h3>
              <p className="text-3xl font-bold mt-2">0</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-700">Lista de Desejos</h3>
              <p className="text-3xl font-bold mt-2">0</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pedidos Recentes</CardTitle>
          <CardDescription>Acompanhe seus últimos pedidos</CardDescription>
        </CardHeader>
        <CardContent>
          {orders && orders.length > 0 ? (
            <div className="space-y-4">
              {/* Lista de pedidos recentes */}
              {orders.map((order) => (
                <div key={order.id} className="border rounded-lg p-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">Pedido #{order.order_number}</p>
                      <p className="text-sm text-gray-500">{new Date(order.created_at).toLocaleDateString("pt-BR")}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">
                        {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(order.total)}
                      </p>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          order.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : order.status === "processing"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {order.status === "completed"
                          ? "Entregue"
                          : order.status === "processing"
                            ? "Em processamento"
                            : "Pendente"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>Você ainda não realizou nenhum pedido.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
