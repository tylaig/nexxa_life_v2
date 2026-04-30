import { InboxApp } from "@/components/inbox/inbox-app"
import { AppTopbar } from "@/components/app-shell/app-topbar"

export default function InboxPage() {
  return (
    <>
      <AppTopbar
        title="Inbox"
        subtitle="Atendimento complementar e omnichannel conectado a contatos, campaigns e contexto operacional do NexxaLife"
      />
      <InboxApp />
    </>
  )
}
