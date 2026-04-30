import { AppTopbar } from "@/components/app-shell/app-topbar"
import { AudienceView } from "@/components/audience/audience-view"

export default function AudiencePage() {
  return (
    <>
      <AppTopbar
        title="Audiência"
        subtitle="Segmentação complementar conectada a contatos, campaigns, orders e contexto comercial do NexxaLife"
      />
      <AudienceView />
    </>
  )
}
