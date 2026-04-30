import { AppTopbar } from "@/components/app-shell/app-topbar"
import { OrdersView } from "@/components/orders/orders-view"

export default function OrdersPage() {
  return (
    <>
      <AppTopbar
        title="Pedidos"
        subtitle="Operação de e-commerce · Sincronizado com Shopify, VTEX e WhatsApp Catalog"
      />
      <OrdersView />
    </>
  )
}
