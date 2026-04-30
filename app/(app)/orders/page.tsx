import { AppTopbar } from "@/components/app-shell/app-topbar"
import { OrdersView } from "@/components/orders/orders-view"

export default function OrdersPage() {
  return (
    <>
      <AppTopbar
        title="Pedidos"
        subtitle="Operação comercial complementar conectada a contatos, inbox, campanhas e contexto transacional do NexxaLife"
      />
      <OrdersView />
    </>
  )
}
