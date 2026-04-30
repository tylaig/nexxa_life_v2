import { AppTopbar } from "@/components/app-shell/app-topbar"
import { ContactsView } from "@/components/contacts/contacts-view"

export default function ContactsPage() {
  return (
    <>
      <AppTopbar
        title="Contatos"
        subtitle="CRM unificado · Perfil 360, segmentos, LTV e ciclo de vida"
      />
      <ContactsView />
    </>
  )
}
