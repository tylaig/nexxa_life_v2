import Link from "next/link"
import { ArrowRight, Compass, LineChart, NotebookPen, ShieldCheck, Sparkles } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const highlights = [
  {
    title: "Diagnóstico que vira ação",
    description: "Mapeie eixos críticos e traduza leitura em próximos passos objetivos dentro do ciclo do produto.",
    icon: Compass,
  },
  {
    title: "Execução com contexto",
    description: "Conecte agenda, checklist, metas e diário para sustentar ritmo com menos dispersão.",
    icon: NotebookPen,
  },
  {
    title: "Leitura contínua do sistema",
    description: "Cruze sinais, relatórios e evolução para ajustar direção antes que o ruído vire desvio estrutural.",
    icon: LineChart,
  },
] as const

const pillars = [
  "Diagnóstico guiado para clareza do momento atual",
  "Rotina operacional conectada entre metas, agenda e checklist",
  "Camada editorial e aprendizado aplicados ao contexto",
  "Leitura histórica para evoluir decisão e consistência",
] as const

export default function RootPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.16),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.12),transparent_26%),linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent)]" />
        <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-14 md:px-10 md:py-20 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-3xl space-y-6">
            <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
              NexxaLife
            </Badge>
            <div className="space-y-4">
              <h1 className="max-w-4xl text-balance text-4xl font-semibold tracking-tight md:text-5xl xl:text-6xl">
                Transforme diagnóstico pessoal em direção, rotina e evolução observável.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
                O NexxaLife organiza leitura de contexto, execução diária e acompanhamento estratégico em uma única jornada.
                Em vez de ferramentas soltas, a plataforma aproxima clareza, foco, consistência e decisão prática.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-xl px-5">
                <Link href="/login">
                  Entrar na plataforma
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-xl px-5">
                <Link href="/diagnostic">Explorar o diagnóstico</Link>
              </Button>
            </div>
          </div>

          <Card className="w-full max-w-xl border-border/80 bg-background/85 shadow-sm backdrop-blur">
            <CardHeader>
              <CardTitle>Como a jornada se conecta</CardTitle>
              <CardDescription>Do sinal inicial até a execução do dia, cada superfície precisa responder ao momento atual.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {pillars.map((item, index) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-border/70 bg-muted/20 p-4">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    {index + 1}
                  </div>
                  <p className="text-sm leading-6 text-muted-foreground">{item}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-12 md:px-10 md:py-16">
        <div className="mb-6 max-w-2xl">
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Leitura da plataforma</div>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">Uma fundação única para diagnosticar, decidir e sustentar execução.</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground md:text-base">
            A landing pública agora comunica o papel do produto sem depender de redirecionamento imediato para o dashboard.
            Isso reduz ambiguidade entre entrada pública e shell autenticado.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {highlights.map((item) => {
            const Icon = item.icon
            return (
              <Card key={item.title} className="border-border/80 bg-card/80">
                <CardHeader>
                  <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
              </Card>
            )
          })}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 pb-14 md:px-10 md:pb-20">
        <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <Card className="border-border/80 bg-gradient-to-br from-card via-card to-primary/5">
            <CardHeader>
              <CardTitle>Para quem a plataforma foi desenhada</CardTitle>
              <CardDescription>Líderes, operadores e pessoas em transição que precisam de um sistema pessoal mais coerente.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
              <p>
                O NexxaLife foi estruturado para pessoas que não precisam apenas de registro, mas de uma forma mais útil de ler contexto,
                decidir prioridade e manter continuidade ao longo do tempo.
              </p>
              <p>
                A proposta pública da landing é preparar a entrada na plataforma, enquanto o shell autenticado continua focado na operação.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/80">
            <CardHeader>
              <CardTitle>Entrada segura e progressiva</CardTitle>
              <CardDescription>O acesso principal continua autenticado, mas agora a rota raiz já expressa o posicionamento oficial do produto.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-2xl border border-border bg-background/60 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  Acesso principal
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">Use login e onboarding para entrar no fluxo operacional completo.</p>
              </div>
              <div className="rounded-2xl border border-border bg-background/60 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Próximo passo sugerido
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">Explorar o diagnóstico primeiro ajuda a entender a lógica central antes de abrir dashboard, agenda e relatórios.</p>
              </div>
              <div className="flex flex-wrap gap-3 pt-1">
                <Button asChild className="rounded-xl">
                  <Link href="/signup">Criar conta</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-xl">
                  <Link href="/dashboard">Abrir dashboard</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}
