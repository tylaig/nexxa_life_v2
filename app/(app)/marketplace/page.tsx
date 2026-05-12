import { AppTopbar } from "@/components/app-shell/app-topbar"
import { marketplaceHero } from "@/components/nexxa-life/marketplace-content"
import { NexxaLifeMarketplaceView } from "@/components/nexxa-life/nexxa-life-marketplace-view"

export default function MarketplacePage() {
  return (
    <>
      <AppTopbar title={marketplaceHero.title} subtitle={marketplaceHero.description} />
      <NexxaLifeMarketplaceView />
    </>
  )
}
