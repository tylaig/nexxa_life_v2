import { AppTopbar } from "@/components/app-shell/app-topbar"
import { GamifiedProfileView } from "@/components/settings/gamified-profile-view"
import { getProfileIdentity } from "@/lib/db/actions"

export default async function ProfilePage() {
  const profile = await getProfileIdentity()

  return (
    <>
      <AppTopbar title="Meu Perfil" subtitle="Identidade, avatar e progressão" />
      <GamifiedProfileView profile={profile} />
    </>
  )
}
