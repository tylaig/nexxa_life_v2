import { InboxApp } from "@/components/inbox/inbox-app"
import { AppTopbar } from "@/components/app-shell/app-topbar"

export default function InboxPage() {
  return (
    <>
      <AppTopbar
        title="Inbox"
        subtitle="Caixa unificada · WhatsApp Oficial, Webchat, Email, Instagram"
      />
      <InboxApp />
    </>
  )
}
