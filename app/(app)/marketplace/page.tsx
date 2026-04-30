import { AppTopbar } from "@/components/app-shell/app-topbar"
import { marketplaceHero } from "@/components/meu-dia/marketplace-content"
import { MeuDiaMarketplaceView } from "@/components/meu-dia/meu-dia-marketplace-view"

export default function MarketplacePage() {
  return (
    <>
      <AppTopbar title={marketplaceHero.title} subtitle={marketplaceHero.description} />
      <MeuDiaMarketplaceView />
    </>
  )
}
