import { AppTopbar } from "@/components/app-shell/app-topbar"
import { ContactsView } from "@/components/contacts/contacts-view"

export default function ContactsPage() {
  return (
    <>
      <AppTopbar
        title="Contatos"
        subtitle="CRM complementar para relacionamento, segmentação e contexto comercial conectado ao NexxaLife"
      />
      <ContactsView />
    </>
  )
}
