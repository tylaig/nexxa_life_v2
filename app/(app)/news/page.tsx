import { AppTopbar } from "@/components/app-shell/app-topbar"
import { NexxaLifeNewsView } from "@/components/nexxa-life/nexxa-life-news-view"
import { newsHero } from "@/components/nexxa-life/news-content"

export default function NewsPage() {
  return (
    <>
      <AppTopbar title={newsHero.title} subtitle={newsHero.description} />
      <NexxaLifeNewsView />
    </>
  )
}
