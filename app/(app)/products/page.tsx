import { AppTopbar } from "@/components/app-shell/app-topbar"
import { ProductsView } from "@/components/products/products-view"

export default function ProductsPage() {
  return (
    <>
      <AppTopbar
        title="Produtos"
        subtitle="Catálogo comercial complementar conectado a pedidos, campaigns, apps e distribuição digital do NexxaLife"
      />
      <ProductsView />
    </>
  )
}
