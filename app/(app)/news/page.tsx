import { AppTopbar } from "@/components/app-shell/app-topbar"
import { MeuDiaNewsView } from "@/components/meu-dia/meu-dia-news-view"
import { newsHero } from "@/components/meu-dia/news-content"

export default function NewsPage() {
  return (
    <>
      <AppTopbar title={newsHero.title} subtitle={newsHero.description} />
      <MeuDiaNewsView />
    </>
  )
}
