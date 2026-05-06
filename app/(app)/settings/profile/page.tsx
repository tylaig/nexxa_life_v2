import { UserCircle2, Upload, Save, Mail, Briefcase } from "lucide-react"
import { PageHeader } from "@/components/ui/page-header"
import { SectionCard } from "@/components/ui/section-card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { AppTopbar } from "@/components/app-shell/app-topbar"

export default function ProfilePage() {
  return (
    <>
      <AppTopbar title="Meu Perfil" subtitle="Gerencie suas informações pessoais" />
      <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto w-full">
      <PageHeader
        eyebrow="Configurações"
        title="Meu Perfil"
        description="Gerencie suas informações pessoais e como você aparece no NexxaLife."
        actions={
          <Button size="sm" className="h-9 gap-2 rounded-xl px-4 shadow-sm">
            <Save className="h-4 w-4" /> Salvar alterações
          </Button>
        }
      />

      <div className="grid gap-6">
        <SectionCard title="Foto de Perfil">
          <div className="flex items-center gap-6">
            <Avatar className="h-20 w-20 border-2 border-border/50 shadow-sm">
              <AvatarFallback className="bg-primary/10 text-2xl font-bold text-primary">T</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="h-8 rounded-lg text-xs gap-1.5">
                  <Upload className="h-3.5 w-3.5" /> Fazer upload
                </Button>
                <Button variant="ghost" size="sm" className="h-8 rounded-lg text-xs text-destructive hover:text-destructive/90">
                  Remover
                </Button>
              </div>
              <p className="text-[11px] text-muted-foreground">Recomendado imagem quadrada, máx. 5MB.</p>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Informações Pessoais">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-medium text-foreground">Nome de exibição</label>
              <div className="relative">
                <UserCircle2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
                <input
                  type="text"
                  defaultValue="Tylaig"
                  className="w-full rounded-xl border border-border/60 bg-muted/20 py-2.5 pl-9 pr-3 text-sm text-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-foreground">E-mail associado</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
                <input
                  type="email"
                  defaultValue="tylaig@meusuper.app"
                  readOnly
                  className="w-full rounded-xl border border-border/60 bg-muted/40 py-2.5 pl-9 pr-3 text-sm text-muted-foreground cursor-not-allowed opacity-80"
                />
              </div>
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label className="text-xs font-medium text-foreground">Cargo ou Título (Opcional)</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
                <input
                  type="text"
                  defaultValue="Admin do workspace"
                  className="w-full rounded-xl border border-border/60 bg-muted/20 py-2.5 pl-9 pr-3 text-sm text-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
                />
              </div>
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label className="text-xs font-medium text-foreground">Bio ou Missão Pessoal</label>
              <textarea
                placeholder="Qual é o seu objetivo de evolução..."
                rows={3}
                className="w-full resize-none rounded-xl border border-border/60 bg-muted/20 py-3 px-4 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
              />
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
    </>
  )
}
