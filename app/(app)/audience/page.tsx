import { AppTopbar } from "@/components/app-shell/app-topbar"
import { AudienceView } from "@/components/audience/audience-view"

export default function AudiencePage() {
  return (
    <>
      <AppTopbar title="Audiência" subtitle="Construção e gestão de públicos, segmentos e filtros para campanhas e automações" />
      <AudienceView />
    </>
  )
}
