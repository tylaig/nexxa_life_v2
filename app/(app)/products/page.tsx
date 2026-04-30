import { AppTopbar } from "@/components/app-shell/app-topbar"
import { ProductsView } from "@/components/products/products-view"

export default function ProductsPage() {
  return (
    <>
      <AppTopbar title="Produtos" subtitle="Gestão de catálogo, pedidos e distribuição de bens digitais" />
      <ProductsView />
    </>
  )
}
